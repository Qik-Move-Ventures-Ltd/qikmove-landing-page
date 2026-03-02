import logo from "@/assets/qikmove-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="QikMove" className="h-6 brightness-0 invert" />
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} QikMove. All rights reserved. Built with 💙
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Support"].map((l) => (
              <a key={l} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
