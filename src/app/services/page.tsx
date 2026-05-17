"use client";

import { useState } from "react";
import { Network, CloudCog, ArrowRightLeft, ShieldCheck, Activity, Eye, BrainCircuit, LineChart, ArrowRight, ServerCog, Component, ClipboardCheck, Box, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
    {
        title: "Enterprise Platforms & Architecture",
        items: [
            { id: "plm-1", icon: <ServerCog className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />, title: "Enterprise PLM Platform Architecture & Administration", desc: "● Platform Cloud Setup & Configuration: Full-lifecycle tenant deployment, administration, configuration, and P&O (People & Organization) setup for both 3DEXPERIENCE (SaaS/On-Prem) and Teamcenter environments.\n● Cross-Enterprise PLM-ERP Integration: Technical project management and architecture to seamlessly bridge engineering realities with production operations, specializing in connecting 3DEXPERIENCE with Microsoft Dynamics 365, SAP, and MuleSoft ecosystems.\n● Environment Management & Test Automation: Enforcing robust multi-stage deployment methodologies (Sandbox, Test, Prod) powered by automated UI validation routines (e.g., UiPath) to ensure complete system stability post-upgrade." },
            { id: "plm-2", icon: <Component className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />, title: "Advanced Configuration, BOM & Variant Management", desc: "● Multi-Level BOM Engineering: Creating, managing, and strictly validating Engineering Bills of Materials (EBOM) to match rigorous corporate Product Development Processes (PDP).\n● Variant Matrices & Rule Execution: Configuring complex product rules, variant effectivities, option strings, and model definitions for complex high-customization portfolios.\n● System Alignment & Reconciliation Loops: Executing automated audit protocols to bridge the gap between EBOM definitions and Manufacturing Bills of Material (MBOM) to completely remove part shortfalls and misbuild risks." },
            { id: "plm-3", icon: <ClipboardCheck className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />, title: "Change Control Board (CCB) Governance & Workflows", desc: "● End-to-End Change Engineering: Structuring operational paths for Issues, Change Requests (CR), Engineering Change Orders (ECO), and Engineering Change Notices (ECN).\n● Approval Routing & Matrix Workflows: Designing and mapping corporate approval lifecycles across multinational internal teams to prevent documentation drag.\n● Obsolescence & Alternate Component Validation: Mitigating risk during a part's End of Life (EOL) or Death of Vehicle (DOV) milestones by coordinating technical replacements alongside Supply Chain, SCM, and Purchasing." },
            { id: "plm-4", icon: <Box className="w-5 h-5 md:w-6 md:h-6 text-cyan-500" />, title: "Production-Ready CAD & New Product Development (NPD)", desc: "● High-Precision 3D Parametric Modeling: Delivering native, production-compliant component designs and deep structural assembly sets inside CATIA V5 and SolidWorks.\n● Advanced Quality Launch Standards: Drafting and setting up core APQP and PPAP packages including Control Plans, Process Flows, and Failure Mode and Effects Analysis (FMEA).\n● Structured Root Cause Defect Resolution: Isolating shop floor, prototyping, and assembly defects utilizing engineering analytics (8D problem solving, Fishbone, 5-Whys)." }
        ]
    },
    {
        title: "Data Engineering & Integration",
        items: [
            { id: "de-1", icon: <Network className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />, title: "Data Pipeline Development", desc: "Design and implement robust, scalable ETL/ELT pipelines with guaranteed SLAs and minimal downtime." },
            { id: "de-2", icon: <CloudCog className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />, title: "Cloud Engineering", desc: "Architect high-performance foundations on AWS, Azure, or GCP. Minimize costs while maximizing query speeds." },
            { id: "de-3", icon: <ArrowRightLeft className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />, title: "Data Migration", desc: "Transition from legacy systems to cloud-native architectures with zero data loss and automated validation." }
        ]
    },
    {
        title: "Data Trust & Analytics",
        items: [
            { id: "dta-1", icon: <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-rose-400" />, title: "Data Quality", desc: "Deploy automated testing and anomaly detection to ensure 100% data reliability before reaching production." },
            { id: "dta-2", icon: <Activity className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />, title: "Governance", desc: "Build fine-grained RBAC, masking, and compliance auditing frameworks to secure your most sensitive assets." },
            { id: "dta-3", icon: <Eye className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" />, title: "Observability", desc: "Comprehensive monitoring across your data ecosystem with proactive alerts and automated circuit breakers." },
            { id: "dta-4", icon: <BrainCircuit className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />, title: "AI Infrastructure", desc: "Feature stores, model registries, and GPU-accelerated environments for production MLOps workloads." },
            { id: "dta-5", icon: <LineChart className="w-5 h-5 md:w-6 md:h-6 text-teal-400" />, title: "Business Intelligence", desc: "Transform complex data models into real-time dashboards using Tableau and PowerBI." }
        ]
    }
];

export default function ServicesPage() {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
        <div className="flex flex-col items-center min-h-screen bg-neutral-950 text-white overflow-x-hidden">

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20">

                {/* Header */}
                <div className="text-center mb-8 md:mb-16 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/10 rounded-full blur-[80px] -z-10 pointer-events-none animate-pulse" />
                    <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                        className="text-3xl md:text-6xl font-extrabold tracking-tight mb-3 md:mb-6">
                        Core <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">Engineering</span> Capabilities
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-2xl mx-auto text-gray-300 text-sm md:text-xl leading-relaxed">
                        Cutting-edge distributed systems with robust engineering to deliver platforms that scale infinitely.
                    </motion.p>
                </div>

                {/* Categorized Services */}
                <div className="space-y-12 md:space-y-20">
                    {categories.map((cat, catIdx) => (
                        <div key={catIdx}>
                            <motion.h2 
                                initial={{ opacity: 0, x: -20 }} 
                                whileInView={{ opacity: 1, x: 0 }} 
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="text-xl md:text-3xl font-bold text-white mb-6 md:mb-8 border-b border-white/10 pb-3 flex items-center gap-3"
                            >
                                <span className="w-1.5 md:w-2 h-6 md:h-8 bg-cyan-400 rounded-sm shadow-[0_0_10px_rgba(34,211,238,0.5)]"></span>
                                {cat.title}
                            </motion.h2>
                            
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 items-start">
                                {cat.items.map((svc, idx) => {
                                    const isExpanded = expandedId === svc.id;

                                    return (
                                        <motion.div 
                                            layout
                                            key={svc.id} 
                                            initial={{ opacity: 0, y: 30 }} 
                                            whileInView={{ opacity: 1, y: 0 }} 
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                                            onClick={() => setExpandedId(isExpanded ? null : svc.id)}
                                            className="flex flex-col justify-between group relative p-3.5 md:p-6 rounded-2xl border border-white/10 hover:border-cyan-400/50 bg-white/[0.03] transition-all cursor-pointer overflow-hidden h-fit shadow-lg hover:shadow-cyan-500/5"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                            
                                            <motion.div layout="position" className="relative z-10 flex flex-col items-start w-full">
                                                <div className="mb-3 md:mb-4 p-2.5 md:p-3 rounded-xl bg-black/40 inline-flex border border-white/10 group-hover:border-cyan-400/40 transition-all">
                                                    {svc.icon}
                                                </div>
                                                <h3 className="text-[13px] sm:text-sm md:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">{svc.title}</h3>
                                            </motion.div>

                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div 
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="relative z-10 overflow-hidden w-full"
                                                    >
                                                        <div className="pt-3 mt-3 border-t border-white/10 text-gray-300 text-[11px] sm:text-xs md:text-sm leading-relaxed space-y-2 md:space-y-3">
                                                            {svc.desc.split('\n').map((line, i) => (
                                                                <p key={i} className="flex items-start gap-1.5 md:gap-2">
                                                                    {line.startsWith('●') ? (
                                                                        <>
                                                                            <span className="text-cyan-500 shrink-0 select-none">●</span>
                                                                            <span>{line.substring(1).trim()}</span>
                                                                        </>
                                                                    ) : (
                                                                        <span>{line}</span>
                                                                    )}
                                                                </p>
                                                            ))}
                                                        </div>
                                                        
                                                        <div className="mt-4 mb-2">
                                                            <Link href="/contact" onClick={(e) => e.stopPropagation()} className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 rounded-lg text-xs md:text-sm font-semibold transition-all w-full">
                                                                Inquire about this <ArrowRight size={14} className="md:w-4 md:h-4" />
                                                            </Link>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            <motion.div layout="position" className="relative z-10 w-full mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-cyan-500/70 group-hover:text-cyan-400 text-[10px] sm:text-xs md:text-sm font-semibold transition-colors">
                                                <span>{isExpanded ? 'Show Less' : 'Read More'}</span>
                                                {isExpanded ? <ChevronUp size={14} className="md:w-4 md:h-4" /> : <ChevronDown size={14} className="md:w-4 md:h-4" />}
                                            </motion.div>

                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* CTA */}
            <section className="w-full bg-gradient-to-t from-cyan-950/20 to-transparent py-10 md:py-20 border-t border-white/5 text-center mt-8">
                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-5">Need a custom architecture?</h2>
                    <p className="text-sm md:text-lg text-gray-300 mb-5 md:mb-8 leading-relaxed">
                        Whether you need a full data lakehouse migration or a specific pipeline optimised, our engineers are ready to scope your project.
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-cyan-400 text-black font-bold rounded-lg hover:scale-105 transition-all text-sm md:text-base shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                        Discuss Your Project <ArrowRight size={16} />
                    </Link>
                </div>
            </section>

        </div>
    );
}

