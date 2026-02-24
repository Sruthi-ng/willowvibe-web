import Link from "next/link";
import { Database, Home, Info, Mail } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <Database className="text-primary w-8 h-8 animate-pulse" />
            <Link href="/" className="text-xl font-bold tracking-wider text-white flex items-center gap-2">
              <span className="glow-text">WillowData Synapse</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLink href="/" icon={<Home className="w-4 h-4" />}>Home</NavLink>
              <NavLink href="/services" icon={<Database className="w-4 h-4" />}>Services</NavLink>
              <NavLink href="/about" icon={<Info className="w-4 h-4" />}>About Us</NavLink>
              <NavLink href="/contact" icon={<Mail className="w-4 h-4" />}>Contact</NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-foreground hover:text-primary transition-colors flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-white/5"
    >
      {icon}
      {children}
    </Link>
  );
}
