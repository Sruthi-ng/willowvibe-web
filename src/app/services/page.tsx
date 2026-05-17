"use client";

import { CloudCog, Network, ShieldCheck, Layers, Sliders, RefreshCw, GitMerge, CheckSquare, AlertTriangle, Box, Award, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
    // Pillar 1: Enterprise PLM Platform Architecture & Administration
    { icon: <CloudCog className="w-6 h-6 text-blue-400" />, title: "Platform Cloud Setup & Configuration", desc: "Full-lifecycle tenant deployment, administration, configuration, and P&O (People & Organization) setup for both 3DEXPERIENCE (SaaS/On-Prem) and Teamcenter environments." },
    { icon: <Network className="w-6 h-6 text-cyan-400" />, title: "Cross-Enterprise PLM-ERP Integration", desc: "Technical project management and architecture to seamlessly bridge engineering realities with production operations, specializing in connecting 3DEXPERIENCE with Microsoft Dynamics 365, SAP, and MuleSoft ecosystems." },
    { icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />, title: "Environment Management & Test Automation", desc: "Enforcing robust multi-stage deployment methodologies (Sandbox, Test, Prod) powered by automated UI validation routines (e.g., UiPath) to ensure complete system stability post-upgrade." },
    // Pillar 2: Advanced Configuration, BOM & Variant Management
    { icon: <Layers className="w-6 h-6 text-indigo-400" />, title: "Multi-Level BOM Engineering", desc: "Creating, managing, and strictly validating Engineering Bills of Materials (EBOM) to match rigorous corporate Product Development Processes (PDP)." },
    { icon: <Sliders className="w-6 h-6 text-amber-400" />, title: "Variant Matrices & Rule Execution", desc: "Configuring complex product rules, variant effectivities, option strings, and model definitions for complex high-customization portfolios." },
    { icon: <RefreshCw className="w-6 h-6 text-teal-400" />, title: "System Alignment & Reconciliation Loops", desc: "Executing automated audit protocols to bridge the gap between EBOM definitions and Manufacturing Bills of Material (MBOM) to completely remove part shortfalls and misbuild risks." },
    // Pillar 3: Change Control Board (CCB) Governance & Workflows
    { icon: <GitMerge className="w-6 h-6 text-purple-400" />, title: "End-to-End Change Engineering", desc: "Structuring operational paths for Issues, Change Requests (CR), Engineering Change Orders (ECO), and Engineering Change Notices (ECN)." },
    { icon: <CheckSquare className="w-6 h-6 text-rose-400" />, title: "Approval Routing & Matrix Workflows", desc: "Designing and mapping corporate approval lifecycles across multinational internal teams to prevent documentation drag." },
    { icon: <AlertTriangle className="w-6 h-6 text-orange-400" />, title: "Obsolescence & Alternate Component Validation", desc: "Mitigating risk during a part's End of Life (EOL) or Death of Vehicle (DOV) milestones by coordinating technical replacements alongside Supply Chain, SCM, and Purchasing." },
    // Pillar 4: Production-Ready CAD & New Product Development (NPD)
    { icon: <Box className="w-6 h-6 text-cyan-300" />, title: "High-Precision 3D Parametric Modeling", desc: "Delivering native, production-compliant component designs and deep structural assembly sets inside CATIA V5 and SolidWorks." },
    { icon: <Award className="w-6 h-6 text-yellow-400" />, title: "Advanced Quality Launch Standards", desc: "Drafting and setting up core APQP and PPAP packages including Control Plans, Process Flows, and Failure Mode and Effects Analysis (FMEA)." },
    { icon: <Search className="w-6 h-6 text-blue-300" />, title: "Structured Root Cause Defect Resolution", desc: "Isolating shop floor, prototyping, and assembly defects utilizing engineering analytics (8D problem solving, Fishbone, 5-Whys)." },
];

export default function ServicesPage() {
    return (
        <div className="flex flex-col items-center min-h-screen bg-neutral-950 text-white overflow-x-hidden">

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20">

                {/* Header */}
                <div className="text-center mb-6 md:mb-16 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/10 rounded-full blur-[80px] -z-10 pointer-events-none animate-pulse" />
                    <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                        className="text-3xl md:text-6xl font-extrabold tracking-tight mb-3 md:mb-6">
                        Core <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">Engineering</span> Capabilities
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-2xl mx-auto text-gray-300 text-sm md:text-xl leading-relaxed">
                        Cutting-edge distributed systems with robust engineering to deliver data platforms that scale infinitely.
                    </motion.p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                    {services.map((svc, idx) => (
                        <motion.div key={idx} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: idx * 0.06 }}>
                            <Link href="/contact" className="flex flex-col group relative p-4 md:p-6 h-full rounded-xl border border-white/10 hover:border-cyan-400/50 bg-white/[0.02] transition-all duration-300 cursor-pointer overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="mb-3 p-2 rounded-lg bg-black/40 inline-flex w-fit border border-white/10 group-hover:border-cyan-400/40 transition-all">
                                        {svc.icon}
                                    </div>
                                    <h3 className="text-sm md:text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors leading-tight">{svc.title}</h3>
                                    <p className="text-gray-400 text-xs leading-relaxed hidden sm:block">{svc.desc}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>

            {/* CTA */}
            <section className="w-full bg-gradient-to-t from-cyan-950/20 to-transparent py-10 md:py-20 border-t border-white/5 text-center">
                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-5">Need a custom architecture?</h2>
                    <p className="text-sm md:text-lg text-gray-300 mb-5 md:mb-8 leading-relaxed">
                        Whether you need a full data lakehouse migration or a specific pipeline optimised, our engineers are ready to scope your project.
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-cyan-400 text-black font-bold rounded-lg hover:scale-105 transition-all text-sm md:text-base">
                        Discuss Your Project <ArrowRight size={16} />
                    </Link>
                </div>
            </section>

        </div>
    );
}

