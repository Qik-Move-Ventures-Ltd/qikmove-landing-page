import { Package, MapPin, Handshake, Truck } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero pt-20">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Delivery rider with route map"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      </div>

      <div className="container relative mx-auto px-6 py-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-secondary animate-pulse-glow" />
            <span className="text-xs font-medium text-primary-foreground/80">
              Coming Soon — Mobile App in Development
            </span>
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
            Deliver Anything,{" "}
            <span className="text-gradient-neon">Anywhere,</span>{" "}
            <span className="text-gradient-primary">Fast.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            QikMove connects customers with nearby riders for instant parcel delivery. 
            Create dispatches, negotiate rates, and track your deliveries in real-time.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4" id="early-access">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-glow transition-all hover:scale-105"
            >
              Join the Waitlist
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-card/50 px-8 py-4 text-base font-semibold text-foreground backdrop-blur transition-all hover:bg-card"
            >
              See How It Works
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { icon: Package, label: "Dispatch Created", value: "Instant" },
              { icon: MapPin, label: "Find Riders", value: "Nearby" },
              { icon: Handshake, label: "Negotiate Price", value: "Fair" },
              { icon: Truck, label: "Delivery", value: "Fast" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xl font-bold text-secondary">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
