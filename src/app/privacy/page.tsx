import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
export const metadata: Metadata = { title: "Privacy Policy", description: "How WillowVibe Data Synapse collects and protects your personal information." };
export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-20">
                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 mb-5 text-xs font-mono tracking-wider"><ShieldCheck size={14} /><span>LEGAL_DOCUMENT</span></div>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">Privacy Policy</h1>
                    <p className="text-gray-400 font-mono text-xs">Last updated: April 2026</p>
                </div>
                <div className="space-y-8">
                    {[["1. Who We Are", "WillowVibe | Data Synapse is a data engineering services company at www.willowvibe.com. Contact us at contact@willowvibe.com."], ["2. Information We Collect", "We collect information you provide via contact forms (name, email, phone, message) and anonymous usage data (pages visited, browser type). We do not collect payment or sensitive personal data."], ["3. How We Use Your Information", "We use your information to respond to enquiries, communicate about projects, improve our website, and comply with legal obligations. We do not sell or share your data with third parties."], ["4. Data Retention", "Contact form submissions are retained for up to 3 years then securely deleted. You may request deletion at any time."], ["5. Data Security", "All data is transmitted via HTTPS/TLS. Form submissions are delivered to our secure business email and not stored on third-party servers."], ["6. Your Rights", "You may request access to, correction of, or deletion of your personal data. Contact us at contact@willowvibe.com."], ["7. Cookies", "We use only essential functional cookies. No advertising or cross-site tracking cookies are used."], ["8. Changes", "We may update this policy from time to time. Changes will be posted here with an updated date."]].map(([title, text]) => (
                        <div key={title} className="space-y-2">
                            <h2 className="text-base md:text-lg font-bold text-white border-l-4 border-cyan-400 pl-4">{title}</h2>
                            <p className="text-gray-300 text-sm leading-relaxed pl-4">{text}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-12 pt-6 border-t border-white/5"><Link href="/" className="text-cyan-400 font-mono text-sm hover:underline">← Back to Home</Link></div>
            </div>
        </div>
    );
}
