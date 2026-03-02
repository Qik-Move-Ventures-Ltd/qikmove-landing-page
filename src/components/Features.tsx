import { Shield, Zap, DollarSign, MapPinned, Users, Clock } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning-Fast Matching",
    description: "Get connected with the nearest available rider in seconds using real-time geolocation.",
  },
  {
    icon: DollarSign,
    title: "Fair Price Negotiation",
    description: "No hidden fees. Chat directly with riders and agree on a price that works for both of you.",
  },
  {
    icon: MapPinned,
    title: "Live GPS Tracking",
    description: "Watch your parcel move in real-time from pickup to delivery on an interactive map.",
  },
  {
    icon: Shield,
    title: "Secure & Verified",
    description: "All riders are verified with ID checks. Your parcels are insured during transit.",
  },
  {
    icon: Users,
    title: "Rider Community",
    description: "Join as a rider, set your availability, and earn on your own schedule.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Whether it's day or night, there's always a rider ready to deliver your package.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-3">
            Features
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Built for speed,{" "}
            <span className="text-gradient-primary">trust</span> &{" "}
            <span className="text-gradient-neon">convenience</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-card p-8 transition-all hover:border-secondary/30 hover:shadow-neon"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                <f.icon className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="mb-2 text-lg font-bold">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
