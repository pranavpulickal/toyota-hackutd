import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userPreferences } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Analyzing user preferences:", userPreferences);

    const prompt = `Based on the following customer preferences, recommend 3 suitable 2025 Toyota vehicles from this list:

CUSTOMER PREFERENCES:
- Budget: ${userPreferences.budget}
- Primary Use: ${userPreferences.primaryUse}
- Passengers: ${userPreferences.passengers}
- Must-Have Features: ${userPreferences.features.join(", ")}
- Fuel Preference: ${userPreferences.fuelType}
${userPreferences.lifestyle ? `- Lifestyle: ${userPreferences.lifestyle}` : ""}

AVAILABLE 2025 TOYOTA MODELS WITH TRIMS:
Corolla: L, LE, SE, XLE, XSE
Corolla Hatchback: SE, XSE
Camry: LE, SE, XLE, XSE, TRD
Crown: XLE, Limited, Platinum
Prius: LE, XLE, Limited
Prius Prime: SE, XSE
GR86: Base, Premium
GR Corolla: Core, Circuit Edition
GR Supra: 2.0, 3.0, 3.0 Premium, A91-MT
Corolla Cross: L, LE, XLE
RAV4: LE, XLE, XLE Premium, Adventure, TRD Off-Road, Limited, Platinum
RAV4 Prime: SE, XSE
Venza: LE, XLE, Limited
Highlander: L, LE, XLE, Limited, Platinum
Grand Highlander: LE, XLE, Limited, Platinum
4Runner: SR5, TRD Off-Road, TRD Sport, Limited, TRD Pro
Sequoia: SR5, Limited, Platinum, TRD Pro, Capstone
Land Cruiser: Base, First Edition
Tacoma: SR, SR5, TRD Sport, TRD Off-Road, Limited, TRD Pro
Tundra: SR, SR5, Limited, Platinum, TRD Pro, Capstone
Sienna: LE, XLE, Limited, Platinum
bZ4X: XLE, Limited

Return EXACTLY 3 recommendations in this format:

RECOMMENDATION 1:
MODEL: [exact model name from list above]
TRIM: [ONE specific trim level from the list - choose the best single trim for their budget and needs]
REASON: [2-3 sentences explaining why this specific model AND trim is perfect for their needs]
MATCH_SCORE: [percentage 0-100]

RECOMMENDATION 2:
MODEL: [model name]
TRIM: [ONE specific trim level]
REASON: [explanation]
MATCH_SCORE: [percentage]

RECOMMENDATION 3:
MODEL: [model name]
TRIM: [ONE specific trim level]
REASON: [explanation]
MATCH_SCORE: [percentage]

CRITICAL: Pick ONE specific trim per recommendation. Do not list multiple trims separated by slashes or commas. Choose the trim that best fits their stated budget.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are a Toyota vehicle expert helping customers find the perfect vehicle match.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI recommendation error:", response.status, errorText);
      throw new Error("Failed to generate recommendations");
    }

    const data = await response.json();
    const recommendationsText = data.choices[0].message.content;

    console.log("Raw recommendations:", recommendationsText);

    // Parse recommendations
    const recommendations: any[] = [];
    const blocks = recommendationsText.split(/RECOMMENDATION \d+:/).slice(1);

    for (const block of blocks.slice(0, 3)) {
      try {
        const modelMatch = block.match(/MODEL:\s*([^\n]+)/i);
        const trimMatch = block.match(/TRIM:\s*([^\n]+)/i);
        const reasonMatch = block.match(/REASON:\s*([^\n]+(?:\n(?!MATCH_SCORE:)[^\n]+)*)/i);
        const scoreMatch = block.match(/MATCH_SCORE:\s*(\d+)/i);

        if (modelMatch && trimMatch && reasonMatch) {
          recommendations.push({
            model: modelMatch[1].trim(),
            trim: trimMatch[1].trim(),
            reason: reasonMatch[1].trim().replace(/\n/g, " "),
            matchScore: scoreMatch ? parseInt(scoreMatch[1]) : 85,
          });
        }
      } catch (e) {
        console.error("Error parsing recommendation:", e);
      }
    }

    console.log("Parsed recommendations:", recommendations.length);

    return new Response(
      JSON.stringify({ recommendations }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in recommend-vehicle:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
