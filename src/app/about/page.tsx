"use client";

import { Cpu, GitMerge, ShieldCheck, Eye, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const TEAM = [
  { id: 1, name: "Harish Nagari Gurumoorthy", role: "Full Stack & Data Engineer", focus: "Data Pipeline Architecture", initials: "HN", bio: "Python specialist and full-stack engineer architecting data pipelines and engineering foundations. Deep expertise in web scraping, automation, and end-to-end development.", keywords: ["Python", "Full Stack", "Web Scraping", "Pipelines"], theme: "cyan" },
  { id: 2, name: "Sruthi Nagari Gurumoorthy", role: "QA & CI/CD Engineer", focus: "Infrastructure & Quality", initials: "SN", bio: "Ensures every pipeline meets the highest reliability standards. Multi-skilled across software testing, CI/CD automation, and web development.", keywords: ["QA Automation", "CI/CD", "Web Dev", "Testing"], theme: "purple" },
  { id: 3, name: "Pawan Kumar", role: "IT Consultant", focus: "Systems Integration", initials: "PK", bio: "Meticulous analytical thinker translating complex business requirements into precise technical solutions, integration strategies, and actionable roadmaps.", keywords: ["IT Consulting", "Systems Analysis", "Integration"], theme: "emerald" },
];

const VALUES = [
  { icon: <Eye className="w-5 h-5 text-cyan-400" />, title: "Radical Transparency", desc: "No black boxes. Every pipeline and decision fully documented." },
  { icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />, title: "Security by Design", desc: "Enterprise-grade encryption baked into day one of our code." },
  { icon: <Zap className="w-5 h-5 text-cyan-400" />, title: "Agile Execution", desc: "Rapid iteration and reliable deployments that adapt to your needs." },
];

const THEME: Record<string, { border: string; shadow: string; badge: string; text: string; bg: string }> = {
  cyan:    { border: "border-cyan-500/60",    shadow: "shadow-[0_0_20px_rgba(34,211,238,0.3)]",   badge: "border-cyan-900/50 bg-cyan-950/40",    text: "text-cyan-300",    bg: "bg-cyan-950/40"    },
  purple:  { border: "border-purple-500/60",  shadow: "shadow-[0_0_20px_rgba(168,85,247,0.3)]",   badge: "border-purple-900/50 bg-purple-950/40", text: "text-purple-300",  bg: "bg-purple-950/40"  },
  emerald: { border: "border-emerald-500/60", shadow: "shadow-[0_0_20px_rgba(16,185,129,0.3)]",   badge: "border-emerald-900/50 bg-emerald-950/40",text: "text-emerald-300", bg: "bg-emerald-950/40" },
};

// ── Single Flip Card ──
// autoFlip: controlled externally for sequential animation
function FlipCard({ member, autoFlip = false }: { member: typeof TEAM[0]; autoFlip?: boolean }) {
  const [flipped, setFlipped] = useState(false);
  const t = THEME[member.theme];

  // Respond to auto-flip signal from parent
  useEffect(() => {
    if (autoFlip) {
      setFlipped(true);
      const timer = setTimeout(() => setFlipped(false), 1800);
      return () => clearTimeout(timer);
    }
  }, [autoFlip]);

  return (
    // Card is square, avatar takes ~60% of height
    <div className="w-36 h-44 cursor-pointer" style={{ perspective: "800px" }}
      onClick={() => setFlipped((f) => !f)}>
      <div className="relative w-full h-full transition-transform duration-500"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>

        {/* FRONT — large avatar (60% height) + name + title */}
        <div className={`absolute inset-0 rounded-2xl bg-neutral-900 border-2 ${t.border} ${t.shadow} flex flex-col items-center justify-start pt-3 px-2 pb-2`}
          style={{ backfaceVisibility: "hidden" }}>
          {/* Avatar circle — 60% of card height = ~104px */}
          <div className={`w-24 h-24 rounded-full ${t.bg} border-2 ${t.border} flex items-center justify-center mb-2 flex-shrink-0`}>
            <span className={`text-3xl font-extrabold font-mono ${t.text}`}>{member.initials}</span>
          </div>
          {/* Name + title in remaining 40% */}
          <h3 className="text-white font-bold text-xs text-center leading-tight mb-0.5 line-clamp-2">{member.name}</h3>
          <p className={`text-[10px] font-mono ${t.text} text-center leading-tight`}>{member.role.split(" ").slice(0, 3).join(" ")}</p>
        </div>

        {/* BACK — bio + skills */}
        <div className={`absolute inset-0 rounded-2xl ${t.bg} border-2 ${t.border} flex flex-col justify-between p-3 overflow-hidden`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <div>
            <p className={`font-mono text-[10px] font-bold ${t.text} mb-1.5`}>{member.focus}</p>
            <p className="text-gray-300 text-[10px] leading-relaxed line-clamp-6">{member.bio}</p>
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {member.keywords.slice(0, 3).map((k) => (
              <span key={k} className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${t.badge} ${t.text}`}>{k}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Triangle layout with sequential auto-flip ──
// Sequence: card 0 flips → 2s → unflips → card 1 flips → 2s → unflips → card 2 flips → 2s → unflips → repeat
function TeamTriangle() {
  const [autoFlipIndex, setAutoFlipIndex] = useState(-1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  // Start sequence when section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasStarted) { setHasStarted(true); } },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  // Run the flip sequence: each card flips for 1.8s, 0.5s gap between
  useEffect(() => {
    if (!hasStarted) return;
    let cardIndex = 0;
    const FLIP_DURATION = 1800;   // how long each card stays flipped
    const GAP = 500;              // gap between cards
    const LOOP_GAP = 3000;        // pause before repeating

    function flipNext() {
      setAutoFlipIndex(cardIndex);
      cardIndex = (cardIndex + 1) % TEAM.length;
      const nextDelay = cardIndex === 0 ? FLIP_DURATION + LOOP_GAP : FLIP_DURATION + GAP;
      return setTimeout(flipNext, nextDelay);
    }

    const timer = setTimeout(flipNext, 800); // initial delay
    return () => clearTimeout(timer);
  }, [hasStarted]);

  return (
    <div ref={sectionRef} className="flex flex-col items-center gap-3">
      {/* Top centre — member 0 */}
      <FlipCard member={TEAM[0]} autoFlip={autoFlipIndex === 0} />
      {/* Bottom row — members 1 and 2 */}
      <div className="flex gap-3">
        <FlipCard member={TEAM[1]} autoFlip={autoFlipIndex === 1} />
        <FlipCard member={TEAM[2]} autoFlip={autoFlipIndex === 2} />
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-neutral-950 text-white overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20">

        {/* 1. Header */}
        <div className="text-center mb-6 md:mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/10 rounded-full blur-[80px] -z-10 pointer-events-none animate-pulse" />
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-3xl md:text-6xl font-extrabold tracking-tight mb-3 md:mb-5">
            The <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">Brains</span> Behind the Data
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-300 text-sm md:text-xl leading-relaxed">
            A family-founded team of engineers, testers, and consultants solving complex data challenges with precision and speed.
          </motion.p>
        </div>

        {/* 2. Mission */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl mx-auto text-center mb-8 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 mb-4 text-xs font-mono tracking-wider">
            <Cpu size={13} className="animate-pulse" /><span>OUR_MISSION</span>
          </div>
          <h2 className="text-xl md:text-4xl font-bold text-white leading-tight mb-3 md:mb-6">
            Building bridges between <span className="text-cyan-400">Raw Data and Actionable Insight</span>
          </h2>
          <p className="text-gray-300 leading-relaxed text-sm md:text-lg font-light">
            We started WillowVibe because we saw businesses drowning in messy, unreliable data. As a family-founded team, we handle the technical heavy lifting so you can focus on your business with absolute peace of mind.
          </p>
        </motion.div>

        {/* 3. Team */}
        <div className="mb-8 md:mb-20">
          <div className="text-center mb-5 md:mb-10">
            <h2 className="text-xl md:text-3xl font-bold mb-3 font-mono">THE_COLLECTIVE</h2>
            <div className="h-0.5 w-16 bg-cyan-400 mx-auto" />
          </div>

          {/* Mobile: triangle with auto-flip */}
          <div className="md:hidden flex justify-center">
            <TeamTriangle />
          </div>

          {/* Desktop: 3-column cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {TEAM.map((member, idx) => {
              const t = THEME[member.theme];
              return (
                <motion.div key={member.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="group p-6 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-neutral-500 transition-all shadow-lg flex flex-col items-center text-center">
                  <div className={`w-20 h-20 rounded-full bg-neutral-800 border-2 ${t.border} ${t.shadow} flex items-center justify-center mb-4`}>
                    <span className={`text-2xl font-extrabold font-mono ${t.text}`}>{member.initials}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-0.5">{member.name}</h3>
                  <p className={`font-mono text-xs mb-0.5 ${t.text}`}>{member.role}</p>
                  <p className="text-gray-500 text-xs font-mono mb-3">{member.focus}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 font-light">{member.bio}</p>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-auto pt-4 border-t border-neutral-800 w-full">
                    {member.keywords.map((keyword, i) => (
                      <span key={i} className={`text-xs font-mono px-2 py-1 rounded bg-black/60 border ${t.badge} ${t.text}`}>{keyword}</span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
          {/* "coming soon" text removed — photos replace initials when ready */}
        </div>

        {/* 4. Operating Principles — compact 3-col row on mobile */}
        <div className="mb-8 md:mb-20">
          <div className="text-center mb-5 md:mb-10">
            <h2 className="text-xl md:text-3xl font-bold mb-3 font-mono">OPERATING_PRINCIPLES</h2>
            <div className="h-0.5 w-16 bg-cyan-400 mx-auto" />
          </div>

          {/* Mobile: all 3 side by side in compact blocks */}
          <div className="md:hidden grid grid-cols-3 gap-2">
            {VALUES.map((val, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                <div className="p-1.5 rounded-lg bg-black/40 mb-2 inline-block">{val.icon}</div>
                <h3 className="text-xs font-bold text-white mb-1 leading-tight">{val.title}</h3>
                <p className="text-gray-400 text-[10px] leading-snug">{val.desc}</p>
              </div>
            ))}
          </div>

          {/* Desktop: larger cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {VALUES.map((val, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all group">
                <div className="mb-4 p-3 rounded-xl bg-black/40 inline-block group-hover:bg-cyan-400/10 transition-colors">{val.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-white">{val.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed font-light">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 5. Stats — always 3 columns */}
        <div className="relative py-8 md:py-14">
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none -z-10">
            <div className="w-48 h-48 rounded-full border border-cyan-400/30 animate-[spin_10s_linear_infinite] relative">
              <div className="absolute w-64 h-64 -top-8 -left-8 rounded-full border border-blue-500/20 border-dashed animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute top-8 left-8 w-32 h-32 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center animate-[spin_5s_linear_infinite_reverse]">
                <GitMerge className="w-8 h-8 text-cyan-400 animate-pulse" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 md:gap-6 w-full z-10 relative">
            {[["99.99%","Uptime SLA"],["50+","Enterprise Clients"],["10PB+","Data Processed"]].map(([v,l]) => (
              <motion.div key={l} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                className="p-3 md:p-6 text-center rounded-xl bg-neutral-900/80 border border-neutral-700 hover:border-cyan-400/50 transition-colors group">
                <div className="text-xl md:text-4xl font-extrabold text-white mb-1 group-hover:text-cyan-400 transition-all font-mono">{v}</div>
                <div className="text-[10px] md:text-xs tracking-wide text-gray-400 uppercase font-semibold leading-tight">{l}</div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* 6. CTA */}
      <section className="w-full bg-gradient-to-t from-cyan-950/20 to-transparent py-10 md:py-20 border-t border-white/5 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-5">Ready to work with us?</h2>
          <p className="text-sm md:text-lg text-gray-400 mb-5 md:mb-8 leading-relaxed">
            Stop struggling with unreliable data. Partner with our engineers to build a resilient data architecture that scales with your business.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-cyan-400 text-black font-bold rounded-lg hover:scale-105 transition-all text-sm md:text-base">
            Let&apos;s Talk Data <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
