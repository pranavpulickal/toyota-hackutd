import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { vehicles } from "@/data/vehicles";
import { Loader2, Car, CheckCircle, ArrowRight } from "lucide-react";

interface Recommendation {
  model: string;
  trim: string;
  reason: string;
  matchScore: number;
}

export const VehicleFinder = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const [preferences, setPreferences] = useState({
    budget: "",
    primaryUse: "",
    passengers: "",
    features: [] as string[],
    fuelType: "",
    lifestyle: "",
  });

  const questions = [
    {
      id: "budget",
      question: "What's your budget range?",
      type: "radio",
      options: [
        { value: "under-30k", label: "Under $30,000" },
        { value: "30k-40k", label: "$30,000 - $40,000" },
        { value: "40k-50k", label: "$40,000 - $50,000" },
        { value: "50k-60k", label: "$50,000 - $60,000" },
        { value: "60k-plus", label: "$60,000+" },
      ],
    },
    {
      id: "primaryUse",
      question: "How will you primarily use this vehicle?",
      type: "radio",
      options: [
        { value: "daily-commute", label: "Daily commuting" },
        { value: "family-trips", label: "Family trips & errands" },
        { value: "off-road", label: "Off-road & adventure" },
        { value: "towing", label: "Towing & hauling" },
        { value: "performance", label: "Performance & driving experience" },
      ],
    },
    {
      id: "passengers",
      question: "How many passengers do you typically carry?",
      type: "radio",
      options: [
        { value: "1-2", label: "1-2 passengers" },
        { value: "3-5", label: "3-5 passengers" },
        { value: "6-8", label: "6-8 passengers" },
      ],
    },
    {
      id: "features",
      question: "What features are most important to you? (Select all that apply)",
      type: "checkbox",
      options: [
        { value: "fuel-efficiency", label: "Fuel efficiency" },
        { value: "advanced-safety", label: "Advanced safety features" },
        { value: "luxury-interior", label: "Luxury interior" },
        { value: "cargo-space", label: "Cargo space" },
        { value: "tech-features", label: "Latest technology" },
        { value: "off-road", label: "Off-road capability" },
        { value: "towing", label: "Towing capacity" },
      ],
    },
    {
      id: "fuelType",
      question: "What's your fuel preference?",
      type: "radio",
      options: [
        { value: "gas", label: "Traditional gasoline" },
        { value: "hybrid", label: "Hybrid (best of both worlds)" },
        { value: "plug-in-hybrid", label: "Plug-in hybrid" },
        { value: "electric", label: "Fully electric" },
        { value: "no-preference", label: "No preference" },
      ],
    },
  ];

  const handleRadioChange = (questionId: string, value: string) => {
    setPreferences((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      features: checked
        ? [...prev.features, value]
        : prev.features.filter((f) => f !== value),
    }));
  };

  const handleNext = () => {
    const currentQuestion = questions[step];
    const currentValue = preferences[currentQuestion.id as keyof typeof preferences];

    if (currentQuestion.type === "checkbox" && Array.isArray(currentValue) && currentValue.length === 0) {
      toast({
        title: "Please select at least one option",
        variant: "destructive",
      });
      return;
    }

    if (currentQuestion.type === "radio" && !currentValue) {
      toast({
        title: "Please select an option",
        variant: "destructive",
      });
      return;
    }

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsAnalyzing(true);

    try {
      const { data, error } = await supabase.functions.invoke("recommend-vehicle", {
        body: { userPreferences: preferences },
      });

      if (error) throw error;

      setRecommendations(data.recommendations || []);
      toast({
        title: "Recommendations Ready!",
        description: "We've found the perfect vehicles for you.",
      });
    } catch (error) {
      console.error("Recommendation error:", error);
      toast({
        title: "Analysis Failed",
        description: "Unable to generate recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectVehicle = (recommendation: Recommendation) => {
    // Find matching vehicle from data
    const matchingVehicle = vehicles.find(
      (v) =>
        v.model.toLowerCase() === recommendation.model.toLowerCase() &&
        v.trim.toLowerCase().includes(recommendation.trim.toLowerCase().split("/")[0])
    );

    if (matchingVehicle) {
      navigate(`/calculator?vehicle=${matchingVehicle.id}`);
    } else {
      toast({
        title: "Vehicle Not Found",
        description: "We'll help you find a similar option.",
      });
      navigate("/vehicles");
    }
  };

  const resetFinder = () => {
    setStep(0);
    setRecommendations([]);
    setPreferences({
      budget: "",
      primaryUse: "",
      passengers: "",
      features: [],
      fuelType: "",
      lifestyle: "",
    });
  };

  if (recommendations.length > 0) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Your Perfect Matches</h2>
          <p className="text-muted-foreground">
            Based on your preferences, we recommend these vehicles
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {recommendations.map((rec, index) => {
            const matchingVehicle = vehicles.find(
              (v) =>
                v.model.toLowerCase() === rec.model.toLowerCase() &&
                v.trim.toLowerCase().includes(rec.trim.toLowerCase().split("/")[0])
            );

            return (
              <Card key={index} className="p-6 hover:border-primary transition-all">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                    {rec.matchScore}% Match
                  </div>
                  {index === 0 && (
                    <div className="bg-green-500/10 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Best Match
                    </div>
                  )}
                </div>

                {matchingVehicle && (
                  <img
                    src={matchingVehicle.image}
                    alt={matchingVehicle.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

                <h3 className="text-xl font-bold mb-2">
                  {rec.model} {rec.trim}
                </h3>

                {matchingVehicle && (
                  <div className="text-2xl font-bold text-primary mb-3">
                    ${matchingVehicle.price.toLocaleString()}
                  </div>
                )}

                <p className="text-sm text-muted-foreground mb-4">{rec.reason}</p>

                {matchingVehicle && (
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">MPG:</span>{" "}
                      <span className="font-semibold">{matchingVehicle.mpg}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Type:</span>{" "}
                      <span className="font-semibold">{matchingVehicle.type}</span>
                    </div>
                  </div>
                )}

                <Button
                  className="w-full"
                  variant={index === 0 ? "default" : "outline"}
                  onClick={() => handleSelectVehicle(rec)}
                >
                  Calculate Payments
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center pt-4">
          <Button variant="ghost" onClick={resetFinder}>
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <Card className="p-12">
        <div className="text-center space-y-4">
          <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto" />
          <h3 className="text-2xl font-bold">Analyzing Your Preferences</h3>
          <p className="text-muted-foreground">
            Our AI is finding the perfect Toyota vehicles for you...
          </p>
        </div>
      </Card>
    );
  }

  const currentQuestion = questions[step];
  const currentValue = preferences[currentQuestion.id as keyof typeof preferences];

  return (
    <Card className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Car className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Find Your Perfect Toyota</h2>
        </div>
        <div className="flex gap-2 mb-4">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full ${
                index <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Question {step + 1} of {questions.length}
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">{currentQuestion.question}</h3>

        {currentQuestion.type === "radio" && (
          <RadioGroup
            value={currentValue as string}
            onValueChange={(value) => handleRadioChange(currentQuestion.id, value)}
          >
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer"
                  onClick={() => handleRadioChange(currentQuestion.id, option.value)}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        )}

        {currentQuestion.type === "checkbox" && (
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-3 p-4 rounded-lg border hover:border-primary transition-colors"
              >
                <Checkbox
                  id={option.value}
                  checked={(currentValue as string[]).includes(option.value)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(option.value, checked as boolean)
                  }
                />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-8">
        {step > 0 && (
          <Button variant="outline" onClick={handleBack} className="flex-1">
            Back
          </Button>
        )}
        <Button onClick={handleNext} className="flex-1">
          {step < questions.length - 1 ? "Next" : "Get Recommendations"}
        </Button>
      </div>
    </Card>
  );
};
