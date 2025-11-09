import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Percent, DollarSign, FileText } from "lucide-react";

const formatAIText = (text: string) => {
  // Remove duplicate titles if present in the AI response
  let formatted = text.replace(/\*\*\s*AI Financial Recommendation.*?\*\*/gi, '');
  formatted = formatted.replace(/Technical analysis.*?patterns/gi, '');
  
  // Split into lines and process each
  const lines = formatted.split('\n').filter(line => line.trim());
  
  return (
    <div className="space-y-3">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        
        // Skip empty lines
        if (!trimmed) return null;
        
        // Handle bold headings (text between **)
        if (trimmed.match(/^\*\*[^*]+\*\*:?$/)) {
          const text = trimmed.replace(/\*\*/g, '');
          return (
            <h5 key={idx} className="font-semibold text-primary mt-3 first:mt-0">
              {text}
            </h5>
          );
        }
        
        // Handle bullet points
        if (trimmed.startsWith('*') && !trimmed.startsWith('**')) {
          const text = trimmed.substring(1).trim();
          // Remove bold markers within bullets
          const cleanText = text.replace(/\*\*/g, '');
          return (
            <div key={idx} className="flex gap-2 ml-2">
              <span className="text-primary mt-1">•</span>
              <span className="flex-1">{cleanText}</span>
            </div>
          );
        }
        
        // Handle regular text with inline bold
        const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={idx} className="leading-relaxed">
            {parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
              }
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
};

interface LoanOption {
  name: string;
  apr: number;
  monthlyPayment: number;
  totalCost: number;
  loanTerm?: number;
  downPayment?: number;
  recommended?: boolean;
}

interface ResultsSummaryProps {
  vehiclePrice: number;
  downPayment: number;
  tradeInValue: number;
  loanTerm: number;
  creditScore: number | null;
  loanOptions: LoanOption[];
  leaseOptions: LoanOption[];
  aiRecommendations?: string;
  bankStatementInsights?: string;
  onCompare: () => void;
}

export const ResultsSummary = ({ 
  vehiclePrice, 
  downPayment,
  tradeInValue,
  loanTerm, 
  creditScore,
  loanOptions,
  leaseOptions,
  aiRecommendations,
  bankStatementInsights,
  onCompare 
}: ResultsSummaryProps) => {
  const effectiveDownPayment = downPayment + tradeInValue;
  const principal = vehiclePrice - effectiveDownPayment;
  const estimatedTax = vehiclePrice * 0.0825;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-3xl font-bold mb-2">Your Loan Summary</h3>
        <p className="text-muted-foreground">Here's what we found based on your profile</p>
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
        <h4 className="font-semibold text-lg mb-4">Loan Details</h4>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex justify-between items-center p-3 bg-background rounded-lg">
            <span className="text-sm text-muted-foreground">Vehicle Price</span>
            <span className="font-bold">${vehiclePrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-background rounded-lg">
            <span className="text-sm text-muted-foreground">Down Payment</span>
            <span className="font-bold">${downPayment.toLocaleString()}</span>
          </div>
          {tradeInValue > 0 && (
            <div className="flex justify-between items-center p-3 bg-background rounded-lg">
              <span className="text-sm text-muted-foreground">Trade-In Value</span>
              <span className="font-bold text-green-600">+${tradeInValue.toLocaleString()}</span>
            </div>
          )}
          {tradeInValue > 0 && (
            <div className="flex justify-between items-center p-3 bg-background rounded-lg">
              <span className="text-sm text-muted-foreground">Total Down Payment</span>
              <span className="font-bold">${effectiveDownPayment.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between items-center p-3 bg-background rounded-lg">
            <span className="text-sm text-muted-foreground">Loan Amount</span>
            <span className="font-bold text-primary">${principal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-background rounded-lg">
            <span className="text-sm text-muted-foreground">Loan Term</span>
            <span className="font-bold">{loanTerm} months</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-background rounded-lg">
            <span className="text-sm text-muted-foreground">Est. Sales Tax</span>
            <span className="font-bold">${estimatedTax.toLocaleString()}</span>
          </div>
          {creditScore && (
            <div className="flex justify-between items-center p-3 bg-background rounded-lg">
              <span className="text-sm text-muted-foreground">Credit Score</span>
              <span className="font-bold">{creditScore}</span>
            </div>
          )}
        </div>
      </Card>

      {(aiRecommendations || bankStatementInsights) && (
        <Card className="p-6 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
          <div className="flex items-start gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-xl font-bold">AI Financial Recommendation</h4>
              <p className="text-sm text-muted-foreground">Technical analysis based on profile and cash flow patterns</p>
            </div>
          </div>
          <div className="space-y-3 text-sm leading-relaxed">
            {bankStatementInsights && (
              <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                <span className="font-semibold text-primary mb-2 block">Cash Flow Analysis:</span>
                <p className="text-foreground/90">{bankStatementInsights}</p>
              </div>
            )}
            {aiRecommendations && (
              <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                <span className="font-semibold text-primary mb-2 block">Financing Assessment:</span>
                <div className="text-foreground/90 text-sm">
                  {formatAIText(aiRecommendations)}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      <div className="space-y-8">
        <div>
          <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Percent className="w-5 h-5" />
            Loan Financing Options
          </h4>
          <div className="grid gap-4">
            {loanOptions.map((option, index) => (
              <Card key={index} className={`p-5 ${option.recommended ? 'border-primary border-2' : ''}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-bold text-lg">{option.name}</h5>
                      {option.recommended && (
                        <Badge className="bg-primary">AI Recommended</Badge>
                      )}
                    </div>
                    {option.loanTerm && option.downPayment != null && (
                      <p className="text-sm text-muted-foreground">
                        {option.loanTerm} months • ${option.downPayment.toLocaleString()} down
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary">${option.monthlyPayment}</p>
                    <p className="text-xs text-muted-foreground">per month</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Percent className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">APR</p>
                      <p className="font-semibold">{option.apr.toFixed(2)}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Total Cost</p>
                      <p className="font-semibold">${option.totalCost.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Lease Options
          </h4>
          {leaseOptions.length > 0 ? (
            <div className="grid gap-4">
              {leaseOptions.map((option, index) => (
                <Card key={index} className={`p-5 ${option.recommended ? 'border-primary border-2' : ''}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-bold text-lg">{option.name}</h5>
                        {option.recommended && (
                          <Badge className="bg-primary">AI Recommended</Badge>
                        )}
                      </div>
                      {option.loanTerm && option.downPayment != null && (
                        <p className="text-sm text-muted-foreground">
                          {option.loanTerm} months • ${option.downPayment.toLocaleString()} initial payment
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-primary">${option.monthlyPayment}</p>
                      <p className="text-xs text-muted-foreground">per month</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Percent className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Money Factor</p>
                        <p className="font-semibold">{option.apr.toFixed(2)}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Total Lease Cost</p>
                        <p className="font-semibold">${option.totalCost.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">Complete the analysis to see lease options</p>
            </Card>
          )}
        </div>
      </div>

      <Button variant="hero" size="lg" className="w-full">
        Apply Now
      </Button>

      <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
        <p>
          * APR rates are estimates based on current market conditions and your credit profile. 
          Final rates will be determined by the lender. Monthly payments do not include insurance or maintenance costs.
        </p>
      </div>
    </div>
  );
};
