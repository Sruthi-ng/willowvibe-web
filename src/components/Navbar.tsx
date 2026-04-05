"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Database, Home, Info, Mail, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
  { href: "/services", label: "Services", icon: <Database className="w-4 h-4" /> },
  { href: "/about", label: "About Us", icon: <Info className="w-4 h-4" /> },
  { href: "/contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Database className="text-primary w-5 h-5 md:w-7 md:h-7 animate-pulse flex-shrink-0" />
            <div className="flex items-center gap-1 md:gap-2">
              <span className="text-sm md:text-lg font-extrabold tracking-wider text-white glow-text">WillowVibe</span>
              <span className="text-white/30 font-light text-sm md:text-lg">|</span>
              <span className="text-xs md:text-base font-semibold tracking-wider text-primary/80">Data Synapse</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-2">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${pathname === link.href ? "text-primary bg-primary/10 border border-primary/20" : "text-gray-300 hover:text-primary hover:bg-white/5"}`}>
                {link.icon}{link.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-primary hover:bg-white/5 transition-colors"
            aria-label="Toggle menu">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown — fully opaque, page scrolls freely behind it */}
      {mobileOpen && (
        <div className="md:hidden bg-neutral-900 border-t border-white/10 px-4 pb-4 pt-3 flex flex-col gap-1.5 shadow-xl">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "text-gray-200 hover:text-primary hover:bg-white/5"
              }`}>
              {link.icon}{link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-1 text-center px-4 py-3 rounded-lg bg-primary text-black font-bold text-sm tracking-wide hover:bg-primary/90 transition-colors">
            Get In Touch
          </Link>
        </div>
      )}
    </nav>
  );
}
