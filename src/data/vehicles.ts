// Import all vehicle images
import corollaImg from "@/assets/corolla-real.jpg";
import camryImg from "@/assets/camry-real.jpg";
import tundraImg from "@/assets/tundra.jpg";
import rav4Img from "@/assets/rav4-new.webp";
import highlanderImg from "@/assets/highlander-real.jpg";
import tacomaImg from "@/assets/tacoma-real.jpg";
import fourRunnerImg from "@/assets/4runner.jpg";
import priusImg from "@/assets/prius.jpg";
import siennaImg from "@/assets/sienna.jpg";
import sequoiaImg from "@/assets/sequoia.jpg";
import landcruiserImg from "@/assets/landcruiser.jpg";
import gr86Img from "@/assets/gr86.jpg";
import grCorollaImg from "@/assets/grcorolla.jpg";
import supraImg from "@/assets/supra.jpg";
import crownImg from "@/assets/crown.jpg";
import corollaCrossImg from "@/assets/corollacross.avif";
import bz4xImg from "@/assets/bz4x.jpg";
import venzaImg from "@/assets/venza-new.png";
import grandHighlanderImg from "@/assets/grandhighlander.jpg";
import priusPrimeImg from "@/assets/priusprime-new.avif";
import corollaHatchbackImg from "@/assets/corollahatchback.jpg";

export interface Vehicle {
  id: string;
  name: string;
  model: string;
  trim: string;
  year: number;
  type: string;
  price: number;
  monthlyFinance: number;
  monthlyLease: number;
  mpg: string;
  image: string;
  features: string[];
  specs: {
    engine: string;
    horsepower: string;
    transmission: string;
    drivetrain: string;
    seating: string;
    cargo: string;
  };
}

