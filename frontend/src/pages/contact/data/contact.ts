// Contact page data - contact methods, business hours, and form options
export const contactMethods = [
  {
    icon: "email",
    titleKey: "contact.methods.email.title",
    descriptionKey: "contact.methods.email.description",
    contact: "info@logisticworkers.com",
    actionKey: "contact.methods.email.action"
  },
  {
    icon: "phone",
    titleKey: "contact.methods.phone.title",
    descriptionKey: "contact.methods.phone.description",
    contact: "+370 600 00000",
    actionKey: "contact.methods.phone.action"
  },
  {
    icon: "location",
    titleKey: "contact.methods.location.title",
    descriptionKey: "contact.methods.location.description",
    contact: "Vilnius, Lithuania",
    actionKey: "contact.methods.location.action"
  }
];

export const businessHours = [
  { dayKey: "contact.hours.mondayFriday", hoursKey: "contact.hours.weekdayHours", status: "open" },
  { dayKey: "contact.hours.saturday", hoursKey: "contact.hours.saturdayHours", status: "open" },
  { dayKey: "contact.hours.sunday", hoursKey: "contact.hours.sundayHours", status: "closed" }
];

export const inquiryTypes = [
  { value: "general", labelKey: "contact.form.inquiryTypes.general" },
  { value: "driver", labelKey: "contact.form.inquiryTypes.driver" },
  { value: "job", labelKey: "contact.form.inquiryTypes.job" },
  { value: "partnership", labelKey: "contact.form.inquiryTypes.partnership" },
  { value: "support", labelKey: "contact.form.inquiryTypes.support" }
];

export const contactStats = [
  { number: "24h", labelKey: "contact.stats.responseTime", icon: "clock" },
  { number: "98%", labelKey: "contact.stats.satisfaction", icon: "star" },
  { number: "8", labelKey: "contact.stats.countries", icon: "globe" }
];

