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
        <div className="flex items-center justify-between h-20">

          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Database className="text-primary w-7 h-7 animate-pulse" />
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-wider text-white glow-text">
                WillowVibe
              </span>
              <span className="text-white/30 font-light text-lg">|</span>
              <span className="text-base font-semibold tracking-widest text-primary/80 hidden sm:block">
                Data Synapse
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                icon={link.icon}
                active={pathname === link.href}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-primary hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-white/5 px-4 pb-6 pt-4 flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                ${pathname === link.href
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "text-gray-300 hover:text-primary hover:bg-white/5"
                }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 text-center px-4 py-3 rounded-lg bg-primary text-black font-bold text-sm tracking-wide hover:bg-primary/90 transition-colors"
          >
            Get In Touch
          </Link>
        </div>
      )}
    </nav>
  );
}

function NavLink({
  href,
  children,
  icon,
  active,
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
        ${active
          ? "text-primary bg-primary/10 border border-primary/20"
          : "text-gray-300 hover:text-primary hover:bg-white/5"
        }`}
    >
      {icon}
      {children}
    </Link>
  );
}
