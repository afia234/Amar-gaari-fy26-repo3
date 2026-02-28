
import { Car, TestDrivePackage } from './types';

export const MOCK_CARS: Car[] = [
  {
    id: 'c1',
    brand: 'Toyota',
    model: 'Corolla Cross',
    year: 2023,
    price: 4800000,
    mileage: 5000,
    fuelType: 'Hybrid',
    engine: '1.8L Hybrid',
    imageUrl: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&w=800&q=80',
    available: true,
  },
  {
    id: 'c2',
    brand: 'Honda',
    model: 'Civic Turbo',
    year: 2022,
    price: 4500000,
    mileage: 15000,
    fuelType: 'Petrol',
    engine: '1.5L VTEC Turbo',
    imageUrl: 'https://images.unsplash.com/photo-1605816988069-424a7395e505?auto=format&fit=crop&w=800&q=80',
    available: true,
  },
  {
    id: 'c3',
    brand: 'Hyundai',
    model: 'Tucson',
    year: 2024,
    price: 5200000,
    mileage: 2000,
    fuelType: 'Petrol',
    engine: '2.0L Smartstream',
    imageUrl: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=800&q=80',
    available: true,
  },
  {
    id: 'c4',
    brand: 'Toyota',
    model: 'Harrier',
    year: 2021,
    price: 8500000,
    mileage: 22000,
    fuelType: 'Petrol',
    engine: '2.0L Dynamic Force',
    imageUrl: 'https://images.unsplash.com/photo-1590362835106-1f209f95d664?auto=format&fit=crop&w=800&q=80',
    available: true,
  },
  {
    id: 'c5',
    brand: 'Mitsubishi',
    model: 'Outlander',
    year: 2021,
    price: 5800000,
    mileage: 28000,
    fuelType: 'Hybrid',
    engine: '2.4L PHEV',
    imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    available: true,
  },
  {
    id: 'c6',
    brand: 'Haval',
    model: 'H6 SUV',
    year: 2023,
    price: 4200000,
    mileage: 8000,
    fuelType: 'Petrol',
    engine: '1.5L Turbo',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    available: true,
  },
  {
    id: 'c7',
    brand: 'Toyota',
    model: 'Land Cruiser Prado',
    year: 2020,
    price: 21500000,
    mileage: 35000,
    fuelType: 'Diesel',
    engine: '2.8L Turbo Diesel',
    imageUrl: 'https://images.unsplash.com/photo-1594502184342-28efcb0a5748?auto=format&fit=crop&w=800&q=80',
    available: true,
  },
  {
    id: 'c8',
    brand: 'Suzuki',
    model: 'Swift',
    year: 2022,
    price: 1850000,
    mileage: 12000,
    fuelType: 'Petrol',
    engine: '1.2L Dualjet',
    imageUrl: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
    available: true,
  },
  {
    id: 'c9',
    brand: 'Honda',
    model: 'CR-V Turbo',
    year: 2023,
    price: 8200000,
    mileage: 5000,
    fuelType: 'Hybrid',
    engine: '2.0L e:HEV',
    imageUrl: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&w=800&q=80',
    available: true,
  },
  {
    id: 'c10',
    brand: 'Toyota',
    model: 'Premio',
    year: 2018,
    price: 3600000,
    mileage: 45000,
    fuelType: 'Petrol',
    engine: '1.5L VVT-i',
    imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c399a7eeb?auto=format&fit=crop&w=800&q=80',
    available: true,
  },
  {
    id: 'c11',
    brand: 'Nissan',
    model: 'X-Trail',
    year: 2021,
    price: 5200000,
    mileage: 30000,
    fuelType: 'Hybrid',
    engine: '2.0L Hybrid',
    imageUrl: 'https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?auto=format&fit=crop&w=800&q=80',
    available: true,
  },
  {
    id: 'c12',
    brand: 'Kia',
    model: 'Sportage',
    year: 2022,
    price: 4800000,
    mileage: 18000,
    fuelType: 'Petrol',
    engine: '2.0L MPI',
    imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ed5d6?auto=format&fit=crop&w=800&q=80',
    available: true,
  },
];

