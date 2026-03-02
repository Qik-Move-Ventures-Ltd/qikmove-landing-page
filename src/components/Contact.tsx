import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Send, CheckCircle2 } from "lucide-react";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section id="waitlist" className="py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl rounded-3xl border border-primary/15 bg-card/80 backdrop-blur p-10 text-center shadow-glow sm:p-16 relative overflow-hidden"
        >
          {/* Background orb */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-5xl mb-6"
            >
              🚀
            </motion.div>

            <h2 className="text-3xl font-extrabold sm:text-4xl mb-3">
              Don't sleep on this.
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed max-w-md mx-auto">
              Be the first to know when QikMove drops. Early users get exclusive perks. 
              No spam, we promise.
            </p>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="rounded-2xl border border-success/30 bg-success/10 p-8"
              >
                <CheckCircle2 className="h-10 w-10 text-success mx-auto mb-3" />
                <p className="text-lg font-extrabold text-success">You're in! 🎉</p>
                <p className="mt-1 text-sm text-muted-foreground">We'll hit you up when we launch.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 rounded-full border border-border bg-muted/50 px-6 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-7 py-4 text-sm font-bold text-primary-foreground transition-all hover:shadow-glow hover:scale-105 active:scale-95"
                >
                  <Send className="h-4 w-4" />
                  I'm in
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
