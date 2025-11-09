import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LoanOption {
  name: string;
  apr: number;
  monthlyPayment: number;
  totalCost: number;
  loanTerm: number;
  downPayment: number;
  recommended: boolean;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      financialData,
      creditScore,
      vehiclePrice,
      downPayment,
      interestRate,
      loanTerm,
      vehicleName,
      vehicleInfo,
      hasTradeIn,
      monthlyIncome,
      monthlyExpenses,
    } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Analyzing financial profile for vehicle:", vehicleName);
    console.log("Has trade-in:", hasTradeIn);
    console.log("Monthly income:", monthlyIncome);
    console.log("Monthly expenses:", monthlyExpenses);

    let tradeInValue = 0;

    // First, estimate the trade-in value if applicable
    if (hasTradeIn && vehicleInfo) {
      console.log("Estimating trade-in value for:", vehicleInfo);

      const tradeInPrompt = `Estimate the trade-in value for this vehicle:
- Make: ${vehicleInfo.make}
- Model: ${vehicleInfo.model}
- Year: ${vehicleInfo.year}
- Mileage: ${vehicleInfo.mileage}
- Clean Title: ${vehicleInfo.cleanTitle}

Provide ONLY a realistic dollar amount estimate based on current market conditions. Consider:
- Vehicle depreciation
- Mileage impact
- Title status
- Current market demand

Return ONLY the estimated value as a number without any explanation or currency symbol.`;

      const tradeInResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [{ role: "user", content: tradeInPrompt }],
        }),
      });

      if (!tradeInResponse.ok) {
        const errorText = await tradeInResponse.text();
        console.error("Trade-in estimation error:", tradeInResponse.status, errorText);
        throw new Error("Failed to estimate trade-in value");
      }

      const tradeInData = await tradeInResponse.json();
      const tradeInValueText = tradeInData.choices[0].message.content.trim();
      tradeInValue = parseInt(tradeInValueText.replace(/[^0-9]/g, "")) || 0;

      console.log("Estimated trade-in value:", tradeInValue);
    }

    const effectiveDownPayment = downPayment + tradeInValue;
    const actualLoanAmount = vehiclePrice - effectiveDownPayment;
    
    // Calculate DTI (Debt-to-Income) ratio
    const discretionaryIncome = monthlyIncome - monthlyExpenses;
    const dtiRatio = monthlyExpenses > 0 ? ((monthlyExpenses / monthlyIncome) * 100).toFixed(1) : "0.0";

    // AI Analysis - Concise technical assessment with explicit APR recommendation
    const analysisPrompt = `Provide a concise financing assessment for purchasing a ${vehicleName}:

CUSTOMER FINANCIAL PROFILE:
${financialData}
Monthly Income: $${monthlyIncome.toLocaleString()}
Monthly Expenses: $${monthlyExpenses.toLocaleString()}
Discretionary Income: $${discretionaryIncome.toLocaleString()}
Current DTI Ratio: ${dtiRatio}%

PURCHASE DETAILS:
Vehicle Price: $${vehiclePrice.toLocaleString()}
Down Payment: $${downPayment.toLocaleString()}
${hasTradeIn ? `Trade-In Value: $${tradeInValue.toLocaleString()}` : "No trade-in vehicle"}
Loan Amount: $${actualLoanAmount.toLocaleString()}
Loan Term: ${loanTerm} months

IMPORTANT: Current market interest rates (2025) are SIGNIFICANTLY HIGHER than historical averages.

START YOUR RESPONSE WITH THIS LINE:
RECOMMENDED_APR: [single number based on credit score using these CURRENT market rates:
- 720+ (Excellent): 6.5-7.5%
- 680-719 (Good): 9.0-10.5%
- 620-679 (Fair): 12.5-15.0%
- Below 620 (Poor): 17.5-20.0%]

Then provide a clear financial assessment:
• Affordability Analysis: Can they afford the estimated monthly payment based on their discretionary income?
• DTI Impact: How will this purchase affect their debt-to-income ratio?
• Budget Fit: Does this purchase leave enough financial cushion?
• Recommendation: Is this a wise financial decision? Be honest and direct.

Keep response under 200 words. Be realistic about current market conditions.`;

    const analysisResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
            content:
              "You are a financial advisor providing concise technical analysis. Be specific with numbers and ratios.",
          },
          { role: "user", content: analysisPrompt },
        ],
      }),
    });

    if (!analysisResponse.ok) {
      const errorText = await analysisResponse.text();
      console.error("AI Analysis error:", analysisResponse.status, errorText);
      throw new Error("Failed to generate analysis");
    }

    const analysisData = await analysisResponse.json();
    const analysisFullText = analysisData.choices[0].message.content;

    // Extract recommended APR from analysis
    let recommendedAPR = interestRate; // default to user's input
    const aprMatch = analysisFullText.match(/RECOMMENDED_APR:\s*([\d.]+)/);
    
    if (aprMatch) {
      recommendedAPR = parseFloat(aprMatch[1]);
      console.log("Extracted APR from AI analysis:", recommendedAPR);
    } else {
      // Fallback: Calculate realistic APR based on credit score (2025 market rates)
      if (creditScore >= 720) {
        recommendedAPR = 7.0; // Excellent credit
      } else if (creditScore >= 680) {
        recommendedAPR = 9.5; // Good credit
      } else if (creditScore >= 620) {
        recommendedAPR = 13.5; // Fair credit
      } else {
        recommendedAPR = 18.5; // Poor credit
      }
      console.log("Using fallback APR based on credit score:", recommendedAPR);
    }

    // Remove the RECOMMENDED_APR line from the analysis text
    const analysis = analysisFullText.replace(/RECOMMENDED_APR:.*\n\n?/, "").trim();

    // Generate alternative LOAN options (2 more besides user's selection)
    const loanAlternativesPrompt = `Based on this customer's financial profile, generate 2 REALISTIC loan options:

CUSTOMER FINANCIAL PROFILE:
${financialData}
Monthly Income: $${monthlyIncome}
Monthly Expenses: $${monthlyExpenses}
Discretionary Income: $${discretionaryIncome}

VEHICLE DETAILS:
Price: $${vehiclePrice}
${hasTradeIn ? `Trade-In: $${tradeInValue}` : "No trade-in"}
Current Selection: ${loanTerm} months, $${downPayment} down, ${interestRate}% APR

AI RECOMMENDED APR: ${recommendedAPR.toFixed(2)}% (based on credit score ${creditScore} and 2025 market rates)

CRITICAL REQUIREMENTS:
- Base APR is ${recommendedAPR.toFixed(2)}% for their credit profile
- Adjust APR based on loan term: shorter terms (24-36 months) get 1-1.5% LOWER rates, longer terms (72-84 months) get 1-2% HIGHER rates
- Term: shorter = lower total cost + better rate, longer = lower monthly payment + higher rate
- Down payment: align with available funds (min 10%, recommend 15-20%)
- All options must be REALISTIC and match 2025 market conditions with term-based APR adjustments

Format EXACTLY:
OPTION: [Descriptive Name reflecting why it's good for them]
TYPE: LOAN
TERM: [months between 24-84]
DOWN: [realistic amount based on their finances]
APR: ${recommendedAPR.toFixed(2)}

First option should be the RECOMMENDED one based on their specific financial situation.`;

    const loanAlternativesResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
            content:
              "You are a financing specialist. Generate ONLY realistic, achievable loan options based on the customer's verified financial data. Be conservative and responsible. Follow format exactly.",
          },
          { role: "user", content: loanAlternativesPrompt },
        ],
      }),
    });

    if (!loanAlternativesResponse.ok) {
      const errorText = await loanAlternativesResponse.text();
      console.error("AI Loan Alternatives error:", loanAlternativesResponse.status, errorText);

      if (loanAlternativesResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (loanAlternativesResponse.status === 402) {
        return new Response(JSON.stringify({ error: "AI service requires payment. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      throw new Error("Failed to generate loan alternatives");
    }

    const loanAlternativesData = await loanAlternativesResponse.json();
    const loanAlternativesText = loanAlternativesData.choices[0].message.content;

    // Generate LEASE options (3 options)
    const leaseAlternativesPrompt = `Based on this customer's financial profile, generate 3 REALISTIC lease options:

CUSTOMER FINANCIAL PROFILE:
${financialData}
Monthly Income: $${monthlyIncome}
Monthly Expenses: $${monthlyExpenses}
Discretionary Income: $${discretionaryIncome}

VEHICLE DETAILS:
Price: $${vehiclePrice}
${hasTradeIn ? `Trade-In: $${tradeInValue} (can be used as down payment)` : "No trade-in"}

AI RECOMMENDED BASE LEASE APR: ${(recommendedAPR * 0.85).toFixed(2)}% (lease rates typically 15% lower than loan rates in 2025)

CRITICAL REQUIREMENTS:
- Base lease APR is ${(recommendedAPR * 0.85).toFixed(2)}%
- Adjust APR based on lease term: 24-month gets 0.5-0.75% LOWER rate, 36-month gets 0.5% HIGHER rate
- Vary the TERM and DOWN PAYMENT amounts
- Initial payment: align with available funds (typical: $1500-$3500)
- Lease terms: 24, 30, or 36 months only
- All options must reflect term-based APR adjustments for 2025 market

Format EXACTLY:
OPTION: [Descriptive Name reflecting why it's good for them]
TYPE: LEASE
TERM: [24, 30, or 36 months]
DOWN: [realistic initial payment based on their finances]
APR: ${(recommendedAPR * 0.85).toFixed(2)}

First option should be RECOMMENDED. Include variety: conservative, balanced, and aggressive options based on their liquidity.`;

    const leaseAlternativesResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
            content:
              "You are a leasing specialist. Generate ONLY realistic, achievable lease options based on the customer's verified financial data. Be conservative and responsible. Follow format exactly.",
          },
          { role: "user", content: leaseAlternativesPrompt },
        ],
      }),
    });

    let leaseAlternativesText = "";
    if (leaseAlternativesResponse.ok) {
      const leaseAlternativesData = await leaseAlternativesResponse.json();
      leaseAlternativesText = leaseAlternativesData.choices[0].message.content;
    } else {
      console.error("Lease alternatives generation failed");
    }

    console.log("Raw loan alternatives response:", loanAlternativesText);
    console.log("Raw lease alternatives response:", leaseAlternativesText);

    // Parse loan alternatives
    const alternativeLoanOptions: LoanOption[] = [];
    const loanOptionBlocks = loanAlternativesText.split("OPTION:").slice(1);
    console.log("Loan option blocks found:", loanOptionBlocks.length);

    // Parse lease alternatives
    const alternativeLeaseOptions: LoanOption[] = [];
    const leaseOptionBlocks = leaseAlternativesText.split("OPTION:").slice(1);
    console.log("Lease option blocks found:", leaseOptionBlocks.length);

    const calculateLoanPayment = (principal: number, apr: number, term: number): number => {
      if (principal <= 0) return 0;
      const monthlyRate = apr / 100 / 12;
      return Math.round(
        (principal * (monthlyRate * Math.pow(1 + monthlyRate, term))) / (Math.pow(1 + monthlyRate, term) - 1),
      );
    };

    const calculateLeasePayment = (
      price: number,
      residualPercent: number,
      apr: number,
      term: number,
      down: number,
    ): number => {
      const residualValue = price * residualPercent;
      const depreciation = (price - down - residualValue) / term;
      const avgValue = (price - down + residualValue) / 2;
      const interest = avgValue * (apr / 100 / 12);
      return Math.max(0, Math.round(depreciation + interest));
    };

    // Parse loan options - generate 3 options total
    for (const block of loanOptionBlocks) {
      try {
        console.log("Processing loan block:", block.substring(0, 100));
        const nameMatch = block.match(/^([^\n]+)/);
        const typeMatch = block.match(/TYPE:\s*(LOAN|LEASE)/i);
        const termMatch = block.match(/TERM:\s*(\d+)/);
        const downMatch = block.match(/DOWN:\s*(\d+)/);
        const aprMatch = block.match(/APR:\s*([\d.]+)/);

        if (nameMatch && termMatch && downMatch && aprMatch) {
          const term = parseInt(termMatch[1]);
          const down = Math.max(0, parseInt(downMatch[1]));
          const apr = Math.min(20, Math.max(5.5, parseFloat(aprMatch[1])));

          const principal = Math.max(0, vehiclePrice - down - tradeInValue);
          const monthlyPayment = calculateLoanPayment(principal, apr, term);
          const totalCost = monthlyPayment * term + down;

          console.log(`Parsed loan option: ${nameMatch[1].trim()}, APR: ${apr}%, Term: ${term}, Payment: $${monthlyPayment}`);

          if (monthlyPayment > 0 && alternativeLoanOptions.length < 3) {
            alternativeLoanOptions.push({
              name: nameMatch[1].trim(),
              apr,
              monthlyPayment,
              totalCost,
              loanTerm: term,
              downPayment: down,
              recommended: alternativeLoanOptions.length === 0,
            });
          }
        } else {
          console.log("Failed to match loan option fields");
        }
      } catch (e) {
        console.error("Error parsing loan option:", e);
      }
    }

    // If AI didn't generate enough loan options, generate fallback options
    if (alternativeLoanOptions.length < 3) {
      console.log("Generating fallback loan options, current count:", alternativeLoanOptions.length);
      
      // Helper function to adjust APR based on term length
      const getAdjustedAPR = (baseAPR: number, term: number): number => {
        // Shorter terms get better rates, longer terms get worse rates
        if (term <= 36) {
          return Math.max(5.5, baseAPR - 1.5); // 1.5% lower for short terms
        } else if (term <= 48) {
          return Math.max(5.5, baseAPR - 0.75); // 0.75% lower for medium-short terms
        } else if (term <= 60) {
          return baseAPR; // Base rate for standard 60-month
        } else if (term <= 72) {
          return Math.min(20, baseAPR + 1.0); // 1% higher for longer terms
        } else {
          return Math.min(20, baseAPR + 2.0); // 2% higher for very long terms
        }
      };
      
      // Option 1: Shorter term (36 months) - BEST RATE
      if (alternativeLoanOptions.length < 1) {
        const term = 36;
        const down = Math.min(vehiclePrice * 0.2, downPayment + 2000);
        const adjustedAPR = getAdjustedAPR(recommendedAPR, term);
        const principal = Math.max(0, vehiclePrice - down - tradeInValue);
        const payment = calculateLoanPayment(principal, adjustedAPR, term);
        alternativeLoanOptions.push({
          name: "Best Rate - Short Term",
          apr: adjustedAPR,
          monthlyPayment: payment,
          totalCost: payment * term + down,
          loanTerm: term,
          downPayment: down,
          recommended: true,
        });
      }

      // Option 2: Standard term (60 months) - BASE RATE
      if (alternativeLoanOptions.length < 2) {
        const term = 60;
        const down = downPayment;
        const adjustedAPR = getAdjustedAPR(recommendedAPR, term);
        const principal = Math.max(0, vehiclePrice - down - tradeInValue);
        const payment = calculateLoanPayment(principal, adjustedAPR, term);
        alternativeLoanOptions.push({
          name: "Balanced Option",
          apr: adjustedAPR,
          monthlyPayment: payment,
          totalCost: payment * term + down,
          loanTerm: term,
          downPayment: down,
          recommended: alternativeLoanOptions.length === 0,
        });
      }

      // Option 3: Longer term (72 months) - HIGHER RATE
      if (alternativeLoanOptions.length < 3) {
        const term = 72;
        const down = Math.max(vehiclePrice * 0.1, downPayment - 1000);
        const adjustedAPR = getAdjustedAPR(recommendedAPR, term);
        const principal = Math.max(0, vehiclePrice - down - tradeInValue);
        const payment = calculateLoanPayment(principal, adjustedAPR, term);
        alternativeLoanOptions.push({
          name: "Lowest Monthly Payment",
          apr: adjustedAPR,
          monthlyPayment: payment,
          totalCost: payment * term + down,
          loanTerm: term,
          downPayment: down,
          recommended: false,
        });
      }
    }

    // Parse lease options
    for (const block of leaseOptionBlocks) {
      try {
        console.log("Processing lease block:", block.substring(0, 100));
        const nameMatch = block.match(/^([^\n]+)/);
        const typeMatch = block.match(/TYPE:\s*(LEASE)/i);
        const termMatch = block.match(/TERM:\s*(\d+)/);
        const downMatch = block.match(/DOWN:\s*(\d+)/);
        const aprMatch = block.match(/APR:\s*([\d.]+)/);

        if (nameMatch && termMatch && downMatch && aprMatch) {
          const term = parseInt(termMatch[1]);
          const down = Math.max(0, parseInt(downMatch[1]));
          const apr = Math.min(17, Math.max(4.5, parseFloat(aprMatch[1])));

          const monthlyPayment = calculateLeasePayment(vehiclePrice, 0.55, apr, term, down);
          const totalCost = monthlyPayment * term + down;

          console.log(`Parsed lease option: ${nameMatch[1].trim()}, APR: ${apr}%, Term: ${term}, Payment: $${monthlyPayment}`);

          if (monthlyPayment > 0 && alternativeLeaseOptions.length < 3) {
            alternativeLeaseOptions.push({
              name: nameMatch[1].trim(),
              apr,
              monthlyPayment,
              totalCost,
              loanTerm: term,
              downPayment: down,
              recommended: alternativeLeaseOptions.length === 0,
            });
          }
        } else {
          console.log("Failed to match lease option fields");
        }
      } catch (e) {
        console.error("Error parsing lease option:", e);
      }
    }

    // If AI didn't generate enough lease options, generate fallback options
    if (alternativeLeaseOptions.length < 3) {
      console.log("Generating fallback lease options, current count:", alternativeLeaseOptions.length);
      const baseLeaseAPR = recommendedAPR * 0.85; // Lease rates typically 15% lower
      
      // Helper function to adjust lease APR based on term
      const getAdjustedLeaseAPR = (baseAPR: number, term: number): number => {
        if (term <= 24) {
          return Math.max(4.5, baseAPR - 0.75); // 0.75% lower for 24-month
        } else if (term <= 30) {
          return Math.max(4.5, baseAPR - 0.25); // 0.25% lower for 30-month
        } else {
          return Math.min(17, baseAPR + 0.5); // 0.5% higher for 36-month
        }
      };
      
      // Option 1: 24-month lease - BEST RATE
      if (alternativeLeaseOptions.length < 1) {
        const term = 24;
        const down = 2500;
        const adjustedAPR = getAdjustedLeaseAPR(baseLeaseAPR, term);
        const payment = calculateLeasePayment(vehiclePrice, 0.60, adjustedAPR, term, down);
        alternativeLeaseOptions.push({
          name: "Best Rate - 24 Month",
          apr: adjustedAPR,
          monthlyPayment: payment,
          totalCost: payment * term + down,
          loanTerm: term,
          downPayment: down,
          recommended: true,
        });
      }

      // Option 2: 36-month lease - STANDARD RATE
      if (alternativeLeaseOptions.length < 2) {
        const term = 36;
        const down = 3000;
        const adjustedAPR = getAdjustedLeaseAPR(baseLeaseAPR, term);
        const payment = calculateLeasePayment(vehiclePrice, 0.55, adjustedAPR, term, down);
        alternativeLeaseOptions.push({
          name: "Standard 36 Month",
          apr: adjustedAPR,
          monthlyPayment: payment,
          totalCost: payment * term + down,
          loanTerm: term,
          downPayment: down,
          recommended: alternativeLeaseOptions.length === 0,
        });
      }

      // Option 3: 36-month low down lease - HIGHER RATE
      if (alternativeLeaseOptions.length < 3) {
        const term = 36;
        const down = 1500;
        const adjustedAPR = getAdjustedLeaseAPR(baseLeaseAPR, term) + 0.5; // Additional 0.5% for lower down
        const payment = calculateLeasePayment(vehiclePrice, 0.55, adjustedAPR, term, down);
        alternativeLeaseOptions.push({
          name: "Low Down - 36 Month",
          apr: adjustedAPR,
          monthlyPayment: payment,
          totalCost: payment * term + down,
          loanTerm: term,
          downPayment: down,
          recommended: false,
        });
      }
    }

    console.log("Financial analysis completed successfully");
    console.log("Trade-in value:", tradeInValue);
    console.log("Loan options:", alternativeLoanOptions.length);
    console.log("Lease options:", alternativeLeaseOptions.length);
    console.log("DTI Ratio:", dtiRatio + "%");

    return new Response(
      JSON.stringify({
        analysis,
        recommendedAPR,
        tradeInValue,
        alternativeLoanOptions,
        alternativeLeaseOptions,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error in analyze-financial-profile:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
