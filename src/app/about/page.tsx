"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, GitMerge } from "lucide-react";

const TEAM = [
  {
    id: 1,
    name: "Harish Nagari Gurumoorthy",
    role: "Founder",
    focus: "Full Stack & Data Engineer",
    initials: "HN",
    bio: "Python specialist and full-stack engineer architecting data pipelines and engineering foundations. Deep expertise in web scraping, automation, and end-to-end development.",
    keywords: ["Python", "Full Stack", "Web Scraping", "Pipelines"],
    theme: "cyan",
    position: "left",
  },
  {
    id: 2,
    name: "Sruthi Nagari Gurumoorthy",
    role: "Co-Founder",
    focus: "Engineering, Marketing & Operations",
    initials: "SN",
    bio: "Engineer and co-founder handling marketing, HR, management, and operations. Ensures every pipeline meets the highest reliability standards across software testing and CI/CD.",
    keywords: ["QA Automation", "CI/CD", "Marketing", "Operations"],
    theme: "purple",
    position: "bottom",
  },
  {
    id: 3,
    name: "Pawan Kumar",
    role: "PLM Specialist",
    focus: "Systems Integration & PLM",
    initials: "PK",
    bio: "Meticulous analytical thinker handling PLM inputs and translating complex business requirements into precise technical solutions and integration strategies.",
    keywords: ["PLM", "IT Consulting", "Systems Analysis", "Integration"],
    theme: "emerald",
    position: "right",
  },
];

const THEME: Record<string, { border: string; shadow: string; badge: string; text: string; bg: string; arrow: string }> = {
  cyan:    { border: "border-cyan-500/60",    shadow: "shadow-[0_0_20px_rgba(34,211,238,0.3)]",   badge: "border-cyan-900/50 bg-cyan-950/40",    text: "text-cyan-300",    bg: "bg-cyan-950/40",    arrow: "#22d3ee" },
  purple:  { border: "border-purple-500/60",  shadow: "shadow-[0_0_20px_rgba(168,85,247,0.3)]",   badge: "border-purple-900/50 bg-purple-950/40", text: "text-purple-300",  bg: "bg-purple-950/40",  arrow: "#a855f7" },
  emerald: { border: "border-emerald-500/60", shadow: "shadow-[0_0_20px_rgba(16,185,129,0.3)]",   badge: "border-emerald-900/50 bg-emerald-950/40",text: "text-emerald-300", bg: "bg-emerald-950/40", arrow: "#10b981" },
};

function DrawingArrow({ color, path, delay }: { color: string; path: string; delay: number }) {
  const ref = useRef<SVGPathElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <path
      ref={ref}
      d={path}
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      strokeDasharray="200"
      strokeDashoffset={inView ? "0" : "200"}
      style={{
        transition: `stroke-dashoffset 1.2s ease ${delay}s`,
        filter: `drop-shadow(0 0 4px ${color})`,
      }}
    />
  );
}

function ArrowHead({ color, points, delay }: { color: string; points: string; delay: number }) {
  const ref = useRef<SVGPolygonElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <polygon
      ref={ref}
      points={points}
      fill={color}
      style={{
        opacity: inView ? 1 : 0,
        transition: `opacity 0.3s ease ${delay + 1}s`,
        filter: `drop-shadow(0 0 4px ${color})`,
      }}
    />
  );
}

