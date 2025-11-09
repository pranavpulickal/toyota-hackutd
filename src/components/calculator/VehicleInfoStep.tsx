import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface VehicleInfoStepProps {
  data: {
    make: string;
    model: string;
    year: string;
    cleanTitle: string;
    mileage: number;
    hasTradeIn: boolean;
  };
  onChange: (field: string, value: string | number | boolean) => void;
  errors: Record<string, string>;
}

const carMakes = [
  { value: "toyota", label: "Toyota" },
  { value: "honda", label: "Honda" },
  { value: "ford", label: "Ford" },
  { value: "chevrolet", label: "Chevrolet" },
  { value: "nissan", label: "Nissan" },
  { value: "hyundai", label: "Hyundai" },
  { value: "kia", label: "Kia" },
  { value: "mazda", label: "Mazda" },
  { value: "subaru", label: "Subaru" },
  { value: "volkswagen", label: "Volkswagen" },
  { value: "bmw", label: "BMW" },
  { value: "mercedes", label: "Mercedes-Benz" },
  { value: "audi", label: "Audi" },
  { value: "lexus", label: "Lexus" },
  { value: "acura", label: "Acura" },
  { value: "infiniti", label: "Infiniti" },
  { value: "jeep", label: "Jeep" },
  { value: "ram", label: "Ram" },
  { value: "gmc", label: "GMC" },
  { value: "dodge", label: "Dodge" },
  { value: "chrysler", label: "Chrysler" },
  { value: "buick", label: "Buick" },
  { value: "cadillac", label: "Cadillac" },
  { value: "tesla", label: "Tesla" },
  { value: "volvo", label: "Volvo" },
  { value: "porsche", label: "Porsche" },
  { value: "land-rover", label: "Land Rover" },
  { value: "jaguar", label: "Jaguar" },
  { value: "mitsubishi", label: "Mitsubishi" },
  { value: "other", label: "Other" },
];

const carModels: Record<string, string[]> = {
  toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma", "Tundra", "4Runner", "Prius", "Sienna", "Avalon"],
  honda: ["Civic", "Accord", "CR-V", "Pilot", "Odyssey", "HR-V", "Ridgeline", "Passport", "Fit", "Insight"],
  ford: ["F-150", "Escape", "Explorer", "Mustang", "Edge", "Ranger", "Expedition", "Bronco", "Maverick", "Transit"],
  chevrolet: ["Silverado", "Equinox", "Tahoe", "Traverse", "Malibu", "Colorado", "Suburban", "Blazer", "Camaro", "Corvette"],
  nissan: ["Altima", "Rogue", "Sentra", "Pathfinder", "Frontier", "Murano", "Kicks", "Armada", "Maxima", "Versa"],
  hyundai: ["Elantra", "Tucson", "Santa Fe", "Sonata", "Kona", "Palisade", "Accent", "Venue", "Ioniq", "Genesis"],
  kia: ["Forte", "Sportage", "Sorento", "Optima", "Soul", "Telluride", "Seltos", "Stinger", "Carnival", "Rio"],
  mazda: ["Mazda3", "CX-5", "CX-9", "Mazda6", "CX-30", "CX-50", "MX-5 Miata", "CX-90", "Mazda2", "CX-3"],
  subaru: ["Outback", "Forester", "Crosstrek", "Impreza", "Ascent", "Legacy", "WRX", "BRZ", "Solterra", "Baja"],
  volkswagen: ["Jetta", "Tiguan", "Atlas", "Passat", "Golf", "ID.4", "Taos", "Arteon", "GTI", "Beetle"],
  bmw: ["3 Series", "5 Series", "X3", "X5", "X1", "X7", "7 Series", "M3", "M5", "i4"],
  mercedes: ["C-Class", "E-Class", "GLE", "GLC", "S-Class", "A-Class", "GLA", "GLB", "G-Class", "AMG GT"],
  audi: ["A4", "Q5", "A3", "Q7", "A6", "Q3", "e-tron", "A5", "Q8", "A7"],
  lexus: ["RX", "ES", "NX", "IS", "GX", "UX", "LS", "LX", "RC", "LC"],
  acura: ["MDX", "RDX", "TLX", "Integra", "NSX", "ILX", "ZDX", "TSX", "RSX", "RL"],
  infiniti: ["Q50", "QX60", "QX80", "Q60", "QX50", "QX55", "Q70", "QX30", "G37", "FX"],
  jeep: ["Wrangler", "Grand Cherokee", "Cherokee", "Compass", "Gladiator", "Renegade", "Wagoneer", "Grand Wagoneer"],
  ram: ["1500", "2500", "3500", "ProMaster", "ProMaster City"],
  gmc: ["Sierra", "Terrain", "Acadia", "Yukon", "Canyon", "Savana", "Hummer EV"],
  dodge: ["Charger", "Challenger", "Durango", "Journey", "Grand Caravan", "Hornet", "Ram"],
  chrysler: ["300", "Pacifica", "Voyager", "Aspen", "Town & Country"],
  buick: ["Enclave", "Encore", "Envision", "Regal", "LaCrosse", "Cascada"],
  cadillac: ["Escalade", "XT5", "CT5", "XT4", "CT4", "Lyriq", "XT6", "CTS"],
  tesla: ["Model 3", "Model Y", "Model S", "Model X", "Cybertruck"],
  volvo: ["XC90", "XC60", "S60", "S90", "XC40", "V60", "V90", "C40"],
  porsche: ["911", "Cayenne", "Macan", "Panamera", "Taycan", "718 Boxster", "718 Cayman"],
  "land-rover": ["Range Rover", "Range Rover Sport", "Discovery", "Defender", "Evoque", "Velar"],
  jaguar: ["F-PACE", "E-PACE", "XF", "XE", "F-TYPE", "I-PACE"],
  mitsubishi: ["Outlander", "Eclipse Cross", "Mirage", "Outlander Sport", "Lancer", "Pajero"],
  other: [],
};

