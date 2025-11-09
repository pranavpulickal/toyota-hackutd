import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PersonalInfoStepProps {
  data: {
    name: string;
    email: string;
    phone: string;
    zipCode: string;
  };
  onChange: (field: string, value: string) => void;
  errors: Record<string, string>;
}

export const PersonalInfoStep = ({ data, onChange, errors }: PersonalInfoStepProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="John Doe"
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
      </div>

      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="john@example.com"
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
      </div>

      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          type="tel"
          value={data.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder="(555) 123-4567"
          className={errors.phone ? 'border-destructive' : ''}
        />
        {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
      </div>

      <div>
        <Label htmlFor="zipCode">Zip Code *</Label>
        <Input
          id="zipCode"
          value={data.zipCode}
          onChange={(e) => onChange('zipCode', e.target.value)}
          placeholder="12345"
          maxLength={5}
          className={errors.zipCode ? 'border-destructive' : ''}
        />
        {errors.zipCode && <p className="text-sm text-destructive mt-1">{errors.zipCode}</p>}
      </div>
    </div>
  );
};
