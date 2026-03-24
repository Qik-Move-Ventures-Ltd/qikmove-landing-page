import logo from "@/assets/qikmove-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} QikMove. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60">
            143 Jedidiah Estate Centenary, Enugu, Enugu State, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
