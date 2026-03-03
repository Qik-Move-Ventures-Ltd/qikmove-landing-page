import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const FloatingOrb = ({ className, delay = 0 }: { className: string; delay?: number }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    animate={{
      y: [0, -30, 0],
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Floating orbs */}
      <FloatingOrb className="w-96 h-96 bg-primary/20 -top-20 -right-20" delay={0} />
      <FloatingOrb className="w-72 h-72 bg-secondary/15 bottom-20 -left-20" delay={1.5} />
      <FloatingOrb className="w-64 h-64 bg-accent/10 top-1/2 right-1/4" delay={3} />

      {/* Hero image — subtle background */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="" className="h-full w-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/90 to-background" />
      </div>

      <div className="container relative mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-4 py-2"
            >
              <Sparkles className="h-3.5 w-3.5 text-secondary" />
              <span className="text-xs font-semibold tracking-wide text-secondary uppercase">
                App dropping soon
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-[5rem]"
            >
              Move it,
              <br />
              <span className="text-gradient-neon">Like you</span>
              <br />
              <span className="text-gradient-primary">Mean it.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 max-w-md text-lg text-muted-foreground leading-relaxed"
            >
              Your parcel, your rider, your price. QikMove lets you dispatch anything 
              to anyone — with real riders, real-time tracking, and zero middlemen.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#waitlist"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-glow transition-all hover:scale-105 active:scale-95"
              >
                Join the Waitlist
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-4 text-base font-semibold text-foreground transition-all hover:bg-muted/50 active:scale-95"
              >
                How it works
                <ArrowDown className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          {/* Right side — animated phone mockup feel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block relative"
          >
            <div className="relative mx-auto w-80">
              {/* Phone frame */}
              <div className="rounded-[2.5rem] border-2 border-border bg-card p-3 shadow-glow">
                <div className="rounded-[2rem] overflow-hidden bg-muted aspect-[9/18] relative">
                  <img src={heroImage} alt="QikMove delivery" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  
                  {/* Fake UI overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 space-y-3">
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex items-center gap-2"
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-success" />
                      <span className="text-xs font-semibold text-foreground">3 riders nearby</span>
                    </motion.div>
                    <div className="rounded-xl bg-card/80 backdrop-blur p-3 border border-border/50">
                      <p className="text-[10px] text-muted-foreground mb-1">Pickup → Delivery</p>
                      <p className="text-xs font-bold text-foreground">Lekki Phase 1 → Victoria Island</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs font-bold text-secondary">₦1,500</span>
                        <span className="rounded-full bg-gradient-primary px-3 py-1 text-[10px] font-bold text-primary-foreground">
                          Send Now
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating notification cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-8 rounded-xl border border-border bg-card/90 backdrop-blur p-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/20 text-sm">🏍️</span>
                  <div>
                    <p className="text-[10px] font-bold text-foreground">Rider accepted!</p>
                    <p className="text-[9px] text-muted-foreground">ETA: 4 mins</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-2 -right-6 rounded-xl border border-border bg-card/90 backdrop-blur p-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm">📦</span>
                  <div>
                    <p className="text-[10px] font-bold text-foreground">Delivered!</p>
                    <p className="text-[9px] text-muted-foreground">Rate your rider ⭐</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Marquee strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-24 overflow-hidden border-y border-border/50 py-4"
        >
          <div className="flex animate-marquee whitespace-nowrap">
            {Array(2).fill(null).map((_, i) => (
              <div key={i} className="flex items-center gap-8 mr-8">
                {["INSTANT DISPATCH", "REAL-TIME TRACKING", "FAIR PRICING", "VERIFIED RIDERS", "24/7 AVAILABILITY", "SECURE DELIVERY"].map((t) => (
                  <span key={`${t}-${i}`} className="flex items-center gap-3 text-sm font-bold tracking-widest text-muted-foreground/60 uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
