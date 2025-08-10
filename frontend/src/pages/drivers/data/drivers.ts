// Drivers page data - job opportunities, testimonials, and process information
export const driverPositions = [
  {
    id: 1,
    titleKey: "drivers.positions.jobs.ceCategoryDriver",
    locationKey: "drivers.positions.categories.international",
    salary: "€2,500 - €3,500",
    type: "Full-time",
    experience: "3+ years",
    benefits: ["benefits.healthInsurance", "benefits.paidLeave", "benefits.performanceBonus", "benefits.modernFleet"],
    requirements: ["requirements.ceLicense", "requirements.medicalCertificate", "requirements.cleanRecord", "requirements.englishB1"],
    descriptionKey: "drivers.positions.descriptions.ceCategoryDriver"
  },
  {
    id: 2,
    titleKey: "drivers.positions.jobs.localDeliveryDriver",
    locationKey: "drivers.positions.locations.lithuania",
    salary: "€1,800 - €2,200",
    type: "Full-time",
    experience: "1+ year",
    benefits: ["benefits.flexibleHours", "benefits.healthInsurance", "benefits.companyVehicle", "benefits.familyTime"],
    requirements: ["requirements.bcLicense", "requirements.medicalCertificate", "requirements.cleanRecord", "requirements.localLanguage"],
    descriptionKey: "drivers.positions.descriptions.localDeliveryDriver"
  },
  {
    id: 3,
    titleKey: "drivers.positions.jobs.refrigeratedTransportDriver",
    locationKey: "drivers.positions.locations.netherlands",
    salary: "€2,800 - €3,800",
    type: "Full-time",
    experience: "3+ years",
    benefits: ["benefits.premiumPay", "benefits.specializedTraining", "benefits.modernEquipment", "benefits.healthInsurance"],
    requirements: ["requirements.ceLicense", "requirements.coldChainExperience", "requirements.medicalCertificate", "requirements.englishB1"],
    descriptionKey: "drivers.positions.descriptions.refrigeratedTransportDriver"
  },
  {
    id: 4,
    titleKey: "drivers.positions.jobs.expressDeliveryDriver",
    locationKey: "drivers.positions.locations.germany",
    salary: "€2,200 - €3,000",
    type: "Full-time",
    experience: "2+ years",
    benefits: ["benefits.flexibleHours", "benefits.performanceBonus", "benefits.healthInsurance", "benefits.modernFleet"],
    requirements: ["requirements.cceLicense", "requirements.medicalCertificate", "requirements.cleanRecord", "requirements.germanB1"],
    descriptionKey: "drivers.positions.descriptions.expressDeliveryDriver"
  },
  {
    id: 5,
    titleKey: "drivers.positions.jobs.heavyGoodsVehicleDriver",
    locationKey: "drivers.positions.locations.belgium",
    salary: "€2,500 - €3,200",
    type: "Full-time",
    experience: "4+ years",
    benefits: ["benefits.comprehensiveTraining", "benefits.careerDevelopment", "benefits.competitiveSalary", "benefits.healthInsurance"],
    requirements: ["requirements.ceLicense", "requirements.heavyVehicleExperience", "requirements.medicalCertificate", "requirements.frenchDutchB1"],
    descriptionKey: "drivers.positions.descriptions.heavyGoodsVehicleDriver"
  },
  {
    id: 6,
    titleKey: "drivers.positions.jobs.internationalFreightDriver",
    locationKey: "drivers.positions.locations.europe-wide",
    salary: "€3,000 - €4,000",
    type: "Full-time",
    experience: "5+ years",
    benefits: ["benefits.internationalTravel", "benefits.premiumPay", "benefits.modernFleet", "benefits.comprehensiveInsurance"],
    requirements: ["requirements.ceLicense", "requirements.internationalExperience", "requirements.medicalCertificate", "requirements.englishB2"],
    descriptionKey: "drivers.positions.descriptions.internationalFreightDriver"
  }
];

export const driverTestimonials = [
  {
    id: 1,
    name: "Mikhail Petrov",
    positionKey: "drivers.positions.jobs.ceCategoryDriver",
    company: "European Logistics Ltd",
    rating: 5,
    commentKey: "drivers.testimonials.items.1.comment",
    resultsKey: "drivers.testimonials.items.1.results"
  },
  {
    id: 2,
    name: "Anna Kowalska",
    positionKey: "drivers.positions.jobs.localDeliveryDriver",
    company: "Polish Distribution Co",
    rating: 5,
    commentKey: "drivers.testimonials.items.2.comment",
    resultsKey: "drivers.testimonials.items.2.results"
  },
  {
    id: 3,
    name: "Hans Mueller",
    positionKey: "drivers.positions.jobs.internationalFreightDriver",
    company: "German Express",
    rating: 5,
    commentKey: "drivers.testimonials.items.3.comment",
    resultsKey: "drivers.testimonials.items.3.results"
  },
  {
    id: 4,
    name: "Pierre Dubois",
    positionKey: "drivers.positions.jobs.refrigeratedTransportDriver",
    company: "Dutch Cold Chain",
    rating: 5,
    commentKey: "drivers.testimonials.items.4.comment",
    resultsKey: "drivers.testimonials.items.4.results"
  }
];

