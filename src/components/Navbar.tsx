import { Link } from "react-router-dom";
import toyotaLogo from "@/assets/toyota-logo.png";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img src={toyotaLogo} alt="Toyota" className="h-14" />
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/vehicles" className="text-foreground hover:text-primary transition-colors">
              Vehicles
            </Link>
            <Link to="/compare" className="text-foreground hover:text-primary transition-colors">
              Compare
            </Link>
            <Link to="/calculator" className="text-foreground hover:text-primary transition-colors">
              Calculator
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
