import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, AlertCircle } from "lucide-react";

interface CreditScoreStepProps {
  creditScore: number | null;
  onChange: (value: number) => void;
  errors: Record<string, string>;
}

export const CreditScoreStep = ({ creditScore, onChange, errors }: CreditScoreStepProps) => {
  const getCreditRating = (score: number | null) => {
    if (!score) return { label: "Unknown", color: "text-muted-foreground" };
    if (score >= 800) return { label: "Exceptional", color: "text-green-600" };
    if (score >= 740) return { label: "Very Good", color: "text-green-500" };
    if (score >= 670) return { label: "Good", color: "text-blue-500" };
    if (score >= 580) return { label: "Fair", color: "text-yellow-500" };
    return { label: "Poor", color: "text-red-500" };
  };

  const rating = getCreditRating(creditScore);

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="credit-score" className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4" />
          Credit Score *
        </Label>
        <Input
          id="credit-score"
          type="number"
          value={creditScore || ''}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          placeholder="Enter your credit score (300-850)"
          min={300}
          max={850}
          required
          className={errors.creditScore ? 'border-destructive' : ''}
        />
        {errors.creditScore && <p className="text-sm text-destructive mt-1">{errors.creditScore}</p>}
      </div>

      {creditScore && creditScore >= 300 && creditScore <= 850 && (
        <>
          <Slider
            value={[creditScore]}
            onValueChange={(value) => onChange(value[0])}
            min={300}
            max={850}
            step={1}
            className="mt-4"
          />
          
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Credit Rating</span>
              <span className={`text-xl font-bold ${rating.color}`}>{rating.label}</span>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Score: {creditScore}
            </div>
          </div>
        </>
      )}

      <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-900">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Don't know your credit score?</p>
            <p className="text-blue-700 dark:text-blue-300 mb-2">
              You can check your credit score for free through various services.
            </p>
            <Button variant="outline" size="sm" className="text-xs" asChild>
              <a href="https://www.annualcreditreport.com" target="_blank" rel="noopener noreferrer">
                Check Credit Score
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
