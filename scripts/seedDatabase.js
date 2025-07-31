require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("../models/Category");
const Shop = require("../models/Shop");
const connectDB = require("../config/database");
const categoryData = {
  "Woman's Fashion": [
    "Clothing",
    "Shoes",
    "Jewelry",
    "Handbags",
    "Accessories",
    "Lingerie & Sleepwear",
    "Traditional Wear",
  ],
  "Men's Fashion": [
    "Clothing",
    "Shoes",
    "Watches",
    "Accessories",
    "Bags",
    "Traditional Wear",
  ],
  Electronics: [
    "Smartphones",
    "Laptops",
    "Tablets",
    "Cameras",
    "TVs",
    "Audio Devices",
    "Gaming Consoles",
    "Smart Home",
    "Computer Accessories",
  ],
  "Home & Lifestyle": [
    "Furniture",
    "Kitchen & Dining",
    "Bedding",
    "Home Decor",
    "Storage & Organization",
    "Lighting",
    "Garden & Outdoor",
    "Home Appliances",
  ],
  Medicine: [
    "Prescription Medicines",
    "Over-the-Counter Drugs",
    "First Aid",
    "Vitamins & Supplements",
    "Healthcare Devices",
    "Personal Care",
    "Ayurvedic Medicines",
  ],
  "Sports & Outdoor": [
    "Exercise Equipment",
    "Sportswear",
    "Outdoor Recreation",
    "Team Sports",
    "Cycling",
    "Camping Gear",
    "Swimming",
    "Fitness Accessories",
  ],
  "Baby's & Toys": [
    "Baby Clothing",
    "Diapers & Wipes",
    "Feeding",
    "Baby Care",
    "Strollers & Gear",
    "Educational Toys",
    "Action Figures",
    "Board Games",
    "Arts & Crafts",
  ],
  "Groceries & Pets": [
    "Fresh Food",
    "Packaged Food",
    "Beverages",
    "Household Supplies",
    "Pet Food",
    "Pet Supplies",
    "Pet Accessories",
    "Pet Healthcare",
  ],
  "Health & Beauty": [
    "Skincare",
    "Makeup",
    "Hair Care",
    "Fragrances",
    "Personal Care",
    "Beauty Tools",
    "Men's Grooming",
    "Health Monitors",
  ],
  "Gaming Controllers": [
    "Wireless Controllers",
    "Wired Controllers",
    "Racing Wheels",
    "Flight Sticks",
    "Fight Sticks",
    "Nintendo Controllers",
    "Xbox Controllers",
    "PlayStation Controllers",
  ],
  Keyboards: [
    "Mechanical Keyboards",
    "Membrane Keyboards",
    "Wireless Keyboards",
    "Gaming Keyboards",
    "Ergonomic Keyboards",
    "Mini Keyboards",
    "Keyboard Accessories",
  ],
  "Mice & Pointing": [
    "Gaming Mice",
    "Wireless Mice",
    "Ergonomic Mice",
    "Trackballs",
    "Vertical Mice",
    "Mouse Bundles",
    "Precision Mice",
  ],
  "Monitors & Displays": [
    "Gaming Monitors",
    "Ultra-wide Monitors",
    "4K Monitors",
    "Curved Monitors",
    "Portable Monitors",
    "Professional Monitors",
    "Monitor Arms",
    "Monitor Accessories",
  ],
  "Audio Equipment": [
    "Gaming Headsets",
    "Wireless Headphones",
    "Earbuds",
    "Speakers",
    "Microphones",
    "Sound Cards",
    "Audio Interfaces",
    "DACs & Amplifiers",
  ],
  "Gaming Furniture": [
    "Gaming Chairs",
    "Gaming Desks",
    "Monitor Stands",
    "Cable Management",
    "Desk Mats",
    "Footrests",
    "Storage Solutions",
    "RGB Lighting",
  ],
  "PC Components": [
    "Graphics Cards",
    "Processors",
    "Motherboards",
    "RAM",
    "Storage Drives",
    "Power Supplies",
    "PC Cases",
    "Cooling Systems",
  ],
  Networking: [
    "Gaming Routers",
    "Network Cards",
    "WiFi Adapters",
    "Network Cables",
    "Switches",
    "Powerline Adapters",
    "Network Tools",
  ],
  "Streaming Equipment": [
    "Capture Cards",
    "Stream Decks",
    "Webcams",
    "Green Screens",
    "Studio Lighting",
    "Stream Controllers",
    "Recording Equipment",
  ],
  "Gaming Accessories": [
    "Mouse Pads",
    "Wrist Rests",
    "Controller Skins",
    "Gaming Glasses",
    "Console Stands",
    "Carrying Cases",
    "Screen Protectors",
  ],
  "Virtual Reality": [
    "VR Headsets",
    "VR Controllers",
    "Base Stations",
    "VR Accessories",
    "VR Cables",
    "VR Face Covers",
    "VR Storage",
  ],
  "Console Gaming": [
    "PlayStation",
    "Xbox",
    "Nintendo",
    "Retro Gaming",
    "Console Accessories",
    "Digital Cards",
    "Gaming Subscriptions",
  ],
  "Mobile Gaming": [
    "Phone Controllers",
    "Tablet Controllers",
    "Mobile Cooling",
    "Power Banks",
    "Gaming Phones",
    "Mobile Accessories",
    "Bluetooth Adapters",
  ],
  "Software & Services": [
    "Gaming Software",
    "Antivirus",
    "Game Keys",
    "Gift Cards",
    "Design Software",
    "Productivity Apps",
    "Cloud Storage",
  ],
};
const productData = [
  {
    name: "Elegant Summer Dress",
    price: 49.99,
    discountPercentage: 15,
    rating: 4.6,
    reviews: 160,
    category: "Woman's Fashion",
    subCategory: "Clothing",
    image: "https://i.ibb.co/XcdGxJW/summerdress.png",
    description:
      "Breathable cotton summer dress with floral pattern, perfect for casual outings and beach vacations.",
    stock: 38,
    brand: "StyleChic",
    features: [
      "100% cotton material",
      "Floral pattern design",
      "Side pockets",
      "Adjustable straps",
      "Machine washable",
    ],
  },
  {
    name: "Designer Handbag",
    price: 129.99,
    discountPercentage: 10,
    rating: 4.8,
    category: "Woman's Fashion",
    subCategory: "Handbags",
    image: "https://i.ibb.co/TDH9j55H/designerhandbag.png",
    description:
      "Premium faux leather designer handbag with gold accents and multiple compartments for organization.",
    stock: 25,
    brand: "LuxeBag",
    features: [
      "Premium faux leather",
      "Gold-plated hardware",
      "Multiple compartments",
      "Adjustable shoulder strap",
      "Interior zippered pocket",
    ],
  },

  {
    name: "Business Casual Blazer",
    price: 89.99,
    discountPercentage: 20,
    rating: 4.5,
    category: "Men's Fashion",
    subCategory: "Clothing",
    image: "https://i.ibb.co/whWG5SNV/blazzer.png",
    description:
      "Smart-casual blazer for men with slim fit design, perfect for office and formal events.",
    stock: 40,
    brand: "GentlemanFit",
    features: [
      "Slim fit design",
      "Premium cotton blend",
      "Two-button closure",
      "Three interior pockets",
      "Available in multiple colors",
    ],
  },
  {
    name: "Luxury Chronograph Watch",
    price: 199.99,
    discountPercentage: 15,
    rating: 4.9,
    category: "Men's Fashion",
    subCategory: "Watches",
    image: "https://i.ibb.co/Txwrc83c/luxary-watch.png",
    description:
      "Stainless steel chronograph watch with genuine leather strap and water-resistant design.",
    stock: 15,
    brand: "TimeMaster",
    features: [
      "Japanese quartz movement",
      "Genuine leather strap",
      "Water-resistant (50m)",
      "Luminous hands",
      "Sapphire crystal glass",
    ],
  },

  {
    name: "Ultra HD Smart TV",
    price: 799.99,
    discountPercentage: 12,
    rating: 4.7,
    category: "Electronics",
    subCategory: "TVs",
    image: "https://i.ibb.co/1ffNhgJ7/smarttv.png",
    description:
      "55-inch 4K Ultra HD Smart TV with HDR support, built-in streaming apps and voice control.",
    stock: 20,
    brand: "VisionTech",
    features: [
      "4K Ultra HD resolution",
      "HDR10+ support",
      "Smart TV with built-in apps",
      "Voice control compatible",
      "Multiple HDMI and USB ports",
    ],
  },
  {
    name: "Professional DSLR Camera",
    price: 1299.99,
    discountPercentage: 8,
    rating: 4.8,
    category: "Electronics",
    subCategory: "Cameras",
    image: "https://i.ibb.co/prLzXvpY/camera.png",
    description:
      "High-performance DSLR camera with 24.2MP sensor, 4K video recording and advanced autofocus system.",
    stock: 12,
    brand: "CapturePro",
    features: [
      "24.2MP APS-C CMOS sensor",
      "4K video recording",
      "45-point autofocus system",
      "3-inch vari-angle touchscreen",
      "Built-in Wi-Fi and Bluetooth",
    ],
  },

  {
    name: "Modern Coffee Table",
    price: 199.99,
    discountPercentage: 10,
    rating: 4.5,
    category: "Home & Lifestyle",
    subCategory: "Furniture",
    image: "https://i.ibb.co/dJmYZnL6/moderncoffe.png",
    description:
      "Stylish mid-century modern coffee table with wooden legs and tempered glass top, perfect for living rooms.",
    stock: 18,
    brand: "HomeElegance",
    features: [
      "Tempered glass top",
      "Solid wood legs",
      "Storage shelf",
      "Easy assembly",
      "Stain-resistant finish",
    ],
  },
  {
    name: "Premium Bedding Set",
    price: 129.99,
    discountPercentage: 15,
    rating: 4.7,
    category: "Home & Lifestyle",
    subCategory: "Bedding",
    image: "https://i.ibb.co/nN5nfsdZ/bedshit.png",
    description:
      "Luxury Egyptian cotton bedding set including duvet cover, fitted sheet, and pillowcases with elegant design.",
    stock: 30,
    brand: "DreamSleep",
    features: [
      "100% Egyptian cotton",
      "600 thread count",
      "Hypoallergenic",
      "Wrinkle-resistant",
      "Machine washable",
    ],
  },

  {
    name: "Digital Blood Pressure Monitor",
    price: 49.99,
    discountPercentage: 20,
    rating: 4.6,
    category: "Medicine",
    subCategory: "Healthcare Devices",
    image: "",
    description:
      "Accurate digital blood pressure monitor with large display and memory function for home use.",
    stock: 45,
    brand: "MediSense",
    features: [
      "LCD display",
      "Irregular heartbeat detection",
      "90 memory records",
      "One-touch operation",
      "Portable design",
    ],
  },
  {
    name: "Multivitamin Supplement",
    price: 24.99,
    discountPercentage: 5,
    rating: 4.5,
    category: "Medicine",
    subCategory: "Vitamins & Supplements",
    image: "",
    description:
      "Complete daily multivitamin supplement with essential vitamins and minerals for overall health support.",
    stock: 100,
    brand: "VitalNutrient",
    features: [
      "Contains 23 essential vitamins and minerals",
      "Once daily formula",
      "Vegetarian friendly",
      "No artificial preservatives",
      "Supports immune health",
    ],
  },

  {
    name: "Professional Yoga Mat",
    price: 39.99,
    discountPercentage: 15,
    rating: 4.7,
    category: "Sports & Outdoor",
    subCategory: "Exercise Equipment",
    image: "",
    description:
      "Non-slip yoga mat with optimal cushioning and carrying strap, perfect for yoga, pilates and floor exercises.",
    stock: 50,
    brand: "ZenFit",
    features: [
      "Non-slip surface",
      "6mm thickness for comfort",
      "Eco-friendly TPE material",
      "Carrying strap included",
      "Easy to clean",
    ],
  },
  {
    name: "Mountain Hiking Backpack",
    price: 79.99,
    discountPercentage: 10,
    rating: 4.8,
    category: "Sports & Outdoor",
    subCategory: "Outdoor Recreation",
    image: "",
    description:
      "Durable 50L hiking backpack with hydration system compatibility, multiple compartments and weather protection.",
    stock: 25,
    brand: "TrailMaster",
    features: [
      "50L capacity",
      "Waterproof rain cover",
      "Hydration system compatible",
      "Adjustable straps",
      "Multiple storage compartments",
    ],
  },

  {
    name: "Adjustable Baby Stroller",
    price: 199.99,
    discountPercentage: 15,
    rating: 4.7,
    category: "Baby's & Toys",
    subCategory: "Strollers & Gear",
    image: "",
    description:
      "Lightweight, adjustable baby stroller with reclining seat, storage basket and one-hand folding mechanism.",
    stock: 18,
    brand: "BabyComfort",
    features: [
      "Lightweight aluminum frame",
      "Multi-position reclining seat",
      "Large storage basket",
      "5-point safety harness",
      "One-hand folding mechanism",
    ],
  },
  {
    name: "Educational Building Blocks",
    price: 29.99,
    discountPercentage: 20,
    rating: 4.9,
    category: "Baby's & Toys",
    subCategory: "Educational Toys",
    image: "",
    description:
      "Colorful building blocks set for kids ages 3-8, designed to enhance creativity and cognitive development.",
    stock: 40,
    brand: "SmartKids",
    features: [
      "100 pieces set",
      "Non-toxic materials",
      "Various shapes and colors",
      "Compatible with major brands",
      "Storage container included",
    ],
  },

  {
    name: "Organic Coffee Beans",
    price: 14.99,
    discountPercentage: 5,
    rating: 4.8,
    category: "Groceries & Pets",
    subCategory: "Packaged Food",
    image: "",
    description:
      "Premium organic dark roast coffee beans sourced from sustainable farms with rich, bold flavor.",
    stock: 75,
    brand: "BeanMaster",
    features: [
      "100% Arabica beans",
      "USDA certified organic",
      "Fair trade certified",
      "Dark roast profile",
      "Resealable packaging",
    ],
  },
  {
    name: "Premium Dog Food",
    price: 49.99,
    discountPercentage: 10,
    rating: 4.7,
    category: "Groceries & Pets",
    subCategory: "Pet Food",
    image: "",
    description:
      "All-natural dry dog food with real meat as the first ingredient, enriched with vitamins and minerals.",
    stock: 30,
    brand: "NutriPaws",
    features: [
      "Real chicken as first ingredient",
      "No artificial preservatives",
      "Added vitamins and minerals",
      "Supports healthy digestion",
      "Suitable for all life stages",
    ],
  },

  {
    name: "Anti-Aging Skincare Set",
    price: 79.99,
    discountPercentage: 15,
    rating: 4.8,
    category: "Health & Beauty",
    subCategory: "Skincare",
    image: "",
    description:
      "Complete anti-aging skincare regimen including cleanser, serum, moisturizer and eye cream with natural ingredients.",
    stock: 25,
    brand: "GlowRadiance",
    features: [
      "Vitamin C and retinol formula",
      "Hyaluronic acid for hydration",
      "Paraben and sulfate free",
      "Suitable for all skin types",
      "Cruelty-free",
    ],
  },
  {
    name: "Professional Hair Dryer",
    price: 59.99,
    discountPercentage: 10,
    rating: 4.6,
    category: "Health & Beauty",
    subCategory: "Beauty Tools",
    image: "",
    description:
      "Salon-quality hair dryer with ionic technology, multiple heat settings and concentrator attachment.",
    stock: 35,
    brand: "StylePro",
    features: [
      "1875W power",
      "Ionic technology",
      "3 heat and 2 speed settings",
      "Cool shot button",
      "Concentrator attachment included",
    ],
  },
  {
    name: "Pro Gaming Controller",
    price: 59.99,
    discountPercentage: 15,
    rating: 4.5,
    category: "Gaming Controllers",
    subCategory: "Wireless Controllers",
    image: "https://i.ibb.co/MXLxdSH/gamepad.png",
    description:
      "Professional-grade wireless gaming controller with customizable buttons and low latency connection for competitive gaming.",
    stock: 45,
    brand: "GameMaster",
    features: [
      "50-hour battery life",
      "Customizable buttons",
      "Low latency connection",
      "Ergonomic design",
      "Compatible with PC and console",
    ],
  },
  {
    name: "Mechanical RGB Keyboard",
    price: 129.99,
    discountPercentage: 10,
    rating: 4.8,
    category: "Keyboards",
    subCategory: "Mechanical Keyboards",
    image: "https://i.ibb.co/0RXSS35q/keyboard.png",
    description:
      "Full-sized mechanical keyboard with RGB backlighting, Cherry MX switches, and programmable macros for gaming and productivity.",
    stock: 30,
    brand: "TypeMaster",
    features: [
      "Cherry MX Blue switches",
      "Per-key RGB lighting",
      "Aluminum frame",
      "Programmable macros",
      "USB passthrough",
    ],
  },
  {
    name: "Precision Gaming Mouse",
    price: 49.99,
    discountPercentage: 20,
    rating: 4.7,
    category: "Mice & Pointing",
    subCategory: "Gaming Mice",
    image: "https://i.ibb.co/SwP65xyk/gaming-mouse.png",
    description:
      "High-precision gaming mouse with adjustable DPI settings, ergonomic design and customizable weight system.",
    stock: 60,
    brand: "ClickMaster",
    features: [
      "16000 DPI optical sensor",
      "8 programmable buttons",
      "Adjustable weight system",
      "RGB lighting",
      "Onboard memory profiles",
    ],
  },
  {
    name: "Wired Xbox Controller",
    price: 39.99,
    discountPercentage: 5,
    rating: 4.3,
    category: "Gaming Controllers",
    subCategory: "Xbox Controllers",
    image: "https://i.ibb.co/xtH2dBSc/wireless-controller.png",
    description:
      "Official wired Xbox controller with improved D-pad and textured grip for enhanced comfort during long gaming sessions.",
    stock: 25,
    brand: "Microsoft",
    features: [
      "3.5mm stereo headset jack",
      "Textured grip",
      "Improved D-pad",
      "Button mapping",
      "Compatible with Xbox and PC",
    ],
  },
  {
    name: "Wireless Ergonomic Keyboard",
    price: 89.99,
    discountPercentage: 12,
    rating: 4.6,
    category: "Keyboards",
    subCategory: "Ergonomic Keyboards",
    image: "https://i.ibb.co/7xYxM5sj/wirless-keyboard.png",
    description:
      "Split-design ergonomic keyboard with wireless connectivity, cushioned palm rest and quiet membrane keys for comfortable typing.",
    stock: 15,
    brand: "ComfortType",
    features: [
      "Split ergonomic design",
      "Wireless connectivity",
      "Cushioned palm rest",
      "Quiet membrane keys",
      "Long battery life",
    ],
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await Category.deleteMany({});
    await Shop.deleteMany({});

    console.log("Previous data cleared");

    const categoryMap = {};

    for (const [categoryName, subCategories] of Object.entries(categoryData)) {
      const category = new Category({
        name: categoryName,
        subCategories: subCategories,
      });

      const savedCategory = await category.save();
      categoryMap[categoryName] = savedCategory._id;

      console.log(
        `Category ${categoryName} added with ${subCategories.length} subcategories`
      );
    }

    for (const product of productData) {
      const newProduct = new Shop({
        ...product,
        categoryId: categoryMap[product.category],
      });

      await newProduct.save();
      console.log(`Added product: ${product.name}`);
    }

    console.log("Database seeded successfully!");

    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};
seedDatabase();
