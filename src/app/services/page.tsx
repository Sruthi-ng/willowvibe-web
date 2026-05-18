"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";

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

        {/* Header with illustration */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 md:mb-20">
          <div className="flex-1 text-center md:text-left">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 mb-4 text-xs font-mono tracking-wider">
              <span>CORE_ENGINEERING_CAPABILITIES</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              What We Build
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl text-gray-300 text-sm md:text-lg leading-relaxed">
              Cutting-edge distributed systems with robust engineering to deliver platforms that scale infinitely.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-shrink-0 w-full md:w-80 lg:w-96 flex items-center justify-center">
            <img src="/core.svg" alt="Core engineering capabilities" className="w-full max-w-xs md:max-w-sm object-contain drop-shadow-[0_0_30px_rgba(34,211,238,0.15)]" />
          </motion.div>
        </div>

        {/* Tree layout */}
        <div className="flex flex-col gap-16 md:gap-24">
          {TREE.map((category, catIdx) => (
            <motion.div key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIdx * 0.1 }}
              className="flex flex-col items-center"
            >
              {/* Root node */}
              <div className={`relative px-8 py-4 rounded-2xl bg-black border-2 ${category.border} ${category.glow} text-center mb-8 md:mb-12`}>
                <h2 className={`text-lg md:text-2xl font-extrabold tracking-tight ${category.titleColor}`}>
                  {category.title}
                </h2>
                {/* Vertical line down from root */}
                <div className={`absolute left-1/2 -translate-x-1/2 -bottom-8 md:-bottom-12 w-0.5 h-8 md:h-12 ${category.lineColor}`} />
              </div>

              {/* Horizontal connector line */}
              <div className="relative w-full flex items-center justify-center mb-8 md:mb-12">
                <div className={`absolute h-0.5 ${category.lineColor}`}
                  style={{ width: `${Math.min(category.services.length * 18, 85)}%` }} />
                {/* Vertical drops to each bubble */}
                <div className="relative w-full flex justify-center gap-3 md:gap-6">
                  {category.services.map((svc, svcIdx) => (
                    <div key={svc.id} className="flex flex-col items-center"
                      style={{ width: `${90 / category.services.length}%`, maxWidth: '220px' }}>
                      {/* Vertical line up to horizontal */}
                      <div className={`w-0.5 h-6 md:h-8 ${category.lineColor} mb-0`} />
                      {/* Bubble */}
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: svcIdx * 0.08 }}
                        onClick={() => setSelected(svc)}
                        className={`w-full text-left p-3 md:p-4 rounded-xl border ${category.bubble} hover:scale-105 hover:brightness-125 transition-all duration-300 cursor-pointer text-xs md:text-sm font-semibold leading-tight shadow-lg`}
                      >
                        {svc.title}
                        <div className={`mt-2 flex items-center gap-1 text-[10px] font-mono opacity-70`}>
                          Read more <ArrowRight size={10} />
                        </div>
                      </motion.button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
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
