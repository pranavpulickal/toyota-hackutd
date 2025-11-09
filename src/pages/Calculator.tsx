import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator as CalcIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { BankStatementStep } from "@/components/calculator/BankStatementStep";
import { vehicles } from "@/data/vehicles";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";
import { PersonalInfoStep } from "@/components/calculator/PersonalInfoStep";
import { VehicleInfoStep } from "@/components/calculator/VehicleInfoStep";
import { FinancialDetailsStep } from "@/components/calculator/FinancialDetailsStep";

import { CreditScoreStep } from "@/components/calculator/CreditScoreStep";
import { AISummaryStep } from "@/components/calculator/AISummaryStep";
import { ResultsSummary } from "@/components/calculator/ResultsSummary";

const Calculator = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form data
  const [selectedVehicleId, setSelectedVehicleId] = useState(() => {
    const vehicleParam = searchParams.get("vehicle");
    return vehicleParam && vehicles.find(v => v.id === vehicleParam) ? vehicleParam : vehicles[0].id;
  });
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    zipCode: "",
  });
  const [vehicleInfo, setVehicleInfo] = useState({
    make: "",
    model: "",
    year: "",
    cleanTitle: "",
    mileage: 0,
    hasTradeIn: true,
  });
  const [tradeInValue, setTradeInValue] = useState(0);
  const [financialDetails, setFinancialDetails] = useState({
    downPayment: 5000,
    loanTerm: 60,
  });
  
  const [creditScore, setCreditScore] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSummary, setAiSummary] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);

  // Show toast when coming from vehicle finder
  useEffect(() => {
    const vehicleParam = searchParams.get("vehicle");
    if (vehicleParam) {
      const vehicle = vehicles.find(v => v.id === vehicleParam);
      if (vehicle) {
        toast({
          title: "Vehicle Selected!",
          description: `Calculate payments for your ${vehicle.name}`,
        });
      }
    }
  }, [searchParams, toast]);

  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId) || vehicles[0];
  const vehiclePrice = selectedVehicle.price;

  const steps = [
    "Personal Info",
    "Vehicle Details",
    "Financial Details",
    "Credit Score",
    "Monthly Finances",
    "AI Analysis",
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0:
        if (!personalInfo.name) newErrors.name = "Name is required";
        if (!personalInfo.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(personalInfo.email)) newErrors.email = "Invalid email format";
        if (!personalInfo.phone) newErrors.phone = "Phone is required";
        if (!personalInfo.zipCode) newErrors.zipCode = "Zip code is required";
        else if (!/^\d{5}$/.test(personalInfo.zipCode)) newErrors.zipCode = "Invalid zip code";
        break;
      case 1:
        if (vehicleInfo.hasTradeIn) {
          if (!vehicleInfo.make) newErrors.make = "Make is required";
          if (!vehicleInfo.model) newErrors.model = "Model is required";
          if (!vehicleInfo.year) newErrors.year = "Year is required";
          if (!vehicleInfo.cleanTitle) newErrors.cleanTitle = "Please select an option";
          if (!vehicleInfo.mileage || vehicleInfo.mileage <= 0) newErrors.mileage = "Mileage is required";
        }
        break;
      case 2:
        if (financialDetails.downPayment < 0) newErrors.downPayment = "Down payment must be positive";
        if (financialDetails.loanTerm < 12) newErrors.loanTerm = "Loan term must be at least 12 months";
        break;
      case 3:
        if (!creditScore || creditScore < 300 || creditScore > 850) {
          newErrors.creditScore = "Credit score between 300-850 is required";
        }
        break;
      case 4:
        if (!monthlyIncome || monthlyIncome <= 0) newErrors.monthlyIncome = "Monthly income is required";
        if (!monthlyExpenses || monthlyExpenses < 0) newErrors.monthlyExpenses = "Monthly expenses cannot be negative";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleNext = async () => {
    if (validateStep(currentStep)) {
      if (currentStep === 5) {
        await handleAnalysis();
      } else {
        setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const financialData = `
        Personal Information: ${personalInfo.name}, ${personalInfo.email}, ${personalInfo.phone}, ${personalInfo.zipCode}
        ${vehicleInfo.hasTradeIn ? `Current Vehicle: ${vehicleInfo.make} ${vehicleInfo.model} ${vehicleInfo.year}, Clean Title: ${vehicleInfo.cleanTitle}, Mileage: ${vehicleInfo.mileage}` : 'No trade-in vehicle'}
        Credit Score: ${creditScore || 'Not provided'}
      `;
      
      const { data, error } = await supabase.functions.invoke('analyze-financial-profile', {
        body: {
          financialData,
          creditScore: creditScore || 0,
          vehiclePrice,
          downPayment: financialDetails.downPayment,
          interestRate: creditScore ? (850 - creditScore) / 100 : 5,
          loanTerm: financialDetails.loanTerm,
          vehicleName: selectedVehicle.name,
          hasTradeIn: vehicleInfo.hasTradeIn,
          vehicleInfo: vehicleInfo.hasTradeIn ? {
            make: vehicleInfo.make,
            model: vehicleInfo.model,
            year: vehicleInfo.year,
            cleanTitle: vehicleInfo.cleanTitle,
            mileage: vehicleInfo.mileage,
          } : null,
          monthlyIncome,
          monthlyExpenses,
        }
      });

      if (error) throw error;

      // Set the AI-estimated trade-in value
      setTradeInValue(data.tradeInValue || 0);

      setAiSummary({
        analysis: data.analysis,
        tradeInValue: data.tradeInValue || 0,
        recommendedAPR: data.recommendedAPR,
        loanOptions: data.alternativeLoanOptions || [],
        leaseOptions: data.alternativeLeaseOptions || [],
      });
      
      setIsAnalyzing(false);
      setShowResults(true);
      
      toast({
        title: "Analysis Complete",
        description: "Your financial profile has been analyzed by AI",
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Unable to complete AI analysis. Please try again.",
        variant: "destructive",
      });
      setIsAnalyzing(false);
    }
  };

  const getLoanOptions = () => {
    // Calculate realistic APR based on credit score (2025 market rates)
    let realisticAPR = 7.0; // default
    if (creditScore) {
      if (creditScore >= 720) {
        realisticAPR = 7.0; // Excellent credit
      } else if (creditScore >= 680) {
        realisticAPR = 9.5; // Good credit
      } else if (creditScore >= 620) {
        realisticAPR = 13.5; // Fair credit
      } else {
        realisticAPR = 18.5; // Poor credit
      }
    }

    const effectiveDownPayment = financialDetails.downPayment + tradeInValue;
    const principal = vehiclePrice - effectiveDownPayment;
    
    const calculatePayment = (apr: number, term: number, loanAmount: number) => {
      const monthlyRate = apr / 100 / 12;
      return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / 
             (Math.pow(1 + monthlyRate, term) - 1);
    };

    const userOption = {
      name: "Your Selected Option",
      apr: realisticAPR,
      monthlyPayment: Math.round(calculatePayment(realisticAPR, financialDetails.loanTerm, principal)),
      totalCost: Math.round(calculatePayment(realisticAPR, financialDetails.loanTerm, principal) * financialDetails.loanTerm) + financialDetails.downPayment,
      loanTerm: financialDetails.loanTerm,
      downPayment: financialDetails.downPayment,
      recommended: false,
    };

    // If we have AI-generated alternatives, use those
    if (aiSummary?.loanOptions && aiSummary.loanOptions.length > 0) {
      return [userOption, ...aiSummary.loanOptions];
    }

    // Fallback: Generate basic alternatives (shouldn't normally reach here)
    return [userOption];
  };

  const getLeaseOptions = () => {
    // If we have AI-generated lease options, use those
    if (aiSummary?.leaseOptions && aiSummary.leaseOptions.length > 0) {
      return aiSummary.leaseOptions;
    }

    // Fallback: return empty array (AI should generate these)
    return [];
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return personalInfo.name && personalInfo.email && personalInfo.phone && personalInfo.zipCode;
      case 1:
        if (!vehicleInfo.hasTradeIn) return true;
        return vehicleInfo.make && vehicleInfo.model && vehicleInfo.year && vehicleInfo.cleanTitle && vehicleInfo.mileage > 0;
      case 2:
        return financialDetails.downPayment >= 0 && financialDetails.loanTerm >= 12;
      case 3:
        return creditScore !== null && creditScore >= 300 && creditScore <= 850;
      case 4:
        return monthlyIncome > 0 && monthlyExpenses >= 0;
      case 5:
        return true;
      default:
        return false;
    }
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Button variant="ghost" onClick={() => setShowResults(false)} className="mb-6">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Calculator
              </Button>
              <ResultsSummary
                vehiclePrice={vehiclePrice}
                downPayment={financialDetails.downPayment}
                tradeInValue={tradeInValue}
                loanTerm={financialDetails.loanTerm}
                creditScore={creditScore}
                loanOptions={getLoanOptions()}
                leaseOptions={getLeaseOptions()}
                aiRecommendations={aiSummary?.analysis}
                onCompare={() => {
                  toast({
                    title: "Compare Options",
                    description: "This feature will show additional financing options",
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalcIcon className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold mb-3">AI-Powered Loan Calculator</h1>
              <p className="text-lg text-muted-foreground">
                Complete your profile for personalized financing options
              </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                {steps.map((step, index) => (
                  <div key={index} className="flex-1 relative">
                    <div className={`h-1 ${index <= currentStep ? 'bg-primary' : 'bg-muted'}`} />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`text-xs sm:text-sm font-medium ${
                      index === currentStep ? 'text-primary' : index < currentStep ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <Card className="p-6 sm:p-8">
              {/* Vehicle Selection - Always Visible */}
              <div className="mb-8 pb-6 border-b">
                <h3 className="text-lg font-semibold mb-4">Select Your Vehicle</h3>
                <Select value={selectedVehicleId} onValueChange={setSelectedVehicleId}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.name} - ${vehicle.price.toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="mt-3 p-3 bg-muted rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{selectedVehicle.name}</span>
                    <span className="text-xl font-bold text-primary">${vehiclePrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <div className="min-h-[400px]">
                {currentStep === 0 && (
                  <PersonalInfoStep
                    data={personalInfo}
                    onChange={(field, value) => setPersonalInfo(prev => ({ ...prev, [field]: value }))}
                    errors={errors}
                  />
                )}
                {currentStep === 1 && (
                  <VehicleInfoStep
                    data={vehicleInfo}
                    onChange={(field, value) => setVehicleInfo(prev => ({ ...prev, [field]: value }))}
                    errors={errors}
                  />
                )}
                {currentStep === 2 && (
                  <FinancialDetailsStep
                    data={financialDetails}
                    vehiclePrice={vehiclePrice}
                    onChange={(field, value) => setFinancialDetails(prev => ({ ...prev, [field]: value }))}
                    errors={errors}
                  />
                )}
                {currentStep === 3 && (
                  <CreditScoreStep
                    creditScore={creditScore}
                    onChange={setCreditScore}
                    errors={errors}
                  />
                )}
                {currentStep === 4 && (
                  <BankStatementStep
                    monthlyIncome={monthlyIncome}
                    monthlyExpenses={monthlyExpenses}
                    onIncomeChange={setMonthlyIncome}
                    onExpensesChange={setMonthlyExpenses}
                    errors={errors}
                  />
                )}
                {currentStep === 5 && (
                  <AISummaryStep
                    isAnalyzing={isAnalyzing}
                    summaryData={aiSummary}
                  />
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="flex-1"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed() || isAnalyzing}
                  className="flex-1"
                >
                  {currentStep === 5 ? 'View Results' : 'Continue'}
                  {currentStep !== 5 && <ChevronRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
