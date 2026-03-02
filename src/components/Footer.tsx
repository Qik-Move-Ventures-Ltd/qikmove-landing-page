import logo from "@/assets/qikmove-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <img src={logo} alt="QikMove" className="h-7 brightness-0 invert" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} QikMove. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Support"].map((l) => (
              <a key={l} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
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
