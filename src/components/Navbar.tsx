import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/qikmove-logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = ["How It Works", "Features", "For Riders", "Contact"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <img src={logo} alt="QikMove" className="h-8" />

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l}
            </a>
          ))}
        </div>

        <a
          href="#early-access"
          className="hidden md:inline-flex rounded-lg bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-glow"
        >
          Get Early Access
        </a>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-6 pb-6 pt-4 space-y-4">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {l}
            </a>
          ))}
          <a
            href="#early-access"
            className="block rounded-lg bg-gradient-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground"
          >
            Get Early Access
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
