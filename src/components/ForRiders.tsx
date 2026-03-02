import { Bike, TrendingUp, Calendar, Wallet } from "lucide-react";

const perks = [
  { icon: Wallet, title: "Earn More", desc: "Negotiate your own rates and keep more of what you earn." },
  { icon: Calendar, title: "Flexible Schedule", desc: "Go online when you want. No minimum hours required." },
  { icon: TrendingUp, title: "Grow Your Business", desc: "Build your reputation with ratings and become a top rider." },
  { icon: Bike, title: "Use Any Vehicle", desc: "Bike, motorcycle, or car — deliver with whatever you have." },
];

const ForRiders = () => {
  return (
    <section id="for-riders" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">
              For Riders
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl mb-6">
              Turn your ride into{" "}
              <span className="text-gradient-neon">income</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Join the QikMove rider network and start earning by delivering parcels in your city. 
              You set your rates, choose your hours, and grow your delivery business.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-neon px-8 py-4 text-base font-bold text-secondary-foreground transition-all hover:scale-105 hover:shadow-neon"
            >
              Become a Rider
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {perks.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/30"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <p.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="mb-1 text-base font-bold">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForRiders;
