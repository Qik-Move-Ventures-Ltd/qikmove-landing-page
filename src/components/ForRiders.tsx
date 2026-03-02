import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Bike, TrendingUp, Calendar, Wallet } from "lucide-react";

const perks = [
  { icon: Wallet, title: "Stack Bread", desc: "Set your own rates. No middleman cuts. Your hustle, your earnings." },
  { icon: Calendar, title: "Your Schedule", desc: "Go live when you want. No shifts, no minimums, no pressure." },
  { icon: TrendingUp, title: "Level Up", desc: "Build your rep. Top-rated riders get more dispatch requests." },
  { icon: Bike, title: "Any Ride", desc: "Bicycle, bike, or car — deliver with whatever you've got." },
];

const ForRiders = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="riders" className="py-28 bg-background relative noise-bg">
      <div className="container relative z-10 mx-auto px-6" ref={ref}>
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-4">
              For Riders
            </p>
            <h2 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl mb-6">
              Turn your
              <br />
              <span className="text-gradient-neon">ride into income.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-md">
              Join the QikMove network. Pick up deliveries around you, 
              negotiate your rate, and get paid instantly. No boss. No schedule. Just money.
            </p>
            <a
              href="#waitlist"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-neon px-8 py-4 text-base font-extrabold text-secondary-foreground transition-all hover:scale-105 hover:shadow-neon active:scale-95"
            >
              Become a Rider 🏍️
            </a>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {perks.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/30 hover:scale-[1.02]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                  <p.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="mb-1 text-base font-extrabold">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForRiders;
