import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  Instagram,
  Menu,
  MoveUpRight,
  X,
} from "lucide-react";
import "./App.css";

const internetImages = [
  "https://images.unsplash.com/photo-1617400275654-11aa6dbe72d8?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1571025597614-91b22b54d8cc?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1550060490-1e5db728ff50?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1571052822857-9868aaca88e3?auto=format&fit=crop&w=1200&q=85",
];

const cars = [
  ["1924", "Chevrolet", "A pioneer from the formative years of the automobile.", "One of the earliest machines in the collection, this Chevrolet connects DMC directly with the formative years of motoring. Its pre-war engineering belongs to a time when automobiles were still developing their fundamental language, making every surviving example a remarkably tangible piece of mechanical history."],
  ["1935", "Ford Deluxe Phaeton", "Open-air American elegance from the pre-war era.", "The Deluxe Phaeton captures the confidence of pre-war American automobile design. Its open bodywork, V8 character and generous proportions reflect an era when the automobile was becoming both a practical means of transport and a powerful expression of style."],
  ["1936", "Austin", "Compact, carefully crafted British motoring character.", "A charming example of British pre-war motoring, the Austin represents an approach centred on compact engineering, practicality and mechanical simplicity. Its character lies in the details and proportions that made British automobiles of the period so distinctive."],
  ["1948", "Bell Standard", "A rare survivor from a rapidly changing post-war era.", "Emerging in the important post-war period, the Bell Standard represents a generation of automobiles shaped by a world rebuilding itself. Its rarity gives it particular significance within the DMC collection, preserving a lesser-seen chapter of post-war motoring."],
  ["1953", "Ford Mercury Monterey", "The optimism and visual confidence of 1950s America.", "The Monterey embodies the optimism and visual drama of 1950s America. Its V8 character, substantial proportions and unmistakable styling belong to an era when automobiles were becoming statements of confidence, freedom and prosperity."],
  ["1956", "Citroën 2CV", "A celebrated exercise in practical French simplicity.", "Few cars demonstrate purposeful simplicity like the 2CV. Created around affordable and practical mobility, its unusual engineering, lightweight construction and famously distinctive character made it one of the great examples of French automotive ingenuity."],
  ["1957", "Dodge Kingsway Custom", "Chrome, presence and unmistakable 1950s character.", "The Dodge Kingsway Custom carries the bold personality of 1950s American design. Chrome, scale and presence were part of its language, making it a fascinating representation of the period's belief that a car should be noticed as much as driven."],
  ["1959", "Hindustan Ambassador Mark I", "The beginning of an enduring Indian motoring story.", "The Ambassador occupies a unique place in India's automotive story. The Mark I connects the collection to the beginning of a production lineage that would become deeply woven into Indian life, from government service to family journeys and everyday roads."],
  ["1960", "Fiat 1100 Select", "Compact Italian engineering with elegance and character.", "The Fiat 1100 demonstrates how Italian engineering could combine compact practicality with elegant proportions. It represents an important period in European motoring when small cars were becoming sophisticated, versatile and full of personality."],
  ["1960", "Willys Jeep Station Wagon", "Rugged utility adapted for family adventure.", "The Willys Jeep Station Wagon stands at the intersection of utility and everyday motoring. Its rugged engineering and practical body helped establish a template for vehicles that could carry people and equipment while retaining genuine working-vehicle capability."],
  ["1961", "Chevrolet Impala", "Space-age optimism expressed at full American scale.", "The Impala is pure early-1960s American expression. Large, dramatic and unmistakably confident, it represents an era when automotive styling reflected optimism and imagination as much as engineering."],
  ["1964", "Fiat 1100 Station Wagon", "Practical family utility shaped with Italian flair.", "The Station Wagon version of the Fiat 1100 turns an already practical compact car into a remarkably versatile machine. Its Familiare body style reflects an era when European manufacturers were finding clever ways to make small automobiles serve entire families."],
  ["1964", "Volkswagen Beetle", "An accessible motoring icon recognised around the world.", "The Beetle is one of the most recognisable automobiles ever created. Its simple mechanical philosophy, distinctive rear-engine layout and extraordinary global reach turned an unconventional people's car into an enduring cultural icon."],
  ["1965", "Austin Mini Cooper", "The small performance car that changed the rules.", "The Mini Cooper changed the idea of performance in a small car. Its compact dimensions, front-wheel-drive layout and remarkable agility made it a landmark in automotive packaging, while motorsport success transformed the Mini into a legend."],
  ["1968", "Fiat 1100R Italian", "The final, elegant evolution of Fiat's 1100 lineage.", "The 1100R represents the mature evolution of Fiat's long-running 1100 family. Compact, elegant and practical, it captures the character of everyday Italian motoring during one of the most influential periods in European automobile design."],
  ["1969", "Fiat 124 LHD Convertible", "Graceful Italian open-top touring for everyday roads.", "The Fiat 124 Convertible brings Italian design into the world of open-air touring. Its left-hand-drive configuration and graceful proportions give it a distinctly European character, combining usability with the simple pleasure of an open-top automobile."],
  ["1971", "Volkswagen Bus Devon Camper", "A road-going home and enduring symbol of freedom.", "The Devon Camper turns transportation into a way of life. Built around the idea of travelling rather than simply arriving, it represents the culture of road journeys, exploration and shared experiences that made the Volkswagen Bus an icon far beyond its mechanical specification."],
  ["1975", "Mercedes-Benz W115", "Understated design built around durability and integrity.", "The W115 represents the Mercedes-Benz philosophy of understated engineering. Solid construction, thoughtful mechanical design and long-term durability made these cars respected not for fashion, but for their ability to keep doing their job year after year."],
  ["1976", "Fiat 126", "Practical European mobility in a charming compact form.", "Small, economical and unmistakably characterful, the Fiat 126 represents the democratisation of personal mobility in Europe. Its compact engineering demonstrates how much practical transportation could be achieved with very little physical footprint."],
  ["1983", "Mercedes-Benz W123 — Sedan", "A benchmark for build quality, comfort and endurance.", "The W123 became famous for engineering durability, comfort and build quality. It represents Mercedes-Benz at a point where sophisticated engineering and exceptional longevity came together, creating a car that could remain useful for generations."],
  ["1983", "Mercedes-Benz W123 — Station Wagon", "Durability, space and understated long-distance elegance.", "The W123 Station Wagon adds another dimension to the celebrated W123 formula. Its combination of durability, space and understated elegance demonstrates how Mercedes-Benz engineering could serve both family practicality and long-distance motoring."],
  ["1993", "Mercedes-Benz W124 300D", "Classic craftsmanship meeting the modern engineering era.", "The W124 300D represents the final generation of classic Mercedes-Benz engineering before modern electronics began transforming the automobile. Its diesel character, durability and restrained design make it a fitting bridge between the analogue classics of the collection and the modern era."],
  ["1967", "Jawa", "Robust Czechoslovak engineering loved by Indian riders.", "The Jawa brings Czechoslovak engineering into the collection. Its distinctive mechanical character and strong presence in Indian motorcycle culture make it an important reminder that India's roads were shaped by machines from many corners of the world."],
  ["1962", "Rajdoot", "A tangible chapter of India's two-wheeler heritage.", "The Rajdoot is part of India's own two-wheeler heritage. Robust, purposeful and instantly recognisable, it represents a generation for whom motorcycles were practical companions as much as machines, connecting the DMC collection to India's evolving motorcycling culture."],
  ["1967", "Lambretta", "Italian style that helped define urban mobility.", "The Lambretta represents the stylish side of post-war mobility. Compact, elegant and unmistakably Italian, it became an icon of urban transport and scooter culture, proving that practicality and personality did not have to be opposites."],
].map(([year, name, excerpt, description], index) => ({
  id: `dmc-${index + 1}`,
  number: String(index + 1).padStart(2, "0"),
  year,
  name,
  excerpt,
  description,
  category: index > 21 ? "Motorcycle archive" : "Automobile archive",
  images: [internetImages[index % internetImages.length]],
}));