function PersonCard({ member }: { member: typeof TEAM[0] }) {
  const t = THEME[member.theme];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className={`relative p-4 rounded-2xl bg-neutral-900 border-2 ${t.border} ${t.shadow} flex flex-col gap-2 w-52`}
    >
      <div className={`w-12 h-12 rounded-full ${t.bg} border-2 ${t.border} flex items-center justify-center flex-shrink-0`}>
        <span className={`text-lg font-extrabold font-mono ${t.text}`}>{member.initials}</span>
      </div>
      <div>
        <p className={`text-[10px] font-mono font-bold ${t.text} tracking-widest`}>{member.role}</p>
        <h3 className="text-white font-bold text-sm leading-tight">{member.name}</h3>
        <p className="text-gray-400 text-[10px] leading-snug mt-0.5">{member.focus}</p>
      </div>
      <p className="text-gray-400 text-[10px] leading-relaxed">{member.bio}</p>
      <div className="flex flex-wrap gap-1 mt-1">
        {member.keywords.map((k) => (
          <span key={k} className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${t.badge} ${t.text}`}>{k}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20">

        {/* 1. Header */}
        <div className="text-center mb-10 md:mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/10 rounded-full blur-[80px] -z-10 pointer-events-none animate-pulse" />
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-6xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            The Brains Behind the Data
          </motion.h1>
        </div>

        {/* 2. Constellation team section */}
        <div className="relative flex flex-col items-center mb-16 md:mb-24">

          {/* Desktop constellation */}
          <div className="hidden md:block relative w-full" style={{ height: "600px" }}>

            {/* SVG arrows layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 900 600" preserveAspectRatio="xMidYMid meet">
              {/* Arrow to Harish — curves left */}
              <DrawingArrow
                color={THEME.cyan.arrow}
                path="M 450 280 C 400 260 320 240 230 220"
                delay={0.3}
              />
              <ArrowHead color={THEME.cyan.arrow} points="230,220 245,212 243,228" delay={0.3} />

              {/* Arrow to Sruthi — curves down */}
              <DrawingArrow
                color={THEME.purple.arrow}
                path="M 450 320 C 450 370 440 420 430 470"
                delay={0.6}
              />
              <ArrowHead color={THEME.purple.arrow} points="430,470 422,456 438,458" delay={0.6} />

              {/* Arrow to Pawan — curves right */}
              <DrawingArrow
                color={THEME.emerald.arrow}
                path="M 450 280 C 510 260 580 240 670 220"
                delay={0.9}
              />
              <ArrowHead color={THEME.emerald.arrow} points="670,220 655,212 657,228" delay={0.9} />
            </svg>

            {/* Center illustration */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <img
                  src="/team-3.svg"
                  alt="WillowVibe team"
                  className="w-64 h-64 object-contain drop-shadow-[0_0_30px_rgba(34,211,238,0.15)]"
                />
              </motion.div>
            </div>

            {/* Harish — left */}
            <div className="absolute z-30" style={{ left: "2%", top: "20%" }}>
              <PersonCard member={TEAM[0]} />
            </div>

            {/* Sruthi — bottom center */}
            <div className="absolute z-30" style={{ left: "50%", top: "72%", transform: "translateX(-50%)" }}>
              <PersonCard member={TEAM[1]} />
            </div>

            {/* Pawan — right */}
            <div className="absolute z-30" style={{ right: "2%", top: "20%" }}>
              <PersonCard member={TEAM[2]} />
            </div>

          </div>

          {/* Mobile stacked layout */}
          <div className="md:hidden flex flex-col items-center gap-6 w-full">
            <motion.img
              src="/team-3.svg"
              alt="WillowVibe team"
              className="w-56 h-56 object-contain"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            />
            {TEAM.map((member) => (
              <PersonCard key={member.id} member={member} />
            ))}
          </div>

        </div>

        {/* 3. Story section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-20"
        >
          <p className="text-gray-300 leading-relaxed text-sm md:text-lg font-light">
            We are a family-founded team of engineers, testers, and consultants. We started WillowVibe because we saw businesses drowning in messy, unreliable data. As a tight-knit founding team, we handle the technical heavy lifting — from data pipelines and cloud infrastructure to PLM systems and business intelligence — so you can focus on your business with absolute peace of mind.
          </p>
        </motion.div>

        {/* 4. Stats */}
        <div className="relative py-8 md:py-14 mb-12">
          <div className="grid grid-cols-3 gap-3 md:gap-6 w-full z-10 relative">
            {[["99.99%","Uptime SLA"],["50+","Enterprise Clients"],["10PB+","Data Processed"]].map(([v,l]) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-3 md:p-6 text-center rounded-xl bg-neutral-900/80 border border-neutral-700 hover:border-cyan-400/50 transition-colors group"
              >
                <div className="text-xl md:text-4xl font-extrabold text-white mb-1 group-hover:text-cyan-400 transition-all font-mono">{v}</div>
                <div className="text-[10px] md:text-xs tracking-wide text-gray-400 uppercase font-semibold leading-tight">{l}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 5. Operating Principles */}
        <div className="mb-12 md:mb-20">
          <div className="text-center mb-6 md:mb-10">
            <h2 className="text-xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Operating Principles</h2>
            <div className="h-0.5 w-16 bg-cyan-400 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Radical Transparency", desc: "No black boxes. Every pipeline and decision fully documented." },
              { title: "Security by Design", desc: "Enterprise-grade encryption baked into day one of our code." },
              { title: "Agile Execution", desc: "Rapid iteration and reliable deployments that adapt to your needs." },
            ].map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all group"
              >
                <h3 className="text-lg font-bold mb-2 text-white">{val.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed font-light">{val.desc}</p>
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
