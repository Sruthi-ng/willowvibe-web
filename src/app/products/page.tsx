"use client";

import { motion } from "framer-motion";
import { Github, ArrowRight, ExternalLink, CheckCircle, Database, Activity, Shield, Zap, BarChart3, GitBranch, Bell } from "lucide-react";
import Link from "next/link";

const PRODUCTS = [
  {
    id: 1,
    name: "ObservaKit",
    tagline: "Enterprise data observability — free, self-hosted, under 10 minutes.",
    description: "ObservaKit gives 1–5 person data teams the same observability pillars that enterprise teams pay $50k/year for — running entirely on your own infrastructure.",
    github: "https://github.com/willowvibe/ObservaKit",
    category: "Data Observability",
    badge: "Free & Open Source",
    badgeColor: "text-emerald-300 bg-emerald-950/40 border-emerald-900/50",
    accentColor: "border-cyan-500/40",
    glowColor: "shadow-[0_0_20px_rgba(34,211,238,0.1)]",
    iconColor: "text-cyan-400",
    ctaText: "Get Free Validation",
    ctaLink: "https://github.com/willowvibe/ObservaKit",
    pillars: [
      { icon: <Activity className="w-4 h-4" />, label: "Freshness Monitoring" },
      { icon: <BarChart3 className="w-4 h-4" />, label: "Volume Anomaly Detection" },
      { icon: <Shield className="w-4 h-4" />, label: "Data Quality Checks" },
      { icon: <GitBranch className="w-4 h-4" />, label: "Schema Drift Detection" },
      { icon: <Zap className="w-4 h-4" />, label: "Pipeline Health" },
      { icon: <Bell className="w-4 h-4" />, label: "Smart Alerting" },
    ],
    warehouses: ["PostgreSQL", "BigQuery", "Snowflake", "MySQL", "Redshift", "DuckDB", "Databricks"],
    highlights: [
      "Replaces $30k–$100k/yr tools like Monte Carlo",
      "Self-hosted — your data never leaves your infrastructure",
      "Setup in under 10 minutes with Docker",
      "Slack, Email, Discord, Teams, PagerDuty alerts",
      "Native dbt integration — no extra packages",
    ],
    install: "git clone https://github.com/willowvibe/ObservaKit.git",
  },
  {
    id: 2,
    name: "PipelineProbe",
    tagline: "Instant data pipeline audit — one command, zero agents.",
    description: "PipelineProbe is a read-only, one-command audit tool that connects to your Airflow, dbt, and warehouse stack and produces a single actionable health report with a 0–100 score.",
    github: "https://github.com/willowvibe/pipelineprobe",
    category: "Pipeline Auditing",
    badge: "Free & Open Source",
    badgeColor: "text-purple-300 bg-purple-950/40 border-purple-900/50",
    accentColor: "border-purple-500/40",
    glowColor: "shadow-[0_0_20px_rgba(168,85,247,0.1)]",
    iconColor: "text-purple-400",
    ctaText: "Get Free Audit",
    ctaLink: "https://github.com/willowvibe/pipelineprobe",
    pillars: [
      { icon: <Activity className="w-4 h-4" />, label: "DAG Failure Rates" },
      { icon: <Shield className="w-4 h-4" />, label: "Missing SLAs & Retries" },
      { icon: <Database className="w-4 h-4" />, label: "Warehouse Audit" },
      { icon: <GitBranch className="w-4 h-4" />, label: "dbt Test Coverage" },
      { icon: <BarChart3 className="w-4 h-4" />, label: "Health Score (0–100)" },
      { icon: <Zap className="w-4 h-4" />, label: "CI/CD Integration" },
    ],
    warehouses: ["PostgreSQL", "BigQuery", "Snowflake", "Apache Airflow", "dbt Core"],
    highlights: [
      "Zero agents — read-only, nothing installed on your stack",
      "HTML + JSON reports ready for client delivery",
      "CI quality gate — fail builds on critical issues",
      "Regression detection with report diff",
      "Perfect for consulting and one-off audits",
    ],
    install: "pip install pipelineprobe",
  },
];

