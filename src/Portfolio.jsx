import React, { useState, useEffect, useRef } from "react";

// ---------- Design tokens ----------
const C = {
  paper: "#F3F6F2",
  ink: "#13251B",
  terminal: "#0C1A12",
  termLine: "#1C3326",
  pass: "#1FA455",
  passBright: "#3DDC84",
  fail: "#E5484D",
  amber: "#E8A23D",
  muted: "#5F7468",
  card: "#FFFFFF",
  border: "#DCE5DC",
};

const FONT_DISPLAY = "'Space Grotesk', system-ui, sans-serif";
const FONT_MONO = "'IBM Plex Mono', monospace";

// ---------- Terminal test-run data (the signature element) ----------
const TEST_LINES = [
  { name: "experience.years >= 3", time: "0.31s" },
  { name: "domains.include('banking', 'telecom')", time: "0.18s" },
  { name: "clients.include('ANZ Bank')", time: "0.22s" },
  { name: "manual.regression && manual.uat", time: "0.09s" },
  { name: "automation.selenium(POM, TestNG)", time: "0.44s" },
  { name: "api.postman(REST).validated", time: "0.27s" },
  { name: "sql.check('PostgreSQL', 'MySQL')", time: "0.15s" },
  { name: "process.agile && reports.onTime", time: "0.11s" },
  { name: "availability.freelance === true", time: "0.05s" },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", fn);
    return () => mq.removeEventListener?.("change", fn);
  }, []);
  return reduced;
}