export const TEST_DRIVE_PACKAGES: TestDrivePackage[] = [
  { id: 'pkg_2h', durationLabel: '2 Hours', hours: 2, price: 4000 },
  { id: 'pkg_4h', durationLabel: '4 Hours', hours: 4, price: 7000 },
  { id: 'pkg_8h', durationLabel: '8 Hours', hours: 8, price: 10000 },
];

export const ADDON_PRICES = {
  EXTRA_PERSON: 1000,
  MEAL_COMBO: 500,
};

export const BANK_PARTNER = "City Bank";

export const FINANCING_OPTIONS = {
  CITY_BANK: {
    name: "City Bank",
    description: "Unlock your Car Dreams with City Bank Auto Loan.",
    features: [
      "Loan BDT 4 Lac - BDT 60 Lac",
      "Up to 70% financing (Hybrid/Electric)",
      "Tenure 12 - 72 months",
      "No hidden charges"
    ],
    constraints: {
      minLoan: 400000,
      maxLoan: 6000000,
      minTenure: 12,
      maxTenure: 72,
      interestRate: 10.5, // Approx standard
    },
    eligibility: {
      minAge: 22,
      maxAge: 65,
      income: {
        salaried: 40000,
        others: 60000,
      }
    },
    documents: {
      common: [
        "Photocopy of National ID (NID/Smart Card)",
        "3 copies of recent passport size photograph",
        "E-TIN/latest Tax clearance certificate",
        "Valid Car Quotation with applicant's signature"
      ],
      segments: {
        Salaried: [
          "Salary certificate / LOI / Pay slip",
          "Bank Statement for last 6 months",
          "Copy of Office ID/Visiting Card"
        ],
        Businessman: [
          "Trade license (Recent 2 years)",
          "Company bank statement (12 months)",
          "Personal bank statement (12 months)",
          "Company TIN, BIN, Memorandum (if applicable)"
        ],
        Professional: [
          "Professional Certificate/ID",
          "Income supporting documents",
          "Personal bank statement (6 months)"
        ]
      }
    }
  },
  EBL: {
    name: "Eastern Bank PLC",
    description: "Drive your dream car with EBL Auto Loan.",
    link: "https://ebl.com.bd/retail-loan/EBL-Auto-Loan",
    features: [
      "Competitive Interest Rates",
      "Quick Processing",
      "Flexible Tenure",
      "Financing for New & Reconditioned Cars"
    ]
  }
};

