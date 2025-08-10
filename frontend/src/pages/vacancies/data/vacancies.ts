// Vacancies data - job listings for the vacancies page
export const vacanciesData = [
  {
    id: 1,
    titleKey: 'vacancies.jobs.ceCategoryDriver',
    locationKey: 'vacancies.locations.internationalRoutes',
    locationId: 'internationalRoutes',
    descriptionKey: 'vacancies.descriptions.ceCategoryDriver',
    category: 'international',
    salary: "€2,500 - €3,500",
    type: "Full-time",
    experience: "3+ years",
    benefits: ["Health Insurance", "Paid Leave", "Performance Bonus"],
    company: "European Logistics Ltd",
    posted: "2024-01-15"
  },
  {
    id: 2,
    titleKey: 'vacancies.jobs.localDeliveryDriver',
    locationKey: 'vacancies.locations.lithuania',
    locationId: 'lithuania',
    descriptionKey: 'vacancies.descriptions.localDeliveryDriver',
    category: 'local',
    salary: "€1,800 - €2,200",
    type: "Full-time",
    experience: "1+ year",
    benefits: ["Flexible Hours", "Health Insurance", "Company Vehicle"],
    company: "Lithuanian Transport",
    posted: "2024-01-14"
  },
  {
    id: 3,
    titleKey: 'vacancies.jobs.warehouseToStoreDriver',
    locationKey: 'vacancies.locations.poland',
    locationId: 'poland',
    descriptionKey: 'vacancies.descriptions.warehouseToStoreDriver',
    category: 'local',
    salary: "€2,000 - €2,500",
    type: "Full-time",
    experience: "2+ years",
    benefits: ["Training Program", "Career Growth", "Modern Fleet"],
    company: "Polish Distribution Co",
    posted: "2024-01-13"
  },
  {
    id: 4,
    titleKey: 'vacancies.jobs.refrigeratedTransportDriver',
    locationKey: 'vacancies.locations.netherlands',
    locationId: 'netherlands',
    descriptionKey: 'vacancies.descriptions.refrigeratedTransportDriver',
    category: 'specialized',
    salary: "€2,800 - €3,800",
    type: "Full-time",
    experience: "3+ years",
    benefits: ["Premium Pay", "Specialized Training", "Modern Equipment"],
    company: "Dutch Cold Chain",
    posted: "2024-01-12"
  },
  {
    id: 5,
    titleKey: 'vacancies.jobs.expressDeliveryDriver',
    locationKey: 'vacancies.locations.germany',
    locationId: 'germany',
    descriptionKey: 'vacancies.descriptions.expressDeliveryDriver',
    category: 'express',
    salary: "€2,200 - €3,000",
    type: "Full-time",
    experience: "2+ years",
    benefits: ["Flexible Schedule", "Performance Bonus", "Health Insurance"],
    company: "German Express",
    posted: "2024-01-11"
  },
  {
    id: 6,
    titleKey: 'vacancies.jobs.heavyGoodsVehicleDriver',
    locationKey: 'vacancies.locations.belgium',
    locationId: 'belgium',
    descriptionKey: 'vacancies.descriptions.heavyGoodsVehicleDriver',
    category: 'heavy',
    salary: "€2,500 - €3,200",
    type: "Full-time",
    experience: "4+ years",
    benefits: ["Comprehensive Training", "Career Development", "Competitive Salary"],
    company: "Belgian Heavy Transport",
    posted: "2024-01-10"
  },
  {
    id: 7,
    titleKey: 'vacancies.jobs.internationalFreightDriver',
    locationKey: 'vacancies.locations.europe-wide',
    locationId: 'europe-wide',
    descriptionKey: 'vacancies.descriptions.internationalFreightDriver',
    category: 'international',
    salary: "€3,000 - €4,000",
    type: "Full-time",
    experience: "5+ years",
    benefits: ["International Travel", "Premium Pay", "Modern Fleet"],
    company: "European Freight Solutions",
    posted: "2024-01-09"
  },
  {
    id: 8,
    titleKey: 'vacancies.jobs.localDistributionDriver',
    locationKey: 'vacancies.locations.latvia',
    locationId: 'latvia',
    descriptionKey: 'vacancies.descriptions.localDistributionDriver',
    category: 'local',
    salary: "€1,600 - €2,000",
    type: "Full-time",
    experience: "1+ year",
    benefits: ["Regular Hours", "Health Insurance", "Company Benefits"],
    company: "Latvian Distribution",
    posted: "2024-01-08"
  },
  {
    id: 9,
    titleKey: 'vacancies.jobs.specializedEquipmentDriver',
    locationKey: 'vacancies.locations.estonia',
    locationId: 'estonia',
    descriptionKey: 'vacancies.descriptions.specializedEquipmentDriver',
    category: 'specialized',
    salary: "€2,200 - €2,800",
    type: "Full-time",
    experience: "3+ years",
    benefits: ["Specialized Training", "Modern Equipment", "Career Growth"],
    company: "Estonian Specialized Transport",
    posted: "2024-01-07"
  }
];

// Vacancy categories for filtering
export const vacancyCategories = [
  { id: 'international', count: 2 },
  { id: 'local', count: 3 },
  { id: 'specialized', count: 2 },
  { id: 'express', count: 1 },
  { id: 'heavy', count: 1 }
];

// Vacancy locations for filtering
export const vacancyLocations = [
  { id: 'lithuania', name: 'Lithuania', count: 1 },
  { id: 'poland', name: 'Poland', count: 1 },
  { id: 'netherlands', name: 'Netherlands', count: 1 },
  { id: 'germany', name: 'Germany', count: 1 },
  { id: 'belgium', name: 'Belgium', count: 1 },
  { id: 'europe-wide', name: 'Europe-wide', count: 1 },
  { id: 'latvia', name: 'Latvia', count: 1 },
  { id: 'estonia', name: 'Estonia', count: 1 }
];
