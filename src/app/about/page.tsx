"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

const TEAM = [
  {
    id: 1,
    name: "Harish Nagari Gurumoorthy",
    role: "Founder",
    focus: "Full Stack & Data Engineer",
    bio: "Python specialist and full-stack engineer architecting data pipelines and engineering foundations. Deep expertise in web scraping, automation, and end-to-end development.",
    keywords: ["Python", "Full Stack", "Web Scraping", "Pipelines"],
    theme: "cyan",
    floatDelay: 0,
    floatDuration: 4,
  },
  {
    id: 2,
    name: "Sruthi Nagari Gurumoorthy",
    role: "Co-Founder",
    focus: "Engineering, Marketing & Operations",
    bio: "Engineer and co-founder handling marketing, HR, management, and operations. Ensures every pipeline meets the highest reliability standards across software testing and CI/CD.",
    keywords: ["QA Automation", "CI/CD", "Marketing", "Operations"],
    theme: "purple",
    floatDelay: 1.2,
    floatDuration: 5,
  },
  {
    id: 3,
    name: "Pawan Kumar",
    role: "PLM Advisor",
    focus: "Systems Integration & PLM",
    bio: "Meticulous analytical thinker handling PLM inputs and translating complex business requirements into precise technical solutions and integration strategies.",
    keywords: ["PLM", "IT Consulting", "Systems Analysis", "Integration"],
    theme: "emerald",
    floatDelay: 0.6,
    floatDuration: 4.5,
  },
];

const THEME: Record<string, {
  border: string;
  glow: string;
  glowHover: string;
  badge: string;
  text: string;
  bg: string;
  arrow: string;
  gradient: string;
}> = {
  cyan: {
    border: "border-cyan-400/60",
    glow: "shadow-[0_0_25px_rgba(34,211,238,0.2)]",
    glowHover: "hover:shadow-[0_0_45px_rgba(34,211,238,0.5)]",
    badge: "border-cyan-900/50 bg-cyan-950/40",
    text: "text-cyan-300",
    bg: "bg-cyan-950/30",
    arrow: "#22d3ee",
    gradient: "from-cyan-400 to-blue-400",
  },
  purple: {
    border: "border-purple-400/60",
    glow: "shadow-[0_0_25px_rgba(168,85,247,0.2)]",
    glowHover: "hover:shadow-[0_0_45px_rgba(168,85,247,0.5)]",
    badge: "border-purple-900/50 bg-purple-950/40",
    text: "text-purple-300",
    bg: "bg-purple-950/30",
    arrow: "#a855f7",
    gradient: "from-purple-400 to-pink-400",
  },
  emerald: {
    border: "border-emerald-400/60",
    glow: "shadow-[0_0_25px_rgba(16,185,129,0.2)]",
    glowHover: "hover:shadow-[0_0_45px_rgba(16,185,129,0.5)]",
    badge: "border-emerald-900/50 bg-emerald-950/40",
    text: "text-emerald-300",
    bg: "bg-emerald-950/30",
    arrow: "#10b981",
    gradient: "from-emerald-400 to-cyan-400",
  },
};

function DrawingArrow({ color, path, delay }: { color: string; path: string; delay: number }) {
  const ref = useRef<SVGPathElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <path
      ref={ref}
      d={path}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      strokeDasharray="300"
      strokeDashoffset={inView ? "0" : "300"}
      style={{
        transition: `stroke-dashoffset 1.4s ease ${delay}s`,
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
        transition: `opacity 0.3s ease ${delay + 1.2}s`,
        filter: `drop-shadow(0 0 4px ${color})`,
      }}
    />
  );
}

