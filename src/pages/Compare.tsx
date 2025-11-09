import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { vehicles, Vehicle } from "@/data/vehicles";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Compare = () => {
  const [searchParams] = useSearchParams();
  const [selectedVehicles, setSelectedVehicles] = useState<Vehicle[]>([]);
  
  useEffect(() => {
    const vehicleIds = searchParams.get('vehicles')?.split(',') || [];
    const selected = vehicles.filter(v => vehicleIds.includes(v.id));
    setSelectedVehicles(selected.slice(0, 3));
  }, [searchParams]);

  const handleVehicleChange = (index: number, vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (vehicle) {
      const newSelected = [...selectedVehicles];
      newSelected[index] = vehicle;
      setSelectedVehicles(newSelected);
    }
  };

  const addVehicleSlot = () => {
    if (selectedVehicles.length < 3) {
      setSelectedVehicles([...selectedVehicles, vehicles[0]]);
    }
  };

  const removeVehicle = (index: number) => {
    setSelectedVehicles(selectedVehicles.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/vehicles">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Vehicles
            </Button>
          </Link>

          <h1 className="text-5xl font-bold mb-4">Compare Vehicles</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Side-by-side comparison to help you make the right choice
          </p>

          {selectedVehicles.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-xl text-muted-foreground mb-4">
                No vehicles selected for comparison
              </p>
              <Link to="/vehicles">
                <Button variant="hero">
                  Browse Vehicles
                </Button>
              </Link>
            </Card>
          )}

          {selectedVehicles.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedVehicles.map((vehicle, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-48 object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => removeVehicle(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <Select value={vehicle.id} onValueChange={(value) => handleVehicleChange(index, value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicles.map((v) => (
                          <SelectItem key={v.id} value={v.id}>
                            {v.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-muted-foreground">Type</span>
                        <Badge>{vehicle.type}</Badge>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-muted-foreground">MSRP</span>
                        <span className="font-bold">${vehicle.price.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-muted-foreground">Finance/mo</span>
                        <span className="font-semibold text-primary">${vehicle.monthlyFinance}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-muted-foreground">Lease/mo</span>
                        <span className="font-semibold text-primary">${vehicle.monthlyLease}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-muted-foreground">MPG</span>
                        <span className="font-semibold">{vehicle.mpg}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-muted-foreground">Engine</span>
                        <span className="text-sm">{vehicle.specs.engine}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-muted-foreground">Horsepower</span>
                        <span className="font-semibold">{vehicle.specs.horsepower}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-muted-foreground">Drivetrain</span>
                        <span className="text-sm">{vehicle.specs.drivetrain}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-muted-foreground">Seating</span>
                        <span className="text-sm">{vehicle.specs.seating}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-muted-foreground">Cargo</span>
                        <span className="text-sm">{vehicle.specs.cargo}</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <p className="text-sm font-semibold mb-2">Key Features:</p>
                      <ul className="space-y-1">
                        {vehicle.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link to={`/vehicle/${vehicle.id}`}>
                      <Button variant="default" className="w-full">
                        View Full Details
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}

              {selectedVehicles.length < 3 && (
                <Card className="p-12 flex items-center justify-center border-dashed">
                  <Button variant="outline" onClick={addVehicleSlot}>
                    Add Vehicle to Compare
                  </Button>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Compare;
