// =====================================================================
//  TREŚĆ STRONY: wszystko, co widać na portfolio, edytujesz TUTAJ.
//  Teksty mają dwie wersje: pl (polska) i en (angielska).
//  Po zapisaniu pliku odśwież stronę w przeglądarce (F5).
// =====================================================================

const PROFILE = {
  name: "Igor Gudaniec",
  email: "gudaniecigor@gmail.com",
  github: "https://github.com/gudaniecigor",
  linkedin: "https://www.linkedin.com/in/igorgudaniec/",
  cv: "", // np. "cv.pdf": wrzuć plik do folderu Portfolio i wpisz jego nazwę (puste = brak przycisku)
  timezone: "Europe/Warsaw",
};

// Formularz kontaktowy. Wiadomości trafiają na e-mail przez darmowy serwis FormSubmit (formsubmit.co).
// WAŻNE: po pierwszej wiadomości wysłanej z formularza FormSubmit przyśle na ten adres e-mail
// z linkiem aktywacyjnym. Trzeba go kliknąć raz, dopiero wtedy wiadomości zaczną przychodzić.
const CONTACT_FORM = {
  endpoint: "https://formsubmit.co/ajax/gudaniecigor@gmail.com",
  subject: "Nowa wiadomość z portfolio",
};

// Napisy zmieniające się w nagłówku (efekt "rozszyfrowania").
const ROLES = {
  pl: ["Front-End Developer", "Web Developer · Laravel", "UI/UX & Figma", "Inżynier · WSB Merito"],
  en: ["Front-End Developer", "Web Developer · Laravel", "UI/UX & Figma", "Engineer · WSB Merito"],
};

// Przesuwające się paski z technologiami.
const MARQUEE = [
  ["React", "Laravel", "TypeScript", "Tailwind CSS", "Node.js", "Figma", "PHP", "Alpine.js", "MySQL", "Vite"],
  ["UI / UX", "SPA", "REST API", "WordPress", "PostgreSQL", "Prisma", "Agile / Scrum", "Cisco CCNA", "Git", "Responsive"],
];

// Krótkie fakty w sekcji "O mnie".
const FACTS = [
  { label: { pl: "Lokalizacja", en: "Location" }, value: { pl: "Gdańsk, Polska", en: "Gdańsk, Poland" } },
  { label: { pl: "Wykształcenie", en: "Education" }, value: { pl: "inż. · WSB Merito", en: "BEng · WSB Merito" } },
  { label: { pl: "Obecnie", en: "Currently" }, value: { pl: "Pol-Agent Sp. z o.o.", en: "Pol-Agent Sp. z o.o." } },
  { label: { pl: "Języki", en: "Languages" }, value: { pl: "polski, angielski (średni)", en: "Polish, English (intermediate)" } },
];

// Liczniki w sekcji "O mnie".
const STATS = [
  { value: 4, label: { pl: "lata studiów inżynierskich na kierunku Front-End", en: "years of engineering studies in Front-End" } },
  { value: 2, label: { pl: "firmy, w których tworzyłem strony i aplikacje", en: "companies where I built websites and apps" } },
  { value: 10, label: { pl: "kursów i certyfikatów, m.in. Cisco CCNA", en: "courses & certificates, incl. Cisco CCNA" } },
];

// Umiejętności (karty). icon: monitor | database | pen | network
const SKILLS = [
  {
    icon: "monitor",
    title: { pl: "Frontend", en: "Frontend" },
    text: { pl: "Interfejsy szybkie, responsywne i przyjemne w użyciu.", en: "Fast, responsive interfaces that feel good to use." },
    items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Tailwind CSS", "Alpine.js", "Vite", "Material UI", "SPA", "RWD"],
  },
  {
    icon: "database",
    title: { pl: "Backend i bazy danych", en: "Backend & databases" },
    text: { pl: "Logika, API i dane pod spodem.", en: "Logic, APIs and data under the hood." },
    items: ["PHP", "Laravel", "Blade", "Node.js", "Express", "Prisma", "MySQL", "PostgreSQL", "MongoDB", "REST API"],
  },
  {
    icon: "pen",
    title: { pl: "Design i praca w zespole", en: "Design & teamwork" },
    text: { pl: "Od makiety w Figmie po sprint z klientem.", en: "From a Figma mockup to a sprint with the client." },
    items: ["Figma", "UI / UX", "WordPress", "CMS", "Git", "Agile / Scrum"],
  },
  {
    icon: "network",
    title: { pl: "Sieci i systemy", en: "Networks & systems" },
    text: { pl: "Fundament z technikum teleinformatycznego i Cisco CCNA.", en: "A foundation from ICT technical school and Cisco CCNA." },
    items: ["Cisco IOS", "LAN / WAN", "Windows Server", "Linux", "Helpdesk", { pl: "Python (podstawy)", en: "Python (basics)" }],
  },
];

