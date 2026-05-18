"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";

function AnimatedLine({ color, vertical = true }: { color: string; vertical?: boolean }) {
  return (
    <div className={`relative overflow-hidden ${vertical ? "w-0.5 h-12" : "h-0.5 w-full"}`}
      style={{ background: "transparent" }}>
      <div className={`absolute inset-0 ${color} opacity-20`} />
      <motion.div
        className={`absolute ${color}`}
        style={vertical
          ? { width: "100%", height: "40%", top: 0 }
          : { height: "100%", width: "40%", left: 0 }}
        animate={vertical
          ? { top: ["0%", "60%", "0%"] }
          : { left: ["0%", "60%", "0%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      {/* Arrow at end */}
      {vertical && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M5 8L0 0H10L5 8Z" className={`fill-current`}
                style={{ color: color.includes("cyan") ? "#22d3ee" : color.includes("blue") ? "#3b82f6" : "#a855f7" }} />
            </svg>
          </motion.div>
        </div>
      )}
    </div>
  );
}

const TREE = [
  {
    id: "plm",
    title: "Enterprise PLM & CAD",
    color: "cyan",
    border: "border-blue-500/60",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.2)]",
    bubble: "bg-blue-950/60 border-blue-500/60 text-blue-300",
    titleColor: "text-blue-400",
    lineColor: "bg-blue-500/40",
    services: [
      {
        id: "plm-1",
        title: "Enterprise PLM Platform Architecture & Administration",
        desc: "● Platform Cloud Setup & Configuration: Full-lifecycle tenant deployment, administration, configuration, and P&O setup for both 3DEXPERIENCE (SaaS/On-Prem) and Teamcenter environments.\n● Cross-Enterprise PLM-ERP Integration: Technical project management bridging engineering with production operations, specializing in connecting 3DEXPERIENCE with Microsoft Dynamics 365, SAP, and MuleSoft.\n● Environment Management & Test Automation: Enforcing robust multi-stage deployment methodologies powered by automated UI validation routines to ensure complete system stability post-upgrade."
      },
      {
        id: "plm-2",
        title: "Advanced Configuration, BOM & Variant Management",
        desc: "● Multi-Level BOM Engineering: Creating, managing, and strictly validating Engineering Bills of Materials to match rigorous corporate Product Development Processes.\n● Variant Matrices & Rule Execution: Configuring complex product rules, variant effectivities, option strings, and model definitions for high-customization portfolios.\n● System Alignment & Reconciliation Loops: Executing automated audit protocols to bridge EBOM definitions and Manufacturing Bills of Material to remove part shortfalls."
      },
      {
        id: "plm-3",
        title: "Change Control Board (CCB) Governance & Workflows",
        desc: "● End-to-End Change Engineering: Structuring operational paths for Issues, Change Requests, Engineering Change Orders, and Engineering Change Notices.\n● Approval Routing & Matrix Workflows: Designing and mapping corporate approval lifecycles across multinational teams to prevent documentation drag.\n● Obsolescence & Alternate Component Validation: Mitigating risk during End of Life milestones by coordinating technical replacements alongside Supply Chain and Purchasing."
      },
      {
        id: "plm-4",
        title: "Production-Ready CAD & New Product Development",
        desc: "● High-Precision 3D Parametric Modeling: Delivering native, production-compliant component designs and structural assembly sets inside CATIA V5 and SolidWorks.\n● Advanced Quality Launch Standards: Drafting and setting up APQP and PPAP packages including Control Plans, Process Flows, and FMEA.\n● Structured Root Cause Defect Resolution: Isolating shop floor and assembly defects utilizing engineering analytics including 8D, Fishbone, and 5-Whys."
      },
    ]
  },
  {
    id: "de",
    title: "Data Engineering & Integration",
    color: "cyan",
    border: "border-cyan-500/60",
    glow: "shadow-[0_0_20px_rgba(34,211,238,0.2)]",
    bubble: "bg-cyan-950/60 border-cyan-500/60 text-cyan-300",
    titleColor: "text-cyan-400",
    lineColor: "bg-cyan-500/40",
    services: [
      {
        id: "de-1",
        title: "Data Pipeline Development",
        desc: "Design and implement robust, scalable ETL/ELT pipelines with guaranteed SLAs and minimal downtime. We process massive volumes of disparate raw data transforming it into pristine analysis-ready assets feeding your entire data ecosystem."
      },
      {
        id: "de-2",
        title: "Cloud Engineering",
        desc: "Architect high-performance foundations on AWS, Azure, or GCP. We deploy auto-scaling resilient computing environments utilizing Infrastructure as Code to minimize ongoing operational costs while maximizing query execution speeds."
      },
      {
        id: "de-3",
        title: "Data Migration",
        desc: "Transition from legacy on-premise systems to modern cloud-native architectures with absolute zero data loss. We utilize automated validation scripts and parallel run methodologies to ensure complete confidence during critical switchovers."
      },
    ]
  },
  {
    id: "dta",
    title: "Data Trust & Analytics",
    color: "purple",
    border: "border-purple-500/60",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.2)]",
    bubble: "bg-purple-950/60 border-purple-500/60 text-purple-300",
    titleColor: "text-purple-400",
    lineColor: "bg-purple-500/40",
    services: [
      {
        id: "dta-1",
        title: "Data Quality",
        desc: "Deploy automated testing frameworks and AI-driven anomaly detection to ensure 100% data reliability before it ever reaches production environments. Comprehensive monitoring across your ecosystem with proactive alerts and circuit breakers."
      },
      {
        id: "dta-2",
        title: "Governance",
        desc: "Build fine-grained RBAC, masking, and compliance auditing frameworks to secure your most sensitive data assets and meet regulatory requirements across your organization."
      },
      {
        id: "dta-3",
        title: "Observability",
        desc: "Comprehensive monitoring across your data ecosystem with proactive alerts and automated circuit breakers ensuring complete visibility into your data health at all times."
      },
      {
        id: "dta-4",
        title: "AI Infrastructure",
        desc: "Feature stores, model registries, and GPU-accelerated environments for production MLOps workloads. We build the data foundations that make your AI initiatives actually work in production."
      },
      {
        id: "dta-5",
        title: "Business Intelligence",
        desc: "Transform complex data models into real-time dashboards using Tableau and PowerBI that your entire organization will actually use and trust for critical business decisions."
      },
    ]
  },
];