// ---------- Terminal component ----------
function TestTerminal() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(reduced ? TEST_LINES.length + 1 : 0);
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    if (reduced) { setStep(TEST_LINES.length + 1); return; }
    setStep(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setStep(i);
      if (i > TEST_LINES.length) clearInterval(id);
    }, 420);
    return () => clearInterval(id);
  }, [runKey, reduced]);

  const done = step > TEST_LINES.length;

  return (
    <div
      className="rounded-xl overflow-hidden shadow-2xl w-full"
      style={{ background: C.terminal, border: `1px solid ${C.termLine}` }}
    >
      {/* title bar */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: `1px solid ${C.termLine}` }}
      >
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ background: C.fail }} />
          <span className="w-3 h-3 rounded-full" style={{ background: C.amber }} />
          <span className="w-3 h-3 rounded-full" style={{ background: C.pass }} />
        </div>
        <span className="text-xs" style={{ fontFamily: FONT_MONO, color: "#7FA08C" }}>
          Saurav Kumar — hire_me.suite (TestNG)
        </span>
        <button
          onClick={() => setRunKey((k) => k + 1)}
          className="text-xs px-2 py-1 rounded hover:opacity-80"
          style={{ fontFamily: FONT_MONO, color: C.passBright, border: `1px solid ${C.termLine}` }}
          aria-label="Re-run test suite"
        >
          ↻ re-run
        </button>
      </div>

      {/* body */}
      <div className="px-4 sm:px-5 py-4 text-xs sm:text-sm" style={{ fontFamily: FONT_MONO, minHeight: 320 }}>
        <p style={{ color: "#7FA08C" }}>$ mvn test -Dsuite=hire_saurav</p>
        <div className="mt-3 space-y-2">
          {TEST_LINES.map((t, i) => {
            const visible = step > i;
            return (
              <div
                key={t.name}
                className="flex items-baseline justify-between gap-3"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(4px)",
                  transition: reduced ? "none" : "opacity .3s ease, transform .3s ease",
                }}
              >
                <span className="truncate" style={{ color: "#C9DCCF" }}>
                  <span style={{ color: C.passBright }}>✓</span> {t.name}
                </span>
                <span className="shrink-0" style={{ color: "#5C7A68" }}>{t.time}</span>
              </div>
            );
          })}
        </div>

        <div
          className="mt-4 pt-3"
          style={{
            borderTop: `1px dashed ${C.termLine}`,
            opacity: done ? 1 : 0,
            transition: reduced ? "none" : "opacity .4s ease",
          }}
        >
          <p style={{ color: C.passBright }}>
            Tests run: 9 · Failures: 0 · Skipped: 0
          </p>
          <p className="mt-1" style={{ color: "#C9DCCF" }}>
            BUILD <span style={{ color: C.passBright, fontWeight: 700 }}>SUCCESS</span> — candidate ready for your project.
          </p>
          <span
            className="inline-block mt-1"
            style={{
              width: 9,
              height: 16,
              background: C.passBright,
              animation: reduced ? "none" : "blink 1s steps(1) infinite",
              verticalAlign: "middle",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ---------- Small building blocks ----------
function Eyebrow({ children }) {
  return (
    <p
      className="text-xs tracking-widest uppercase mb-3"
      style={{ fontFamily: FONT_MONO, color: C.pass }}
    >
      // {children}
    </p>
  );
}

function SectionTitle({ children }) {
  return (
    <h2
      className="text-3xl sm:text-4xl font-bold mb-10"
      style={{ fontFamily: FONT_DISPLAY, color: C.ink, letterSpacing: "-0.02em" }}
    >
      {children}
    </h2>
  );
}

// ---------- Data ----------
const SERVICES = [
  {
    id: "TC-01",
    title: "Manual & Regression Testing",
    desc: "End-to-end test design and execution from your requirements — smoke, regression, integration and UAT. You get a clear test plan, executed cases, and a defect log your developers can act on immediately.",
    tags: ["Test cases", "Regression", "UAT", "JIRA"],
  },
  {
    id: "TC-02",
    title: "Selenium Automation",
    desc: "Automation of your repetitive flows with Selenium WebDriver + TestNG, structured with Page Object Model and data-driven tests. Delivered as a maintainable framework, not throwaway scripts.",
    tags: ["Selenium", "TestNG", "POM", "Java"],
  },
  {
    id: "TC-03",
    title: "API Testing",
    desc: "REST API validation with Postman — status codes, schemas, negative cases, and workflow chains. Ideal before a release or when the frontend keeps blaming the backend.",
    tags: ["Postman", "REST", "Negative testing"],
  },
  {
    id: "TC-04",
    title: "Database Validation",
    desc: "SQL-level verification on PostgreSQL and MySQL to confirm what the UI claims is actually what got stored — data integrity checks, migration verification, backend reconciliation.",
    tags: ["SQL", "PostgreSQL", "MySQL"],
  },
];

const EXPERIENCE = [
  {
    role: "QA Engineer",
    company: "Intellect Design Arena",
    client: "Client: ANZ Bank",
    period: "Dec 2025 — Present",
    points: [
      "Manual testing of core banking applications and workflows",
      "Selenium automation for repetitive regression cases (POM)",
      "API testing with Postman and SQL data validation",
    ],
  },
  {
    role: "QA Engineer",
    company: "BT Group",
    client: "Telecom",
    period: "Nov 2024 — Nov 2025",
    points: [
      "Regression execution and defect tracking in JIRA & ServiceNow",
      "Test reporting and status communication to stakeholders",
      "Supported Selenium automation initiatives",
    ],
  },
  {
    role: "QA Analyst",
    company: "DXC Technology",
    client: "Enterprise applications",
    period: "Jun 2022 — Oct 2024",
    points: [
      "Test case design and execution across enterprise apps",
      "SQL validation and UAT support",
      "Maintained QA standards and processes",
    ],
  },
];

const PROCESS = [
  { step: "Understand", desc: "I read your requirements, ask the awkward questions early, and agree on scope before anything is executed." },
  { step: "Plan", desc: "A lightweight test plan: what gets tested, how, on which environments — no 40-page documents unless you want them." },
  { step: "Execute", desc: "Manual passes plus automation where it pays off. Every defect logged with steps, evidence and severity." },
  { step: "Report", desc: "A clear summary you can forward to your team or client: what passed, what failed, what I'd fix first." },
];

const PHOTO = "data:image/jpeg;base64,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";
const EMAIL = "sauravkumar160100@gmail.com";
const PHONE = "+91 9560320161";
const WHATSAPP = "https://wa.me/919560320161";
const LINKEDIN = "https://www.linkedin.com/in/saurav-kumar-736a7121a";

// ---------- Page ----------
export default function Portfolio() {
  return (
    <div style={{ background: C.paper, color: C.ink, fontFamily: FONT_DISPLAY }} className="min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        @keyframes blink { 50% { opacity: 0; } }
        html { scroll-behavior: smooth; }
        a:focus-visible, button:focus-visible { outline: 2px solid ${C.pass}; outline-offset: 3px; }
      `}</style>

      {/* ---------- Nav ---------- */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-5 sm:px-10 py-4"
        style={{ background: "rgba(243,246,242,0.9)", backdropFilter: "blur(8px)", borderBottom: `1px solid ${C.border}` }}
      >
        <span style={{ fontFamily: FONT_MONO, fontWeight: 600 }}>
          Saurav Kumar<span style={{ color: C.pass }}> · QA</span>
        </span>
        <div className="hidden sm:flex items-center gap-6 text-sm" style={{ fontFamily: FONT_MONO }}>
          <a href="#services" className="hover:opacity-70">services</a>
          <a href="#experience" className="hover:opacity-70">experience</a>
          <a href="#process" className="hover:opacity-70">process</a>
        </div>
        <a
          href={`mailto:${EMAIL}`}
          className="text-sm px-4 py-2 rounded-lg font-medium"
          style={{ background: C.ink, color: C.paper }}
        >
          Hire me
        </a>
      </nav>

      {/* ---------- Hero ---------- */}
      <header className="max-w-6xl mx-auto px-5 sm:px-10 pt-14 sm:pt-20 pb-16 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <img
              src={PHOTO}
              alt="Saurav Kumar, QA Engineer"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shadow-lg"
              style={{ border: `3px solid ${C.pass}` }}
            />
            <p
              className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full"
              style={{ fontFamily: FONT_MONO, background: "#E2EFE4", color: "#166534", border: `1px solid #C3DEC8` }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: C.pass }} />
              Available for freelance QA projects
            </p>
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            style={{ letterSpacing: "-0.03em" }}
          >
            I break your software{" "}
            <span style={{ color: C.pass }}>before your users do.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-relaxed" style={{ color: C.muted, maxWidth: 520 }}>
            QA Engineer with 3+ years testing banking, telecom and enterprise
            applications — manual, Selenium automation, API and database testing.
            Trusted on production systems for <strong style={{ color: C.ink }}>ANZ Bank</strong> and{" "}
            <strong style={{ color: C.ink }}>BT Group</strong>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${EMAIL}?subject=Freelance QA project`}
              className="px-6 py-3 rounded-lg font-semibold text-sm sm:text-base"
              style={{ background: C.pass, color: "#fff" }}
            >
              Get a free test assessment
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-lg font-semibold text-sm sm:text-base"
              style={{ border: `1.5px solid ${C.ink}`, color: C.ink }}
            >
              WhatsApp me
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm" style={{ fontFamily: FONT_MONO, color: C.muted }}>
            <span><strong style={{ color: C.ink }}>3+</strong> yrs experience</span>
            <span><strong style={{ color: C.ink }}>3</strong> enterprise clients</span>
            <span><strong style={{ color: C.ink }}>Banking</strong> · Telecom · SaaS</span>
          </div>
        </div>
        <TestTerminal />
      </header>

      {/* ---------- Trust bar ---------- */}
      <div style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.card }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-10 py-5 flex flex-wrap items-center gap-x-10 gap-y-2 text-sm" style={{ fontFamily: FONT_MONO, color: C.muted }}>
          <span className="uppercase tracking-widest text-xs">Tested for</span>
          <span style={{ color: C.ink, fontWeight: 600 }}>ANZ Bank</span>
          <span style={{ color: C.ink, fontWeight: 600 }}>BT Group</span>
          <span style={{ color: C.ink, fontWeight: 600 }}>DXC Technology</span>
        </div>
      </div>

      {/* ---------- Services ---------- */}
      <section id="services" className="max-w-6xl mx-auto px-5 sm:px-10 py-20">
        <Eyebrow>services</Eyebrow>
        <SectionTitle>What I can test for you</SectionTitle>
        <div className="grid sm:grid-cols-2 gap-5">
          {SERVICES.map((s) => (
            <div
              key={s.id}
              className="rounded-xl p-6 sm:p-7 transition-transform hover:-translate-y-1"
              style={{ background: C.card, border: `1px solid ${C.border}` }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs px-2 py-1 rounded" style={{ fontFamily: FONT_MONO, background: "#E9F3EA", color: "#166534" }}>
                  {s.id}
                </span>
                <span className="text-xs" style={{ fontFamily: FONT_MONO, color: C.pass }}>✓ PASS</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{s.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded" style={{ fontFamily: FONT_MONO, border: `1px solid ${C.border}`, color: C.muted }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Experience ---------- */}
      <section id="experience" style={{ background: C.terminal }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-10 py-20">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: FONT_MONO, color: C.passBright }}>
            // execution history
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12" style={{ color: "#EAF2EB", letterSpacing: "-0.02em" }}>
            Where I've tested
          </h2>
          <div className="space-y-0">
            {EXPERIENCE.map((e, i) => (
              <div
                key={e.company}
                className="grid sm:grid-cols-[220px_1fr] gap-4 sm:gap-10 py-8"
                style={{ borderTop: `1px solid ${C.termLine}`, borderBottom: i === EXPERIENCE.length - 1 ? `1px solid ${C.termLine}` : "none" }}
              >
                <div>
                  <p className="text-sm" style={{ fontFamily: FONT_MONO, color: C.passBright }}>{e.period}</p>
                  <p className="text-xs mt-1" style={{ fontFamily: FONT_MONO, color: "#6C8B77" }}>{e.client}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: "#EAF2EB" }}>
                    {e.role} · {e.company}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {e.points.map((p) => (
                      <li key={p} className="text-sm leading-relaxed flex gap-2" style={{ color: "#A9C4B1" }}>
                        <span style={{ color: C.passBright }}>✓</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Automation project */}
          <div className="mt-12 rounded-xl p-6 sm:p-8" style={{ border: `1px solid ${C.termLine}`, background: "#102319" }}>
            <p className="text-xs tracking-widest uppercase mb-2" style={{ fontFamily: FONT_MONO, color: C.amber }}>
              featured framework
            </p>
            <h3 className="text-xl sm:text-2xl font-bold" style={{ color: "#EAF2EB" }}>
              Selenium + TestNG automation framework
            </h3>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "#A9C4B1", maxWidth: 640 }}>
              A reusable Java framework built with Page Object Model and data-driven
              testing — covering login, registration and dashboard flows with
              automated execution reports. The same structure I bring to client
              automation projects, so you own maintainable tests, not fragile scripts.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Java", "Selenium WebDriver", "TestNG", "POM", "Data-driven", "Maven", "Git"].map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded" style={{ fontFamily: FONT_MONO, border: `1px solid ${C.termLine}`, color: "#8FB59C" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Process ---------- */}
      <section id="process" className="max-w-6xl mx-auto px-5 sm:px-10 py-20">
        <Eyebrow>process</Eyebrow>
        <SectionTitle>How a project with me runs</SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS.map((p, i) => (
            <div key={p.step} className="rounded-xl p-6" style={{ background: C.card, border: `1px solid ${C.border}` }}>
              <p className="text-xs mb-3" style={{ fontFamily: FONT_MONO, color: C.pass }}>
                step {i + 1}/4
              </p>
              <h3 className="text-lg font-bold mb-2">{p.step}</h3>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section className="max-w-6xl mx-auto px-5 sm:px-10 pb-24">
        <div
          className="rounded-2xl px-6 sm:px-12 py-12 sm:py-16 text-center"
          style={{ background: C.ink, color: C.paper }}
        >
          <p className="text-xs tracking-widest uppercase mb-4" style={{ fontFamily: FONT_MONO, color: C.passBright }}>
            // assert(project.quality)
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ letterSpacing: "-0.02em" }}>
            Shipping soon? Let's make sure it works.
          </h2>
          <p className="mt-4 text-sm sm:text-base max-w-xl mx-auto" style={{ color: "#B7C7BB" }}>
            Send me your app, a staging link, or just an idea of what's breaking —
            I'll reply within 24 hours with how I'd test it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${EMAIL}?subject=Freelance QA project`}
              className="px-6 py-3 rounded-lg font-semibold"
              style={{ background: C.pass, color: "#fff" }}
            >
              {EMAIL}
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-lg font-semibold"
              style={{ border: `1.5px solid #3E5847`, color: C.paper }}
            >
              WhatsApp · {PHONE}
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-lg font-semibold"
              style={{ border: `1.5px solid #3E5847`, color: C.paper }}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
        <p className="text-center text-xs mt-8" style={{ fontFamily: FONT_MONO, color: C.muted }}>
          Saurav Kumar · QA Engineer · Mumbai, India · B.Tech CS, NIET (2018–2022)
        </p>
      </section>
    </div>
  );
}