const localCollectionImages = [
  "/assets/dmc-project-02.jpg",
  "/assets/dmc-project-04.jpg",
  "/assets/dmc-project-05.jpg",
  "/assets/dmc-project-06.jpg",
  "/assets/dmc-project-07.jpg",
];
cars[0].images = [localCollectionImages[0], internetImages[0]];
cars[5].images = [localCollectionImages[1], internetImages[1]];
cars[12].images = [localCollectionImages[2], internetImages[2]];
cars[17].images = [localCollectionImages[3], internetImages[3]];
cars[22].images = [localCollectionImages[4], internetImages[0]];

const navItems = [
  { label: "Archive", href: "#archive" },
  { label: "The story", href: "#story" },
  { label: "Inquire", href: "#inquire" },
];

function scrollToId(id) {
  const target = document.querySelector(id);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

const THREE_SRC = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
const VANTA_SRC = "https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.waves.min.js";

function loadBackgroundScript(src, attribute) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-${attribute}="true"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") { resolve(); return; }
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.setAttribute(`data-${attribute}`, "true");
    script.onload = () => { script.dataset.loaded = "true"; resolve(); };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

function VantaBackdrop() {
  const effectRef = React.useRef(null);
  const hostRef = React.useRef(null);
  const initializedRef = React.useRef(false);

  useEffect(() => {
    let cancelled = false;
    let host = document.getElementById("dmc-wave-bg");
    if (!host) {
      host = document.createElement("div");
      host.id = "dmc-wave-bg";
      document.body.prepend(host);
    }
    hostRef.current = host;
    Object.assign(host.style, {
      position: "fixed",
      inset: "0",
      width: "100vw",
      height: "100vh",
      zIndex: "0",
      overflow: "hidden",
      background: "#0b0b0a",
      pointerEvents: "none",
    });
    document.documentElement.style.background = "#0b0b0a";
    document.body.style.background = "#0b0b0a";

    const initialize = async () => {
      try {
        await loadBackgroundScript(THREE_SRC, "dmc-three");
        await loadBackgroundScript(VANTA_SRC, "dmc-vanta-waves");
        if (cancelled || initializedRef.current || !window.VANTA?.WAVES) return;
        effectRef.current = window.VANTA.WAVES({
          el: host,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          color: 0xcda968,
          color2: 0xe5ca91,
          shininess: 28,
          waveHeight: 14,
          waveSpeed: .48,
          zoom: 1.08,
          backgroundColor: 0x0b0b0a,
          backgroundAlpha: 1,
        });
        initializedRef.current = true;
      } catch (error) {
        console.warn("DMC wave background unavailable", error);
      }
    };
    initialize();
    return () => {
      cancelled = true;
      if (effectRef.current) { effectRef.current.destroy(); effectRef.current = null; }
      initializedRef.current = false;
      if (hostRef.current?.id === "dmc-wave-bg") { hostRef.current.remove(); hostRef.current = null; }
      document.querySelectorAll('script[data-dmc-three="true"], script[data-dmc-vanta-waves="true"]').forEach((script) => script.remove());
    };
  }, []);

  return <div className="vanta-status" aria-hidden="true" data-testid="vanta-background" />;
}

function Header({ menuOpen, setMenuOpen }) {
  return (
    <header className="site-header" data-testid="site-header">
      <a href="#top" className="header-logo" data-testid="header-logo-link" aria-label="DMC home">
        <img src="/assets/dmc-crest.png" alt="Duraimohan Classics" data-testid="header-logo" />
      </a>
      <div className="header-status" data-testid="header-status">
        <span className="status-dot" />
        <span data-testid="header-status-text">Private archive / Chennai</span>
      </div>
      <nav className="desktop-nav" aria-label="Primary navigation" data-testid="desktop-navigation">
        {navItems.map((item) => (
          <a href={item.href} key={item.href} data-testid={`nav-link-${item.label.replace(" ", "-")}`}>
            {item.label}
          </a>
        ))}
      </nav>
      <button
        type="button"
        className="menu-trigger"
        onClick={() => setMenuOpen(true)}
        aria-label="Open navigation menu"
        data-testid="mobile-menu-open-button"
      >
        <Menu size={20} strokeWidth={1.5} />
        <span>Menu</span>
      </button>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            data-testid="mobile-menu"
          >
            <div className="mobile-menu-top">
              <span data-testid="mobile-menu-label">Navigation</span>
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation menu" data-testid="mobile-menu-close-button">
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              {navItems.map((item) => (
                <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)} data-testid={`mobile-nav-${item.label.replace(" ", "-")}`}>
                  {item.label}
                  <ArrowDownRight size={20} strokeWidth={1.3} />
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" data-testid="hero-section">
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-content">
        <motion.p className="eyebrow hero-eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} data-testid="hero-eyebrow">
          Duraimohan Classics / Est. 1996
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.8 }} data-testid="hero-heading">
          Where <span>Automotive</span>
          <br />
          <em>History Lives.</em>
        </motion.h1>
        <motion.div className="hero-bottom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}>
          <p data-testid="hero-description">Duraimohan Classics is the story of a lifelong passion for machines. What began with the curiosity of a young enthusiast working on, modifying and giving his own character to cars grew into a deeper pursuit: finding forgotten automobiles, rescuing them from neglect, restoring their mechanical soul and putting them back on the road. Today, each machine in the DMC collection represents more than an era of motoring. It represents a piece of a journey lived through the hands, sounds and movement of the automobile.</p>
          <a href="#archive" className="circle-link" data-testid="hero-archive-link" aria-label="Explore the archive">
            <ArrowDownRight size={24} strokeWidth={1.2} />
          </a>
        </motion.div>
      </div>
      <div className="hero-index" data-testid="hero-index">01 <span>/</span> 25</div>
      <div className="hero-caption" data-testid="hero-caption">A living archive<br />of automotive heritage</div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="intro-section page-shell" id="story" data-testid="story-section">
      <div className="section-kicker" data-testid="story-kicker"><span>02</span><span>Point of view</span></div>
      <div className="intro-copy">
        <p className="eyebrow" data-testid="story-eyebrow">Preserved to be driven.</p>
        <h2 data-testid="story-heading">History should not be locked away. It should be <em>kept alive.</em></h2>
      </div>
      <div className="intro-aside" data-testid="story-aside">
        <div className="story-paragraphs">
          <p>To Duraimohan, preserving a classic is not simply about keeping an old car looking beautiful. It is about understanding the machine, maintaining its mechanical character and giving it the chance to move again. Every oil change, every adjustment, every repaired component and every early-morning drive becomes part of its continuing story.</p>
          <p>A classic automobile demands patience. Parts have to be found or recreated. Mechanical systems have to be understood rather than simply replaced. Some cars arrive complete; others need to be rescued piece by piece. The reward is not perfection in the modern sense. It is the feeling of a machine returning to life and doing what it was built to do.</p>
          <p>For Duraimohan, driving these cars is itself an act of preservation. The engine needs to run. The gearbox needs to be exercised. The brakes need to work. The tyres need to meet the road. A car's heritage lives most honestly when it is being driven.</p>
        </div>
        <span className="rule-label">Keep the engine warm. / Keep the story moving.</span>
      </div>
    </section>
  );
}