// Projekty. Żeby dodać nowy: skopiuj cały blok { ... } i zmień wartości.
//   mock:   animowana makieta: "ferry" | "finance" | "quiz" | "shop"
//   image:  zamiast makiety możesz podać zrzut ekranu, np. "img/projekt.png"
//   hue:    odcień koloru tła karty (0–360)
//   github / live: linki (puste = brak)
//   note:   dopisek, gdy nie ma linków (np. projekt komercyjny)
//   role:   "Moja rola", czyli co dokładnie robiłeś w projekcie (puste = linijka ukryta)
const PROJECTS = [
  {
    category: { pl: "Projekt komercyjny · 2026", en: "Commercial project · 2026" },
    title: { pl: "System rezerwacji promowych", en: "Ferry booking system" },
    description: {
      pl: "Aplikacja webowa dla Pol-Agent Sp. z o.o., budowana od zera, która automatyzuje proces rezerwacji promowych.",
      en: "A web application for Pol-Agent Sp. z o.o., built from scratch to automate ferry bookings.",
    },
    role: {
      pl: "Samodzielnie rozwijam całą aplikację: od analizy wymagań z klientem, przez backend i frontend, po wdrożenie.",
      en: "I develop the whole application on my own: from gathering requirements with the client, through backend and frontend, to deployment.",
    },
    highlights: {
      pl: ["Trzy poziomy dostępu: panel klienta, pracownika i administratora", "Integracja zewnętrznych API i płatności online", "Praca w sprintach, stały kontakt z klientem"],
      en: ["Three access levels: client, staff and admin panels", "External API and online payment integrations", "Sprint-based work in close contact with the client"],
    },
    tags: ["Laravel 13", "PHP 8.3", "Tailwind CSS 4", "Alpine.js", "Vite"],
    mock: "ferry",
    hue: 175,
    github: "",
    live: "",
    note: { pl: "Kod niepubliczny (projekt komercyjny)", en: "Private code (commercial project)" },
  },
  {
    category: { pl: "Projekt inżynierski · zespół 4 os.", en: "Engineering thesis · team of 4" },
    title: "SmartSaver",
    description: {
      pl: "Aplikacja do zarządzania finansami osobistymi: wydatki, przychody, cele oszczędnościowe i analizy z wykresami. Zaprojektowana i wdrożona zespołowo jako praca dyplomowa.",
      en: "A personal finance app: expenses, income, savings goals and analytics with charts. Designed and shipped as a team for our engineering thesis.",
    },
    role: {
      pl: "Praca w 4-osobowym zespole: brałem udział w projektowaniu, programowaniu i testowaniu aplikacji.",
      en: "Teamwork in a group of four: I took part in designing, coding and testing the app.",
    },
    highlights: {
      pl: ["Dashboard z wykresami i analizą wydatków", "Transakcje cykliczne, powiadomienia, tryb jasny i ciemny", "Logowanie JWT + Argon2, testy Playwright i Vitest"],
      en: ["Dashboard with charts and spending analytics", "Recurring transactions, notifications, light & dark mode", "JWT + Argon2 auth, Playwright and Vitest tests"],
    },
    tags: ["React 19", "Vite", "Material UI", "Node.js", "Express", "Prisma", "MySQL"],
    mock: "finance",
    hue: 255,
    github: "https://github.com/ProjektWdrozeniowy/SmartSaver",
    live: "",
  },
  {
    category: { pl: "Projekt zespołowy · studia", en: "Team project · university" },
    title: "QuizWSB",
    description: {
      pl: "Aplikacja quizowa na Androida dla studentów WSB Merito: pytania jednokrotnego wyboru w kategoriach, z własnym API i bazą danych.",
      en: "An Android quiz app for WSB Merito students: single-choice questions in categories, backed by its own API and database.",
    },
    role: {
      pl: "Praca w zespole: brałem udział w projektowaniu, programowaniu i testowaniu aplikacji.",
      en: "Teamwork: I took part in designing, coding and testing the app.",
    },
    highlights: {
      pl: ["Architektura: Android ↔ REST API (Node.js) ↔ PostgreSQL", "Tryb awaryjny: lokalne dane JSON, gdy API nie odpowiada", "Projekt interfejsu w Figmie, planowanie w Miro"],
      en: ["Architecture: Android ↔ REST API (Node.js) ↔ PostgreSQL", "Fallback mode: local JSON data when the API is down", "UI designed in Figma, planned in Miro"],
    },
    tags: ["Java", "Android", "Node.js", "Express", "PostgreSQL", "Figma"],
    mock: "quiz",
    hue: 330,
    github: "https://github.com/SzymonGluszkowski02/QuizWSB",
    live: "",
  },
  {
    category: { pl: "Praktyki · Atwi.pl · 2025", en: "Internship · Atwi.pl · 2025" },
    title: { pl: "Strony i sklepy na WordPressie", en: "WordPress sites & online stores" },
    description: {
      pl: "Samodzielne tworzenie stron i sklepów internetowych dla klientów Atwi na podstawie ich wytycznych: od struktury witryny po wprowadzanie produktów.",
      en: "Building websites and online stores for Atwi's clients based on their briefs, from site structure to adding products.",
    },
    role: {
      pl: "Praktykant Front-End: samodzielnie budowałem strony według wytycznych klientów, a później koordynowałem pracę młodszych stażystów.",
      en: "Front-End intern: I built client websites on my own and later coordinated the work of junior interns.",
    },
    highlights: {
      pl: ["Kompleksowa budowa witryn i sklepów", "Dobór i konfiguracja wtyczek, wdrażanie wielojęzyczności", "Wprowadzanie produktów i treści do sklepów"],
      en: ["End-to-end websites and online stores", "Plugin selection and setup, multilingual sites", "Adding products and content to online stores"],
    },
    tags: ["WordPress", "CMS", "HTML", "CSS", "UX"],
    mock: "shop",
    hue: 35,
    github: "",
    live: "",
    note: { pl: "Strony klientów, kod niepubliczny", en: "Client websites, private code" },
  },
];

