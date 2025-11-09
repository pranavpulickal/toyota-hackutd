import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";

interface BankStatementStepProps {
  monthlyIncome: number;
  monthlyExpenses: number;
  onIncomeChange: (income: number) => void;
  onExpensesChange: (expenses: number) => void;
  errors: Record<string, string>;
}

export const BankStatementStep = ({ 
  monthlyIncome, 
  monthlyExpenses, 
  onIncomeChange, 
  onExpensesChange, 
  errors 
}: BankStatementStepProps) => {
  const discretionaryIncome = monthlyIncome - monthlyExpenses;
  const dtiPercentage = monthlyIncome > 0 ? ((monthlyExpenses / monthlyIncome) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Monthly Financial Overview</h3>
        <p className="text-sm text-muted-foreground">
          Enter your monthly income and expenses for accurate financial analysis
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="monthlyIncome" className="mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            Monthly Income *
          </Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="monthlyIncome"
              type="number"
              value={monthlyIncome || ""}
              onChange={(e) => onIncomeChange(Number(e.target.value))}
              placeholder="5000"
              className="pl-9"
              min="0"
              step="100"
            />
          </div>
          {errors.monthlyIncome && <p className="text-sm text-destructive mt-1">{errors.monthlyIncome}</p>}
        </div>

        <div>
          <Label htmlFor="monthlyExpenses" className="mb-2 flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-red-600" />
            Monthly Expenses *
          </Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="monthlyExpenses"
              type="number"
              value={monthlyExpenses || ""}
              onChange={(e) => onExpensesChange(Number(e.target.value))}
              placeholder="3000"
              className="pl-9"
              min="0"
              step="100"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Include rent, utilities, food, insurance, and other recurring expenses
          </p>
          {errors.monthlyExpenses && <p className="text-sm text-destructive mt-1">{errors.monthlyExpenses}</p>}
        </div>
      </div>

      {monthlyIncome > 0 && monthlyExpenses > 0 && (
        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Discretionary Income:</span>
            <span className={`text-sm font-semibold ${discretionaryIncome > 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${discretionaryIncome.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Debt-to-Income Ratio:</span>
            <span className={`text-sm font-semibold ${parseFloat(dtiPercentage) < 43 ? 'text-green-600' : 'text-yellow-600'}`}>
              {dtiPercentage}%
            </span>
          </div>
          {parseFloat(dtiPercentage) >= 43 && (
            <p className="text-xs text-yellow-600 mt-2">
              ⚠️ DTI above 43% may affect loan approval
            </p>
          )}
        </div>
      )}
    </div>
  );
};