export default function ServicesPage() {
  const [selected, setSelected] = useState<{ title: string; desc: string } | null>(null);

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20">

        {/* Header + Tree side by side */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-0">

          {/* Left: illustration + what we build — sticky so it stays visible as tree scrolls */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:sticky lg:top-24 lg:w-80 xl:w-96 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="w-full flex items-center justify-center lg:justify-start mb-6"
            >
              <img
                src="/core.svg"
                alt="Core engineering capabilities"
                className="w-48 md:w-56 lg:w-64 object-contain drop-shadow-[0_0_25px_rgba(34,211,238,0.15)] opacity-90"
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
            >
              What We Build
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-300 text-sm md:text-base leading-relaxed max-w-sm"
            >
              Cutting-edge distributed systems with robust engineering to deliver platforms that scale infinitely.
            </motion.p>
          </div>

          {/* Right: full tree */}
          <div className="flex-1 flex flex-col items-center overflow-x-auto pb-8 pt-0">
            <div className="min-w-[320px] w-full flex flex-col items-center">

            {/* ROOT NODE */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="px-8 py-4 rounded-2xl bg-black border-2 border-cyan-400/60 shadow-[0_0_25px_rgba(34,211,238,0.2)] text-center z-10"
            >
              <h2 className="text-base md:text-xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                CORE ENGINEERING CAPABILITIES
              </h2>
            </motion.div>

            {/* Animated line from root down */}
            <AnimatedLine color="bg-cyan-400" vertical={true} />

            {/* Horizontal bar spanning all three categories */}
            <div className="relative w-full flex justify-center mb-0">
              <div className="absolute top-0 left-[16.5%] right-[16.5%] h-0.5 overflow-hidden">
                <div className="absolute inset-0 bg-cyan-400/20" />
                <motion.div
                  className="absolute h-full w-1/3 bg-cyan-400/60"
                  animate={{ left: ["0%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Three category columns */}
              <div className="relative w-full grid grid-cols-3 gap-2 md:gap-6">
                {TREE.map((category, catIdx) => (
                  <div key={category.id} className="flex flex-col items-center">

                    <AnimatedLine color={category.lineColor} vertical={true} />

                    {/* Category node */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                      className={`w-full px-3 py-3 md:px-5 md:py-4 rounded-xl bg-black border-2 ${category.border} ${category.glow} text-center z-10`}
                    >
                      <h3 className={`text-sm md:text-base lg:text-lg font-extrabold leading-tight ${category.titleColor}`}>
                        {category.title}
                      </h3>
                    </motion.div>

                    <AnimatedLine color={category.lineColor} vertical={true} />

                    {/* Service bubbles stacked vertically one after another */}
                    <div className="flex flex-col items-center w-full gap-0">
                      {category.services.map((svc, svcIdx) => (
                        <div key={svc.id} className="flex flex-col items-center w-full">

                          {/* Bubble */}
                          <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: svcIdx * 0.08 }}
                            onClick={() => setSelected(svc)}
                            className={`w-full text-left p-3 md:p-4 rounded-xl border ${category.bubble} hover:scale-105 hover:brightness-125 transition-all duration-300 cursor-pointer text-xs md:text-sm font-semibold leading-snug shadow-lg`}
                          >
                            {svc.title}
                            <div className="mt-1.5 flex items-center gap-1 text-[9px] font-mono opacity-60">
                              Read more <ArrowRight size={9} />
                            </div>
                          </motion.button>

                          {svcIdx < category.services.length - 1 && (
                            <AnimatedLine color={category.lineColor} vertical={true} />
                          )}

                        </div>
                      ))}
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
        </div>

        {/* CTA */}
        <section className="w-full bg-gradient-to-t from-cyan-950/20 to-transparent py-10 md:py-20 border-t border-white/5 text-center mt-16">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-5">Need a custom architecture?</h2>
            <p className="text-sm md:text-lg text-gray-300 mb-5 md:mb-8 leading-relaxed">
              Whether you need a full data lakehouse migration or a specific pipeline optimised, our engineers are ready to scope your project.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-cyan-400 text-black font-bold rounded-lg hover:scale-105 transition-all text-sm md:text-base shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              Discuss Your Project <ArrowRight size={16} />
            </Link>
          </div>
        </section>

      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="relative w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden z-10">
              <button onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4 pr-8 leading-tight">{selected.title}</h2>
                <div className="py-4 border-y border-white/10 text-gray-300 text-sm leading-relaxed space-y-3 max-h-[50vh] overflow-y-auto">
                  {selected.desc.split('\n').map((line, i) => (
                    <p key={i} className="flex items-start gap-2">
                      {line.startsWith('●') ? (
                        <><span className="text-cyan-500 shrink-0 mt-1">●</span><span>{line.substring(1).trim()}</span></>
                      ) : (
                        <span>{line}</span>
                      )}
                    </p>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <Link href="/contact" onClick={() => setSelected(null)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-400 text-black font-bold rounded-lg hover:scale-105 transition-all text-sm">
                    Inquire about this <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