function BubbleCard({ member, size = "md" }: { member: typeof TEAM[0]; size?: "md" | "lg" }) {
  const [showBio, setShowBio] = useState(false);
  const t = THEME[member.theme];
  const diameter = size === "lg" ? 220 : 190;

  return (
    <>
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{
          duration: member.floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: member.floatDelay,
        }}
        whileHover={{ scale: 1.06 }}
        onClick={() => setShowBio(true)}
        className={`relative flex flex-col items-center justify-center rounded-full border-2 ${t.border} ${t.glow} ${t.glowHover} ${t.bg} cursor-pointer transition-all duration-300`}
        style={{ width: diameter, height: diameter }}
      >
        {/* Pulsing ring */}
        <motion.div
          className={`absolute inset-0 rounded-full border-2 ${t.border}`}
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.15, 0.5] }}
          transition={{ duration: member.floatDuration, repeat: Infinity, ease: "easeInOut", delay: member.floatDelay }}
        />

        {/* Content */}
        <div className="flex flex-col items-center gap-1.5 px-4 text-center z-10">
          <h3 className="text-white font-extrabold text-xs md:text-sm leading-tight">
            {member.name.split(" ").slice(0, 2).join(" ")}
          </h3>
          <p className={`text-[10px] md:text-xs font-bold bg-gradient-to-r ${t.gradient} bg-clip-text text-transparent`}>
            {member.role}
          </p>
          <p className="text-gray-400 text-[9px] md:text-[10px] leading-snug">
            {member.focus}
          </p>
          <div className="flex flex-wrap justify-center gap-1 mt-1">
            {member.keywords.slice(0, 2).map((k) => (
              <span key={k} className={`text-[8px] font-mono px-1.5 py-0.5 rounded border ${t.badge} ${t.text}`}>
                {k}
              </span>
            ))}
          </div>
          <p className={`text-[8px] font-mono ${t.text} mt-1 opacity-70`}>tap for more</p>
        </div>
      </motion.div>

      {/* Bio popup */}
      {showBio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          onClick={() => setShowBio(false)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-sm p-6 rounded-3xl bg-neutral-900 border-2 ${t.border} ${t.glow} z-10 flex flex-col gap-3`}
          >
            <button
              onClick={() => setShowBio(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
            <h3 className="text-white font-extrabold text-lg">{member.name}</h3>
            <p className={`text-sm font-bold bg-gradient-to-r ${t.gradient} bg-clip-text text-transparent`}>
              {member.role} — {member.focus}
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">{member.bio}</p>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {member.keywords.map((k) => (
                <span key={k} className={`text-xs font-mono px-2 py-1 rounded border ${t.badge} ${t.text}`}>
                  {k}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </>
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

        {/* 2. Constellation — desktop */}
        <div className="hidden md:block relative w-full mb-16" style={{ height: "580px" }}>

          {/* Arrows SVG layer */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 1000 580"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Arrow from left person (Harish figure) outward to left bubble */}
            <DrawingArrow
              color={THEME.cyan.arrow}
              path="M 440 295 C 400 280 360 265 300 250"
              delay={0.4}
            />
            <ArrowHead color={THEME.cyan.arrow} points="300,250 318,242 315,258" delay={0.4} />

            {/* Arrow from girl figure (Sruthi) downward to bottom bubble */}
            <DrawingArrow
              color={THEME.purple.arrow}
              path="M 495 370 C 495 400 495 420 495 445"
              delay={0.7}
            />
            <ArrowHead color={THEME.purple.arrow} points="495,445 487,430 503,430" delay={0.7} />

            {/* Arrow from right person (Pawan figure) outward to right bubble */}
            <DrawingArrow
              color={THEME.emerald.arrow}
              path="M 560 295 C 600 280 640 265 700 250"
              delay={1.0}
            />
            <ArrowHead color={THEME.emerald.arrow} points="700,250 682,242 685,258" delay={1.0} />
          </svg>

          {/* Center illustration */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.img
              src="/team-3.svg"
              alt="WillowVibe team"
              className="w-72 h-72 object-contain drop-shadow-[0_0_30px_rgba(34,211,238,0.15)]"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            />
          </div>

          {/* Harish bubble — closer to left figure */}
          <div className="absolute z-30" style={{ left: "16%", top: "22%" }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <BubbleCard member={TEAM[0]} size="md" />
            </motion.div>
          </div>

          {/* Sruthi bubble — closer below the illustration */}
          <div className="absolute z-30" style={{ left: "50%", top: "45%", transform: "translateX(-50%)" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <BubbleCard member={TEAM[1]} size="lg" />
            </motion.div>
          </div>

          {/* Pawan bubble — closer to right figure */}
          <div className="absolute z-30" style={{ right: "16%", top: "22%" }}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <BubbleCard member={TEAM[2]} size="md" />
            </motion.div>
          </div>

        </div>

        {/* Mobile stacked */}
        <div className="md:hidden flex flex-col items-center gap-8 mb-12">
          <motion.img
            src="/team-3.svg"
            alt="WillowVibe team"
            className="w-56 h-56 object-contain"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          />
          <div className="flex flex-wrap justify-center gap-6">
            {TEAM.map((member) => (
              <BubbleCard key={member.id} member={member} size="md" />
            ))}
          </div>
        </div>

        {/* 3. Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-20"
        >
          <p className="text-gray-300 leading-relaxed text-sm md:text-lg font-light">
            We are a family-founded team of engineers, testers, and consultants. We started WillowVibe because we saw businesses drowning in messy, unreliable data. As a tight-knit founding team we handle the technical heavy lifting — from data pipelines and cloud infrastructure to PLM systems and business intelligence — so you can focus on your business with absolute peace of mind.
          </p>
        </motion.div>

        {/* 4. Operating Principles */}
        <div className="mb-12 md:mb-20">
          <div className="text-center mb-6 md:mb-10">
            <h2 className="text-xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Operating Principles
            </h2>
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
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all"
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
