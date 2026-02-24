"use client";

import { Mail, Linkedin, CalendarClock } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[calc(100vh-5rem)] flex items-center">

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                {/* Contact Info Side */}
                <div className="flex flex-col h-full justify-center space-y-10">
                    <div>
                        <h1 className="text-5xl border-l-4 border-primary pl-6 font-extrabold tracking-tight mb-4">
                            Initiate <span className="glow-text text-white">Handshake</span>
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed pl-6">
                            Ready to modernize your data infrastructure? Schedule a technical architecture review with our lead engineers or reach out through our encrypted channels.
                        </p>
                    </div>

                    <div className="space-y-6 pl-6">
                        <a href="mailto:contact@willowvibe.com" className="flex items-center gap-4 group cursor-pointer p-4 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all">
                            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center border border-white/20 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                                <Mail className="w-5 h-5 text-gray-300 group-hover:text-primary" />
                            </div>
                            <div>
                                <div className="text-xs font-mono text-gray-500 mb-1">DIRECT_EMAIL</div>
                                <div className="text-lg font-medium text-white group-hover:glow-text">contact@willowvibe.com</div>
                            </div>
                        </a>

                        <a href="https://www.linkedin.com/company/willowvibe/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group cursor-pointer p-4 rounded-lg bg-white/5 border border-white/10 hover:border-secondary/50 hover:bg-white/10 transition-all">
                            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center border border-white/20 group-hover:border-secondary group-hover:shadow-[0_0_15px_rgba(112,0,255,0.4)] transition-all">
                                <Linkedin className="w-5 h-5 text-gray-300 group-hover:text-secondary" />
                            </div>
                            <div>
                                <div className="text-xs font-mono text-gray-500 mb-1">LINKEDIN_PROFILE</div>
                                <div className="text-lg font-medium text-white group-hover:text-secondary group-hover:glow-text">/company/WillowData Synapse</div>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Form Side */}
                <div className="relative w-full glass-panel border border-white/10 p-8 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
                    
                    {/* Background Icon */}
                    <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none z-0">
                        <CalendarClock className="w-40 h-40 text-primary blur-[2px]" />
                    </div>
                    
                    {/* The Form */}
                    <div className="relative z-10 w-full max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-2">Connect with WillowData Synapse</h2>
                        <p className="text-gray-400 mb-8">Reach out to discuss your data engineering needs.</p>
                        
                        <form className="flex flex-col gap-6 text-white">
                            
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-sm text-primary font-semibold uppercase tracking-wider">Name</label>
                                <input 
                                    type="text" 
                                    id="name"
                                    placeholder="Enter your full name" 
                                    required 
                                    // Soft highlight border with curved edges
                                    className="bg-neutral-900/80 border border-white/30 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-neutral-500" 
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-sm text-primary font-semibold uppercase tracking-wider">Email</label>
                                <input 
                                    type="email" 
                                    id="email"
                                    placeholder="you@company.com" 
                                    required 
                                    className="bg-neutral-900/80 border border-white/30 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-neutral-500" 
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="phone" className="text-sm text-primary font-semibold uppercase tracking-wider">Phone (Optional)</label>
                                <input 
                                    type="tel" 
                                    id="phone"
                                    placeholder="+1 (555) 000-0000" 
                                    className="bg-neutral-900/80 border border-white/30 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-neutral-500" 
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="text-sm text-primary font-semibold uppercase tracking-wider">How can we help?</label>
                                <textarea 
                                    id="message"
                                    placeholder="Tell us about your project or data pipeline needs..." 
                                    required 
                                    className="bg-neutral-900/80 border border-white/30 rounded-lg p-3 h-32 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-neutral-500 resize-none"
                                ></textarea>
                            </div>
                            
                            <button 
                                type="submit" 
                                className="mt-4 bg-primary hover:bg-primary/80 text-black font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] tracking-wide"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

            </div>

        </div>
    );
}