function EngineeringSection() {
  const ideas = [
    ["01", "Mechanical honesty", "Older cars make their mechanical lives visible. There is little separation between driver and machine. You hear the engine, feel the gearbox, understand the brakes and learn the habits of the car. Maintaining one requires more than replacing parts. It requires listening, observing and understanding how the machine was designed to work. That mechanical involvement is one of the reasons Duraimohan continues to work with these cars rather than simply display them."],
    ["02", "Ideas that travelled", "The collection is also a map of automotive ideas. From the compact ingenuity of the Citroën 2CV and Fiat 1100 to the revolutionary packaging of the Mini, the practicality of the Volkswagen Bus, the rugged utility of the Willys Jeep and the engineering discipline of Mercedes-Benz, every vehicle represents a different answer to the same question: How should a machine move people through its time? Together, these cars tell a story that crosses countries, cultures and generations."],
    ["03", "Still road-going", "A restored classic should have a life beyond the workshop. DMC cars are maintained with the intention of being driven, taken to gatherings, displayed at events and experienced as automobiles rather than museum objects. The occasional mechanical noise, the deliberate rhythm of an old gearbox and the smell of a warm engine are not imperfections to be hidden. They are reminders that these machines are alive. Preservation, at DMC, means keeping them capable of movement."],
  ];
  return (
    <section className="engineering-section page-shell" data-testid="engineering-section">
      <div className="engineering-intro"><span className="eyebrow" data-testid="engineering-eyebrow">Why it matters</span><h2 data-testid="engineering-heading">Every classic carries an idea <em>worth remembering.</em></h2><div className="engineering-introduction" data-testid="engineering-introduction"><p>The DMC collection spans from 1924 to 1993, crossing pre-war engineering, post-war reconstruction, the rise of mass motoring, Italian design, American optimism, British ingenuity, German engineering and India's own evolving automotive culture.</p><p>These machines were built in a world where mechanical understanding mattered. Their character came from physical components, clever solutions and engineering decisions that could often be seen, heard and felt from behind the wheel.</p></div></div>
      <div className="engineering-list">{ideas.map(([number, title, body]) => <article key={number} data-testid={`engineering-card-${number}`}><span className="engineering-number">{number}</span><div><h3 data-testid={`engineering-title-${number}`}>{title}</h3><p data-testid={`engineering-copy-${number}`}>{body}</p></div></article>)}</div>
    </section>
  );
}

