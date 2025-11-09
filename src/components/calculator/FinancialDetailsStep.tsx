import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { DollarSign } from "lucide-react";

interface FinancialDetailsStepProps {
  data: {
    downPayment: number;
    loanTerm: number;
  };
  vehiclePrice: number;
  onChange: (field: string, value: number) => void;
  errors: Record<string, string>;
}

export const FinancialDetailsStep = ({ data, vehiclePrice, onChange, errors }: FinancialDetailsStepProps) => {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-muted rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Vehicle Price</span>
          <span className="text-2xl font-bold text-primary">${vehiclePrice.toLocaleString()}</span>
        </div>
      </div>

      <div>
        <Label htmlFor="down" className="flex items-center gap-2 mb-2">
          <DollarSign className="w-4 h-4" />
          Down Payment *
        </Label>
        <Input
          id="down"
          type="number"
          value={data.downPayment}
          onChange={(e) => onChange('downPayment', parseFloat(e.target.value) || 0)}
          className={errors.downPayment ? 'border-destructive' : ''}
        />
        <Slider
          value={[data.downPayment]}
          onValueChange={(value) => onChange('downPayment', value[0])}
          min={0}
          max={vehiclePrice * 0.5}
          step={500}
          className="mt-4"
        />
        <p className="text-sm text-muted-foreground mt-2">
          {((data.downPayment / vehiclePrice) * 100).toFixed(0)}% of vehicle price
        </p>
        {errors.downPayment && <p className="text-sm text-destructive mt-1">{errors.downPayment}</p>}
      </div>

      <div>
        <Label htmlFor="term">Loan Term *</Label>
        <Select value={data.loanTerm.toString()} onValueChange={(value) => onChange('loanTerm', parseInt(value))}>
          <SelectTrigger className={errors.loanTerm ? 'border-destructive' : ''}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24">24 months (2 years)</SelectItem>
            <SelectItem value="36">36 months (3 years)</SelectItem>
            <SelectItem value="48">48 months (4 years)</SelectItem>
            <SelectItem value="60">60 months (5 years)</SelectItem>
            <SelectItem value="72">72 months (6 years)</SelectItem>
            <SelectItem value="84">84 months (7 years)</SelectItem>
          </SelectContent>
        </Select>
        {errors.loanTerm && <p className="text-sm text-destructive mt-1">{errors.loanTerm}</p>}
      </div>
    </div>
  );
};
