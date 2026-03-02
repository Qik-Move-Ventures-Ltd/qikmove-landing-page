import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ClipboardList, Radar, MessageSquare, PackageCheck } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Create Dispatch",
    description: "Drop your pickup & delivery pin, describe your parcel, and you're set.",
    color: "primary" as const,
  },
  {
    icon: Radar,
    title: "Spot Riders",
    description: "See who's nearby in real-time. Pick the one with the best rating & price.",
    color: "secondary" as const,
  },
  {
    icon: MessageSquare,
    title: "Negotiate",
    description: "Chat it out. Agree on a fair price with no platform-inflated fees.",
    color: "accent" as const,
  },
  {
    icon: PackageCheck,
    title: "Track & Done",
    description: "Watch your parcel move live. Get notified the second it's delivered.",
    color: "success" as const,
  },
];

const colorClasses = {
  primary: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20", line: "bg-primary" },
  secondary: { bg: "bg-secondary/10", text: "text-secondary", border: "border-secondary/20", line: "bg-secondary" },
  accent: { bg: "bg-accent/10", text: "text-accent", border: "border-accent/20", line: "bg-accent" },
  success: { bg: "bg-success/10", text: "text-success", border: "border-success/20", line: "bg-success" },
};

const HowItWorks = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-28 bg-background relative noise-bg">
      <div className="container relative z-10 mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-secondary mb-4">
            The Flow
          </p>
          <h2 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl max-w-xl">
            Dead simple.
            <br />
            <span className="text-gradient-primary">Four taps.</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const c = colorClasses[step.color];
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                className={`group relative rounded-2xl border ${c.border} bg-card p-8 transition-all hover:scale-[1.02] hover:shadow-lg`}
              >
                {/* Step number */}
                <span className={`text-7xl font-extrabold ${c.text} opacity-10 absolute top-4 right-6`}>
                  0{i + 1}
                </span>

                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${c.bg} transition-colors`}>
                  <step.icon className={`h-7 w-7 ${c.text}`} />
                </div>

                <h3 className="mb-2 text-xl font-extrabold">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-8 right-8 h-0.5 ${c.line} opacity-0 transition-opacity group-hover:opacity-100 rounded-full`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
