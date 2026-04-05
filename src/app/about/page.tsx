"use client";

import { Cpu, GitMerge, ShieldCheck, Eye, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const TEAM = [
    {
        id: 1,
        name: "Harish Nagari Gurumoorthy",
        role: "Full Stack & Data Engineer",
        focus: "Data Pipeline Architecture",
        initials: "HN",
        bio: "Harish is a Python specialist and full-stack engineer who architects the data pipelines and engineering foundations that power our client solutions. With deep expertise in web scraping, automation, and end-to-end development, he bridges the gap between raw data ingestion and polished, production-ready systems.",
        keywords: ["Python", "Full Stack", "Web Scraping", "Data Pipelines", "Automation"],
        theme: "cyan",
    },
    {
        id: 2,
        name: "Sruthi Nagari Gurumoorthy",
        role: "QA & CI/CD Engineer",
        focus: "Infrastructure & Quality",
        initials: "SN",
        bio: "Sruthi ensures every pipeline and system we ship meets the highest standards of reliability and performance. A multi-skilled engineer spanning software testing, CI/CD automation, and web development, she keeps every deployment smooth and quality uncompromising across every release.",
        keywords: ["Software Testing", "QA Automation", "CI/CD", "Web Development", "Marketing Analytics"],
        theme: "purple",
    },
    {
        id: 3,
        name: "Pawan Kumar",
        role: "IT Consultant",
        focus: "Systems Integration",
        initials: "PK",
        bio: "Pawan brings meticulous analytical thinking and IT consulting expertise to every client engagement. As a detail-driven systems analyst, he specialises in translating complex business requirements into precise technical solutions, integration strategies, and actionable roadmaps.",
        keywords: ["IT Consulting", "Systems Analysis", "Requirements Engineering", "Integration"],
        theme: "emerald",
    },
];

const VALUES = [
    {
        icon: <Eye className="w-8 h-8 text-cyan-400" />,
        title: "Radical Transparency",
        desc: "No black boxes. We document every pipeline, explain every architectural decision, and ensure your internal team fully understands the systems we build.",
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-cyan-400" />,
        title: "Security by Design",
        desc: "We treat your data like our own. Enterprise-grade encryption, rigorous access controls, and strict compliance standards are baked into day one of our code.",
    },
    {
        icon: <Zap className="w-8 h-8 text-cyan-400" />,
        title: "Agile Execution",
        desc: "Bureaucracy kills momentum. As a focused, elite unit, we iterate rapidly, deploy reliably, and adapt to your changing business needs instantly.",
    },
];

const THEME: Record<string, { border: string; shadow: string; badge: string; text: string }> = {
    cyan: {
        border: "border-cyan-500/50",
        shadow: "shadow-[0_0_20px_rgba(34,211,238,0.2)]",
        badge: "border-cyan-900/50 bg-cyan-950/40",
        text: "text-cyan-300",
    },
    purple: {
        border: "border-purple-500/50",
        shadow: "shadow-[0_0_20px_rgba(168,85,247,0.2)]",
        badge: "border-purple-900/50 bg-purple-950/40",
        text: "text-purple-300",
    },
    emerald: {
        border: "border-emerald-500/50",
        shadow: "shadow-[0_0_20px_rgba(16,185,129,0.2)]",
        badge: "border-emerald-900/50 bg-emerald-950/40",
        text: "text-emerald-300",
    },
};

export default function AboutPage() {
    return (
        <div className="flex flex-col items-center min-h-screen bg-neutral-950 text-white overflow-x-hidden">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">

                {/* 1. Header */}
                <div className="text-center mb-24 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/10 rounded-full blur-[80px] -z-10 pointer-events-none animate-pulse" />
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
                    >
                        The <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">Brains</span> Behind the Data
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-3xl mx-auto text-gray-300 text-lg md:text-xl leading-relaxed"
                    >
                        A family-founded team of engineers, testers, and consultants dedicated to solving
                        complex data challenges with precision, transparency, and speed.
                    </motion.p>
                </div>

                {/* 2. Mission */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="max-w-4xl mx-auto text-center mb-32"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 mb-8 text-sm font-mono tracking-wider">
                        <Cpu size={16} className="animate-pulse" />
                        <span>OUR_MISSION</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
                        Building unbreakable bridges between{" "}
                        <br className="hidden md:block" />
                        <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                            Raw Data and Actionable Insight
                        </span>
                    </h2>
                    <p className="text-gray-300 leading-relaxed text-lg md:text-xl font-light">
                        We started WillowVibe because we saw businesses drowning in messy, unreliable data.
                        As a family-founded team, we handle the technical heavy lifting — from pipelines and
                        cloud migration to AI infrastructure — so you can focus on your business with
                        absolute peace of mind.
                    </p>
                </motion.div>

                {/* 3. Team */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4 font-mono">THE_COLLECTIVE</h2>
                        <div className="h-1 w-20 bg-cyan-400 shadow-[0_0_10px_cyan] mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {TEAM.map((member, idx) => {
                            const t = THEME[member.theme];
                            return (
                                <motion.div
                                    key={member.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: idx * 0.2 }}
                                    className="group relative p-8 rounded-2xl bg-neutral-900 border border-neutral-700 hover:border-neutral-500 transition-all duration-300 shadow-xl flex flex-col items-center text-center"
                                >
                                    {/* Initials Avatar */}
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 rounded-full blur-md bg-white/5 group-hover:bg-white/10 transition-all duration-300" />
                                        <div className={`w-24 h-24 rounded-full bg-neutral-800 border-2 ${t.border} ${t.shadow} flex items-center justify-center relative z-10`}>
                                            <span className={`text-2xl font-extrabold font-mono ${t.text}`}>
                                                {member.initials}
                                            </span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                    <p className={`font-mono text-sm mb-1 ${t.text}`}>{member.role}</p>
                                    <p className="text-gray-500 text-xs font-mono mb-4">{member.focus}</p>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">{member.bio}</p>

                                    <div className="flex flex-wrap justify-center gap-2 mt-auto pt-6 border-t border-neutral-800 w-full">
                                        {member.keywords.map((keyword, i) => (
                                            <span key={i} className={`text-xs font-mono px-3 py-1.5 rounded-md bg-black/60 border ${t.badge} ${t.text}`}>
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <p className="text-center text-gray-600 text-xs font-mono mt-8 tracking-wider">
                        ◦ PROFILE_PHOTOS COMING SOON ◦
                    </p>
                </div>

                {/* 4. Values */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4 font-mono">OPERATING_PRINCIPLES</h2>
                        <div className="h-1 w-20 bg-cyan-400 shadow-[0_0_10px_cyan] mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {VALUES.map((val, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: idx * 0.2 }}
                                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group"
                            >
                                <div className="mb-6 p-4 rounded-xl bg-black/40 inline-block group-hover:bg-cyan-400/10 transition-colors">
                                    {val.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">{val.title}</h3>
                                <p className="text-gray-300 leading-relaxed font-light">{val.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 5. Stats */}
                <div className="relative py-20 flex flex-col items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 md:opacity-50 pointer-events-none -z-10">
                        <div className="w-64 h-64 rounded-full border border-cyan-400/30 flex items-center justify-center animate-[spin_10s_linear_infinite] relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-600/10 rounded-full blur-[40px]" />
                            <div className="absolute w-80 h-80 rounded-full border border-blue-500/20 border-dashed animate-[spin_15s_linear_infinite_reverse]" />
                            <div className="w-40 h-40 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center animate-[spin_5s_linear_infinite_reverse]">
                                <GitMerge className="w-12 h-12 text-cyan-400 animate-pulse" />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full z-10">
                        <StatCard value="99.99%" label="Pipeline Uptime SLA" />
                        <StatCard value="50+" label="Enterprise Clients Architected" />
                        <StatCard value="10PB+" label="Data Processed Monthly" />
                    </div>
                </div>
            </div>

            {/* 6. CTA */}
            <section className="w-full bg-gradient-to-t from-cyan-950/20 to-transparent py-24 border-t border-white/5 text-center mt-12">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to work with us?</h2>
                    <p className="text-lg text-gray-400 mb-10">
                        Stop struggling with unreliable data. Partner with our engineers to build a
                        resilient, automated data architecture that scales with your business.
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-400 text-black font-bold rounded-lg transition-all hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                        LET&apos;S TALK DATA <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
}

function StatCard({ value, label }: { value: string; label: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 text-center rounded-2xl bg-neutral-900/80 backdrop-blur-sm border border-neutral-700 hover:border-cyan-400/50 transition-colors group shadow-lg"
        >
            <div className="text-4xl lg:text-5xl font-extrabold text-white mb-4 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all font-mono">
                {value}
            </div>
            <div className="text-sm tracking-widest text-gray-400 uppercase font-semibold">{label}</div>
        </motion.div>
    );
}