// Doświadczenie i edukacja (od najnowszego). type: "work" albo "edu".
const EXPERIENCE = [
  {
    type: "work",
    date: { pl: "04.2026 — obecnie", en: "04.2026 — present" },
    title: { pl: "Programista aplikacji internetowej", en: "Web Application Developer" },
    place: "Pol-Agent Sp. z o.o. · Gdańsk",
    description: {
      pl: "Tworzenie od podstaw aplikacji webowej automatyzującej proces rezerwacji promowych: panele klienta, pracownika i administratora, integracja zewnętrznych API i systemu płatności. Praca w sprintach, bezpośredni kontakt z klientem i wspólne podejmowanie decyzji projektowych.",
      en: "Building a web application from scratch that automates ferry bookings: client, staff and admin panels, external API and payment integrations. Sprint-based work, direct contact with the client and shared product decisions.",
    },
  },
  {
    type: "work",
    date: "02.2025 — 07.2025",
    title: { pl: "Praktykant Front-End Developer", en: "Front-End Developer Intern" },
    place: "Atwi.pl · Gdańsk",
    description: {
      pl: "Samodzielne tworzenie stron i sklepów na WordPressie według wytycznych klientów: konfiguracja wtyczek, wielojęzyczność, wprowadzanie produktów. Później koordynowanie pracy młodszych stażystów i weryfikacja ich zadań.",
      en: "Building WordPress websites and stores from client briefs: plugin setup, multilingual content, product catalogues. Later coordinating junior interns and reviewing their work.",
    },
  },
  {
    type: "edu",
    date: "10.2022 — 09.2026",
    title: { pl: "Inżynier · Front-End Developer", en: "Engineer's degree · Front-End Developer" },
    place: { pl: "Uniwersytet WSB Merito · Gdańsk", en: "WSB Merito University · Gdańsk" },
    description: {
      pl: "Projektowanie i budowa aplikacji SPA oraz responsywnych stron WWW: HTML, CSS, JavaScript, systemy CMS i modelowanie interakcji z użytkownikiem. Projekt inżynierski: SmartSaver.",
      en: "Designing and building SPAs and responsive websites: HTML, CSS, JavaScript, CMS platforms and interaction design. Engineering thesis: SmartSaver.",
    },
  },
  {
    type: "work",
    date: "04.2021 — 11.2021",
    title: { pl: "Staże i praca: Technik Teleinformatyk", en: "Internships & work: ICT Technician" },
    place: "Bis-Tech · Defile · Warmia Komp · Olsztyn",
    description: {
      pl: "Konfiguracja routerów, switchy i zabezpieczeń sieci, utrzymanie infrastruktury sieciowej, obsługa zgłoszeń w systemie Helpdesk oraz konserwacja systemów IT.",
      en: "Configuring routers, switches and network security, maintaining network infrastructure, handling Helpdesk tickets and servicing IT systems.",
    },
  },
  {
    type: "edu",
    date: "09.2018 — 04.2022",
    title: { pl: "Technik Teleinformatyk", en: "ICT Technician" },
    place: { pl: "ZSEiT w Olsztynie", en: "School of Electronics and Telecommunications, Olsztyn" },
    description: {
      pl: "Projektowanie i konfiguracja sieci LAN/WAN, administracja Windows Server i Linux, diagnostyka sprzętu, zabezpieczenia sieciowe i spawanie światłowodów.",
      en: "Designing and configuring LAN/WAN networks, Windows Server and Linux administration, hardware diagnostics, network security and fibre splicing.",
    },
  },
];

