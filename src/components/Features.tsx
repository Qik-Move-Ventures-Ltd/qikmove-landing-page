import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Zap, DollarSign, MapPinned, Users, Clock } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Match",
    description: "Riders found in seconds, not minutes. Our geo engine does the heavy lifting.",
    emoji: "⚡",
  },
  {
    icon: DollarSign,
    title: "You Set the Price",
    description: "No surge pricing BS. Chat with riders and agree on what's fair.",
    emoji: "💰",
  },
  {
    icon: MapPinned,
    title: "Live Tracking",
    description: "Watch your parcel move on the map. Know exactly when it'll arrive.",
    emoji: "📍",
  },
  {
    icon: Shield,
    title: "Verified Riders",
    description: "Every rider is ID-checked. Your stuff is safe with us.",
    emoji: "🛡️",
  },
  {
    icon: Users,
    title: "Ride & Earn",
    description: "Got wheels? Become a rider and stack your bread on your own schedule.",
    emoji: "🏍️",
  },
  {
    icon: Clock,
    title: "Always On",
    description: "24/7 rider availability. Late night? Early morning? We got you.",
    emoji: "🌙",
  },
];

const Features = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" className="py-28 relative">
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-4">
            Why QikMove
          </p>
          <h2 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Built different. <span className="text-gradient-neon">Fr fr.</span>
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group rounded-2xl border border-border bg-card/50 p-7 transition-all hover:bg-card hover:border-primary/20 hover:shadow-glow"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-2xl">
                  {f.emoji}
                </div>
                <f.icon className="h-5 w-5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
              </div>
              <h3 className="mb-2 text-lg font-extrabold">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
