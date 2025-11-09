import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { vehicles } from "@/data/vehicles";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Check, DollarSign, Fuel, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VehicleDetail = () => {
  const { id } = useParams();
  const vehicle = vehicles.find(v => v.id === id);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Vehicle Not Found</h1>
          <Link to="/vehicles">
            <Button variant="hero">Browse Vehicles</Button>
          </Link>
        </div>
      </div>
    );
  }

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

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* Image Section */}
            <div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-6 right-6 text-lg px-4 py-2">
                  {vehicle.year}
                </Badge>
              </div>
            </div>

            {/* Info Section */}
            <div>
              <h1 className="text-5xl font-bold mb-4">{vehicle.name}</h1>
              <div className="flex gap-3 mb-6">
                <Badge variant="outline" className="text-lg px-4 py-2">{vehicle.type}</Badge>
                <Badge className="text-lg px-4 py-2">{vehicle.specs.drivetrain}</Badge>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex items-baseline gap-3">
                  <span className="text-sm text-muted-foreground">Starting MSRP</span>
                  <span className="text-5xl font-bold text-primary">
                    ${vehicle.price.toLocaleString()}
                  </span>
                </div>

                <Card className="p-6 bg-muted">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Finance</p>
                      <p className="text-3xl font-bold">${vehicle.monthlyFinance}/mo</p>
                      <p className="text-xs text-muted-foreground mt-1">Est. at 4.5% APR for 60 months</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Lease</p>
                      <p className="text-3xl font-bold">${vehicle.monthlyLease}/mo</p>
                      <p className="text-xs text-muted-foreground mt-1">36-month lease term</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/calculator" className="flex-1">
                  <Button variant="hero" size="lg" className="w-full">
                    <DollarSign className="w-5 h-5" />
                    Calculate Payment
                  </Button>
                </Link>
                <Button variant="accent" size="lg" className="flex-1">
                  Schedule Test Drive
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <Fuel className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Fuel Economy</p>
                      <p className="font-bold text-lg">{vehicle.mpg} MPG</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <Settings className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Horsepower</p>
                      <p className="font-bold text-lg">{vehicle.specs.horsepower}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Details Tabs */}
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="financing">Financing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features">
              <Card className="p-8">
                <h2 className="text-3xl font-bold mb-6">Key Features</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-lg">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="specs">
              <Card className="p-8">
                <h2 className="text-3xl font-bold mb-6">Technical Specifications</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(vehicle.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-4 border-b">
                      <span className="text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="font-bold text-lg">{value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="financing">
              <Card className="p-8">
                <h2 className="text-3xl font-bold mb-6">Financing Options</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3">Finance</h3>
                    <p className="text-muted-foreground mb-4">
                      Own your Toyota with competitive financing rates and flexible terms.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-primary" />
                        <span>Terms from 24 to 84 months</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-primary" />
                        <span>Competitive interest rates</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-primary" />
                        <span>No prepayment penalties</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-xl font-bold mb-3">Lease</h3>
                    <p className="text-muted-foreground mb-4">
                      Drive a new Toyota with lower monthly payments and the flexibility to upgrade.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-primary" />
                        <span>Lower monthly payments than financing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-primary" />
                        <span>Upgrade to a new model every few years</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-primary" />
                        <span>Warranty coverage for the lease term</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-primary/5 p-6 rounded-lg mt-6">
                    <p className="font-semibold mb-2">Ready to get started?</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Use our calculator to estimate your payments or get pre-approved today.
                    </p>
                    <div className="flex gap-3">
                      <Link to="/calculator">
                        <Button variant="hero">Calculate Payment</Button>
                      </Link>
                      <Button variant="outline">Get Pre-Approved</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;
