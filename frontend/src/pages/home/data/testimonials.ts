// Testimonials data with multi-language support
export interface Testimonial {
  id: number;
  name: string;
  roleKey: string;
  companyKey: string;
  avatar: string;
  quote: {
    en: string;
    lt: string;
    ro: string;
    uk: string;
    nl: string;
    pl: string;
  };
  rating: number;
  locationKey: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Michael Schmidt',
    roleKey: 'home.testimonials.roles.professionalDriver',
    companyKey: 'home.testimonials.experience.fivePlusYears',
    avatar: 'MS',
    quote: {
      en: 'I found my dream job through Logistic Workers. They really care about matching drivers with the right companies and working conditions. The support team is always there when you need them.',
      lt: 'Per Logistic Workers radau savo svajonių darbą. Jie tikrai rūpinasi, kad vairuotojai būtų suderinti su tinkamomis įmonėmis ir darbo sąlygomis. Palaikymo komanda visada yra čia, kai jų reikia.',
      ro: 'Mi-am găsit locul de muncă visat prin Logistic Workers. Chiar le pasă de potrivirea șoferilor cu companiile și condițiile de muncă potrivite. Echipa de suport este întotdeauna acolo când ai nevoie de ei.',
      uk: 'Я знайшов роботу своєї мрії через Logistic Workers. Вони дійсно дбають про те, щоб водії працювали у правильних компаніях та умовах. Команда підтримки завжди поруч, коли потрібна.',
      nl: 'Ik heb mijn droombaan gevonden via Logistic Workers. Ze geven echt om het matchen van chauffeurs met de juiste bedrijven en werkomstandigheden. Het ondersteuningsteam is er altijd wanneer je ze nodig hebt.',
      pl: 'Znalazłem pracę swoich marzeń przez Logistic Workers. Naprawdę dbają o dopasowanie kierowców do odpowiednich firm i warunków pracy. Zespół wsparcia jest zawsze tam, gdy ich potrzebujesz.'
    },
    rating: 5,
    locationKey: 'home.latestOpportunities.locations.germany'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    roleKey: 'home.testimonials.roles.businessOwner',
    companyKey: 'home.testimonials.companies.logisticsInc',
    avatar: 'SJ',
    quote: {
      en: "Finding reliable drivers was a nightmare until we found Logistic Workers. Professional service from start to finish. They've helped us scale our operations significantly.",
      lt: 'Patikimų vairuotojų paieška buvo košmaras, kol neradome Logistic Workers. Profesionalus paslaugos nuo pradžios iki pabaigos. Jie padėjo mums ženkliai išplėsti veiklą.',
      ro: 'Găsirea șoferilor de încredere era un coșmar până când am găsit Logistic Workers. Serviciu profesional de la început până la sfârșit. Ne-au ajutat să ne extindem semnificativ operațiunile.',
      uk: 'Пошук надійних водіїв був кошмаром, поки ми не знайшли Logistic Workers. Професійний сервіс від початку до кінця. Вони допомогли нам значно розширити операції.',
      nl: 'Het vinden van betrouwbare chauffeurs was een nachtmerrie totdat we Logistic Workers vonden. Professionele service van begin tot eind. Ze hebben ons geholpen onze operaties aanzienlijk uit te breiden.',
      pl: 'Znalezienie niezawodnych kierowców było koszmarem, dopóki nie znaleźliśmy Logistic Workers. Profesjonalna obsługa od początku do końca. Pomogli nam znacząco rozwinąć nasze operacje.'
    },
    rating: 5,
    locationKey: 'home.latestOpportunities.locations.netherlands'
  },
  {
    id: 3,
    name: 'Carlos Rodriguez',
    roleKey: 'home.testimonials.roles.internationalDriver',
    companyKey: 'home.testimonials.experience.eightPlusYears',
    avatar: 'CR',
    quote: {
      en: 'Working with Logistic Workers has been amazing. They understand the industry and always find the best opportunities. Great pay and excellent working conditions.',
      lt: 'Darbas su Logistic Workers buvo nuostabus. Jie supranta pramonę ir visada randa geriausias galimybes. Puikus atlyginimas ir puikios darbo sąlygos.',
      ro: 'Lucrul cu Logistic Workers a fost uimitor. Înțeleg industria și găsesc întotdeauna cele mai bune oportunități. Salariu excelent și condiții de muncă excelente.',
      uk: 'Робота з Logistic Workers була дивовижною. Вони розуміють галузь і завжди знаходять найкращі можливості. Відмінна зарплата та чудові умови роботи.',
      nl: 'Werken met Logistic Workers is geweldig geweest. Ze begrijpen de industrie en vinden altijd de beste kansen. Geweldig salaris en uitstekende werkomstandigheden.',
      pl: 'Praca z Logistic Workers była niesamowita. Rozumieją branżę i zawsze znajdują najlepsze możliwości. Świetne wynagrodzenie i doskonałe warunki pracy.'
    },
    rating: 5,
    locationKey: 'home.latestOpportunities.locations.spain'
  },
  {
    id: 4,
    name: 'Anna Kowalski',
    roleKey: 'home.testimonials.roles.fleetManager',
    companyKey: 'home.testimonials.companies.transportSolutions',
    avatar: 'AK',
    quote: {
      en: "The quality of drivers we get through Logistic Workers is outstanding. They're professional, reliable, and well-trained. Highly recommended!",
      lt: 'Vairuotojų kokybė, kurią gauname per Logistic Workers, yra išskirtinė. Jie profesionalūs, patikimi ir gerai apmokyti. Labai rekomenduojama!',
      ro: 'Calitatea șoferilor pe care îi primim prin Logistic Workers este excepțională. Sunt profesioniști, de încredere și bine instruiți. Foarte recomandat!',
      uk: 'Якість водіїв, яких ми отримуємо через Logistic Workers, виняткова. Вони професійні, надійні та добре навчені. Дуже рекомендується!',
      nl: 'De kwaliteit van chauffeurs die we krijgen via Logistic Workers is uitstekend. Ze zijn professioneel, betrouwbaar en goed opgeleid. Zeer aanbevolen!',
      pl: 'Jakość kierowców, których otrzymujemy przez Logistic Workers, jest wyjątkowa. Są profesjonalni, niezawodni i dobrze wyszkoleni. Gorąco polecam!'
    },
    rating: 5,
    locationKey: 'home.latestOpportunities.locations.poland'
  },
  {
    id: 5,
    name: 'David Thompson',
    roleKey: 'home.testimonials.roles.longHaulDriver',
    companyKey: 'home.testimonials.experience.tenPlusYears',
    avatar: 'DT',
    quote: {
      en: 'Logistic Workers made the job search process so smooth. They found me a position that perfectly matches my skills and preferences. Could not be happier!',
      lt: 'Logistic Workers darbo paieškos procesą padarė tokiu sklandžiu. Jie rado man poziciją, kuri puikiai atitinka mano įgūdžius ir pageidavimus. Negaliu būti laimingesnis!',
      ro: 'Logistic Workers a făcut procesul de căutare a locului de muncă atât de fluid. Mi-au găsit o poziție care se potrivește perfect cu abilitățile și preferințele mele. Nu pot fi mai fericit!',
      uk: 'Logistic Workers зробили процес пошуку роботи таким плавним. Вони знайшли мені позицію, яка ідеально відповідає моїм навичкам та уподобанням. Не можу бути щасливішим!',
      nl: 'Logistic Workers heeft het sollicitatieproces zo soepel gemaakt. Ze vonden een positie voor mij die perfect past bij mijn vaardigheden en voorkeuren. Kon niet gelukkiger zijn!',
      pl: 'Logistic Workers sprawiło, że proces poszukiwania pracy był tak płynny. Znaleźli mi pozycję, która idealnie pasuje do moich umiejętności i preferencji. Nie mogę być szczęśliwszy!'
    },
    rating: 5,
    locationKey: 'home.latestOpportunities.locations.uk'
  },
  {
    id: 6,
    name: 'Elena Popescu',
    roleKey: 'home.testimonials.roles.hrManager',
    companyKey: 'home.testimonials.companies.europeanLogistics',
    avatar: 'EP',
    quote: {
      en: "We've been working with Logistic Workers for over 2 years now. Their drivers are consistently professional and reliable. They've become our trusted recruitment partner.",
      lt: 'Su Logistic Workers dirbame jau daugiau nei 2 metus. Jų vairuotojai nuolat profesionalūs ir patikimi. Jie tapo mūsų patikimu įdarbinimo partneriu.',
      ro: 'Lucrăm cu Logistic Workers de mai bine de 2 ani. Șoferii lor sunt în mod constant profesioniști și de încredere. Au devenit partenerul nostru de încredere pentru recrutare.',
      uk: 'Ми працюємо з Logistic Workers вже понад 2 роки. Їхні водії постійно професійні та надійні. Вони стали нашим надійним партнером з рекрутингу.',
      nl: 'We werken al meer dan 2 jaar met Logistic Workers. Hun chauffeurs zijn consequent professioneel en betrouwbaar. Ze zijn onze vertrouwde wervingspartner geworden.',
      pl: 'Pracujemy z Logistic Workers od ponad 2 lat. Ich kierowcy są konsekwentnie profesjonalni i niezawodni. Stali się naszym zaufanym partnerem rekrutacyjnym.'
    },
    rating: 5,
    locationKey: 'home.latestOpportunities.locations.romania'
  }
];
