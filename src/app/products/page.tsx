"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ArrowRight, Lock, CheckCircle, Star } from "lucide-react";
import Link from "next/link";

const PRODUCTS = [
  {
    id: 1,
    name: "ObservaKit",
    tagline: "Enterprise data observability — free, self-hosted, under 10 minutes.",
    description: "ObservaKit gives 1 to 5 person data teams the same observability pillars that enterprise teams pay $50k/year for — running entirely on your own infrastructure. No vendor lock-in, no data leaving your systems.",
    illustration: "/maintain.svg",
    category: "Data Observability",
    badge: "Free and Open Source",
    status: "Live",
    statusColor: "bg-emerald-500",
    accent: "from-white/10 to-cyan-950/60",
    border: "border-cyan-500/30",
    glow: "shadow-[0_0_40px_rgba(34,211,238,0.08)]",
    titleGradient: "from-cyan-400 to-blue-400",
    tagColor: "bg-cyan-950/50 border-cyan-500/40 text-cyan-300",
    ctaColor: "bg-cyan-400 hover:bg-cyan-300 text-black",
    illustrationSide: "right",
    github: "https://github.com/willowvibe/ObservaKit",
    highlights: [
      "Replaces $30k to $100k per year tools like Monte Carlo",
      "Self-hosted so your data never leaves your infrastructure",
      "Setup in under 10 minutes with Docker",
      "Slack Email Discord Teams and PagerDuty alerts",
      "Native dbt integration with no extra packages",
    ],
    tags: ["PostgreSQL", "BigQuery", "Snowflake", "MySQL", "Redshift", "DuckDB"],
  },
  {
    id: 2,
    name: "PipelineProbe",
    tagline: "Instant data pipeline audit — one command, zero agents.",
    description: "PipelineProbe is a read-only one-command audit tool that connects to your Airflow dbt and warehouse stack and produces a single actionable health report with a 0 to 100 score. Perfect for consulting and one-off audits.",
    illustration: "/pipe.svg",
    category: "Pipeline Auditing",
    badge: "Free and Open Source",
    status: "Live",
    statusColor: "bg-emerald-500",
    accent: "from-white/10 to-purple-950/60",
    border: "border-purple-500/30",
    glow: "shadow-[0_0_40px_rgba(168,85,247,0.08)]",
    titleGradient: "from-purple-400 to-pink-400",
    tagColor: "bg-purple-950/50 border-purple-500/40 text-purple-300",
    ctaColor: "bg-purple-400 hover:bg-purple-300 text-black",
    illustrationSide: "left",
    github: "https://github.com/willowvibe/pipelineprobe",
    highlights: [
      "Zero agents so nothing is installed on your stack",
      "HTML and JSON reports ready for client delivery",
      "CI quality gate to fail builds on critical issues",
      "Regression detection with report diff",
      "Perfect for consulting and one-off audits",
    ],
    tags: ["PostgreSQL", "BigQuery", "Snowflake", "Apache Airflow", "dbt Core"],
  },
  {
    id: 3,
    name: "Doctor App",
    tagline: "Complete patient management for independent doctors.",
    description: "Built for doctors who do home visits and clinic consultations. Doctor App gives independent practitioners a clean fast way to manage patient records track vitals log visit notes store documents and maintain full history across every patient interaction. Authentication and backend fully maintained by WillowVibe.",
    illustration: "/doctor.svg",
    category: "Healthcare Technology",
    badge: "Client Project",
    status: "In Development",
    statusColor: "bg-amber-500",
    accent: "from-emerald-950/40 to-black",
    border: "border-emerald-500/30",
    glow: "shadow-[0_0_40px_rgba(16,185,129,0.08)]",
    titleGradient: "from-emerald-400 to-cyan-400",
    tagColor: "bg-emerald-950/50 border-emerald-500/40 text-emerald-300",
    ctaColor: "bg-emerald-400 hover:bg-emerald-300 text-black",
    illustrationSide: "right",
    github: null,
    highlights: [
      "Patient records with full visit history",
      "Vitals tracking and document uploads",
      "Clinic and home visit management",
      "Secure authentication for every practitioner",
      "Multi-platform support on web and mobile",
      "Backend infrastructure maintained by WillowVibe",
    ],
    tags: ["Healthcare", "Multi-platform", "Authentication", "Backend", "Mobile"],
  },
  {
    id: 4,
    name: "Cosmic ID",
    tagline: "Modern life analytics through the lens of ancient wisdom.",
    description: "Cosmic ID is a first-of-its-kind life analytics platform combining Vedic Chinese and Western astrology with modern data science. Know exactly how many years days and seconds you have lived. Compare your chart with others for compatibility. Get realistic career profession and business recommendations based on your unique cosmic profile. Available in basic and beta modes with monthly yearly and decade level forecasts.",
    illustration: "/cosmicid.jpeg",
    category: "Life Analytics",
    badge: "Client Project",
    status: "In Development",
    statusColor: "bg-amber-500",
    accent: "from-violet-950/40 to-black",
    border: "border-violet-500/30",
    glow: "shadow-[0_0_40px_rgba(139,92,246,0.08)]",
    titleGradient: "from-violet-400 to-amber-400",
    tagColor: "bg-violet-950/50 border-violet-500/40 text-violet-300",
    ctaColor: "bg-violet-400 hover:bg-violet-300 text-black",
    illustrationSide: "left",
    github: null,
    highlights: [
      "Vedic Chinese and Western astrology combined",
      "Life timeline in years days and seconds",
      "Compatibility charts between two people",
      "Career profession and business recommendations",
      "Monthly yearly and decade level forecasts",
      "Basic mode and advanced beta version",
    ],
    tags: ["Vedic Astrology", "Life Analytics", "Compatibility", "Forecasting", "Multi-platform"],
  },
];

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const product = PRODUCTS[activeTab];
  const isRight = product.illustrationSide === "right";

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">

        {/* Header */}
        <div className="text-center mb-8 md:mb-12 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/5 rounded-full blur-[80px] -z-10 pointer-events-none animate-pulse" />
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400 bg-clip-text text-transparent"
          >
            Our Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-300 text-sm md:text-lg leading-relaxed"
          >
            From open-source data tools to client-commissioned applications — everything we build is engineered to last.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-6 mt-4"
          >
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Live</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>In Development</span>
            </div>
          </motion.div>
        </div>

        {/* Tab bar */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
          {PRODUCTS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActiveTab(idx)}
              className={`relative flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 border ${
                activeTab === idx
                  ? `bg-gradient-to-r ${p.accent} ${p.border} text-white shadow-lg scale-105`
                  : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${p.statusColor} ${p.status === "In Development" ? "animate-pulse" : ""}`} />
              {p.name}
              {activeTab === idx && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl border border-white/20 -z-10"
                />
              )}
            </button>
          ))}
        </div>

        {/* Active product display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`relative w-full flex flex-col ${isRight ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-6 md:gap-10 p-6 md:p-10 rounded-3xl border ${product.border} ${product.glow}`}
          >
            {/* Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${product.accent} opacity-40 -z-10 rounded-3xl`} />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] rounded-3xl -z-10" />

            {/* Content */}
            <div className="flex-1 flex flex-col items-start gap-4">

              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full border ${product.tagColor}`}>
                  {product.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">
                  {product.badge}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-black border border-white/10 text-gray-300">
                  <div className={`w-1.5 h-1.5 rounded-full ${product.statusColor} ${product.status === "In Development" ? "animate-pulse" : ""}`} />
                  {product.status}
                </span>
              </div>

              {/* Title */}
              <h2 className={`text-2xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r ${product.titleGradient} bg-clip-text text-transparent`}>
                {product.name}
              </h2>

              {/* Tagline */}
              <p className="text-gray-200 text-sm md:text-base font-medium leading-relaxed">
                {product.tagline}
              </p>

              {/* Description */}
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                {product.description}
              </p>

              {/* Highlights — max 4 shown */}
              <ul className="flex flex-col gap-1.5 w-full">
                {product.highlights.slice(0, 4).map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-gray-300">
                    <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-emerald-400" />
                    {h}
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {product.tags.map((tag) => (
                  <span key={tag} className={`text-[10px] font-mono px-2 py-0.5 rounded-lg border ${product.tagColor}`}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mt-1">
                {product.github ? (
                  <>
                    <a
                      href={product.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm ${product.ctaColor} hover:scale-105 transition-all shadow-lg`}
                    >
                      Get Started <ArrowRight size={14} />
                    </a>
                    <a href={product.github ?? ""} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 text-gray-300 hover:text-white hover:border-white/40 text-sm transition-all font-mono">
                      <Github size={14} /> View on GitHub
                    </a>
                  </>
                ) : (
                  <>
                    <Link
                      href="/contact"
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm ${product.ctaColor} hover:scale-105 transition-all shadow-lg`}
                    >
                      Enquire About This <ArrowRight size={14} />
                    </Link>
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-gray-500 text-sm font-mono cursor-not-allowed">
                      <Lock size={13} /> Private Project
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, x: isRight ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-shrink-0 w-full lg:w-[320px] xl:w-[360px] flex items-center justify-center"
            >
              <div className={`relative w-full flex items-center justify-center p-6 md:p-8 rounded-3xl bg-gradient-to-br ${product.accent} border ${product.border}`}>
                <img
                  src={product.illustration}
                  alt={product.name}
                  className="relative z-10 w-44 h-44 md:w-56 md:h-56 object-contain"
                />
              </div>
            </motion.div>

          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 mb-6 text-xs font-mono">
            <Star size={12} /> More products being engineered
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Have an app idea?</h2>
          <p className="text-gray-400 text-sm md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            We take on select client app projects handling design engineering authentication backend infrastructure and long-term maintenance.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-400 text-black font-bold rounded-xl hover:scale-105 transition-all text-sm md:text-base shadow-[0_0_25px_rgba(34,211,238,0.3)]"
          >
            Tell Us Your Idea <ArrowRight size={16} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}