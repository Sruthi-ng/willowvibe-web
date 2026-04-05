import Link from "next/link";
import { Database, Mail, Linkedin, ArrowRight } from "lucide-react";

const NAV_LINKS = [{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { href: "/about", label: "About Us" }, { href: "/contact", label: "Contact" }];
const SERVICE_LINKS = [{ label: "Data Pipeline Development" }, { label: "Cloud Engineering" }, { label: "Data Migration" }, { label: "AI Infrastructure" }, { label: "Business Intelligence" }];

export function Footer() {
    return (
        <footer className="w-full border-t border-white/5 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 md:gap-3 mb-3">
                            <Database className="text-primary w-6 h-6" />
                            <div className="flex items-center gap-1.5">
                                <span className="text-base font-extrabold tracking-wider text-white glow-text">WillowVibe</span>
                                <span className="text-white/30 font-light">|</span>
                                <span className="text-sm font-semibold tracking-widest text-primary/80">Data Synapse</span>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-5">Your dedicated data engineering team. We eliminate data silos, automate complex pipelines, and build resilient cloud lakehouses.</p>
                        <div className="flex items-center gap-3">
                            <a href="mailto:contact@willowvibe.com" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition-all" aria-label="Email"><Mail className="w-4 h-4" /></a>
                            <a href="https://www.linkedin.com/company/willowvibe/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition-all" aria-label="LinkedIn"><Linkedin className="w-4 h-4" /></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-xs tracking-widest uppercase mb-4 font-mono">Quick Links</h3>
                        <ul className="space-y-2.5">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href + link.label}>
                                    <Link href={link.href} className="text-gray-400 text-sm hover:text-primary transition-colors flex items-center gap-1.5 group">
                                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />{link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-xs tracking-widest uppercase mb-4 font-mono">Services</h3>
                        <ul className="space-y-2.5">
                            {SERVICE_LINKS.map((link) => (
                                <li key={link.label}>
                                    <Link href="/services" className="text-gray-400 text-sm hover:text-primary transition-colors flex items-center gap-1.5 group">
                                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />{link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-gray-600 text-xs font-mono">© {new Date().getFullYear()} WillowVibe | Data Synapse. All rights reserved.</p>
                    <div className="flex flex-wrap items-center gap-4">
                        <Link href="/privacy" className="text-gray-600 text-xs hover:text-gray-400 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-gray-600 text-xs hover:text-gray-400 transition-colors">Terms of Service</Link>
                        <a href="mailto:contact@willowvibe.com" className="text-gray-600 text-xs hover:text-primary transition-colors font-mono">contact@willowvibe.com</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
