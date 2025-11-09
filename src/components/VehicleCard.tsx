import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Vehicle } from "@/data/vehicles";
import { DollarSign, Fuel, ArrowRight } from "lucide-react";

interface VehicleCardProps {
  vehicle: Vehicle;
  onCompare?: (vehicle: Vehicle) => void;
  isComparing?: boolean;
}

export const VehicleCard = ({ vehicle, onCompare, isComparing }: VehicleCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-500"
        />
        <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
          {vehicle.year}
        </Badge>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold mb-1">{vehicle.name}</h3>
            <Badge variant="outline">{vehicle.type}</Badge>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="w-4 h-4" />
              Starting MSRP
            </span>
            <span className="font-bold text-lg">${vehicle.price.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Fuel className="w-4 h-4" />
              Fuel Economy
            </span>
            <span className="font-semibold">{vehicle.mpg} MPG</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6 p-3 bg-muted rounded-lg">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Finance</p>
            <p className="font-bold">${vehicle.monthlyFinance}/mo</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Lease</p>
            <p className="font-bold">${vehicle.monthlyLease}/mo</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link to={`/vehicle/${vehicle.id}`} className="flex-1">
            <Button variant="default" className="w-full group">
              View Details
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          {onCompare && (
            <Button
              variant={isComparing ? "accent" : "outline"}
              onClick={() => onCompare(vehicle)}
            >
              {isComparing ? "✓" : "Compare"}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