export const VehicleInfoStep = ({ data, onChange, errors }: VehicleInfoStepProps) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
  
  const availableModels = data.make ? carModels[data.make] || [] : [];

  return (
    <div className="space-y-4">
      <div>
        <Label>Do you have a vehicle to trade in?</Label>
        <RadioGroup 
          value={data.hasTradeIn ? "yes" : "no"} 
          onValueChange={(value) => onChange('hasTradeIn', value === 'yes')}
          className="flex gap-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="trade-yes" />
            <Label htmlFor="trade-yes" className="font-normal cursor-pointer">Yes, I have a trade-in</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="trade-no" />
            <Label htmlFor="trade-no" className="font-normal cursor-pointer">No trade-in</Label>
          </div>
        </RadioGroup>
      </div>

      {data.hasTradeIn && (
        <>
          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-4">Trade-In Vehicle Details</h4>
          </div>
          
          <div>
            <Label htmlFor="make">Vehicle Make *</Label>
            <Select 
              value={data.make} 
              onValueChange={(value) => {
                onChange('make', value);
                onChange('model', ''); // Reset model when make changes
              }}
            >
              <SelectTrigger className={errors.make ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select make" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {carMakes.map((make) => (
                  <SelectItem key={make.value} value={make.value}>
                    {make.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.make && <p className="text-sm text-destructive mt-1">{errors.make}</p>}
          </div>

          <div>
            <Label htmlFor="model">Vehicle Model *</Label>
            {data.make && data.make !== 'other' && availableModels.length > 0 ? (
              <Select value={data.model} onValueChange={(value) => onChange('model', value)}>
                <SelectTrigger className={errors.model ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {availableModels.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id="model"
                value={data.model}
                onChange={(e) => onChange('model', e.target.value)}
                placeholder="Enter model name"
                className={errors.model ? 'border-destructive' : ''}
              />
            )}
            {errors.model && <p className="text-sm text-destructive mt-1">{errors.model}</p>}
          </div>

      <div>
        <Label htmlFor="year">Year *</Label>
        <Select value={data.year} onValueChange={(value) => onChange('year', value)}>
          <SelectTrigger className={errors.year ? 'border-destructive' : ''}>
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.year && <p className="text-sm text-destructive mt-1">{errors.year}</p>}
      </div>

      <div>
        <Label htmlFor="mileage">Mileage *</Label>
        <Input
          id="mileage"
          type="number"
          value={data.mileage || ""}
          onChange={(e) => onChange("mileage", parseFloat(e.target.value) || 0)}
          placeholder="50000"
          min="0"
          className={errors.mileage ? 'border-destructive' : ''}
        />
        <p className="text-sm text-muted-foreground mt-1">
          AI will estimate your trade-in value based on this information
        </p>
        {errors.mileage && <p className="text-sm text-destructive mt-1">{errors.mileage}</p>}
      </div>

      <div>
        <Label>Clean Title *</Label>
        <RadioGroup value={data.cleanTitle} onValueChange={(value) => onChange('cleanTitle', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="clean-yes" />
            <Label htmlFor="clean-yes" className="font-normal cursor-pointer">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="clean-no" />
            <Label htmlFor="clean-no" className="font-normal cursor-pointer">No</Label>
          </div>
        </RadioGroup>
        {errors.cleanTitle && <p className="text-sm text-destructive mt-1">{errors.cleanTitle}</p>}
      </div>
        </>
      )}
    </div>
  );
};