export const vehicles: Vehicle[] = [
  // Corolla Trims
  {
    id: "corolla-2025-l",
    name: "2025 Toyota Corolla L",
    model: "Corolla",
    trim: "L",
    year: 2025,
    type: "Sedan",
    price: 22795,
    monthlyFinance: 379,
    monthlyLease: 275,
    mpg: "33/43",
    image: corollaImg,
    features: [
      "Toyota Safety Sense 3.0",
      "7-inch Touchscreen",
      "Fabric Upholstery",
      "LED Headlights",
      "Bluetooth Connectivity"
    ],
    specs: {
      engine: "2.0L 4-Cylinder",
      horsepower: "169 hp",
      transmission: "CVT",
      drivetrain: "FWD",
      seating: "5 passengers",
      cargo: "13.1 cu ft"
    }
  },
  {
    id: "corolla-2025-le",
    name: "2025 Toyota Corolla LE",
    model: "Corolla",
    trim: "LE",
    year: 2025,
    type: "Sedan",
    price: 23795,
    monthlyFinance: 395,
    monthlyLease: 285,
    mpg: "33/43",
    image: corollaImg,
    features: [
      "Toyota Safety Sense 3.0",
      "8-inch Touchscreen",
      "Apple CarPlay & Android Auto",
      "Automatic Climate Control",
      "LED Daytime Running Lights"
    ],
    specs: {
      engine: "2.0L 4-Cylinder",
      horsepower: "169 hp",
      transmission: "CVT",
      drivetrain: "FWD",
      seating: "5 passengers",
      cargo: "13.1 cu ft"
    }
  },
  {
    id: "corolla-2025-se",
    name: "2025 Toyota Corolla SE",
    model: "Corolla",
    trim: "SE",
    year: 2025,
    type: "Sedan",
    price: 25295,
    monthlyFinance: 421,
    monthlyLease: 305,
    mpg: "32/41",
    image: corollaImg,
    features: [
      "Sport-Tuned Suspension",
      "18-inch Alloy Wheels",
      "Sport Seats",
      "Paddle Shifters",
      "Dual-Zone Climate Control"
    ],
    specs: {
      engine: "2.0L 4-Cylinder",
      horsepower: "169 hp",
      transmission: "CVT",
      drivetrain: "FWD",
      seating: "5 passengers",
      cargo: "13.1 cu ft"
    }
  },
  {
    id: "corolla-2025-xle",
    name: "2025 Toyota Corolla XLE",
    model: "Corolla",
    trim: "XLE",
    year: 2025,
    type: "Sedan",
    price: 26895,
    monthlyFinance: 447,
    monthlyLease: 325,
    mpg: "33/43",
    image: corollaImg,
    features: [
      "Premium Audio System",
      "Leather-Trimmed Seats",
      "Wireless Charging",
      "Moonroof",
      "Heated Front Seats"
    ],
    specs: {
      engine: "2.0L 4-Cylinder",
      horsepower: "169 hp",
      transmission: "CVT",
      drivetrain: "FWD",
      seating: "5 passengers",
      cargo: "13.1 cu ft"
    }
  },
  {
    id: "corolla-2025-xse",
    name: "2025 Toyota Corolla XSE",
    model: "Corolla",
    trim: "XSE",
    year: 2025,
    type: "Sedan",
    price: 28195,
    monthlyFinance: 469,
    monthlyLease: 339,
    mpg: "32/41",
    image: corollaImg,
    features: [
      "Sport-Tuned Suspension",
      "18-inch Black Alloy Wheels",
      "Leather Sport Seats",
      "Premium Audio",
      "Smart Key with Push Button Start"
    ],
    specs: {
      engine: "2.0L 4-Cylinder",
      horsepower: "169 hp",
      transmission: "CVT",
      drivetrain: "FWD",
      seating: "5 passengers",
      cargo: "13.1 cu ft"
    }
  },

  // Camry Trims
  {
    id: "camry-2025-le",
    name: "2025 Toyota Camry LE",
    model: "Camry",
    trim: "LE",
    year: 2025,
    type: "Sedan",
    price: 29495,
    monthlyFinance: 490,
    monthlyLease: 355,
    mpg: "32/41",
    image: camryImg,
    features: [
      "Toyota Safety Sense 3.0",
      "12.3-inch Touchscreen",
      "Apple CarPlay & Android Auto",
      "Dual-Zone Climate Control",
      "LED Headlights"
    ],
    specs: {
      engine: "2.5L 4-Cylinder Hybrid",
      horsepower: "225 hp",
      transmission: "CVT",
      drivetrain: "FWD",
      seating: "5 passengers",
      cargo: "15.1 cu ft"
    }
  },
  {
    id: "camry-2025-se",
    name: "2025 Toyota Camry SE",
    model: "Camry",
    trim: "SE",
    year: 2025,
    type: "Sedan",
    price: 31495,
    monthlyFinance: 524,
    monthlyLease: 379,
    mpg: "32/41",
    image: camryImg,
    features: [
      "Sport-Tuned Suspension",
      "19-inch Alloy Wheels",
      "Sport Seats",
      "Paddle Shifters",
      "Premium Audio System"
    ],
    specs: {
      engine: "2.5L 4-Cylinder Hybrid",
      horsepower: "225 hp",
      transmission: "CVT",
      drivetrain: "FWD",
      seating: "5 passengers",
      cargo: "15.1 cu ft"
    }
  },
  {
    id: "camry-2025-xle",
    name: "2025 Toyota Camry XLE",
    model: "Camry",
    trim: "XLE",
    year: 2025,
    type: "Sedan",
    price: 34495,
    monthlyFinance: 574,
    monthlyLease: 416,
    mpg: "32/41",
    image: camryImg,
    features: [
      "Leather-Trimmed Seats",
      "Moonroof",
      "Wireless Charging",
      "Premium JBL Audio",
      "Heated Front Seats"
    ],
    specs: {
      engine: "2.5L 4-Cylinder Hybrid",
      horsepower: "225 hp",
      transmission: "CVT",
      drivetrain: "FWD",
      seating: "5 passengers",
      cargo: "15.1 cu ft"
    }
  },
  {
    id: "camry-2025-xse",
    name: "2025 Toyota Camry XSE",
    model: "Camry",
    trim: "XSE",
    year: 2025,
    type: "Sedan",
    price: 36495,
    monthlyFinance: 607,
    monthlyLease: 440,
    mpg: "32/41",
    image: tundraImg,
    features: [
      "Sport-Tuned Suspension",
      "19-inch Black Alloy Wheels",
      "Leather Sport Seats",
      "Premium JBL Audio",
      "Smart Key System"
    ],
    specs: {
      engine: "2.5L 4-Cylinder Hybrid",
      horsepower: "225 hp",
      transmission: "CVT",
      drivetrain: "FWD",
      seating: "5 passengers",
      cargo: "15.1 cu ft"
    }
  },
  {
    id: "camry-2025-trd",
    name: "2025 Toyota Camry TRD",
    model: "Camry",
    trim: "TRD",
    year: 2025,
    type: "Sedan",
    price: 38795,
    monthlyFinance: 645,
    monthlyLease: 468,
    mpg: "31/39",
    image: tundraImg,
    features: [
      "TRD Performance Suspension",
      "19-inch TRD Matte Black Wheels",
      "TRD Exhaust",
      "Sport Seats with TRD Logo",
      "Red Interior Accents"
    ],
    specs: {
      engine: "2.5L 4-Cylinder Hybrid",
      horsepower: "225 hp",
      transmission: "CVT",
      drivetrain: "FWD",
      seating: "5 passengers",
      cargo: "15.1 cu ft"
    }
  },

  // RAV4 Trims
  {
    id: "rav4-2025-le",
    name: "2025 Toyota RAV4 LE",
    model: "RAV4",
    trim: "LE",
    year: 2025,
    type: "SUV",
    price: 31250,
    monthlyFinance: 520,
    monthlyLease: 377,
    mpg: "30/38",
    image: rav4Img,
    features: [
      "Toyota Safety Sense 2.5+",
      "8-inch Touchscreen",
      "Apple CarPlay & Android Auto",
      "LED Headlights",
      "Fabric Upholstery"
    ],
    specs: {
      engine: "2.5L 4-Cylinder",
      horsepower: "203 hp",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD",
      seating: "5 passengers",
      cargo: "37.5 cu ft"
    }
  },
  {
    id: "rav4-2025-xle",
    name: "2025 Toyota RAV4 XLE",
    model: "RAV4",
    trim: "XLE",
    year: 2025,
    type: "SUV",
    price: 33750,
    monthlyFinance: 562,
    monthlyLease: 407,
    mpg: "30/38",
    image: rav4Img,
    features: [
      "Moonroof",
      "Power Liftgate",
      "Wireless Charging",
      "Dual-Zone Climate Control",
      "Upgraded Audio System"
    ],
    specs: {
      engine: "2.5L 4-Cylinder",
      horsepower: "203 hp",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD",
      seating: "5 passengers",
      cargo: "37.5 cu ft"
    }
  },
  {
    id: "rav4-2025-xle-premium",
    name: "2025 Toyota RAV4 XLE Premium",
    model: "RAV4",
    trim: "XLE Premium",
    year: 2025,
    type: "SUV",
    price: 36250,
    monthlyFinance: 603,
    monthlyLease: 437,
    mpg: "30/38",
    image: rav4Img,
    features: [
      "Leather-Trimmed Seats",
      "Heated Front Seats",
      "Premium Audio",
      "Power-Adjustable Driver Seat",
      "Enhanced Connectivity"
    ],
    specs: {
      engine: "2.5L 4-Cylinder",
      horsepower: "203 hp",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD",
      seating: "5 passengers",
      cargo: "37.5 cu ft"
    }
  },
  {
    id: "rav4-2025-adventure",
    name: "2025 Toyota RAV4 Adventure",
    model: "RAV4",
    trim: "Adventure",
    year: 2025,
    type: "SUV",
    price: 38750,
    monthlyFinance: 645,
    monthlyLease: 467,
    mpg: "29/35",
    image: rav4Img,
    features: [
      "Off-Road Suspension",
      "All-Terrain Tires",
      "Roof Rails",
      "Multi-Terrain Select",
      "Unique Styling Package"
    ],
    specs: {
      engine: "2.5L 4-Cylinder",
      horsepower: "203 hp",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD",
      seating: "5 passengers",
      cargo: "37.5 cu ft"
    }
  },
  {
    id: "rav4-2025-trd-off-road",
    name: "2025 Toyota RAV4 TRD Off-Road",
    model: "RAV4",
    trim: "TRD Off-Road",
    year: 2025,
    type: "SUV",
    price: 41250,
    monthlyFinance: 687,
    monthlyLease: 498,
    mpg: "28/34",
    image: rav4Img,
    features: [
      "TRD-Tuned Suspension",
      "All-Terrain Tires",
      "Multi-Terrain Select",
      "Crawl Control",
      "TRD Styling Package"
    ],
    specs: {
      engine: "2.5L 4-Cylinder",
      horsepower: "203 hp",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD",
      seating: "5 passengers",
      cargo: "37.5 cu ft"
    }
  },
  {
    id: "rav4-2025-limited",
    name: "2025 Toyota RAV4 Limited",
    model: "RAV4",
    trim: "Limited",
    year: 2025,
    type: "SUV",
    price: 39750,
    monthlyFinance: 662,
    monthlyLease: 479,
    mpg: "30/38",
    image: rav4Img,
    features: [
      "Leather-Trimmed Seats",
      "Heated & Ventilated Front Seats",
      "Premium JBL Audio",
      "Hands-Free Power Liftgate",
      "Ambient Lighting"
    ],
    specs: {
      engine: "2.5L 4-Cylinder",
      horsepower: "203 hp",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD",
      seating: "5 passengers",
      cargo: "37.5 cu ft"
    }
  },
  {
    id: "rav4-2025-platinum",
    name: "2025 Toyota RAV4 Platinum",
    model: "RAV4",
    trim: "Platinum",
    year: 2025,
    type: "SUV",
    price: 42750,
    monthlyFinance: 712,
    monthlyLease: 516,
    mpg: "30/38",
    image: rav4Img,
    features: [
      "Premium Leather Seats",
      "Panoramic Moonroof",
      "Digital Rearview Mirror",
      "Premium Audio System",
      "Wireless Charging"
    ],
    specs: {
      engine: "2.5L 4-Cylinder",
      horsepower: "203 hp",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD",
      seating: "5 passengers",
      cargo: "37.5 cu ft"
    }
  },

  // Highlander Trims
  {
    id: "highlander-2025-l",
    name: "2025 Toyota Highlander L",
    model: "Highlander",
    trim: "L",
    year: 2025,
    type: "SUV",
    price: 38520,
    monthlyFinance: 641,
    monthlyLease: 465,
    mpg: "24/29",
    image: highlanderImg,
    features: [
      "3-Row Seating",
      "8-inch Touchscreen",
      "Toyota Safety Sense 2.5+",
      "LED Headlights",
      "Tri-Zone Climate Control"
    ],
    specs: {
      engine: "3.5L V6",
      horsepower: "295 hp",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD",
      seating: "8 passengers",
      cargo: "16.0 cu ft"
    }
  },
  {
    id: "highlander-2025-le",
    name: "2025 Toyota Highlander LE",
    model: "Highlander",
    trim: "LE",
    year: 2025,
    type: "SUV",
    price: 42020,
    monthlyFinance: 699,
    monthlyLease: 507,
    mpg: "24/29",
    image: highlanderImg,
    features: [
      "Power Liftgate",
      "Blind Spot Monitor",
      "Rear Cross-Traffic Alert",
      "Smart Key System",
      "Upgraded Audio"
    ],
    specs: {
      engine: "3.5L V6",
      horsepower: "295 hp",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD",
      seating: "8 passengers",
      cargo: "16.0 cu ft"
    }
  },
  {
    id: "highlander-2025-xle",
    name: "2025 Toyota Highlander XLE",
    model: "Highlander",
    trim: "XLE",
    year: 2025,
    type: "SUV",
    price: 45520,
    monthlyFinance: 758,
    monthlyLease: 549,
    mpg: "24/29",
    image: highlanderImg,
    features: [
      "Leather-Trimmed Seats",
      "Moonroof",
      "Heated Front Seats",
      "12.3-inch Touchscreen",
      "Premium Audio"
    ],
    specs: {
      engine: "3.5L V6",
      horsepower: "295 hp",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD",
      seating: "8 passengers",
      cargo: "16.0 cu ft"
    }
  },
  {
    id: "highlander-2025-limited",
    name: "2025 Toyota Highlander Limited",
    model: "Highlander",
    trim: "Limited",
    year: 2025,
    type: "SUV",
    price: 49520,
    monthlyFinance: 824,
    monthlyLease: 597,
    mpg: "24/29",
    image: highlanderImg,
    features: [
      "Premium Leather Seats",
      "Heated & Ventilated Front Seats",
      "Panoramic Moonroof",
      "Premium JBL Audio",
      "Hands-Free Power Liftgate"
    ],
    specs: {
      engine: "3.5L V6",
      horsepower: "295 hp",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD",
      seating: "8 passengers",
      cargo: "16.0 cu ft"
    }
  },
  {
    id: "highlander-2025-platinum",
    name: "2025 Toyota Highlander Platinum",
    model: "Highlander",
    trim: "Platinum",
    year: 2025,
    type: "SUV",
    price: 53520,
    monthlyFinance: 891,
    monthlyLease: 645,
    mpg: "24/29",
    image: highlanderImg,
    features: [
      "Premium Nappa Leather",
      "Digital Rearview Mirror",
      "Bird's Eye View Camera",
      "Premium Audio System",
      "Ambient Lighting"
    ],
    specs: {
      engine: "3.5L V6",
      horsepower: "295 hp",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD",
      seating: "8 passengers",
      cargo: "16.0 cu ft"
    }
  },

  // Tacoma Trims
  {
    id: "tacoma-2025-sr",
    name: "2025 Toyota Tacoma SR",
    model: "Tacoma",
    trim: "SR",
    year: 2025,
    type: "Truck",
    price: 32720,
    monthlyFinance: 545,
    monthlyLease: 395,
    mpg: "20/24",
    image: tacomaImg,
    features: [
      "8-inch Touchscreen",
      "Toyota Safety Sense",
      "Fabric Upholstery",
      "Backup Camera",
      "Bluetooth Connectivity"
    ],
    specs: {
      engine: "2.7L 4-Cylinder",
      horsepower: "159 hp",
      transmission: "6-Speed Automatic",
      drivetrain: "4WD",
      seating: "5 passengers",
      cargo: "6-foot bed"
    }
  },
  {
    id: "tacoma-2025-sr5",
    name: "2025 Toyota Tacoma SR5",
    model: "Tacoma",
    trim: "SR5",
    year: 2025,
    type: "Truck",
    price: 36220,
    monthlyFinance: 603,
    monthlyLease: 437,
    mpg: "20/24",
    image: tacomaImg,
    features: [
      "Upgraded Audio System",
      "Smart Key System",
      "LED Headlights",
      "Chrome Accents",
      "Towing Package"
    ],
    specs: {
      engine: "3.5L V6",
      horsepower: "278 hp",
      transmission: "6-Speed Automatic",
      drivetrain: "4WD",
      seating: "5 passengers",
      cargo: "6-foot bed"
    }
  },
  {
    id: "tacoma-2025-trd-sport",
    name: "2025 Toyota Tacoma TRD Sport",
    model: "Tacoma",
    trim: "TRD Sport",
    year: 2025,
    type: "Truck",
    price: 40720,
    monthlyFinance: 678,
    monthlyLease: 491,
    mpg: "19/23",
    image: tacomaImg,
    features: [
      "TRD Sport Suspension",
      "Hood Scoop",
      "Sport-Tuned Shocks",
      "TRD Shift Knob",
      "18-inch TRD Wheels"
    ],
    specs: {
      engine: "3.5L V6",
      horsepower: "278 hp",
      transmission: "6-Speed Manual",
      drivetrain: "4WD",
      seating: "5 passengers",
      cargo: "6-foot bed"
    }
  },
  {
    id: "tacoma-2025-trd-off-road",
    name: "2025 Toyota Tacoma TRD Off-Road",
    model: "Tacoma",
    trim: "TRD Off-Road",
    year: 2025,
    type: "Truck",
    price: 42220,
    monthlyFinance: 703,
    monthlyLease: 509,
    mpg: "19/22",
    image: tacomaImg,
    features: [
      "Multi-Terrain Select",
      "Crawl Control",
      "Locking Rear Differential",
      "All-Terrain Tires",
      "Off-Road Suspension"
    ],
    specs: {
      engine: "3.5L V6",
      horsepower: "278 hp",
      transmission: "6-Speed Automatic",
      drivetrain: "4WD",
      seating: "5 passengers",
      cargo: "6-foot bed"
    }
  },
  {
    id: "tacoma-2025-limited",
    name: "2025 Toyota Tacoma Limited",
    model: "Tacoma",
    trim: "Limited",
    year: 2025,
    type: "Truck",
    price: 45720,
    monthlyFinance: 761,
    monthlyLease: 551,
    mpg: "20/24",
    image: tacomaImg,
    features: [
      "Leather-Trimmed Seats",
      "Heated Front Seats",
      "Premium Audio",
      "20-inch Wheels",
      "Chrome Package"
    ],
    specs: {
      engine: "3.5L V6",
      horsepower: "278 hp",
      transmission: "6-Speed Automatic",
      drivetrain: "4WD",
      seating: "5 passengers",
      cargo: "5-foot bed"
    }
  },
  {
    id: "tacoma-2025-trd-pro",
    name: "2025 Toyota Tacoma TRD Pro",
    model: "Tacoma",
    trim: "TRD Pro",
    year: 2025,
    type: "Truck",
    price: 53720,
    monthlyFinance: 894,
    monthlyLease: 648,
    mpg: "18/21",
    image: tacomaImg,
    features: [
      "FOX Racing Shocks",
      "TRD Pro Suspension",
      "TRD Skid Plate",
      "TRD Exhaust",
      "Unique TRD Pro Styling"
    ],
    specs: {
      engine: "3.5L V6",
      horsepower: "278 hp",
      transmission: "6-Speed Manual",
      drivetrain: "4WD",
      seating: "5 passengers",
      cargo: "5-foot bed"
    }
  },

  // Tundra Trims
  {
    id: "tundra-2025-sr",
    name: "2025 Toyota Tundra SR",
    model: "Tundra",
    trim: "SR",
    year: 2025,
    type: "Full-Size Truck",
    price: 41995,
    monthlyFinance: 699,
    monthlyLease: 507,
    mpg: "18/22",
    image: tacomaImg,
    features: [
      "8-inch Touchscreen",
      "Toyota Safety Sense",
      "Fabric Upholstery",
      "Backup Camera",
      "Towing Package"
    ],
    specs: {
      engine: "3.5L Twin-Turbo V6",
      horsepower: "389 hp",
      transmission: "10-Speed Automatic",
      drivetrain: "4WD",
      seating: "6 passengers",
      cargo: "8-foot bed available"
    }
  },
  {
    id: "tundra-2025-sr5",
    name: "2025 Toyota Tundra SR5",
    model: "Tundra",
    trim: "SR5",
    year: 2025,
    type: "Full-Size Truck",
    price: 47495,
    monthlyFinance: 790,
    monthlyLease: 573,
    mpg: "19/24",
    image: tacomaImg,
    features: [
      "14-inch Touchscreen",
      "Smart Key System",
      "LED Headlights",
      "Upgraded Audio",
      "Power Windows & Locks"
    ],
    specs: {
      engine: "3.5L Twin-Turbo V6",
      horsepower: "389 hp",
      transmission: "10-Speed Automatic",
      drivetrain: "4WD",
      seating: "6 passengers",
      cargo: "8-foot bed available"
    }
  },
  {
    id: "tundra-2025-limited",
    name: "2025 Toyota Tundra Limited",
    model: "Tundra",
    trim: "Limited",
    year: 2025,
    type: "Full-Size Truck",
    price: 53995,
    monthlyFinance: 899,
    monthlyLease: 651,
    mpg: "19/24",
    image: tacomaImg,
    features: [
      "Leather-Trimmed Seats",
      "Heated Front Seats",
      "Premium JBL Audio",
      "20-inch Wheels",
      "Chrome Package"
    ],
    specs: {
      engine: "3.5L Twin-Turbo V6",
      horsepower: "389 hp",
      transmission: "10-Speed Automatic",
      drivetrain: "4WD",
      seating: "6 passengers",
      cargo: "6.5-foot bed"
    }
  },
  {
    id: "tundra-2025-platinum",
    name: "2025 Toyota Tundra Platinum",
    model: "Tundra",
    trim: "Platinum",
    year: 2025,
    type: "Full-Size Truck",
    price: 59995,
    monthlyFinance: 999,
    monthlyLease: 724,
    mpg: "19/24",
    image: tacomaImg,
    features: [
      "Premium Leather Seats",
      "Panoramic Moonroof",
      "Heated & Ventilated Seats",
      "Premium Audio System",
      "22-inch Wheels"
    ],
    specs: {
      engine: "3.5L Twin-Turbo V6",
      horsepower: "389 hp",
      transmission: "10-Speed Automatic",
      drivetrain: "4WD",
      seating: "6 passengers",
      cargo: "6.5-foot bed"
    }
  },
  {
    id: "tundra-2025-trd-pro",
    name: "2025 Toyota Tundra TRD Pro",
    model: "Tundra",
    trim: "TRD Pro",
    year: 2025,
    type: "Full-Size Truck",
    price: 72995,
    monthlyFinance: 1215,
    monthlyLease: 880,
    mpg: "17/22",
    image: tacomaImg,
    features: [
      "FOX Racing Shocks",
      "TRD Pro Suspension",
      "TRD Exhaust",
      "Unique TRD Pro Styling",
      "Off-Road Package"
    ],
    specs: {
      engine: "3.5L Twin-Turbo V6",
      horsepower: "437 hp",
      transmission: "10-Speed Automatic",
      drivetrain: "4WD",
      seating: "6 passengers",
      cargo: "6.5-foot bed"
    }
  },
  {
    id: "tundra-2025-capstone",
    name: "2025 Toyota Tundra Capstone",
    model: "Tundra",
    trim: "Capstone",
    year: 2025,
    type: "Full-Size Truck",
    price: 76995,
    monthlyFinance: 1282,
    monthlyLease: 929,
    mpg: "19/24",
    image: tacomaImg,
    features: [
      "Ultra-Premium Leather",
      "Panoramic Moonroof",
      "Premium Audio",
      "Advanced Safety Features",
      "Luxury Interior Package"
    ],
    specs: {
      engine: "3.5L Twin-Turbo V6",
      horsepower: "389 hp",
      transmission: "10-Speed Automatic",
      drivetrain: "4WD",
      seating: "6 passengers",
      cargo: "6.5-foot bed"
    }
  },

  // 4Runner Trims
  {
    id: "4runner-2025-sr5",
    name: "2025 Toyota 4Runner SR5",
    model: "4Runner",
    trim: "SR5",
    year: 2025,
    type: "SUV",
    price: 43995,
    monthlyFinance: 732,
    monthlyLease: 531,
    mpg: "17/20",
    image: fourRunnerImg,
    features: [
      "8-inch Touchscreen",
      "Toyota Safety Sense",
      "Fabric Upholstery",
      "Power Windows",
      "Roof Rack"
    ],
    specs: {
      engine: "4.0L V6",
      horsepower: "270 hp",
      transmission: "5-Speed Automatic",
      drivetrain: "4WD",
      seating: "7 passengers",
      cargo: "47.2 cu ft"
    }
  },
  {
    id: "4runner-2025-trd-off-road",
    name: "2025 Toyota 4Runner TRD Off-Road",
    model: "4Runner",
    trim: "TRD Off-Road",
    year: 2025,
    type: "SUV",
    price: 48995,
    monthlyFinance: 816,
    monthlyLease: 591,
    mpg: "16/19",
    image: fourRunnerImg,
    features: [
      "Multi-Terrain Select",
      "Crawl Control",
      "Locking Rear Differential",
      "All-Terrain Tires",
      "TRD Suspension"
    ],
    specs: {
      engine: "4.0L V6",
      horsepower: "270 hp",
      transmission: "5-Speed Automatic",
      drivetrain: "4WD",
      seating: "7 passengers",
      cargo: "47.2 cu ft"
    }
  },
  {
    id: "4runner-2025-trd-sport",
    name: "2025 Toyota 4Runner TRD Sport",
    model: "4Runner",
    trim: "TRD Sport",
    year: 2025,
    type: "SUV",
    price: 49995,
    monthlyFinance: 832,
    monthlyLease: 603,
    mpg: "17/20",
    image: fourRunnerImg,
    features: [
      "Sport-Tuned Suspension",
      "20-inch TRD Wheels",
      "TRD Styling Package",
      "Premium Audio",
      "Sport Seats"
    ],
    specs: {
      engine: "4.0L V6",
      horsepower: "270 hp",
      transmission: "5-Speed Automatic",
      drivetrain: "4WD",
      seating: "7 passengers",
      cargo: "47.2 cu ft"
    }
  },
  {
    id: "4runner-2025-limited",
    name: "2025 Toyota 4Runner Limited",
    model: "4Runner",
    trim: "Limited",
    year: 2025,
    type: "SUV",
    price: 52995,
    monthlyFinance: 882,
    monthlyLease: 639,
    mpg: "17/20",
    image: fourRunnerImg,
    features: [
      "Leather-Trimmed Seats",
      "Heated Front Seats",
      "Premium Audio",
      "20-inch Wheels",
      "Power Liftgate"
    ],
    specs: {
      engine: "4.0L V6",
      horsepower: "270 hp",
      transmission: "5-Speed Automatic",
      drivetrain: "4WD",
      seating: "7 passengers",
      cargo: "47.2 cu ft"
    }
  },
  {
    id: "4runner-2025-trd-pro",
    name: "2025 Toyota 4Runner TRD Pro",
    model: "4Runner",
    trim: "TRD Pro",
    year: 2025,
    type: "SUV",
    price: 59995,
    monthlyFinance: 999,
    monthlyLease: 724,
    mpg: "16/19",
    image: fourRunnerImg,
    features: [
      "FOX Racing Shocks",
      "TRD Pro Suspension",
      "TRD Exhaust",
      "Unique TRD Pro Styling",
      "Off-Road Package"
    ],
    specs: {
      engine: "4.0L V6",
      horsepower: "270 hp",
      transmission: "5-Speed Automatic",
      drivetrain: "4WD",
      seating: "7 passengers",
      cargo: "47.2 cu ft"
    }
  },

  // Prius Trims
  {
    id: "prius-2025-le",
    name: "2025 Toyota Prius LE",
    model: "Prius",
    trim: "LE",
    year: 2025,
    type: "Hatchback",
    price: 28475,
    monthlyFinance: 474,
    monthlyLease: 343,
    mpg: "57/56",
    image: priusImg,
    features: [
      "Toyota Safety Sense 3.0",
      "8-inch Touchscreen",
      "Hybrid Synergy Drive",
      "LED Lighting",
      "Fabric Upholstery"
    ],
    specs: {
      engine: "2.0L Hybrid",
      horsepower: "196 hp",
      transmission: "CVT",
      drivetrain: "FWD",
      seating: "5 passengers",
      cargo: "19.8 cu ft"
    }
  },
  {
    id: "prius-2025-xle",
    name: "2025 Toyota Prius XLE",
    model: "Prius",
    trim: "XLE",
    year: 2025,
    type: "Hatchback",
    price: 31475,
    monthlyFinance: 524,
    monthlyLease: 379,
    mpg: "57/56",
    image: priusImg,
    features: [
      "Leather-Trimmed Seats",
      "Wireless Charging",
      "Premium Audio",
      "Heated Front Seats",
      "Power Moonroof"
    ],
    specs: {
      engine: "2.0L Hybrid",
      horsepower: "196 hp",
      transmission: "CVT",
      drivetrain: "FWD",
      seating: "5 passengers",
      cargo: "19.8 cu ft"
    }
  },
  {
    id: "prius-2025-limited",
    name: "2025 Toyota Prius Limited",
    model: "Prius",
    trim: "Limited",
    year: 2025,
    type: "Hatchback",
    price: 34475,
    monthlyFinance: 574,
    monthlyLease: 416,
    mpg: "57/56",
    image: priusImg,
    features: [
      "Premium Leather Seats",
      "Panoramic Moonroof",
      "Premium JBL Audio",
      "Digital Rearview Mirror",
      "Ambient Lighting"
    ],
    specs: {
      engine: "2.0L Hybrid",
      horsepower: "196 hp",
      transmission: "CVT",
      drivetrain: "FWD",
      seating: "5 passengers",
      cargo: "19.8 cu ft"
    }
  },

  // Sienna Trims
  {
    id: "sienna-2025-le",
    name: "2025 Toyota Sienna LE",
    model: "Sienna",
    trim: "LE",
    year: 2025,
    type: "Minivan",
    price: 38495,
    monthlyFinance: 641,
    monthlyLease: 464,
    mpg: "36/36",
    image: siennaImg,
    features: [
      "8-Passenger Seating",
      "Dual Sliding Doors",
      "Hybrid Powertrain",
      "Tri-Zone Climate Control",
      "8-inch Touchscreen"
    ],
    specs: {
      engine: "2.5L Hybrid",
      horsepower: "245 hp",
      transmission: "CVT",
      drivetrain: "AWD",
      seating: "8 passengers",
      cargo: "33.5 cu ft"
    }
  },
  {
    id: "sienna-2025-xle",
    name: "2025 Toyota Sienna XLE",
    model: "Sienna",
    trim: "XLE",
    year: 2025,
    type: "Minivan",
    price: 44495,
    monthlyFinance: 741,
    monthlyLease: 537,
    mpg: "36/36",
    image: siennaImg,
    features: [
      "Leather-Trimmed Seats",
      "Power Sliding Doors",
      "Heated Front Seats",
      "Premium Audio",
      "Moonroof"
    ],
    specs: {
      engine: "2.5L Hybrid",
      horsepower: "245 hp",
      transmission: "CVT",
      drivetrain: "AWD",
      seating: "8 passengers",
      cargo: "33.5 cu ft"
    }
  },
  {
    id: "sienna-2025-limited",
    name: "2025 Toyota Sienna Limited",
    model: "Sienna",
    trim: "Limited",
    year: 2025,
    type: "Minivan",
    price: 50495,
    monthlyFinance: 841,
    monthlyLease: 609,
    mpg: "36/36",
    image: siennaImg,
    features: [
      "Premium Leather Seats",
      "Rear Entertainment System",
      "Super Long Slide Seats",
      "Premium JBL Audio",
      "Refrigerated Console"
    ],
    specs: {
      engine: "2.5L Hybrid",
      horsepower: "245 hp",
      transmission: "CVT",
      drivetrain: "AWD",
      seating: "7 passengers",
      cargo: "33.5 cu ft"
    }
  },
  {
    id: "sienna-2025-platinum",
    name: "2025 Toyota Sienna Platinum",
    model: "Sienna",
    trim: "Platinum",
    year: 2025,
    type: "Minivan",
    price: 53995,
    monthlyFinance: 899,
    monthlyLease: 651,
    mpg: "36/36",
    image: siennaImg,
    features: [
      "Ultra-Premium Leather",
      "Dual Moonroofs",
      "Premium Audio System",
      "Advanced Safety Features",
      "Luxury Interior Package"
    ],
    specs: {
      engine: "2.5L Hybrid",
      horsepower: "245 hp",
      transmission: "CVT",
      drivetrain: "AWD",
      seating: "7 passengers",
      cargo: "33.5 cu ft"
    }
  },

  // Sequoia Trims
  {
    id: "sequoia-2025-sr5",
    name: "2025 Toyota Sequoia SR5",
    model: "Sequoia",
    trim: "SR5",
    year: 2025,
    type: "Full-Size SUV",
    price: 61795,
    monthlyFinance: 1029,
    monthlyLease: 746,
    mpg: "19/22",
    image: sequoiaImg,
    features: [
      "3-Row Seating",
      "14-inch Touchscreen",
      "Toyota Safety Sense",
      "LED Headlights",
      "Towing Package"
    ],
    specs: {
      engine: "3.5L Twin-Turbo V6 Hybrid",
      horsepower: "437 hp",
      transmission: "10-Speed Automatic",
      drivetrain: "4WD",
      seating: "8 passengers",
      cargo: "22.3 cu ft"
    }
  },
  {
    id: "sequoia-2025-limited",
    name: "2025 Toyota Sequoia Limited",
    model: "Sequoia",
    trim: "Limited",
    year: 2025,
    type: "Full-Size SUV",
    price: 69795,
    monthlyFinance: 1162,
    monthlyLease: 842,
    mpg: "19/22",
    image: sequoiaImg,
    features: [
      "Leather-Trimmed Seats",
      "Heated & Ventilated Front Seats",
      "Premium JBL Audio",
      "Power Liftgate",
      "Moonroof"
    ],
    specs: {
      engine: "3.5L Twin-Turbo V6 Hybrid",
      horsepower: "437 hp",
      transmission: "10-Speed Automatic",
      drivetrain: "4WD",
      seating: "8 passengers",
      cargo: "22.3 cu ft"
    }
  },
  {
    id: "sequoia-2025-platinum",
    name: "2025 Toyota Sequoia Platinum",
    model: "Sequoia",
    trim: "Platinum",
    year: 2025,
    type: "Full-Size SUV",
    price: 75795,
    monthlyFinance: 1262,
    monthlyLease: 914,
    mpg: "19/22",
    image: sequoiaImg,
    features: [
      "Premium Leather Seats",
      "Panoramic Moonroof",
      "Premium Audio System",
      "Adaptive Suspension",
      "Advanced Safety Features"
    ],
    specs: {
      engine: "3.5L Twin-Turbo V6 Hybrid",
      horsepower: "437 hp",
      transmission: "10-Speed Automatic",
      drivetrain: "4WD",
      seating: "8 passengers",
      cargo: "22.3 cu ft"
    }
  },
  {
    id: "sequoia-2025-trd-pro",
    name: "2025 Toyota Sequoia TRD Pro",
    model: "Sequoia",
    trim: "TRD Pro",
    year: 2025,
    type: "Full-Size SUV",
    price: 79795,
    monthlyFinance: 1329,
    monthlyLease: 963,
    mpg: "18/21",
    image: sequoiaImg,
    features: [
      "FOX Racing Shocks",
      "TRD Pro Suspension",
      "All-Terrain Tires",
      "TRD Exhaust",
      "Unique TRD Pro Styling"
    ],
    specs: {
      engine: "3.5L Twin-Turbo V6 Hybrid",
      horsepower: "437 hp",
      transmission: "10-Speed Automatic",
      drivetrain: "4WD",
      seating: "8 passengers",
      cargo: "22.3 cu ft"
    }
  },
  {
    id: "sequoia-2025-capstone",
    name: "2025 Toyota Sequoia Capstone",
    model: "Sequoia",
    trim: "Capstone",
    year: 2025,
    type: "Full-Size SUV",
    price: 83795,
    monthlyFinance: 1395,
    monthlyLease: 1011,
    mpg: "19/22",
    image: sequoiaImg,
    features: [
      "Ultra-Premium Semi-Aniline Leather",
      "Panoramic Moonroof",
      "Premium Audio",
      "Advanced Safety Suite",
      "Luxury Interior Package"
    ],
    specs: {
      engine: "3.5L Twin-Turbo V6 Hybrid",
      horsepower: "437 hp",
      transmission: "10-Speed Automatic",
      drivetrain: "4WD",
      seating: "8 passengers",
      cargo: "22.3 cu ft"
    }
  },

  // Land Cruiser Trims
  {
    id: "land-cruiser-2025-base",
    name: "2025 Toyota Land Cruiser",
    model: "Land Cruiser",
    trim: "Base",
    year: 2025,
    type: "Full-Size SUV",
    price: 57495,
    monthlyFinance: 957,
    monthlyLease: 694,
    mpg: "22/25",
    image: landcruiserImg,
    features: [
      "Multi-Terrain Monitor",
      "Kinetic Dynamic Suspension",
      "Off-Road Crawl Control",
      "Premium Interior",
      "Surround View Camera"
    ],
    specs: {
      engine: "3.5L Twin-Turbo V6 Hybrid",
      horsepower: "326 hp",
      transmission: "8-Speed Automatic",
      drivetrain: "4WD",
      seating: "7 passengers",
      cargo: "46.3 cu ft"
    }
  },
  {
    id: "land-cruiser-2025-first-edition",
    name: "2025 Toyota Land Cruiser First Edition",
    model: "Land Cruiser",
    trim: "First Edition",
    year: 2025,
    type: "Full-Size SUV",
    price: 73495,
    monthlyFinance: 1224,
    monthlyLease: 887,
    mpg: "22/25",
    image: landcruiserImg,
    features: [
      "Exclusive Heritage Styling",
      "Premium Leather Interior",
      "Heritage Badging",
      "20-inch Wheels",
      "Advanced Off-Road Tech"
    ],
    specs: {
      engine: "3.5L Twin-Turbo V6 Hybrid",
      horsepower: "326 hp",
      transmission: "8-Speed Automatic",
      drivetrain: "4WD",
      seating: "7 passengers",
      cargo: "46.3 cu ft"
    }
  },

  // GR86 Trims
  {
    id: "gr86-2025-base",
    name: "2025 Toyota GR86",
    model: "GR86",
    trim: "Base",
    year: 2025,
    type: "Sports Car",
    price: 30495,
    monthlyFinance: 507,
    monthlyLease: 368,
    mpg: "20/27",
    image: gr86Img,
    features: [
      "Sport-Tuned Suspension",
      "Track Mode",
      "Sport Seats",
      "6-Speed Manual",
      "Limited Slip Differential"
    ],
    specs: {
      engine: "2.4L Boxer 4-Cylinder",
      horsepower: "228 hp",
      transmission: "6-Speed Manual",
      drivetrain: "RWD",
      seating: "4 passengers",
      cargo: "6.3 cu ft"
    }
  },
  {
    id: "gr86-2025-premium",
    name: "2025 Toyota GR86 Premium",
    model: "GR86",
    trim: "Premium",
    year: 2025,
    type: "Sports Car",
    price: 33495,
    monthlyFinance: 557,
    monthlyLease: 404,
    mpg: "20/27",
    image: gr86Img,
    features: [
      "Leather & Alcantara Seats",
      "Premium Audio System",
      "Automatic Climate Control",
      "Performance Tires",
      "Aluminum Pedals"
    ],
    specs: {
      engine: "2.4L Boxer 4-Cylinder",
      horsepower: "228 hp",
      transmission: "6-Speed Manual",
      drivetrain: "RWD",
      seating: "4 passengers",
      cargo: "6.3 cu ft"
    }
  },

  // GR Corolla Trims
  {
    id: "gr-corolla-2025-core",
    name: "2025 Toyota GR Corolla Core",
    model: "GR Corolla",
    trim: "Core",
    year: 2025,
    type: "Hot Hatch",
    price: 39995,
    monthlyFinance: 666,
    monthlyLease: 482,
    mpg: "24/29",
    image: grCorollaImg,
    features: [
      "GR-Four AWD",
      "6-Speed Manual",
      "Sport Bucket Seats",
      "Performance Exhaust",
      "Track Telemetry"
    ],
    specs: {
      engine: "1.6L Turbo 3-Cylinder",
      horsepower: "300 hp",
      transmission: "6-Speed Manual",
      drivetrain: "AWD",
      seating: "5 passengers",
      cargo: "17.8 cu ft"
    }
  },
  {
    id: "gr-corolla-2025-circuit-edition",
    name: "2025 Toyota GR Corolla Circuit Edition",
    model: "GR Corolla",
    trim: "Circuit Edition",
    year: 2025,
    type: "Hot Hatch",
    price: 48995,
    monthlyFinance: 816,
    monthlyLease: 591,
    mpg: "23/28",
    image: grCorollaImg,
    features: [
      "Circuit Edition Package",
      "Performance Suspension",
      "Carbon Fiber Roof",
      "Recaro Seats",
      "Forged BBS Wheels"
    ],
    specs: {
      engine: "1.6L Turbo 3-Cylinder",
      horsepower: "300 hp",
      transmission: "6-Speed Manual",
      drivetrain: "AWD",
      seating: "5 passengers",
      cargo: "17.8 cu ft"
    }
  },

  // GR Supra Trims
  {
    id: "gr-supra-2025-20",
    name: "2025 Toyota GR Supra 2.0",
    model: "GR Supra",
    trim: "2.0",
    year: 2025,
    type: "Sports Car",
    price: 47195,
    monthlyFinance: 786,
    monthlyLease: 569,
    mpg: "28/36",
    image: supraImg,
    features: [
      "Sport-Tuned Suspension",
      "8.8-inch Touchscreen",
      "Sport Seats",
      "Launch Control",
      "Active Differential"
    ],
    specs: {
      engine: "2.0L Turbo 4-Cylinder",
      horsepower: "255 hp",
      transmission: "8-Speed Automatic",
      drivetrain: "RWD",
      seating: "2 passengers",
      cargo: "10.2 cu ft"
    }
  },
  {
    id: "gr-supra-2025-30",
    name: "2025 Toyota GR Supra 3.0",
    model: "GR Supra",
    trim: "3.0",
    year: 2025,
    type: "Sports Car",
    price: 56195,
    monthlyFinance: 936,
    monthlyLease: 678,
    mpg: "25/32",
    image: supraImg,
    features: [
      "Adaptive Suspension",
      "Launch Control",
      "Premium Leather Interior",
      "Supra Connect Telematics",
      "Track Mode"
    ],
    specs: {
      engine: "3.0L Turbo I6",
      horsepower: "382 hp",
      transmission: "8-Speed Automatic",
      drivetrain: "RWD",
      seating: "2 passengers",
      cargo: "10.2 cu ft"
    }
  },
  {
    id: "gr-supra-2025-30-premium",
    name: "2025 Toyota GR Supra 3.0 Premium",
    model: "GR Supra",
    trim: "3.0 Premium",
    year: 2025,
    type: "Sports Car",
    price: 60195,
    monthlyFinance: 1003,
    monthlyLease: 726,
    mpg: "25/32",
    image: supraImg,
    features: [
      "Premium JBL Audio",
      "Head-Up Display",
      "Wireless Charging",
      "Heated Seats",
      "Advanced Driver Assistance"
    ],
    specs: {
      engine: "3.0L Turbo I6",
      horsepower: "382 hp",
      transmission: "8-Speed Automatic",
      drivetrain: "RWD",
      seating: "2 passengers",
      cargo: "10.2 cu ft"
    }
  },
  {
    id: "gr-supra-2025-a91-mt",
    name: "2025 Toyota GR Supra A91-MT",
    model: "GR Supra",
    trim: "A91-MT",
    year: 2025,
    type: "Sports Car",
    price: 64195,
    monthlyFinance: 1069,
    monthlyLease: 775,
    mpg: "24/31",
    image: supraImg,
    features: [
      "6-Speed Manual Transmission",
      "A91 Exclusive Styling",
      "Performance Package",
      "Limited Edition",
      "Track-Focused Setup"
    ],
    specs: {
      engine: "3.0L Turbo I6",
      horsepower: "382 hp",
      transmission: "6-Speed Manual",
      drivetrain: "RWD",
      seating: "2 passengers",
      cargo: "10.2 cu ft"
    }
  },

  // Crown Trims
  {
    id: "crown-2025-xle",
    name: "2025 Toyota Crown XLE",
    model: "Crown",
    trim: "XLE",
    year: 2025,
    type: "Sedan",
    price: 41995,
    monthlyFinance: 699,
    monthlyLease: 507,
    mpg: "29/32",
    image: crownImg,
    features: [
      "Premium Interior",
      "12.3-inch Digital Display",
      "Leather Seats",
      "Premium Audio",
      "Advanced Safety Suite"
    ],
    specs: {
      engine: "2.5L Turbo Hybrid",
      horsepower: "340 hp",
      transmission: "CVT",
      drivetrain: "AWD",
      seating: "5 passengers",
      cargo: "15.2 cu ft"
    }
  },
  {
    id: "crown-2025-limited",
    name: "2025 Toyota Crown Limited",
    model: "Crown",
    trim: "Limited",
    year: 2025,
    type: "Sedan",
    price: 47995,
    monthlyFinance: 799,
    monthlyLease: 579,
    mpg: "29/32",
    image: crownImg,
    features: [
      "Premium Leather Seats",
      "Panoramic Roof",
      "Heated & Ventilated Seats",
      "Premium JBL Audio",
      "Digital Rearview Mirror"
    ],
    specs: {
      engine: "2.5L Turbo Hybrid",
      horsepower: "340 hp",
      transmission: "CVT",
      drivetrain: "AWD",
      seating: "5 passengers",
      cargo: "15.2 cu ft"
    }
  },
  {
    id: "crown-2025-platinum",
    name: "2025 Toyota Crown Platinum",
    model: "Crown",
    trim: "Platinum",
    year: 2025,
    type: "Sedan",
    price: 52995,
    monthlyFinance: 882,
    monthlyLease: 639,
    mpg: "29/32",
    image: crownImg,
    features: [
      "Ultra-Premium Leather",
      "Ambient Lighting",
      "Premium Audio System",
      "Advanced Safety Features",
      "Luxury Package"
    ],
    specs: {
      engine: "2.5L Turbo Hybrid",
      horsepower: "340 hp",
      transmission: "CVT",
      drivetrain: "AWD",
      seating: "5 passengers",
      cargo: "15.2 cu ft"
    }
  },

  // Corolla Cross Trims
  {
    id: "corolla-cross-2025-l",
    name: "2025 Toyota Corolla Cross L",
    model: "Corolla Cross",
    trim: "L",
    year: 2025,
    type: "Crossover",
    price: 25495,
    monthlyFinance: 424,
    monthlyLease: 308,
    mpg: "31/33",
    image: corollaCrossImg,
    features: [
      "Toyota Safety Sense 3.0",
      "8-inch Touchscreen",
      "LED Headlights",
      "Fabric Upholstery",
      "Bluetooth Connectivity"
    ],
    specs: {
      engine: "2.0L 4-Cylinder",
      horsepower: "169 hp",
      transmission: "CVT",
      drivetrain: "FWD",
      seating: "5 passengers",
      cargo: "26.5 cu ft"
    }
  },
  {
    id: "corolla-cross-2025-le",
    name: "2025 Toyota Corolla Cross LE",
    model: "Corolla Cross",
    trim: "LE",
    year: 2025,
    type: "Crossover",
    price: 27995,
    monthlyFinance: 466,
    monthlyLease: 338,
    mpg: "31/33",
    image: corollaCrossImg,
    features: [
      "Power Liftgate",
      "Wireless Charging",
      "Upgraded Audio",
      "Automatic Climate Control",
      "Smart Key System"
    ],
    specs: {
      engine: "2.0L 4-Cylinder",
      horsepower: "169 hp",
      transmission: "CVT",
      drivetrain: "AWD",
      seating: "5 passengers",
      cargo: "26.5 cu ft"
    }
  },
  {
    id: "corolla-cross-2025-xle",
    name: "2025 Toyota Corolla Cross XLE",
    model: "Corolla Cross",
    trim: "XLE",
    year: 2025,
    type: "Crossover",
    price: 30995,
    monthlyFinance: 516,
    monthlyLease: 374,
    mpg: "31/33",
    image: corollaCrossImg,
    features: [
      "Leather-Trimmed Seats",
      "Moonroof",
      "Premium Audio",
      "Heated Front Seats",
      "Power-Adjustable Driver Seat"
    ],
    specs: {
      engine: "2.0L 4-Cylinder",
      horsepower: "169 hp",
      transmission: "CVT",
      drivetrain: "AWD",
      seating: "5 passengers",
      cargo: "26.5 cu ft"
    }
  },

  // bZ4X Trims
  {
    id: "bz4x-2025-xle",
    name: "2025 Toyota bZ4X XLE",
    model: "bZ4X",
    trim: "XLE",
    year: 2025,
    type: "Electric SUV",
    price: 43095,
    monthlyFinance: 717,
    monthlyLease: 520,
    mpg: "119 MPGe",
    image: bz4xImg,
    features: [
      "252 Mile Range",
      "12.3-inch Digital Display",
      "Panoramic Roof",
      "Fast Charging",
      "All-Wheel Drive"
    ],
    specs: {
      engine: "Electric Motors",
      horsepower: "214 hp",
      transmission: "Direct Drive",
      drivetrain: "AWD",
      seating: "5 passengers",
      cargo: "27.7 cu ft"
    }
  },
  {
    id: "bz4x-2025-limited",
    name: "2025 Toyota bZ4X Limited",
    model: "bZ4X",
    trim: "Limited",
    year: 2025,
    type: "Electric SUV",
    price: 48095,
    monthlyFinance: 801,
    monthlyLease: 581,
    mpg: "119 MPGe",
    image: bz4xImg,
    features: [
      "Premium Leather Seats",
      "Heated & Ventilated Seats",
      "Premium Audio",
      "Advanced Driver Assistance",
      "Wireless Charging"
    ],
    specs: {
      engine: "Electric Motors",
      horsepower: "214 hp",
      transmission: "Direct Drive",
      drivetrain: "AWD",
      seating: "5 passengers",
      cargo: "27.7 cu ft"
    }
  },

  // Venza Trims
  {
    id: "venza-2025-le",
    name: "2025 Toyota Venza LE",
    model: "Venza",
    trim: "LE",
    year: 2025,
    type: "Crossover",
    price: 35395,
    monthlyFinance: 589,
    monthlyLease: 427,
    mpg: "39/37",
    image: venzaImg,
    features: [
      "Star Gaze Panoramic Roof",
      "12.3-inch Touchscreen",
      "Hybrid Powertrain",
      "LED Lighting",
      "Smart Key System"
    ],
    specs: {
      engine: "2.5L Hybrid",
      horsepower: "219 hp",
      transmission: "CVT",
      drivetrain: "AWD",
      seating: "5 passengers",
      cargo: "28.8 cu ft"
    }
  },
  {
    id: "venza-2025-xle",
    name: "2025 Toyota Venza XLE",
    model: "Venza",
    trim: "XLE",
    year: 2025,
    type: "Crossover",
    price: 39395,
    monthlyFinance: 656,
    monthlyLease: 475,
    mpg: "39/37",
    image: venzaImg,
    features: [
      "Leather-Trimmed Seats",
      "Heated Front Seats",
      "Premium JBL Audio",
      "Power Liftgate",
      "Wireless Charging"
    ],
    specs: {
      engine: "2.5L Hybrid",
      horsepower: "219 hp",
      transmission: "CVT",
      drivetrain: "AWD",
      seating: "5 passengers",
      cargo: "28.8 cu ft"
    }
  },
  {
    id: "venza-2025-limited",
    name: "2025 Toyota Venza Limited",
    model: "Venza",
    trim: "Limited",
    year: 2025,
    type: "Crossover",
    price: 43395,
    monthlyFinance: 722,
    monthlyLease: 523,
    mpg: "39/37",
    image: venzaImg,
    features: [
      "Premium Leather Seats",
      "Heated & Ventilated Seats",
      "Premium Audio System",
      "Digital Rearview Mirror",
      "Ambient Lighting"
    ],
    specs: {
      engine: "2.5L Hybrid",
      horsepower: "219 hp",
      transmission: "CVT",
      drivetrain: "AWD",
      seating: "5 passengers",
      cargo: "28.8 cu ft"
    }
  },

  // Grand Highlander Trims
  {
    id: "grand-highlander-2025-le",
    name: "2025 Toyota Grand Highlander LE",
    model: "Grand Highlander",
    trim: "LE",
    year: 2025,
    type: "SUV",
    price: 43995,
    monthlyFinance: 732,
    monthlyLease: 531,
    mpg: "23/28",
    image: grandHighlanderImg,
    features: [
      "3-Row Seating",
      "12.3-inch Touchscreen",
      "Toyota Safety Sense",
      "LED Headlights",
      "Tri-Zone Climate Control"
    ],
    specs: {
      engine: "2.4L Turbo",
      horsepower: "265 hp",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD",
      seating: "8 passengers",
      cargo: "17.0 cu ft"
    }
  },
  {
    id: "grand-highlander-2025-xle",
    name: "2025 Toyota Grand Highlander XLE",
    model: "Grand Highlander",
    trim: "XLE",
    year: 2025,
    type: "SUV",
    price: 48995,
    monthlyFinance: 816,
    monthlyLease: 591,
    mpg: "23/28",
    image: grandHighlanderImg,
    features: [
      "Leather-Trimmed Seats",
      "Moonroof",
      "Heated Front Seats",
      "Premium Audio",
      "Power Liftgate"
    ],
    specs: {
      engine: "2.4L Turbo",
      horsepower: "265 hp",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD",
      seating: "8 passengers",
      cargo: "17.0 cu ft"
    }
  },
  {
    id: "grand-highlander-2025-limited",
    name: "2025 Toyota Grand Highlander Limited",
    model: "Grand Highlander",
    trim: "Limited",
    year: 2025,
    type: "SUV",
    price: 53995,
    monthlyFinance: 899,
    monthlyLease: 651,
    mpg: "23/28",
    image: grandHighlanderImg,
    features: [
      "Premium Leather Seats",
      "Heated & Ventilated Seats",
      "Panoramic Moonroof",
      "Premium JBL Audio",
      "Digital Rearview Mirror"
    ],
    specs: {
      engine: "2.4L Turbo",
      horsepower: "265 hp",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD",
      seating: "8 passengers",
      cargo: "17.0 cu ft"
    }
  },
  {
    id: "grand-highlander-2025-platinum",
    name: "2025 Toyota Grand Highlander Platinum",
    model: "Grand Highlander",
    trim: "Platinum",
    year: 2025,
    type: "SUV",
    price: 58995,
    monthlyFinance: 982,
    monthlyLease: 712,
    mpg: "23/28",
    image: grandHighlanderImg,
    features: [
      "Ultra-Premium Leather",
      "Premium Audio System",
      "Advanced Safety Suite",
      "Ambient Lighting",
      "Luxury Package"
    ],
    specs: {
      engine: "2.4L Turbo",
      horsepower: "265 hp",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD",
      seating: "8 passengers",
      cargo: "17.0 cu ft"
    }
  },

  // RAV4 Prime Trims
  {
    id: "rav4-prime-2025-se",
    name: "2025 Toyota RAV4 Prime SE",
    model: "RAV4 Prime",
    trim: "SE",
    year: 2025,
    type: "Plug-in Hybrid SUV",
    price: 44475,
    monthlyFinance: 740,
    monthlyLease: 537,
    mpg: "94 MPGe",
    image: rav4Img,
    features: [
      "42 Mile EV Range",
      "Sport Mode",
      "18-inch Alloy Wheels",
      "Dual-Zone Climate Control",
      "Fast Charging"
    ],
    specs: {
      engine: "2.5L Plug-in Hybrid",
      horsepower: "302 hp",
      transmission: "CVT",
      drivetrain: "AWD",
      seating: "5 passengers",
      cargo: "33.5 cu ft"
    }
  },
  {
    id: "rav4-prime-2025-xse",
    name: "2025 Toyota RAV4 Prime XSE",
    model: "RAV4 Prime",
    trim: "XSE",
    year: 2025,
    type: "Plug-in Hybrid SUV",
    price: 48975,
    monthlyFinance: 815,
    monthlyLease: 591,
    mpg: "94 MPGe",
    image: rav4Img,
    features: [
      "Panoramic Moonroof",
      "Premium Audio",
      "Wireless Charging",
      "19-inch Wheels",
      "Sport-Tuned Suspension"
    ],
    specs: {
      engine: "2.5L Plug-in Hybrid",
      horsepower: "302 hp",
      transmission: "CVT",
      drivetrain: "AWD",
      seating: "5 passengers",
      cargo: "33.5 cu ft"
    }
  },

  // Prius Prime Trims
  {
    id: "prius-prime-2025-se",
    name: "2025 Toyota Prius Prime SE",
    model: "Prius Prime",
    trim: "SE",
    year: 2025,
    type: "Plug-in Hybrid",
    price: 32475,
    monthlyFinance: 540,
    monthlyLease: 392,
    mpg: "54/50",
    image: priusPrimeImg,
    features: [
      "44 Mile EV Range",
      "8-inch Touchscreen",
      "Hybrid Synergy Drive",
      "LED Lighting",
      "Fast Charging"
    ],
    specs: {
      engine: "2.0L Plug-in Hybrid",
      horsepower: "220 hp",
      transmission: "CVT",
      drivetrain: "FWD",
      seating: "5 passengers",
      cargo: "19.8 cu ft"
    }
  },
  {
    id: "prius-prime-2025-xse",
    name: "2025 Toyota Prius Prime XSE",
    model: "Prius Prime",
    trim: "XSE",
    year: 2025,
    type: "Plug-in Hybrid",
    price: 35975,
    monthlyFinance: 599,
    monthlyLease: 434,
    mpg: "54/50",
    image: priusPrimeImg,
    features: [
      "Premium Audio System",
      "Wireless Charging",
      "Solar Roof Panel",
      "19-inch Wheels",
      "Sport-Tuned Suspension"
    ],
    specs: {
      engine: "2.0L Plug-in Hybrid",
      horsepower: "220 hp",
      transmission: "CVT",
      drivetrain: "FWD",
      seating: "5 passengers",
      cargo: "19.8 cu ft"
    }
  },

  // Corolla Hatchback Trims
  {
    id: "corolla-hatchback-2025-se",
    name: "2025 Toyota Corolla Hatchback SE",
    model: "Corolla Hatchback",
    trim: "SE",
    year: 2025,
    type: "Hatchback",
    price: 24695,
    monthlyFinance: 411,
    monthlyLease: 298,
    mpg: "32/41",
    image: corollaHatchbackImg,
    features: [
      "Sport-Tuned Suspension",
      "18-inch Alloy Wheels",
      "Sport Seats",
      "8-inch Touchscreen",
      "Dual-Zone Climate Control"
    ],
    specs: {
      engine: "2.0L 4-Cylinder",
      horsepower: "169 hp",
      transmission: "CVT",
      drivetrain: "FWD",
      seating: "5 passengers",
      cargo: "17.8 cu ft"
    }
  },
  {
    id: "corolla-hatchback-2025-xse",
    name: "2025 Toyota Corolla Hatchback XSE",
    model: "Corolla Hatchback",
    trim: "XSE",
    year: 2025,
    type: "Hatchback",
    price: 27195,
    monthlyFinance: 452,
    monthlyLease: 328,
    mpg: "32/41",
    image: corollaHatchbackImg,
    features: [
      "Leather Sport Seats",
      "Premium Audio",
      "Wireless Charging",
      "18-inch Black Wheels",
      "Smart Key System"
    ],
    specs: {
      engine: "2.0L 4-Cylinder",
      horsepower: "169 hp",
      transmission: "CVT",
      drivetrain: "FWD",
      seating: "5 passengers",
      cargo: "17.8 cu ft"
    }
  }
];