// Certyfikaty i kursy. badge: krótki skrót na plakietce.
const CERTS = [
  { badge: "MDB", name: "MongoDB Database Admin Path", issuer: "MongoDB", date: "11.2024" },
  { badge: "EE.10", name: { pl: "Kwalifikacja zawodowa EE.10", en: "Vocational qualification EE.10" }, issuer: { pl: "Egzamin zawodowy", en: "Vocational exam" }, date: "03.2022" },
  { badge: "CCNA", name: "CCNA R&S: Routing and Switching Essentials", issuer: "Cisco Networking Academy", date: "01.2022" },
  { badge: "CCNA", name: "CCNA R&S: Connecting Networks", issuer: "Cisco Networking Academy", date: "01.2022" },
  { badge: "CCNA", name: "CCNA R&S: Introduction to Networks", issuer: "Cisco Networking Academy", date: "09.2021" },
  { badge: "CCNA", name: "CCNA R&S: Scaling Networks", issuer: "Cisco Networking Academy", date: "09.2021" },
  { badge: "EE.11", name: { pl: "Kwalifikacja zawodowa EE.11", en: "Vocational qualification EE.11" }, issuer: { pl: "Egzamin zawodowy", en: "Vocational exam" }, date: "09.2021" },
  { badge: "ELM.02", name: { pl: "Kwalifikacja zawodowa ELM.02", en: "Vocational qualification ELM.02" }, issuer: { pl: "Egzamin zawodowy", en: "Vocational exam" }, date: "09.2021" },
  { badge: "COM", name: { pl: "Szkolenie z komunikacji", en: "Communication training" }, issuer: "Grupa Doradcza Primus s.c.", date: "05.2021" },
  { badge: "OS", name: { pl: "Systemy operacyjne i spawanie światłowodów", en: "Operating systems & fibre splicing" }, issuer: "DEFILE Krzysztof Nowakowski", date: "03.2021" },
];