export default function ProductsPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-neutral-950 text-white overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20">

        {/* Header */}
        <div className="text-center mb-8 md:mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/10 rounded-full blur-[80px] -z-10 pointer-events-none animate-pulse" />
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 mb-4 text-xs font-mono tracking-wider">
            <Github size={13} /><span>OPEN_SOURCE_TOOLS</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-6xl font-extrabold tracking-tight mb-3 md:mb-5">
            Our <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">Products</span> & Tools
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-300 text-sm md:text-xl leading-relaxed">
            Open-source tools built by WillowVibe Data Synapse. Free to use, self-hosted, and battle-tested in production.
          </motion.p>
        </div>

        {/* Product Cards */}
        <div className="flex flex-col gap-8 md:gap-12">
          {PRODUCTS.map((product, idx) => (
            <motion.div key={product.id}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative rounded-2xl bg-neutral-900 border ${product.accentColor} ${product.glowColor} overflow-hidden`}>

              {/* Top bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5 md:p-8 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center ${product.iconColor}`}>
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl md:text-2xl font-extrabold text-white">{product.name}</h2>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${product.badgeColor}`}>{product.badge}</span>
                    </div>
                    <p className={`text-xs font-mono ${product.iconColor} mt-0.5`}>{product.category}</p>
                  </div>
                </div>
                <a href={product.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-all text-sm font-mono">
                  <Github className="w-4 h-4" /> View on GitHub <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="p-5 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">

                {/* Left — description + highlights */}
                <div>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-5">{product.description}</p>

                  <h3 className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3">Key Highlights</h3>
                  <ul className="space-y-2 mb-6">
                    {product.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${product.iconColor}`} />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Install command */}
                  <div className="bg-black/60 border border-white/10 rounded-lg p-3 mb-5">
                    <p className="text-xs font-mono text-gray-500 mb-1">Quick install</p>
                    <code className={`text-xs md:text-sm font-mono ${product.iconColor}`}>{product.install}</code>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3">
                    <a href={product.ctaLink} target="_blank" rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-400 text-black font-bold text-sm hover:scale-105 transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)]`}>
                      {product.ctaText} <ArrowRight size={14} />
                    </a>
                    <a href={product.github} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 text-gray-300 hover:text-white hover:border-white/40 text-sm transition-all font-mono">
                      <Github size={14} /> Star on GitHub
                    </a>
                  </div>
                </div>

                {/* Right — pillars + warehouses */}
                <div>
                  <h3 className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3">Capabilities</h3>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {product.pillars.map((pillar, i) => (
                      <div key={i} className={`flex items-center gap-2 p-2.5 rounded-lg bg-black/40 border border-white/5 text-xs text-gray-300 ${product.iconColor}`}>
                        {pillar.icon}
                        <span className="text-gray-300">{pillar.label}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3">Supported Integrations</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.warehouses.map((w) => (
                      <span key={w} className="text-xs font-mono px-2.5 py-1 rounded bg-black/60 border border-white/10 text-gray-400">{w}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More coming soon */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 md:mt-12 p-6 md:p-8 rounded-2xl border border-dashed border-white/10 text-center">
          <p className="text-gray-600 font-mono text-sm tracking-wider mb-2">MORE_TOOLS_COMING_SOON</p>
          <p className="text-gray-400 text-sm">We are actively building more open-source tools for the data engineering community.</p>
          <a href="https://github.com/willowvibe" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-cyan-400 text-sm font-mono hover:underline">
            <Github size={14} /> Follow WillowVibe on GitHub
          </a>
        </motion.div>

      </div>

      {/* CTA */}
      <section className="w-full bg-gradient-to-t from-cyan-950/20 to-transparent py-10 md:py-20 border-t border-white/5 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-5">Need a custom data solution?</h2>
          <p className="text-sm md:text-lg text-gray-400 mb-5 md:mb-8 leading-relaxed">
            Our tools are free — but if you need expert implementation, custom integrations, or enterprise support, our team is ready to help.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-cyan-400 text-black font-bold rounded-lg hover:scale-105 transition-all text-sm md:text-base">
            Talk to Our Engineers <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

