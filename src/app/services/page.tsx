"use client";

import { Network, CloudCog, ArrowRightLeft, ShieldCheck, Activity, Eye, BrainCircuit, LineChart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
    { icon: <Network className="w-6 h-6 text-cyan-400" />, title: "Data Pipeline Development", desc: "Design and implement robust, scalable ETL/ELT pipelines with guaranteed SLAs and minimal downtime." },
    { icon: <CloudCog className="w-6 h-6 text-blue-400" />, title: "Cloud Engineering", desc: "Architect high-performance foundations on AWS, Azure, or GCP. Minimize costs while maximizing query speeds." },
    { icon: <ArrowRightLeft className="w-6 h-6 text-emerald-400" />, title: "Data Migration", desc: "Transition from legacy systems to cloud-native architectures with zero data loss and automated validation." },
    { icon: <ShieldCheck className="w-6 h-6 text-rose-400" />, title: "Data Quality", desc: "Deploy automated testing and anomaly detection to ensure 100% data reliability before reaching production." },
    { icon: <Eye className="w-6 h-6 text-indigo-400" />, title: "Observability", desc: "Comprehensive monitoring across your data ecosystem with proactive alerts and automated circuit breakers." },
    { icon: <Activity className="w-6 h-6 text-amber-400" />, title: "Governance", desc: "Build fine-grained RBAC, masking, and compliance auditing frameworks to secure your most sensitive assets." },
    { icon: <BrainCircuit className="w-6 h-6 text-purple-400" />, title: "AI Infrastructure", desc: "Feature stores, model registries, and GPU-accelerated environments for production MLOps workloads." },
    { icon: <LineChart className="w-6 h-6 text-teal-400" />, title: "Business Intelligence", desc: "Transform complex data models into real-time dashboards using Tableau and PowerBI." },
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

