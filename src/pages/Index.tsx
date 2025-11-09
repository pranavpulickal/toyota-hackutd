import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { VehicleCard } from "@/components/VehicleCard";
import { VehicleFinder } from "@/components/VehicleFinder";
import { vehicles } from "@/data/vehicles";
import { ArrowRight, Shield, DollarSign, Calculator } from "lucide-react";
import heroImage from "@/assets/hero-vehicle.png";

const Index = () => {
  const featuredVehicles = vehicles.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-start justify-start overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Toyota Vehicle"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-accent/90 to-accent/40" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-start pt-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-accent-foreground mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Find Your Dream Toyota
            </h1>
            <p className="text-xl md:text-2xl text-accent-foreground/90 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
              Explore flexible financing and leasing options tailored to your lifestyle
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <a href="#vehicle-finder">
              <Button variant="hero" size="lg" className="text-lg px-8">
                Find My Toyota
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
            <Link to="/calculator">
              <Button variant="accent" size="lg" className="text-lg px-8">
                Calculate Payments
                <Calculator className="w-5 h-5" />
              </Button>
            </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Toyota Financial?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Trusted Service</h3>
              <p className="text-muted-foreground">
                Award-winning customer service and transparent financing options you can trust
              </p>
            </div>

            <div className="text-center p-8 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Flexible Plans</h3>
              <p className="text-muted-foreground">
                Competitive rates and customizable payment plans that fit your budget
              </p>
            </div>

            <div className="text-center p-8 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calculator className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Easy Calculations</h3>
              <p className="text-muted-foreground">
                Simple tools to estimate your monthly payments and compare options
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Finder Section */}
      <section id="vehicle-finder" className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Not Sure Which Model to Choose?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Answer a few quick questions and let our AI find the perfect Toyota for your needs
            </p>
          </div>
          <VehicleFinder />
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold">Featured Vehicles</h2>
            <Link to="/vehicles">
              <Button variant="outline">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Toyota Financial</h3>
              <p className="text-sm opacity-80">
                Empowering your journey with flexible financing solutions
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/vehicles" className="opacity-80 hover:opacity-100">Vehicles</Link></li>
                <li><Link to="/compare" className="opacity-80 hover:opacity-100">Compare</Link></li>
                <li><Link to="/calculator" className="opacity-80 hover:opacity-100">Calculator</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-80">
            <p>&copy; 2024 Toyota Financial Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
