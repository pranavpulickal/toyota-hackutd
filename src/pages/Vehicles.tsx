import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { VehicleCard } from "@/components/VehicleCard";
import { vehicles, Vehicle } from "@/data/vehicles";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Vehicles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [compareList, setCompareList] = useState<Vehicle[]>([]);
  const navigate = useNavigate();

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || vehicle.type === typeFilter;
    const matchesPrice = priceFilter === "all" ||
                        (priceFilter === "under30k" && vehicle.price < 30000) ||
                        (priceFilter === "30k-40k" && vehicle.price >= 30000 && vehicle.price < 40000) ||
                        (priceFilter === "over40k" && vehicle.price >= 40000);
    
    return matchesSearch && matchesType && matchesPrice;
  });

  const handleCompare = (vehicle: Vehicle) => {
    if (compareList.find(v => v.id === vehicle.id)) {
      setCompareList(compareList.filter(v => v.id !== vehicle.id));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, vehicle]);
    }
  };

  const handleCompareNavigate = () => {
    if (compareList.length >= 2) {
      const ids = compareList.map(v => v.id).join(',');
      navigate(`/compare?vehicles=${ids}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Explore Our Vehicles</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find the perfect Toyota that fits your lifestyle and budget
          </p>

          {/* Filters */}
          <div className="bg-card p-6 rounded-lg shadow-lg mb-12">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by model or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Vehicle Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Sedan">Sedan</SelectItem>
                  <SelectItem value="SUV">SUV</SelectItem>
                  <SelectItem value="Truck">Truck</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under30k">Under $30k</SelectItem>
                  <SelectItem value="30k-40k">$30k - $40k</SelectItem>
                  <SelectItem value="over40k">Over $40k</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Compare Bar */}
          {compareList.length > 0 && (
            <div className="bg-primary text-primary-foreground p-4 rounded-lg shadow-lg mb-8 flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  {compareList.length} vehicle{compareList.length > 1 ? 's' : ''} selected for comparison
                </p>
                <p className="text-sm opacity-90">
                  {compareList.length < 2 
                    ? "Select at least 2 vehicles to compare" 
                    : `Comparing: ${compareList.map(v => v.model).join(', ')}`}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="accent"
                  onClick={handleCompareNavigate}
                  disabled={compareList.length < 2}
                >
                  Compare Now
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCompareList([])}
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  Clear
                </Button>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredVehicles.length} vehicle{filteredVehicles.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onCompare={handleCompare}
                isComparing={!!compareList.find(v => v.id === vehicle.id)}
              />
            ))}
          </div>

          {filteredVehicles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                No vehicles found matching your criteria. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
