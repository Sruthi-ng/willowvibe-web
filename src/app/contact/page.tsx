"use client";

import { Mail, Linkedin, CalendarClock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Something went wrong.");
            setStatus("success");
            setForm({ name: "", email: "", phone: "", message: "" });
        } catch (err: unknown) {
            setStatus("error");
            setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">

                {/* Info Side */}
                <div className="flex flex-col space-y-5 md:space-y-8">
                    <div>
                        <h1 className="text-3xl md:text-5xl border-l-4 border-primary pl-5 font-extrabold tracking-tight mb-3">
                            Initiate <span className="glow-text text-white">Handshake</span>
                        </h1>
                        <p className="text-gray-400 text-sm md:text-lg leading-relaxed pl-5">
                            Ready to modernise your data infrastructure? Reach out and our lead engineers will get back to you within 24 hours.
                        </p>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                        <a href="mailto:contact@willowvibe.com"
                            className="flex items-center gap-3 md:gap-4 group p-3 md:p-4 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black flex items-center justify-center border border-white/20 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all flex-shrink-0">
                                <Mail className="w-4 h-4 md:w-5 md:h-5 text-gray-300 group-hover:text-primary" />
                            </div>
                            <div>
                                <div className="text-xs font-mono text-gray-500 mb-0.5">DIRECT_EMAIL</div>
                                <div className="text-sm md:text-base font-medium text-white">contact@willowvibe.com</div>
                            </div>
                        </a>

                        <a href="https://www.linkedin.com/company/willowvibe/" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-3 md:gap-4 group p-3 md:p-4 rounded-lg bg-white/5 border border-white/10 hover:border-secondary/50 hover:bg-white/10 transition-all">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black flex items-center justify-center border border-white/20 group-hover:border-secondary group-hover:shadow-[0_0_15px_rgba(112,0,255,0.4)] transition-all flex-shrink-0">
                                <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-gray-300 group-hover:text-secondary" />
                            </div>
                            <div>
                                <div className="text-xs font-mono text-gray-500 mb-0.5">LINKEDIN_PROFILE</div>
                                <div className="text-sm md:text-base font-medium text-white">/company/WillowVibe</div>
                            </div>
                        </a>
                    </div>

                    <div className="flex items-center gap-3 p-3 md:p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
                        <p className="text-xs md:text-sm text-gray-400">
                            We typically respond within <span className="text-primary font-semibold">24 hours</span> on business days.
                        </p>
                    </div>
                </div>

                {/* Form Side */}
                <div className="relative w-full glass-panel border border-white/10 p-5 md:p-8 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none z-0">
                        <CalendarClock className="w-28 h-28 md:w-40 md:h-40 text-primary blur-[2px]" />
                    </div>

                    <div className="relative z-10 w-full">
                        <h2 className="text-xl md:text-3xl font-bold text-white mb-1">Connect with us</h2>
                        <p className="text-gray-400 text-xs md:text-sm mb-5 md:mb-8">Reach out to discuss your data engineering needs.</p>

                        {status === "success" ? (
                            <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
                                    <CheckCircle className="w-7 h-7 text-cyan-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Message Sent!</h3>
                                    <p className="text-gray-400 text-sm">Thank you. We&apos;ll get back to you within 24 hours.</p>
                                </div>
                                <button onClick={() => setStatus("idle")} className="text-xs text-primary font-mono hover:underline mt-2">Send another message</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-5 text-white">
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="name" className="text-xs text-primary font-semibold uppercase tracking-wider">Name</label>
                                    <input type="text" id="name" value={form.name} onChange={handleChange} placeholder="Your full name" required disabled={status === "loading"}
                                        className="bg-neutral-900/80 border border-white/30 rounded-lg p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-neutral-500 disabled:opacity-50" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="email" className="text-xs text-primary font-semibold uppercase tracking-wider">Email</label>
                                    <input type="email" id="email" value={form.email} onChange={handleChange} placeholder="you@company.com" required disabled={status === "loading"}
                                        className="bg-neutral-900/80 border border-white/30 rounded-lg p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-neutral-500 disabled:opacity-50" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="phone" className="text-xs text-primary font-semibold uppercase tracking-wider">Phone <span className="text-gray-600 normal-case font-normal">(Optional)</span></label>
                                    <input type="tel" id="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" disabled={status === "loading"}
                                        className="bg-neutral-900/80 border border-white/30 rounded-lg p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-neutral-500 disabled:opacity-50" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="message" className="text-xs text-primary font-semibold uppercase tracking-wider">How can we help?</label>
                                    <textarea id="message" value={form.message} onChange={handleChange} placeholder="Tell us about your project..." required disabled={status === "loading"}
                                        className="bg-neutral-900/80 border border-white/30 rounded-lg p-3 h-28 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-neutral-500 resize-none disabled:opacity-50" />
                                </div>

                                {status === "error" && (
                                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />{errorMessage}
                                    </div>
                                )}

                                <button type="submit" disabled={status === "loading"}
                                    className="mt-2 bg-primary hover:bg-primary/80 text-black font-bold py-3 md:py-4 rounded-xl transition-all text-sm tracking-wide flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                                    {status === "loading" ? (<><Loader2 className="w-4 h-4 animate-spin" />Sending...</>) : "Send Message"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

