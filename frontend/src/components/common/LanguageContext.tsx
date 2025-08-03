import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'nl' | 'lt' | 'uk';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.clients': 'For Clients',
    'nav.drivers': 'For Drivers', 
    'nav.contact': 'Contact',
    'nav.register': 'Register',
    'nav.login': 'Login',
    'nav.signOut': 'Sign Out',
    
    // Homepage
    'hero.title': 'Your Partner in Lorry Driver Recruitment in Europe',
    'hero.subtitle': 'Connecting skilled Lithuanian and Ukrainian drivers with top opportunities in the Netherlands',
    'hero.btn.driver': "I'm a Driver",
    'hero.btn.client': "I'm a Client",
    
    // Why Choose Us
    'why.title': 'Why Choose Logistic Workers?',
    'why.drivers.title': 'For Drivers',
    'why.drivers.growth': 'Career Growth Opportunities',
    'why.drivers.stable': 'Stable Job Opportunities',
    'why.drivers.support': 'Support for International Drivers',
    'why.drivers.fair': 'Fair Treatment & Compensation',
    'why.drivers.diverse': 'Access to Diverse Job Opportunities',
    
    'why.clients.title': 'For Clients',
    'why.clients.reliable': 'Reliable Access to Qualified Drivers',
    'why.clients.tailored': 'Tailored Recruitment Solutions',
    'why.clients.streamlined': 'Streamlined Recruitment Process',
    'why.clients.efficient': 'Efficient and Cost-Effective',
    
    // Client Page
    'clients.hero.title': 'Find the Right Drivers for Your Business',
    'clients.hero.subtitle': 'Efficiently connect with qualified lorry drivers to meet your logistical demands',
    'clients.services.title': 'Our Services',
    'clients.form.title': 'Submit Job Request',
    'clients.form.company': 'Company Name',
    'clients.form.contact.name': 'Contact Person Name',
    'clients.form.email': 'Contact Email',
    'clients.form.phone': 'Contact Phone',
    'clients.form.location': 'Job Location',
    'clients.form.work.type': 'Type of Work',
    'clients.form.license': 'License Required',
    'clients.form.hours': 'Hours per Week',
    'clients.form.drivers.needed': 'Number of Drivers Needed',
    'clients.form.notes': 'Additional Requirements',
    'clients.form.start.date': 'Desired Start Date',
    'clients.form.submit': 'Submit Request',
    
    // Driver Page
    'drivers.hero.title': 'Your Next Driving Opportunity Awaits',
    'drivers.hero.subtitle': 'Discover stable and rewarding lorry driving jobs in the Netherlands',
    'drivers.benefits.title': 'Benefits for Drivers',
    'drivers.testimonials.title': 'What Our Drivers Say',
    'drivers.form.title': 'Driver Application',
    'drivers.form.name': 'Full Name',
    'drivers.form.dob': 'Date of Birth',
    'drivers.form.nationality': 'Nationality',
    'drivers.form.address': 'Current Address',
    'drivers.form.license.number': 'Driving License Number',
    'drivers.form.license.categories': 'License Categories',
    'drivers.form.experience': 'Years of Experience',
    'drivers.form.languages': 'Language Skills',
    'drivers.form.routes': 'Preferred Routes/Regions',
    'drivers.form.availability': 'Availability',
    'drivers.form.work.preferred': 'Type of Work Preferred',
    'drivers.form.previous': 'Previous Experience',
    'drivers.form.certifications': 'Additional Certifications',
    'drivers.form.hours.preferred': 'Preferred Working Hours',
    'drivers.form.submit': 'Apply Now',
    
    // Register Page
    'register.title': 'Create Your Account',
    'register.client.tab': 'Register as Client',
    'register.driver.tab': 'Register as Driver',
    'register.company.reg': 'Company Registration Number',
    'register.password': 'Password',
    'register.confirm.password': 'Confirm Password',
    'register.submit': 'Create Account',
    'register.verification.note': 'All registrations require admin verification for account activation',
    
    // Contact Page
    'contact.title': 'Get in Touch',
    'contact.info.title': 'Contact Information',
    'contact.form.title': 'Send us a Message',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    
    // Footer
    'footer.company': 'MB Paulius&Aurimas',
    'footer.brand': 'Logistic Workers',
    'footer.address': 'V. Nagevičiaus g. 3, LT-08237 Vilnius, Lithuania',
    'footer.phone': '+37065905551',
    'footer.email': 'paulius@logisticworkers.eu',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    
    // Common
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.loading': 'Loading...',
  },
  nl: {
    // Basic Dutch translations (simplified for demo)
    'nav.home': 'Home',
    'nav.clients': 'Voor Klanten',
    'nav.drivers': 'Voor Chauffeurs',
    'nav.contact': 'Contact',
    'nav.register': 'Registreren',
    'nav.login': 'Inloggen',
    'nav.signOut': 'Uitloggen',
    'hero.title': 'Uw Partner in Vrachtwagenchauffeur Werving in Europa',
    'hero.subtitle': 'Verbinding van bekwame Litouwse en Oekraïense chauffeurs met top kansen in Nederland',
    'hero.btn.driver': 'Ik ben Chauffeur',
    'hero.btn.client': 'Ik ben Klant',
    // Add more translations as needed
  },
  lt: {
    // Basic Lithuanian translations (simplified for demo)
    'nav.home': 'Pagrindinis',
    'nav.clients': 'Klientams',
    'nav.drivers': 'Vairuotojams',
    'nav.contact': 'Kontaktai',
    'nav.register': 'Registruotis',
    'nav.login': 'Prisijungti',
    'nav.signOut': 'Atsijungti',
    'hero.title': 'Jūsų Partneris Sunkvežimių Vairuotojų Paieškoje Europoje',
    'hero.subtitle': 'Sujungiame kvalifikuotus Lietuvos ir Ukrainos vairuotojus su geriausiais darbo pasiūlymais Nyderlanduose',
    'hero.btn.driver': 'Esu Vairuotojas',
    'hero.btn.client': 'Esu Klientas',
    // Add more translations as needed
  },
  uk: {
    // Basic Ukrainian translations (simplified for demo)
    'nav.home': 'Головна',
    'nav.clients': 'Для Клієнтів',
    'nav.drivers': 'Для Водіїв',
    'nav.contact': 'Контакти',
    'nav.register': 'Реєстрація',
    'nav.login': 'Увійти',
    'nav.signOut': 'Вийти',
    'hero.title': 'Ваш Партнер у Пошуку Водіїв Вантажівок в Європі',
    'hero.subtitle': "Поєднуємо кваліфікованих литовських та українських водіїв з найкращими можливостями в Нідерландах",
    'hero.btn.driver': 'Я Водій',
    'hero.btn.client': 'Я Клієнт',
    // Add more translations as needed
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return (translations[language] as any)[key] || (translations.en as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}