// Drivers page data - job opportunities, testimonials, and process information
export const driverPositions = [
  {
    id: 1,
    title: "CE Category Driver",
    location: "International Routes",
    salary: "€2,500 - €3,500",
    type: "Full-time",
    experience: "3+ years",
    benefits: ["Health Insurance", "Paid Leave", "Performance Bonus", "Modern Fleet"],
    requirements: ["CE License", "Medical Certificate", "Clean Record", "English B1"],
    description: "Long-distance driving across Europe with competitive rates and excellent benefits."
  },
  {
    id: 2,
    title: "Local Delivery Driver",
    location: "Lithuania",
    salary: "€1,800 - €2,200",
    type: "Full-time",
    experience: "1+ year",
    benefits: ["Flexible Hours", "Health Insurance", "Company Vehicle", "Family Time"],
    requirements: ["B/C License", "Medical Certificate", "Clean Record", "Local Language"],
    description: "Local delivery routes with regular hours and family-friendly schedule."
  },
  {
    id: 3,
    title: "Refrigerated Transport Driver",
    location: "Netherlands",
    salary: "€2,800 - €3,800",
    type: "Full-time",
    experience: "3+ years",
    benefits: ["Premium Pay", "Specialized Training", "Modern Equipment", "Health Insurance"],
    requirements: ["CE License", "Cold Chain Experience", "Medical Certificate", "English B1"],
    description: "Specialized cold chain logistics with temperature-controlled vehicles."
  },
  {
    id: 4,
    title: "Express Delivery Driver",
    location: "Germany",
    salary: "€2,200 - €3,000",
    type: "Full-time",
    experience: "2+ years",
    benefits: ["Flexible Schedule", "Performance Bonus", "Health Insurance", "Modern Fleet"],
    requirements: ["C/CE License", "Medical Certificate", "Clean Record", "German B1"],
    description: "Fast-paced delivery with premium rates and flexible scheduling."
  },
  {
    id: 5,
    title: "Heavy Goods Vehicle Driver",
    location: "Belgium",
    salary: "€2,500 - €3,200",
    type: "Full-time",
    experience: "4+ years",
    benefits: ["Comprehensive Training", "Career Development", "Competitive Salary", "Health Insurance"],
    requirements: ["CE License", "Heavy Vehicle Experience", "Medical Certificate", "French/Dutch B1"],
    description: "Large vehicle operation with comprehensive benefits and training."
  },
  {
    id: 6,
    title: "International Freight Driver",
    location: "Europe-wide",
    salary: "€3,000 - €4,000",
    type: "Full-time",
    experience: "5+ years",
    benefits: ["International Travel", "Premium Pay", "Modern Fleet", "Comprehensive Insurance"],
    requirements: ["CE License", "International Experience", "Medical Certificate", "English B2"],
    description: "Cross-border freight transport with excellent compensation and modern fleet."
  }
];

export const driverTestimonials = [
  {
    id: 1,
    name: "Mikhail Petrov",
    position: "CE Category Driver",
    company: "European Logistics Ltd",
    rating: 5,
    comment: "Working with Logistic Workers has been amazing. They found me a great position with excellent pay and benefits. The support team is always available when I need help.",
    results: "€3,200/month salary, 4 weeks paid leave, health insurance"
  },
  {
    id: 2,
    name: "Anna Kowalska",
    position: "Local Delivery Driver",
    company: "Polish Distribution Co",
    rating: 5,
    comment: "I wanted to stay close to my family while having a good job. Logistic Workers found me the perfect local position with flexible hours and great benefits.",
    results: "€2,100/month salary, family-friendly schedule, company car"
  },
  {
    id: 3,
    name: "Hans Mueller",
    position: "International Freight Driver",
    company: "German Express",
    rating: 5,
    comment: "I've been driving internationally for 3 years now. The pay is excellent, the equipment is modern, and I get to see different countries. Highly recommended!",
    results: "€3,800/month salary, modern fleet, international travel"
  },
  {
    id: 4,
    name: "Pierre Dubois",
    position: "Refrigerated Transport Driver",
    company: "Dutch Cold Chain",
    rating: 5,
    comment: "The specialized training I received was excellent. I work with modern temperature-controlled vehicles and earn premium rates. Great career opportunity.",
    results: "€3,500/month salary, specialized training, modern equipment"
  }
];

export const driverProcess = [
  {
    step: 1,
    title: "Submit Application",
    description: "Fill out our application form with your experience and preferences",
    duration: "10 minutes",
    icon: "document"
  },
  {
    step: 2,
    title: "We Review & Match",
    description: "Our team reviews your profile and matches you with suitable positions",
    duration: "1-2 days",
    icon: "search"
  },
  {
    step: 3,
    title: "Interview & Selection",
    description: "Interview with companies and select the best opportunity for you",
    duration: "1 week",
    icon: "check"
  }
];

export const driverRequirements = [
  {
    category: "Personal Documents",
    items: [
      "Valid driving license",
      "Medical certificate",
      "Passport or ID card",
      "Clean criminal record"
    ]
  },
  {
    category: "Professional Experience",
    items: [
      "Relevant driving experience",
      "Training certificates",
      "Employment history",
      "Reference letters"
    ]
  },
  {
    category: "Language Skills",
    items: [
      "Basic English (B1 level)",
      "Local language (if required)",
      "Communication skills",
      "Documentation reading"
    ]
  }
];

export const driverStats = [
  { number: "2000+", label: "Drivers Placed", icon: "users" },
  { number: "8", label: "European Countries", icon: "globe" },
  { number: "95%", label: "Driver Satisfaction", icon: "star" },
  { number: "24h", label: "Response Time", icon: "clock" }
];

export const driverBenefits = [
  {
    title: "Competitive Salaries",
    description: "Earn €1,800 - €4,000 per month depending on experience and position",
    icon: "money",
    details: ["Above market rates", "Performance bonuses", "Overtime pay", "Holiday pay"]
  },
  {
    title: "Excellent Benefits",
    description: "Comprehensive benefits package including health insurance and paid leave",
    icon: "shield-check",
    details: ["Health insurance", "Paid vacation", "Sick leave", "Pension plan"]
  },
  {
    title: "Modern Equipment",
    description: "Work with the latest vehicles and technology for safety and comfort",
    icon: "truck",
    details: ["Modern fleet", "GPS navigation", "Safety equipment", "Comfort features"]
  },
  {
    title: "Career Growth",
    description: "Opportunities for advancement and specialized training programs",
    icon: "trending-up",
    details: ["Training programs", "Career advancement", "Skill development", "Certifications"]
  }
];

export const driverJobCategories = [
  { id: 'international', name: 'International Routes', count: 2, avgSalary: '€3,200' },
  { id: 'local', name: 'Local Positions', count: 2, avgSalary: '€2,000' },
  { id: 'specialized', name: 'Specialized Transport', count: 1, avgSalary: '€3,500' },
  { id: 'express', name: 'Express Delivery', count: 1, avgSalary: '€2,600' }
];

export const driverLocations = [
  { id: 'lithuania', name: 'Lithuania', count: 1, avgSalary: '€2,000' },
  { id: 'netherlands', name: 'Netherlands', count: 1, avgSalary: '€3,300' },
  { id: 'germany', name: 'Germany', count: 1, avgSalary: '€2,600' },
  { id: 'belgium', name: 'Belgium', count: 1, avgSalary: '€2,850' },
  { id: 'europe-wide', name: 'Europe-wide', count: 1, avgSalary: '€3,500' },
  { id: 'poland', name: 'Poland', count: 1, avgSalary: '€2,250' }
];
