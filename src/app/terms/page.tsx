import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
export const metadata: Metadata = { title: "Terms of Service", description: "Terms and conditions for using WillowVibe Data Synapse services and website." };
export default function TermsPage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-20">
                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 mb-5 text-xs font-mono tracking-wider"><FileText size={14} /><span>LEGAL_DOCUMENT</span></div>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">Terms of Service</h1>
                    <p className="text-gray-400 font-mono text-xs">Last updated: April 2026</p>
                </div>
                <div className="space-y-8">
                    {[["1. Agreement", "By using willowvibe.com you agree to these Terms. If you do not agree, please do not use the site."], ["2. Our Services", "WillowVibe | Data Synapse provides data engineering consultancy including pipeline development, cloud infrastructure, data migration, and related technical services."], ["3. Acceptable Use", "You agree to use this site only for lawful purposes and not to attempt unauthorised access, transmit spam, or interfere with the site's operation."], ["4. Intellectual Property", "All content on this site is the property of WillowVibe | Data Synapse and is protected by applicable intellectual property laws."], ["5. Confidentiality", "Data and materials shared in the context of a client engagement are treated as strictly confidential and will not be disclosed to third parties."], ["6. Disclaimer", "This site and its content are provided as-is without warranties of any kind. We do not warrant that the site will be uninterrupted or error-free."], ["7. Limitation of Liability", "To the fullest extent permitted by law, WillowVibe | Data Synapse shall not be liable for indirect, incidental, or consequential damages arising from use of this site."], ["8. Changes", "We reserve the right to modify these Terms at any time. Continued use constitutes acceptance of updated Terms."]].map(([title, text]) => (
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
