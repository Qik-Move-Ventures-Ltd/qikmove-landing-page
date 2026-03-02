import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/qikmove-logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = ["How It Works", "Features", "Riders", "Waitlist"];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/60 backdrop-blur-2xl"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <img src={logo} alt="QikMove" className="h-7" />

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-muted/50"
            >
              {l}
            </a>
          ))}
        </div>

        <a
          href="#waitlist"
          className="hidden md:inline-flex rounded-full bg-secondary px-5 py-2 text-sm font-bold text-secondary-foreground transition-all hover:shadow-neon hover:scale-105"
        >
          Get Early Access ✨
        </a>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
            <div className="px-6 pb-6 pt-4 space-y-2">
              {links.map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                >
                  {l}
                </a>
              ))}
              <a
                href="#waitlist"
                className="mt-2 block rounded-full bg-secondary px-5 py-3 text-center text-sm font-bold text-secondary-foreground"
              >
                Get Early Access ✨
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