// Stałe napisy interfejsu. W nawiasach {klamrowych} w "statement" są słowa wyróżnione kolorem.
const I18N = {
  pl: {
    meta: {
      role: "Front-End Developer",
      description: "Igor Gudaniec, Front-End Developer i inżynier z Gdańska. Projekty, doświadczenie i kontakt.",
    },
    nav: { about: "O mnie", projects: "Projekty", experience: "Doświadczenie", contact: "Kontakt", menu: "Otwórz menu", skip: "Przejdź do treści" },
    hero: {
      status: "Otwarty na nowe propozycje",
      greeting: "// cześć, jestem",
      text: "Front-End Developer i inżynier z Gdańska. Tworzę aplikacje webowe, które dobrze wyglądają i <strong>naprawdę działają</strong>: od makiety w Figmie po wdrożenie.",
      cta1: "Zobacz projekty",
      cta2: "Napisz do mnie",
      scroll: "przewiń",
    },
    terminal: {
      title: "igor@gdansk: ~",
      prompt: "igor@gdansk:~$",
      lines: [
        { cmd: "whoami", out: ["Igor Gudaniec · Front-End Developer · inż."] },
        { cmd: "pwd", out: ["/polska/gdansk"] },
        { cmd: "ls projekty/", out: ["pol-agent/  smartsaver/  quizwsb/  wordpress/"] },
        { cmd: "cat stack.json", out: ["{", '  "front": ["React", "Tailwind", "Alpine.js"],', '  "back":  ["Laravel", "Node.js", "MySQL"]', "}"] },
        { cmd: "git status", out: ["Na gałęzi: pol-agent/rezerwacje", "● praca w toku, kolejny sprint"] },
      ],
    },
    about: {
      label: "o mnie",
      title: "Kim jestem",
      statement: "Łączę kod z wyczuciem {UX/UI}. Zaczynałem od sieci komputerowych w technikum, potem budowałem strony i sklepy w {Atwi}, a dziś samodzielnie tworzę od zera system rezerwacji promowych dla {Pol-Agent}.",
      p1: "Jestem inżynierem po specjalizacji <strong>Front-End Developer</strong> na Uniwersytecie WSB Merito w Gdańsku. Najlepiej czuję się tam, gdzie interfejs spotyka się z logiką: projektuję w Figmie, frontend piszę w React albo w Tailwindzie z Alpine.js, a backend w Laravelu lub Node.js.",
      p2: "Szukam miejsca, w którym będę mógł dalej rozwijać się w aplikacjach webowych i tworzyć dopracowane produkty.",
      stackLabel: "stack",
      stackTitle: "Technologie i narzędzia",
    },
    projects: {
      label: "projekty",
      title: "Wybrane projekty",
      sub: "Komercyjne, dyplomowe i zespołowe: od systemu rezerwacji promowych po aplikację mobilną.",
      code: "Kod na GitHubie",
      live: "Demo",
      view: "Zobacz kod",
      role: "Moja rola",
    },
    experience: {
      label: "doświadczenie",
      title: "Doświadczenie i edukacja",
      filter: "Filtruj oś czasu",
      all: "Wszystko",
      work: "Praca",
      edu: "Edukacja",
      certs: "Certyfikaty i kursy",
      cv: "Pobierz CV",
    },
    contact: {
      label: "kontakt",
      title: "Porozmawiajmy",
      text: "Szukam stałej pracy w zespole, który tworzy dopracowane aplikacje webowe. Masz ofertę, projekt albo pytanie? Najszybciej odpowiem na maila.",
      copy: "Kopiuj adres",
      copied: "Skopiowano!",
      badge: "NAPISZ DO MNIE · NAPISZ DO MNIE · NAPISZ DO MNIE · ",
      location: "Gdańsk, Polska",
      time: "czas lokalny",
      status: "Otwarty na nowe propozycje",
    },
    form: {
      title: "Napisz do mnie",
      topic: "W jakiej sprawie?",
      topics: { job: "Oferta pracy", project: "Projekt / zlecenie", other: "Coś innego" },
      name: "Imię i nazwisko",
      email: "Twój e-mail",
      message: "Wiadomość",
      note: "Wiadomość trafi do mnie przez serwis FormSubmit. Odpowiem na podany adres e-mail.",
      send: "Wyślij wiadomość",
      sending: "Wysyłanie…",
      errors: {
        name: "Podaj imię (min. 2 znaki).",
        email: "Podaj poprawny adres e-mail.",
        message: "Napisz kilka słów więcej (min. 10 znaków).",
      },
      failed: "Nie udało się wysłać wiadomości. Spróbuj ponownie albo napisz bezpośrednio na maila.",
      activation: "Formularz czeka jeszcze na aktywację. Spróbuj później albo napisz bezpośrednio na maila.",
      successTitle: "Wiadomość wysłana!",
      successText: "Dzięki za kontakt. Odpowiem najszybciej, jak to możliwe.",
      again: "Napisz kolejną",
    },
    footer: { built: "Zaprojektowane i zbudowane z pomocą AI", top: "Do góry" },
    mock: {
      ferry: { url: "rezerwacje · pol-agent", date: "Data", pax: "Pasażerowie", paxVal: "2 + auto", cabin: "Kabina", cabinVal: "2-os.", client: "Klient", staff: "Pracownik", admin: "Admin", pay: "Zapłać online", paid: "Opłacono" },
      finance: { balance: "Saldo", goal: "Cel: wakacje", spending: "Wydatki · 7 dni", food: "Jedzenie", transport: "Transport", fun: "Rozrywka" },
      quiz: { category: "Sieci komputerowe", question: "Który protokół działa w warstwie transportowej?", score: "Wynik" },
      shop: { buy: "Kup teraz" },
    },
  },

  en: {
    meta: {
      role: "Front-End Developer",
      description: "Igor Gudaniec, Front-End Developer and engineer based in Gdańsk. Projects, experience and contact.",
    },
    nav: { about: "About", projects: "Projects", experience: "Experience", contact: "Contact", menu: "Open menu", skip: "Skip to content" },
    hero: {
      status: "Open to new opportunities",
      greeting: "// hi, I'm",
      text: "Front-End Developer and engineer based in Gdańsk. I build web apps that look good and <strong>actually work</strong>: from a Figma mockup to deployment.",
      cta1: "View projects",
      cta2: "Get in touch",
      scroll: "scroll",
    },
    terminal: {
      title: "igor@gdansk: ~",
      prompt: "igor@gdansk:~$",
      lines: [
        { cmd: "whoami", out: ["Igor Gudaniec · Front-End Developer · BEng"] },
        { cmd: "pwd", out: ["/poland/gdansk"] },
        { cmd: "ls projects/", out: ["pol-agent/  smartsaver/  quizwsb/  wordpress/"] },
        { cmd: "cat stack.json", out: ["{", '  "front": ["React", "Tailwind", "Alpine.js"],', '  "back":  ["Laravel", "Node.js", "MySQL"]', "}"] },
        { cmd: "git status", out: ["On branch: pol-agent/bookings", "● work in progress, next sprint"] },
      ],
    },
    about: {
      label: "about",
      title: "Who I am",
      statement: "I combine code with a feel for {UX/UI}. I started with computer networks in tech school, then built websites and online stores at {Atwi}, and today I'm building a ferry booking system from scratch for {Pol-Agent}.",
      p1: "I'm an engineer who specialised in <strong>Front-End Development</strong> at WSB Merito University in Gdańsk. I'm most at home where interface meets logic: I design in Figma, build frontends in React or Tailwind with Alpine.js, and backends in Laravel or Node.js.",
      p2: "I'm looking for a place where I can keep growing in web applications and ship polished products.",
      stackLabel: "stack",
      stackTitle: "Technologies & tools",
    },
    projects: {
      label: "projects",
      title: "Selected projects",
      sub: "Commercial, thesis and team projects: from a ferry booking system to a mobile app.",
      code: "Code on GitHub",
      live: "Live demo",
      view: "View code",
      role: "My role",
    },
    experience: {
      label: "experience",
      title: "Experience & education",
      filter: "Filter the timeline",
      all: "All",
      work: "Work",
      edu: "Education",
      certs: "Certificates & courses",
      cv: "Download CV",
    },
    contact: {
      label: "contact",
      title: "Let's talk",
      text: "I'm looking for a permanent role in a team that builds polished web applications. Got an offer, a project or a question? Email is the fastest way to reach me.",
      copy: "Copy address",
      copied: "Copied!",
      badge: "GET IN TOUCH · GET IN TOUCH · GET IN TOUCH · ",
      location: "Gdańsk, Poland",
      time: "local time",
      status: "Open to new opportunities",
    },
    form: {
      title: "Send me a message",
      topic: "What is it about?",
      topics: { job: "Job offer", project: "Project / freelance", other: "Something else" },
      name: "Full name",
      email: "Your email",
      message: "Message",
      note: "Your message reaches me via the FormSubmit service. I'll reply to the email address you provide.",
      send: "Send message",
      sending: "Sending…",
      errors: {
        name: "Please enter your name (min. 2 characters).",
        email: "Please enter a valid email address.",
        message: "Please write a bit more (min. 10 characters).",
      },
      failed: "The message couldn't be sent. Please try again or email me directly.",
      activation: "The form isn't active yet. Please try later or email me directly.",
      successTitle: "Message sent!",
      successText: "Thanks for reaching out. I'll get back to you as soon as I can.",
      again: "Send another",
    },
    footer: { built: "Designed and built with the help of AI", top: "Back to top" },
    mock: {
      ferry: { url: "bookings · pol-agent", date: "Date", pax: "Passengers", paxVal: "2 + car", cabin: "Cabin", cabinVal: "2-berth", client: "Client", staff: "Staff", admin: "Admin", pay: "Pay online", paid: "Paid" },
      finance: { balance: "Balance", goal: "Goal: holiday", spending: "Spending · 7 days", food: "Food", transport: "Transport", fun: "Fun" },
      quiz: { category: "Computer networks", question: "Which protocol works at the transport layer?", score: "Score" },
      shop: { buy: "Shop now" },
    },
  },
};