export const driverProcess = [
  {
    step: 1,
    titleKey: "drivers.process.submitApplication.title",
    descriptionKey: "drivers.process.submitApplication.description",
    durationKey: "drivers.process.submitApplication.duration",
    icon: "document"
  },
  {
    step: 2,
    titleKey: "drivers.process.weReviewAndMatch.title",
    descriptionKey: "drivers.process.weReviewAndMatch.description",
    durationKey: "drivers.process.weReviewAndMatch.duration",
    icon: "search"
  },
  {
    step: 3,
    titleKey: "drivers.process.interviewAndSelection.title",
    descriptionKey: "drivers.process.interviewAndSelection.description",
    durationKey: "drivers.process.interviewAndSelection.duration",
    icon: "check"
  }
];

export const driverRequirements = [
  {
    categoryKey: "drivers.requirements.personalDocuments",
    items: [
      "drivers.requirements.items.validDrivingLicense",
      "drivers.requirements.items.medicalCertificate",
      "drivers.requirements.items.passportOrIdCard",
      "drivers.requirements.items.cleanCriminalRecord"
    ]
  },
  {
    categoryKey: "drivers.requirements.professionalExperience",
    items: [
      "drivers.requirements.items.relevantDrivingExperience",
      "drivers.requirements.items.trainingCertificates",
      "drivers.requirements.items.employmentHistory",
      "drivers.requirements.items.referenceLetters"
    ]
  },
  {
    categoryKey: "drivers.requirements.languageSkills",
    items: [
      "drivers.requirements.items.basicEnglish",
      "drivers.requirements.items.localLanguage",
      "drivers.requirements.items.communicationSkills",
      "drivers.requirements.items.documentationReading"
    ]
  }
];

export const driverStats = [
  { number: "2000+", labelKey: "drivers.hero.stats.driversPlaced", icon: "users" },
  { number: "8", labelKey: "drivers.hero.stats.europeanCountries", icon: "globe" },
  { number: "95%", labelKey: "drivers.hero.stats.driverSatisfaction", icon: "star" },
  { number: "24h", labelKey: "drivers.hero.stats.responseTime", icon: "clock" }
];

export const driverBenefits = [
  {
    titleKey: "drivers.benefits.competitiveSalaries.title",
    descriptionKey: "drivers.benefits.competitiveSalaries.description",
    icon: "money",
    details: [
      "drivers.benefits.competitiveSalaries.details.0",
      "drivers.benefits.competitiveSalaries.details.1",
      "drivers.benefits.competitiveSalaries.details.2",
      "drivers.benefits.competitiveSalaries.details.3"
    ]
  },
  {
    titleKey: "drivers.benefits.excellentBenefits.title",
    descriptionKey: "drivers.benefits.excellentBenefits.description",
    icon: "shield-check",
    details: [
      "drivers.benefits.excellentBenefits.details.0",
      "drivers.benefits.excellentBenefits.details.1",
      "drivers.benefits.excellentBenefits.details.2",
      "drivers.benefits.excellentBenefits.details.3"
    ]
  },
  {
    titleKey: "drivers.benefits.modernEquipment.title",
    descriptionKey: "drivers.benefits.modernEquipment.description",
    icon: "truck",
    details: [
      "drivers.benefits.modernEquipment.details.0",
      "drivers.benefits.modernEquipment.details.1",
      "drivers.benefits.modernEquipment.details.2",
      "drivers.benefits.modernEquipment.details.3"
    ]
  },
  {
    titleKey: "drivers.benefits.careerGrowth.title",
    descriptionKey: "drivers.benefits.careerGrowth.description",
    icon: "trending-up",
    details: [
      "drivers.benefits.careerGrowth.details.0",
      "drivers.benefits.careerGrowth.details.1",
      "drivers.benefits.careerGrowth.details.2",
      "drivers.benefits.careerGrowth.details.3"
    ]
  }
];

export const driverJobCategories = [
  { id: 'international', nameKey: 'drivers.positions.categories.international', count: 2, avgSalary: '€3,200' },
  { id: 'local', nameKey: 'drivers.positions.categories.local', count: 2, avgSalary: '€2,000' },
  { id: 'specialized', nameKey: 'drivers.positions.categories.specialized', count: 1, avgSalary: '€3,500' },
  { id: 'express', nameKey: 'drivers.positions.categories.express', count: 1, avgSalary: '€2,600' }
];

export const driverLocations = [
  { id: 'lithuania', nameKey: 'drivers.positions.locations.lithuania', count: 1, avgSalary: '€2,000' },
  { id: 'netherlands', nameKey: 'drivers.positions.locations.netherlands', count: 1, avgSalary: '€3,300' },
  { id: 'germany', nameKey: 'drivers.positions.locations.germany', count: 1, avgSalary: '€2,600' },
  { id: 'belgium', nameKey: 'drivers.positions.locations.belgium', count: 1, avgSalary: '€2,850' },
  { id: 'europe-wide', nameKey: 'drivers.positions.locations.europe-wide', count: 1, avgSalary: '€3,500' },
  { id: 'poland', nameKey: 'drivers.positions.locations.poland', count: 1, avgSalary: '€2,250' }
];
