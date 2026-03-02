import { useState } from "react";
import { Send } from "lucide-react";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section id="contact" className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl rounded-3xl border border-primary/20 bg-card p-10 text-center shadow-glow sm:p-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Stay Updated
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            Be the first to{" "}
            <span className="text-gradient-neon">QikMove</span>
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            We're building something amazing. Drop your email and we'll notify you 
            as soon as QikMove launches in your area.
          </p>

          {submitted ? (
            <div className="rounded-xl border border-success/30 bg-success/10 p-6">
              <p className="text-lg font-semibold text-success">🎉 You're on the list!</p>
              <p className="mt-1 text-sm text-muted-foreground">We'll reach out as soon as we launch.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 rounded-xl border border-border bg-muted px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-glow hover:scale-105"
              >
                <Send className="h-4 w-4" />
                Join Waitlist
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
