import Link from "next/link";
import { Database, Mail, Linkedin, Github, ArrowRight } from "lucide-react";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
];

const SERVICES_LINKS = [
    { href: "/services", label: "Data Pipeline Development" },
    { href: "/services", label: "Cloud Engineering" },
    { href: "/services", label: "Data Migration" },
    { href: "/services", label: "AI Infrastructure" },
    { href: "/services", label: "Business Intelligence" },
];

export function Footer() {
    return (
        <footer className="w-full border-t border-white/5 bg-black">
            {/* Main Footer Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <Database className="text-primary w-7 h-7" />
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-extrabold tracking-wider text-white glow-text">
                                    WillowVibe
                                </span>
                                <span className="text-white/30 font-light text-lg">|</span>
                                <span className="text-base font-semibold tracking-widest text-primary/80">
                                    Data Synapse
                                </span>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
                            Your dedicated data engineering team. We eliminate data silos, automate complex pipelines, and build resilient cloud lakehouses — so your business thrives on clean, actionable intelligence.
                        </p>
                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            <a
                                href="mailto:contact@willowvibe.com"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                                aria-label="Email us"
                            >
                                <Mail className="w-4 h-4" />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/willowvibe/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-5 font-mono">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href + link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 text-sm hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                                    >
                                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-1 transition-opacity" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-5 font-mono">
                            Services
                        </h3>
                        <ul className="space-y-3">
                            {SERVICES_LINKS.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 text-sm hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                                    >
                                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-1 transition-opacity" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-gray-600 text-xs font-mono">
                        © {new Date().getFullYear()} WillowVibe | Data Synapse. All rights reserved.
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                        <Link href="/privacy" className="text-gray-600 text-xs hover:text-gray-400 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-gray-600 text-xs hover:text-gray-400 transition-colors">
                            Terms of Service
                        </Link>
                        <a
                            href="mailto:contact@willowvibe.com"
                            className="text-gray-600 text-xs hover:text-primary transition-colors font-mono"
                        >
                            contact@willowvibe.com
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