function ProjectCard({ project, index, onOpen, galleryCount }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(project)}
      className={`project-card ${project.className || "matrix-card"}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay: index * 0.08 }}
      data-testid={`project-card-${project.number}`}
    >
      <div className="project-image-wrap">
        <img src={project.images[0]} alt={project.name} className="project-image" data-testid={`project-image-${project.number}`} />
        <span className="project-arrow" aria-hidden="true"><MoveUpRight size={18} strokeWidth={1.3} /></span>
      </div>
      <div className="project-meta">
        <span className="project-number" data-testid={`project-number-${project.number}`}>{project.number}</span>
        <div className="project-info">
          <h3 data-testid={`project-title-${project.number}`}>{project.name}</h3>
          <p data-testid={`project-type-${project.number}`}>{project.category} / {galleryCount} views</p>
        </div>
        <span className="project-year" data-testid={`project-year-${project.number}`}>{project.year}</span>
      </div>
      <p className="project-description" data-testid={`project-description-${project.number}`}>{project.excerpt}</p>
    </motion.button>
  );
}

function Archive({ onCarOpen, galleries }) {
  return (
    <section className="archive-section page-shell" id="archive" data-testid="archive-section">
      <div className="section-heading-row">
        <div className="section-kicker" data-testid="archive-kicker"><span>03</span><span>The Collection</span></div>
      </div>
      <div className="archive-heading">
        <h2 data-testid="archive-heading">Twenty-five machines.<br /><em>One living archive.</em></h2>
        <div className="archive-description" data-testid="archive-description"><p>The DMC register brings together 25 classics spanning nearly seven decades of motoring history: 22 automobiles and three two-wheelers, from a 1924 Chevrolet to a 1993 Mercedes-Benz W124 300D.</p><p>But the register is only the beginning.</p><p>Every vehicle entered the collection for a reason. Some represent remarkable engineering. Some carry the character of a particular country or era. Some were simply too interesting to leave behind. And some required someone willing to see beyond their condition and imagine what they could become again.</p><p>Duraimohan's relationship with these machines has evolved from youthful experimentation and modification to restoration, preservation and rescue. The collection therefore isn't defined only by age or rarity. It is defined by the work, knowledge and passion required to keep each one alive.</p></div>
      </div>
      <div className="projects-grid matrix-grid" data-testid="projects-grid">
        {cars.map((car, index) => <ProjectCard key={car.id} project={car} index={index} galleryCount={(galleries[car.id] || []).length || car.images.length} onOpen={onCarOpen} />)}
      </div>
    </section>
  );
}

function ArchiveBand() {
  return (
    <section className="archive-band" data-testid="archive-stats-section">
      <div className="page-shell band-grid">
        <div><span className="stat-value" data-testid="stat-years">30<span>+</span></span><span className="stat-label" data-testid="stat-years-label">Years of Heritage</span><p className="stat-copy" data-testid="stat-years-copy">DMC's story began in 1996, growing through decades of searching, restoring, maintaining and driving classic machines.</p></div>
        <div><span className="stat-value" data-testid="stat-vehicles">25</span><span className="stat-label" data-testid="stat-vehicles-label">Classics in the Register</span><p className="stat-copy" data-testid="stat-vehicles-copy">22 automobiles and 3 two-wheel classics spanning 1924 to 1993.</p></div>
        <div><span className="stat-value" data-testid="stat-shows">50<span>+</span></span><span className="stat-label" data-testid="stat-shows-label">Shows &amp; Events</span><p className="stat-copy" data-testid="stat-shows-copy">Classic-car shows, rallies, heritage displays, club gatherings and motoring events across South India.</p></div>
        <p data-testid="archive-band-note">The numbers tell only part of the story. The real measure of DMC is not simply how many cars have been collected, but how many stories have been kept moving.</p>
      </div>
    </section>
  );
}

function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="inquire-section page-shell" id="inquire" data-testid="inquire-section">
      <div className="section-kicker" data-testid="inquire-kicker"><span>04</span><span>Start a conversation</span></div>
      <div className="inquire-layout">
        <div className="inquire-copy">
          <h2 data-testid="inquire-heading">Let’s talk<br /><em>classics.</em></h2>
          <div className="inquire-description" data-testid="inquire-description"><p>Classic cars have a way of starting conversations. A familiar badge, an unusual body style, the sound of an old engine or a memory of a car from childhood can connect complete strangers.</p><p>DMC welcomes conversations with fellow enthusiasts, collectors, restoration specialists, clubs, event organisers, historians, photographers and anyone with a genuine interest in preserving automotive heritage.</p><p>Whether it is about a particular vehicle, an old photograph, a restoration story, a classic-car event or simply a shared memory of a machine that once mattered, every conversation helps add another piece to the archive.</p></div>
          <div className="direct-contact" data-testid="direct-contact">
            <span className="eyebrow">Duraimohan V / Founder &amp; Collector</span>
            <a href="tel:+919444009900" data-testid="direct-phone-link">9444009900</a>
            <a href="mailto:Chevy.dm@gmail.com" data-testid="direct-email-link">Chevy.dm@gmail.com</a>
            <p className="inquiry-note" data-testid="inquiry-note">For collections, collaborations, classic-car events, restoration conversations and automotive heritage enquiries.</p>
          </div>
        </div>
        <div className="form-panel">
          {submitted ? (
            <motion.div className="form-success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} data-testid="form-success-message">
              <span className="success-icon"><Check size={18} /></span>
              <p className="eyebrow">Message received</p>
              <h3>We’ll be in touch.</h3>
              <p>Your note is now part of the conversation. Thank you for reaching out to DMC.</p>
              <button type="button" className="text-link button-link" onClick={() => setSubmitted(false)} data-testid="form-send-another-button">Send another note <ArrowRight size={16} /></button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} data-testid="inquiry-form">
              <label htmlFor="name">Your name<input id="name" name="name" type="text" placeholder="Your name" required data-testid="inquiry-name-input" /></label>
              <label htmlFor="email">Email address<input id="email" name="email" type="email" placeholder="you@example.com" required data-testid="inquiry-email-input" /></label>
              <label htmlFor="message">Your note<textarea id="message" name="message" rows="4" placeholder="Tell us what brings you here..." required data-testid="inquiry-message-input" /></label>
              <button className="submit-button" type="submit" data-testid="inquiry-submit-button">Send inquiry <ArrowRight size={17} strokeWidth={1.4} /></button>
              <p className="form-footnote" data-testid="form-footnote">This is a demo inquiry form. No information is stored.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function CarGalleryModal({ car, images, onClose }) {
  const [activeImage, setActiveImage] = useState(images[0]);
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} data-testid="car-gallery-modal">
      <motion.div className="gallery-modal" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} role="dialog" aria-modal="true" aria-labelledby="gallery-title">
        <div className="gallery-modal-top"><span className="eyebrow">DMC / {car.number}</span><button type="button" onClick={onClose} aria-label="Close car gallery" data-testid="car-gallery-close-button"><X size={21} strokeWidth={1.3} /></button></div>
        <div className="gallery-modal-content">
          <div className="gallery-main-image"><img src={activeImage} alt={`${car.name} gallery view`} data-testid="car-gallery-active-image" /></div>
          <div className="gallery-details">
            <p className="eyebrow" data-testid="car-gallery-year">{car.year} / {car.category}</p>
            <h2 id="gallery-title" data-testid="car-gallery-title">{car.name}</h2>
            <p data-testid="car-gallery-description">{car.description}</p>
            <div className="gallery-thumbnails" data-testid="car-gallery-thumbnails">
              {images.map((image, index) => <button type="button" key={image} className={activeImage === image ? "thumbnail active" : "thumbnail"} onClick={() => setActiveImage(image)} data-testid={`car-gallery-thumbnail-${index + 1}`}><img src={image} alt={`${car.name} view ${index + 1}`} /></button>)}
            </div>
            <span className="gallery-footnote" data-testid="car-gallery-count">{images.length} {images.length === 1 ? "image" : "images"} in this gallery</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function AdminPanel({ onClose, galleries, onSaveGallery }) {
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(cars[0].id);
  const [pendingFiles, setPendingFiles] = useState([]);
  const selectedCar = cars.find((car) => car.id === selectedCarId) || cars[0];
  const currentImages = galleries[selectedCar.id] || [];

  const unlock = (event) => {
    event.preventDefault();
    if (pin === "2704") { setUnlocked(true); setPinError(false); } else setPinError(true);
  };
  const readFiles = (event) => {
    const files = Array.from(event.target.files || []);
    Promise.all(files.map((file) => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ name: file.name, src: reader.result });
      reader.readAsDataURL(file);
    }))).then((items) => setPendingFiles((existing) => [...existing, ...items]));
  };
  const saveFiles = () => {
    if (!pendingFiles.length) return;
    onSaveGallery(selectedCar.id, [...currentImages, ...pendingFiles.map((file) => file.src)]);
    setPendingFiles([]);
  };
  const removeImage = (index) => onSaveGallery(selectedCar.id, currentImages.filter((_, imageIndex) => imageIndex !== index));

  return (
    <div className="admin-backdrop" data-testid="admin-panel">
      <motion.aside className="admin-panel" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}>
        <div className="admin-panel-top"><div><span className="eyebrow">DMC / Private side</span><h2>Archive admin</h2></div><button type="button" onClick={onClose} aria-label="Close admin panel" data-testid="admin-close-button"><X size={22} strokeWidth={1.3} /></button></div>
        {!unlocked ? (
          <form className="pin-form" onSubmit={unlock} data-testid="admin-pin-form">
            <p data-testid="admin-pin-instructions">Enter your four-digit PIN to manage the vehicle galleries.</p>
            <label htmlFor="admin-pin">Access PIN<input id="admin-pin" type="password" inputMode="numeric" maxLength="4" value={pin} onChange={(event) => { setPin(event.target.value.replace(/\D/g, "")); setPinError(false); }} placeholder="••••" required data-testid="admin-pin-input" /></label>
            {pinError && <p className="pin-error" data-testid="admin-pin-error">That PIN doesn’t match. Try again.</p>}
            <button type="submit" className="submit-button" data-testid="admin-pin-submit-button">Unlock archive <ArrowRight size={17} /></button>
          </form>
        ) : (
          <div className="admin-editor" data-testid="admin-editor">
            <div className="admin-unlocked"><span className="success-icon"><Check size={17} /></span><div><span className="eyebrow">Access granted</span><p>Manage each car’s gallery below.</p></div></div>
            <label htmlFor="car-select">Choose vehicle<select id="car-select" value={selectedCarId} onChange={(event) => { setSelectedCarId(event.target.value); setPendingFiles([]); }} data-testid="admin-car-select">{cars.map((car) => <option value={car.id} key={car.id}>{car.number} / {car.year} — {car.name}</option>)}</select></label>
            <div className="upload-zone"><input id="car-images" type="file" accept="image/*" multiple onChange={readFiles} data-testid="admin-image-upload-input" /><label htmlFor="car-images" className="upload-label" data-testid="admin-image-upload-label"><ArrowDownRight size={20} /><span><strong>Add vehicle pictures</strong><small>Choose multiple JPG, PNG or WebP files</small></span></label></div>
            {pendingFiles.length > 0 && <div className="pending-files" data-testid="admin-pending-files"><div className="pending-preview-list">{pendingFiles.map((file, index) => <div className="pending-preview" key={`${file.name}-${index}`}><img src={file.src} alt={`Pending upload ${index + 1}`} /><button type="button" onClick={() => setPendingFiles((existing) => existing.filter((_, fileIndex) => fileIndex !== index))} aria-label={`Remove pending upload ${index + 1}`} data-testid={`admin-remove-pending-${index + 1}`}><X size={14} /></button></div>)}</div><div className="pending-actions"><span>{pendingFiles.length} new {pendingFiles.length === 1 ? "picture" : "pictures"} ready</span><button type="button" className="text-link button-link" onClick={saveFiles} data-testid="admin-save-images-button">Save to {selectedCar.name} <Check size={15} /></button></div></div>}
            <div className="admin-gallery" data-testid="admin-current-gallery"><div className="admin-gallery-heading"><span>Saved gallery</span><span>{currentImages.length} images</span></div>{currentImages.map((image, index) => <div className="admin-image-row" key={`${image}-${index}`}><img src={image} alt={`${selectedCar.name} saved view ${index + 1}`} /><span>/{selectedCar.id}/image-{index + 1}</span><button type="button" onClick={() => removeImage(index)} aria-label={`Remove image ${index + 1}`} data-testid={`admin-remove-image-${index + 1}`}><X size={15} /></button></div>)}</div>
            <p className="admin-note" data-testid="admin-storage-note">Prototype storage: saved in this browser per vehicle directory. Connect a server storage layer when ready for multi-user publishing.</p>
          </div>
        )}
      </motion.aside>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer" data-testid="site-footer">
      <div className="page-shell footer-main">
        <img src="/assets/dmc-crest.png" alt="Duraimohan Classics" className="footer-logo" data-testid="footer-logo" />
        <div className="footer-story"><p data-testid="footer-tagline">Not just cars.<br /><em>A piece of history, kept alive.</em></p><p data-testid="footer-description">Duraimohan Classics is a living collection of automobiles and two-wheelers gathered through a lifelong passion for machines. From youthful experimentation and modification to restoration, rescue and preservation, DMC exists to keep these vehicles understood, maintained and moving.<br /><br />Because an old car becomes heritage not when it stops, but when someone cares enough to keep it going.</p></div>
        <div className="footer-links">
          <div><span className="eyebrow">Explore</span><a href="#archive" data-testid="footer-archive-link">Archive</a><a href="#story" data-testid="footer-story-link">The story</a><a href="#inquire" data-testid="footer-inquire-link">Inquire</a></div>
          <div><span className="eyebrow">Follow along</span><a href="https://instagram.com" target="_blank" rel="noreferrer" data-testid="footer-instagram-link"><Instagram size={16} /> Instagram</a><a href="mailto:Chevy.dm@gmail.com" data-testid="footer-email-link">Email us</a></div>
        </div>
      </div>
      <div className="page-shell footer-bottom"><span data-testid="footer-copyright">© 2026 Duraimohan Classics</span><span data-testid="footer-location">South India</span><span data-testid="footer-credit">Heritage / Passion / Preservation</span></div>
    </footer>
  );
}

function AdminRoute({ galleries, onSaveGallery }) {
  return <div className="admin-route" data-testid="admin-route"><AdminPanel onClose={() => { window.location.href = "/"; }} galleries={galleries} onSaveGallery={onSaveGallery} /></div>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [galleries, setGalleries] = useState(() => {
    try { return JSON.parse(window.localStorage.getItem("dmc-galleries-v1") || "{}"); } catch { return {}; }
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.dataset.scrolled = scrolled ? "true" : "false";
  }, [scrolled]);

  const saveGallery = (carId, images) => {
    setGalleries((existing) => {
      const next = { ...existing, [carId]: images };
      window.localStorage.setItem("dmc-galleries-v1", JSON.stringify(next));
      return next;
    });
  };
  const galleryFor = (car) => galleries[car.id] && galleries[car.id].length ? galleries[car.id] : car.images;

  if (window.location.pathname === "/admin") {
    return <AdminRoute galleries={galleries} onSaveGallery={saveGallery} />;
  }

  return (
    <div className="app-shell" data-testid="dmc-portfolio-app">
      <VantaBackdrop />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <IntroSection />
        <EngineeringSection />
        <Archive onCarOpen={setSelectedCar} galleries={galleries} />
        <ArchiveBand />
        <InquiryForm />
      </main>
      <Footer />
      <button type="button" className="back-to-top" onClick={() => scrollToId("#top")} aria-label="Back to top" data-testid="back-to-top-button"><ChevronDown size={17} /></button>
      <AnimatePresence>{selectedCar && <CarGalleryModal car={selectedCar} images={galleryFor(selectedCar)} onClose={() => setSelectedCar(null)} />}</AnimatePresence>
    </div>
  );
}