export const PREDICTIVE_SEARCH_DATA = [
  "Audi A3", "Audi A4", "Audi A5", "Audi A6", "Audi A7", "Audi A8L", "Audi Q2", "Audi Q3", "Audi Q5", "Audi Q7", "Audi Q8", "Audi RS Q8",
  "BMW Series 2", "BMW Series 3", "BMW Series 5", "BMW Series 7", "BMW X1", "BMW X2", "BMW X3", "BMW X5", "BMW X7",
  "Foton SUV", "Foton Microbus",
  "Haval H6 SUV", "Haval H9 SUV", "Haval JOLION",
  "Honda Accord Turbo", "Honda City", "Honda Civic Turbo", "Honda CR-V Turbo", "Honda Fit", "Honda Grace", "Honda HR-V", "Honda Vezel Lx", "Honda Vezel Ex",
  "Hyundai Accent", "Hyundai Creta", "Hyundai Elantra", "Hyundai H1", "Hyundai Santa FE", "Hyundai Sonata", "Hyundai Tucson",
  "KIA Optima", "KIA Seltos", "KIA Sonet", "KIA Sportage",
  "Lexus ES 300H", "Lexus LC500H", "Lexus NX", "Lexus RX350",
  "Mahindra TUV300", "Mahindra XUV300", "Mahindra Bolero", "Mahindra SCORPIO",
  "Mazda 6 GRAND TOURING", "Mazda AXELA", "Mazda CX-3", "Mazda MX-5",
  "Mercedes-Benz B-CLASS", "Mercedes-Benz CLA", "Mercedes-Benz E-CLASS", "Mercedes-Benz GLC 43 AMG", "Mercedes-Benz GLC 220D", "Mercedes-Benz GLC 250", "Mercedes-Benz GLC 300D",
  "MG GLOSTER", "MG HS", "MG MG3", "MG ZS",
  "Mitsubishi ASX", "Mitsubishi ATTRAGE", "Mitsubishi L200", "Mitsubishi LANCER EX", "Mitsubishi OUTLANDER", "Mitsubishi PAJERO", "Mitsubishi XPANDER", "Mitsubishi ROSA",
  "Nissan NAVARA", "Nissan PATROL", "Nissan SYLPHY", "Nissan URVAN", "Nissan GTR", "Nissan X-TRAIL",
  "Peugeot 2008 SUV", "Peugeot 3008", "Peugeot 508",
  "Proton PERSONA", "Proton SAGA", "Proton X70 EXECUTIVE", "Proton X70 PREMIUM",
  "Land Rover DEFENDER", "Land Rover DISCOVERY", "Range Rover EVOQUE", "Range Rover SPORT", "Range Rover VELAR",
  "Renault DUSTER", "Renault KWID", "Renault TRIBER",
  "Suzuki ALTO 800", "Suzuki APV", "Suzuki CIAZ", "Suzuki DZIRE", "Suzuki ERTIGA", "Suzuki GRAND VITARA", "Suzuki SWIFT", "Suzuki WAGON R",
  "Tata ALTROZ", "Tata HARRIER", "Tata INDIGO ECS", "Tata MAGIC IRIS", "Tata NANO", "Tata NEXON", "Tata TIAGO", "Tata XENON",
  "Toyota ALLION", "Toyota ALPHARD HYBRID", "Toyota AQUA", "Toyota AVANZA", "Toyota AXIO", "Toyota C-HR HYBRID", "Toyota CAMRY", "Toyota COROLLA ALTIS", "Toyota COROLLA CROSS", "Toyota CROWN ROYAL", "Toyota FORTUNER", "Toyota HARRIER", "Toyota HIACE", "Toyota HILUX", "Toyota LAND CRUISER PRADO", "Toyota PREMIO", "Toyota PRIUS", "Toyota PROBOX", "Toyota RAV4", "Toyota RUSH", "Toyota VITZ", "Toyota YARIS",
  "Volvo S90 Hybrid", "Volvo V60 T5",
  "Lamborghini Huracan",
  "Volkswagen Touareg",
  "Jaguar XJ", "Jaguar F pace", "Jaguar XF",
  "Porsche 718 Boxster", "Porsche Panamera", "Porsche Macan", "Porsche 718 Cayman", "Porsche Taycan", "Porsche Cayenne",
  "Ford Mustang", "Ford RAPTOR", "Ford Eco Sport", "Ford RANGER",
  "Tesla MODEL 3", "Tesla MODEL S", "Tesla MODEL Y",
  "Bentley Genesis", "Bentley Continental", "Bentley Bentayga", "Bentley Flying Spur",
  "Subaru Impreza WRX", "Subaru XV", "Subaru Legacy",
  "Ferrari 458 Italia", "Ferrari 328 GTS", "Ferrari F430",
  "Hummer H2",
  "Cadillac Escalade", "Cadillac CTS",
  "Rolls-Royce Wraith", "Rolls-Royce Ghost", "Rolls-Royce Phantom",
  "Maserati Levante", "Maserati Quattroporte",
  "Chevrolet Camero", "Chevrolet Spark", "Chevrolet Trailblazer"
];
