import { ClipboardList, Radar, MessageSquare, PackageCheck } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Create a Dispatch",
    description: "Enter your pickup and delivery details — parcel size, destination, and special instructions.",
  },
  {
    icon: Radar,
    title: "Find Nearby Riders",
    description: "Our app instantly finds available riders near your location, ready to pick up your parcel.",
  },
  {
    icon: MessageSquare,
    title: "Negotiate & Confirm",
    description: "Chat with riders, agree on a fair price, and confirm your dispatch — all within the app.",
  },
  {
    icon: PackageCheck,
    title: "Track & Receive",
    description: "Follow your parcel in real-time until it's safely delivered to its destination.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            How It Works
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Four simple steps to{" "}
            <span className="text-gradient-neon">move anything</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="group relative rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/40 hover:shadow-glow"
            >
              {/* Step number */}
              <span className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground">
                {i + 1}
              </span>

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <step.icon className="h-7 w-7 text-primary" />
              </div>

              <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
