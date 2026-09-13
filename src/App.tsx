import { useState } from "react";
import imgWireframe from "./hero-wireframe.png";
const imgRectangle15 = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop";

/* ── Navbar ── */
function NavBar({ onNav }: { onNav: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#2f2f2f] h-12 flex items-center px-4 md:px-6">
      <span
        className="font-light text-[#fffc5f] text-2xl tracking-[-3.36px] cursor-pointer select-none"
        style={{ fontFamily: "'Inter:Light', sans-serif" }}
      >
        NEST
      </span>
      {/* Desktop links */}
      <div className="ml-auto hidden md:flex gap-8">
        {["pricing", "feedback", "about"].map((l) => (
          <button
            key={l}
            onClick={() => onNav(l)}
            className="text-[#d9d9d9] text-xl tracking-[-1.92px] hover:text-[#fffc5f] transition-colors"
            style={{ fontFamily: "'Inter:Regular', sans-serif" }}
          >
            {l}
          </button>
        ))}
      </div>
      {/* Mobile hamburger */}
      <button
        className="ml-auto md:hidden text-[#d9d9d9] flex flex-col gap-1.5"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <span className={`block w-6 h-0.5 bg-current transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-current transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-12 left-0 right-0 bg-[#2f2f2f] flex flex-col items-center gap-4 py-6 md:hidden">
          {["pricing", "feedback", "about"].map((l) => (
            <button
              key={l}
              onClick={() => { onNav(l); setOpen(false); }}
              className="text-[#d9d9d9] text-2xl tracking-[-1.92px]"
              style={{ fontFamily: "'Inter:Regular', sans-serif" }}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section className="bg-black pt-12 min-h-[420px]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 py-8 md:py-12">
        {/* Left: headline + desc + buttons */}
        <div>
          <h1
            className="text-[#d9d9d9] font-bold leading-none text-5xl sm:text-6xl lg:text-7xl mb-4"
            style={{ fontFamily: "'Inter:Bold', sans-serif" }}
          >
            Have a Startup?<br />We'll help you.
          </h1>
          <p className="text-[20px] mb-6 leading-snug" style={{ fontFamily: "'Inter:Regular', sans-serif" }}>
            <span className="text-[#838383]">From your first idea to your first customers, </span>
            <span className="text-[#fffc5f]" style={{ fontFamily: "'Inter:Regular', sans-serif" }}>NEST</span>
            <span className="text-[#838383]"> gives you one place to plan your product, manage your team, track your progress, and launch your business.</span>
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#d9d9d9] text-black font-bold text-[20px] px-8 py-3 rounded-full hover:bg-[#fffc5f] transition-colors" style={{ fontFamily: "'Inter:Bold', sans-serif" }}>
              Get Started
            </button>
            <button className="border-[3px] border-[#d9d9d9] text-[#d9d9d9] font-bold text-[20px] px-8 py-3 rounded-full hover:border-[#fffc5f] hover:text-[#fffc5f] transition-colors" style={{ fontFamily: "'Inter:Bold', sans-serif" }}>
              Get a quote
            </button>
          </div>
        </div>
        {/* Right: stats + wireframe image */}
        <div className="flex flex-col gap-0 md:items-end">
          {[
            { val: "100+", label: "Entrepreneurs Served" },
            { val: "9M+", label: "Earned by Entrepreneurs" },
            { val: "20+", label: "Countries & Territories" },
          ].map(({ val, label }) => (
            <div key={val} className="mb-4">
              <p className="text-[#fffc5f] font-bold text-5xl leading-none" style={{ fontFamily: "'Inter:Bold', sans-serif" }}>{val}</p>
              <p className="text-[#838383] text-[20px] leading-none" style={{ fontFamily: "'Inter:Regular', sans-serif" }}>{label}</p>
            </div>
          ))}
          <div className="hidden md:block mt-4 w-[273px] h-[275px] relative overflow-hidden rounded-lg">
            <img src={imgWireframe} alt="wireframe preview" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Whaa / Proof section ── */
function Whaa() {
  return (
    <section className="bg-[#2f2f2f]">
      {/* "Whaaaa......" block */}
      <div className="bg-black py-12 md:py-20 px-4 md:px-12">
        <p
          className="text-[#fffc5f] font-semibold text-6xl sm:text-8xl md:text-[130px] leading-none mb-2"
          style={{ fontFamily: "'Instrument_Sans:SemiBold', sans-serif", fontVariationSettings: '"wdth" 100' }}
        >
          Whaaaa......
        </p>
        <p
          className="text-[#d8d8d8] text-3xl sm:text-4xl md:text-[64px] tracking-[-2.56px] leading-tight"
          style={{ fontFamily: "'Instrument_Sans:Regular', sans-serif", fontVariationSettings: '"wdth" 100' }}
        >
          having second thoughts?
        </p>
        {/* Grid with placeholder images and description */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#d9d9d9] h-48 md:h-72 rounded" />
            <div className="bg-[#d9d9d9] h-48 md:h-72 rounded" />
            <div className="bg-[#d9d9d9] h-48 md:h-72 rounded" />
            <div className="bg-[#d9d9d9] h-48 md:h-72 rounded" />
          </div>
          <div className="flex flex-col justify-center">
            <p
              className="text-[#d8d8d8] text-2xl md:text-3xl font-normal leading-snug mb-4"
              style={{ fontFamily: "'Instrument_Sans:Regular', sans-serif", fontVariationSettings: '"wdth" 100' }}
            >
              having second thoughts?
            </p>
            <p
              className="text-[#848484] text-lg md:text-[20px] leading-relaxed"
              style={{ fontFamily: "'Instrument_Sans:Regular', sans-serif", fontVariationSettings: '"wdth" 100' }}
            >
              With NEST, you can design and publish your brand in weeks. It's everything you've wanted in one agency.
            </p>
          </div>
        </div>
      </div>

      {/* "Don't worry, we got PROOOF." */}
      <div className="bg-[#2f2f2f] px-4 md:px-12 py-12 md:py-20">
        <div className="text-4xl sm:text-5xl md:text-[64px] tracking-[-2.56px] leading-[111px]" style={{ fontFamily: "'Instrument_Sans:Regular', sans-serif", fontVariationSettings: '"wdth" 100' }}>
          <span className="text-[#fffc5f]">Don't</span>
          <span className="text-[#d9d9d9]"> worry,</span>
        </div>
        <div className="text-[#d9d9d9] text-5xl sm:text-7xl md:text-[130px] tracking-[-8.5px] leading-none" style={{ fontFamily: "'Instrument_Sans:Regular', sans-serif", fontVariationSettings: '"wdth" 100' }}>
          we got{" "}
          <span className="text-[#fffc5f] font-semibold" style={{ fontFamily: "'Instrument_Sans:SemiBold', sans-serif" }}>PROOOF.</span>
        </div>
      </div>
    </section>
  );
}

/* ── Clients ── */
function Clients() {
  const clients = [
    {
      icon: "⚡",
      title: "Clarity drives action",
      desc: "We believe better decisions start with better data—measured, visible, and trusted.",
    },
    {
      icon: "🌐",
      title: "Clarity drives action",
      desc: "We believe better decisions start with better data—measured, visible, and trusted.",
    },
    {
      icon: "◎",
      title: "Clarity drives action",
      desc: "We believe better decisions start with better data—measured, visible, and trusted.",
    },
  ];
  return (
    <section id="clients" className="bg-[#fffc5f] py-16 md:py-24 px-4 md:px-12">
      <h2
        className="text-center text-black text-4xl sm:text-5xl md:text-[64px] leading-none mb-12"
        style={{ fontFamily: "'Inter:Regular', sans-serif" }}
      >
        Who are our Clients?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {clients.map((c, i) => (
          <div
            key={i}
            className="bg-white rounded-[39px] p-8 shadow-[inset_0px_4px_0px_0px_rgba(0,0,0,0.25)]"
          >
            <div className="text-5xl mb-4">{c.icon}</div>
            <h3
              className="font-semibold text-black text-2xl mb-2 tracking-[-1.44px]"
              style={{ fontFamily: "'Inter:Semi Bold', sans-serif" }}
            >
              {c.title}
            </h3>
            <p
              className="text-black text-[20px] tracking-[-1.2px]"
              style={{ fontFamily: "'Inter:Regular', sans-serif" }}
            >
              {c.desc}
            </p>
          </div>
        ))}
      </div>
      <p
        className="text-center mt-12 text-black text-2xl md:text-[32px] font-semibold tracking-wide"
        style={{ fontFamily: "'Instrument_Sans:SemiBold', sans-serif", fontVariationSettings: '"wdth" 100' }}
      >
        Discord · Squareit · Microsoft
      </p>
    </section>
  );
}

/* ── Pricing ── */
const pricingPlans = [
  {
    tier: "STARTER",
    price: "$79/mo",
    desc: "For startups getting started.",
    features: ["Logo design", "Brand identity", "Landing page", "Social media kit", "Brand guidelines"],
    cta: "Get Started",
  },
  {
    tier: "GROWTH",
    price: "$139/mo",
    desc: "For startups getting started.",
    features: ["Everything in Starter, plus:", "App design & development", "Marketing creatives", "Content design", "Campaign assets"],
    cta: "Get Started",
  },
  {
    tier: "SCALE",
    price: "$299/mo",
    desc: "For startups getting started.",
    features: ["Everything in Growth, plus:", "Paid advertising", "Analytics & reporting", "Ongoing creative support", "Dedicated project support"],
    cta: "Contact Us",
  },
];

function Pricing() {
  return (
    <section id="pricing" className="bg-[#2f2f2f] py-16 md:py-24 px-4 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p
            className="text-[#d8d8d8] text-4xl md:text-[64px] leading-[62px] tracking-[-2.56px]"
            style={{ fontFamily: "'Instrument_Sans:Regular', sans-serif", fontVariationSettings: '"wdth" 100' }}
          >
            Simple pricing.
          </p>
          <p
            className="text-[#838383] text-4xl md:text-[64px] leading-[62px] tracking-[-2.56px]"
            style={{ fontFamily: "'Instrument_Sans:Regular', sans-serif", fontVariationSettings: '"wdth" 100' }}
          >
            For teams that ship.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {pricingPlans.map((p) => (
            <div
              key={p.tier}
              className="bg-[#fffc5f] rounded-[39px] flex flex-col"
            >
              <div className="bg-white rounded-[39px] flex-1 p-8 shadow-[inset_0px_4px_0px_0px_rgba(0,0,0,0.25)] flex flex-col">
                <p
                  className="text-[#838383] font-bold text-[16px] mb-1"
                  style={{ fontFamily: "'Instrument_Sans:Bold', sans-serif", fontVariationSettings: '"wdth" 100' }}
                >
                  {p.tier}
                </p>
                <p
                  className="text-black font-semibold text-[48px] leading-none mb-1"
                  style={{ fontFamily: "'Instrument_Sans:SemiBold', sans-serif", fontVariationSettings: '"wdth" 100' }}
                >
                  {p.price}
                </p>
                <p
                  className="text-[#838383] text-[16px] mb-4"
                  style={{ fontFamily: "'Instrument_Sans:SemiBold', sans-serif", fontVariationSettings: '"wdth" 100' }}
                >
                  {p.desc}
                </p>
                <hr className="border-[#d9d9d9] border-[1.5px] mb-4" />
                <ul className="flex-1 space-y-3">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {i === 0 && p.tier !== "STARTER" ? (
                        <span
                          className="text-[#838383] font-bold text-[20px]"
                          style={{ fontFamily: "'Instrument_Sans:Bold', sans-serif", fontVariationSettings: '"wdth" 100' }}
                        >
                          {f}
                        </span>
                      ) : (
                        <>
                          <span className="inline-block mt-1 w-[23px] h-[23px] min-w-[23px] border-[3px] border-[#838383] bg-[#d9d9d9]" />
                          <span
                            className="text-[#838383] font-semibold text-[20px]"
                            style={{ fontFamily: "'Instrument_Sans:SemiBold', sans-serif", fontVariationSettings: '"wdth" 100' }}
                          >
                            {f}
                          </span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className="mx-4 mb-4 mt-0 py-3 rounded-[39px] bg-[#fffc5f] shadow-[0px_1px_1.5px_2px_rgba(0,0,0,0.25)] font-semibold text-[#62601d] text-[29px] tracking-[-2.03px] hover:brightness-95 transition-all"
                style={{ fontFamily: "'Instrument_Sans:SemiBold', sans-serif", fontVariationSettings: '"wdth" 100' }}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Feedback / Testimonials ── */
const testimonials = [
  {
    name: "Alexi M.",
    role: "Founder of Dextro",
    quote: "NEST took us from a rough idea to a brand we were actually proud to put out there. The logo, identity and website all finally felt like one company.",
  },
  {
    name: "Maya R.",
    role: "Co-founder of Kora",
    quote: "We came in with a product and no real identity. NEST built the brand, designed the product and helped us launch it without making the process feel overwhelming.",
  },
  {
    name: "Daniel K.",
    role: "Founder of Vio vi",
    quote: "We needed more than a website. NEST gave us the whole package, from the identity and site to the launch content. Everything actually felt connected.",
  },
];

function Feedback() {
  return (
    <section id="feedback" className="bg-[#fffbfb] py-16 md:py-24 px-4 md:px-12 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-baseline gap-2">
          <p
            className="text-[#fffc5f] font-semibold text-6xl md:text-[100px] leading-none tracking-[-2px]"
            style={{ fontFamily: "'Instrument_Sans:SemiBold', sans-serif", fontVariationSettings: '"wdth" 100' }}
          >
            Feedback
          </p>
          <p className="text-[#d8d8d8] text-2xl md:text-[40px] tracking-[-2.56px] leading-none ml-0 sm:ml-4" style={{ fontFamily: "'Instrument_Sans:Regular', sans-serif", fontVariationSettings: '"wdth" 100' }}>
            What our clients{" "}
            <span className="text-[#838383]">have to say</span>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-[#fffc5f] rounded-[39px] border-2 border-[#bfbd47] p-8 shadow-[inset_0px_-10px_0px_2px_rgba(0,0,0,0.25)] flex flex-col"
            >
              <p
                className="font-bold text-[#2f2f2f] text-[32px] leading-none mb-1"
                style={{ fontFamily: "'Inter:Bold', sans-serif" }}
              >
                {t.name}
              </p>
              <hr className="border-[#bfbd47] border-[1.5px] my-3" />
              <p
                className="font-extrabold text-[#2f2f2f] text-[20px] leading-none mb-4"
                style={{ fontFamily: "'Inter:Extra Bold', sans-serif" }}
              >
                {t.role}
              </p>
              <p
                className="text-[#2f2f2f] font-bold text-[24px] leading-snug flex-1"
                style={{ fontFamily: "'Inter:Bold', sans-serif" }}
              >
                <span className="text-[48px] leading-none">"</span>
                {t.quote}
                <span className="text-[48px] leading-none"> "</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Who We Are ── */
function WhoWeAre() {
  return (
    <section id="about" className="bg-[#2f2f2f] py-16 md:py-24 px-4 md:px-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="rounded overflow-hidden h-72 md:h-[576px]">
          <img
            src={imgRectangle15}
            alt="The NEST team"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2
            className="font-semibold text-[#d8d8d8] text-5xl md:text-[80px] leading-none tracking-[-5px] mb-6"
            style={{ fontFamily: "'Inter:Semi_Bold', sans-serif" }}
          >
            who are <span className="text-[#fffc5f]">WE</span>
          </h2>
          <p
            className="text-[#838383] text-xl md:text-[28px] leading-relaxed text-justify"
            style={{ fontFamily: "'Inter:Regular', sans-serif" }}
          >
            We're the people you call when you have a great idea but don't know what to do with it yet. We build the brand, design the website, create the content, and help you take it further. Basically, we help good ideas become real businesses.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ── */
const faqs = [
  { q: <><span>What exactly does </span><span className="text-[#fffc5f]">NEST</span><span> do?</span></>, a: "NEST is a full-service creative agency for startups. We handle branding, web design, content, and growth — everything you need to launch and scale." },
  { q: "Can you build my brand from scratch?", a: "Absolutely. We start from zero and build out your complete brand identity including logo, guidelines, typography, and color palette." },
  { q: "I already have a brand. Can you work with it?", a: "Yes! We're happy to extend or refresh an existing brand while staying true to your original vision." },
  { q: "Can I hire NEST for just one thing?", a: "Of course. Our Starter plan is perfect for targeted engagements like a logo or landing page." },
  { q: "How long does a project take?", a: "It depends on the scope. A logo can be done in a week; a full brand + website typically takes 3–6 weeks." },
  { q: "How do we get started?", a: "Click 'Get Started' on any plan, or reach out via the contact form. We'll schedule a quick discovery call." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="bg-[#2f2f2f] py-16 md:py-24 px-4 md:px-12">
      <div className="max-w-5xl mx-auto">
        {/* FAQ label */}
        <div className="mb-12 flex items-center gap-4">
          <div className="bg-[#fffc5f] inline-block">
            <p
              className="px-6 py-2 text-black text-[40px] md:text-[48px] leading-none shadow-[0px_4px_0px_0px_rgba(0,0,0,0.25)]"
              style={{ fontFamily: "'Inter:Regular', sans-serif" }}
            >
              F A Q
            </p>
          </div>
        </div>
        <ul className="space-y-4">
          {faqs.map((item, i) => (
            <li key={i}>
              <button
                className="w-full text-left flex items-center justify-between"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span
                  className="text-[#d9d9d9] text-2xl md:text-[36px] hover:text-[#fffc5f] transition-colors text-left"
                  style={{ fontFamily: "'Inter:Regular', sans-serif" }}
                >
                  {item.q}
                </span>
                <span className="text-[#fffc5f] text-3xl ml-4 flex-shrink-0">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <p
                  className="text-[#838383] text-xl mt-3 pl-0 leading-relaxed"
                  style={{ fontFamily: "'Inter:Regular', sans-serif" }}
                >
                  {item.a}
                </p>
              )}
              <div className="mt-3 border-b border-[#fffc5f] border-[1.5px]" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="bg-black overflow-hidden">
      <p
        className="text-[#fffc5f] font-bold text-center leading-none select-none"
        style={{
          fontFamily: "'Instrument_Sans:Bold', sans-serif",
          fontVariationSettings: '"wdth" 100',
          fontSize: "clamp(80px, 25vw, 420px)",
          letterSpacing: "-0.07em",
        }}
      >
        NEST
      </p>
    </footer>
  );
}

/* ── Main App ── */
export default function App() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#2f2f2f]">
      <NavBar onNav={scrollTo} />
      <Hero />
      <Whaa />
      <Clients />
      <div id="pricing" />
      <Pricing />
      <div id="feedback" />
      <Feedback />
      <div id="about" />
      <WhoWeAre />
      <FAQ />
      <Footer />
    </div>
  );
}
