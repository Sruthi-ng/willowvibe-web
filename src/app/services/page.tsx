"use client";

import { Network, CloudCog, ArrowRightLeft, ShieldCheck, Activity, Eye, BrainCircuit, LineChart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
    {
        icon: <Network className="w-8 h-8 text-cyan-400 group-hover:animate-pulse" />,
        title: "Data Pipeline Development",
        desc: "Design and implement robust, scalable ETL/ELT pipelines. We transform your raw data into analytics-ready models with guaranteed SLAs and minimal downtime.",
    },
    {
        icon: <CloudCog className="w-8 h-8 text-blue-400 group-hover:animate-pulse" />,
        title: "Cloud Engineering",
        desc: "Architect modern, high-performance foundations on AWS, Azure, or GCP. Optimize compute and storage layers to minimize costs while maximizing query execution speeds.",
    },
    {
        icon: <ArrowRightLeft className="w-8 h-8 text-emerald-400 group-hover:animate-pulse" />,
        title: "Data Migration",
        desc: "Seamlessly transition from legacy on-premise systems to resilient cloud-native architectures with zero data loss and automated validation checks.",
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-rose-400 group-hover:animate-pulse" />,
        title: "Data Quality",
        desc: "Deploy automated testing, anomaly detection, and Great Expectations to ensure 100% data reliability before pipelines reach production dashboards.",
    },
    {
        icon: <Eye className="w-8 h-8 text-indigo-400 group-hover:animate-pulse" />,
        title: "Observability",
        desc: "Implement comprehensive monitoring across the entire data ecosystem. Track schema evolution and pipeline health with proactive alerts and automated circuit breakers.",
    },
    {
        icon: <Activity className="w-8 h-8 text-amber-400 group-hover:animate-pulse" />,
        title: "Governance",
        desc: "Build comprehensive data access policies, fine-grained RBAC, masking, and regular compliance auditing frameworks to secure your most sensitive assets.",
    },
    {
        icon: <BrainCircuit className="w-8 h-8 text-purple-400 group-hover:animate-pulse" />,
        title: "AI Infrastructure",
        desc: "Engineer the foundational systems required for Machine Learning. We build feature stores, model registries, and GPU-accelerated computing environments for MLOps.",
    },
    {
        icon: <LineChart className="w-8 h-8 text-teal-400 group-hover:animate-pulse" />,
        title: "Business Intelligence",
        desc: "Transform complex data models into intuitive, real-time dashboards using tools like Tableau and PowerBI to drive immediate executive decision-making.",
    }
];

export default function ServicesPage() {
    return (
        <div className="flex flex-col items-center min-h-screen bg-neutral-950 text-white overflow-x-hidden">
            
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">

                {/* Header Section */}
                <div className="text-center mb-24 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/10 rounded-full blur-[80px] -z-10 pointer-events-none animate-pulse"></div>
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
                    >
                        Core <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">Engineering</span> Capabilities
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-3xl mx-auto text-gray-300 text-lg md:text-xl leading-relaxed"
                    >
                        We combine cutting-edge distributed systems with robust software engineering principles to deliver data platforms that scale infinitely.
                    </motion.p>
                </div>

                {/* Services Grid with Staggered Framer Motion Animation */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {services.map((svc, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            // The delay multiplies by the index, creating the "cascade" effect
                            transition={{ duration: 0.5, delay: idx * 0.1 }} 
                        >
                            <Link href="/contact" className="block group relative p-8 h-full rounded-xl border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 overflow-hidden bg-white/[0.02] shadow-lg cursor-pointer">
                                
                                {/* The interactive glowing background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                {/* Edge glow effect */}
                                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-cyan-400/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-[10px]"></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="mb-6 p-4 rounded-lg bg-black/40 inline-flex w-fit border border-white/10 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-500">
                                        {svc.icon}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-all duration-300">
                                        {svc.title}
                                    </h3>
                                    {/* FIX: Brightened to text-gray-200 and bumped size to text-base */}
                                    <p className="text-gray-200 leading-relaxed text-base flex-grow font-light">
                                        {svc.desc}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>

            {/* Bottom Call to Action Section */}
            <motion.section 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="w-full bg-gradient-to-t from-cyan-950/20 to-transparent py-24 border-t border-white/5 text-center mt-12"
            >
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Need a custom architecture?</h2>
                    <p className="text-lg text-gray-300 mb-10">
                        Whether you need a full data lakehouse migration or a specific pipeline optimized, our engineers are ready to scope your project.
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-400 text-black font-bold rounded-lg overflow-hidden transition-all hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                        DISCUSS YOUR PROJECT <ArrowRight size={20} />
                    </Link>
                </div>
            </motion.section>

        </div>
    );
}