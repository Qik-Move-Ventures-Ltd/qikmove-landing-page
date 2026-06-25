import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="mb-3 font-display text-2xl font-bold text-foreground">{title}</h2>
    <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
  </section>
);

const Privacy = () => {
  const updated = "June 25, 2026";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="relative pt-32 pb-20">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="container relative mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft size={14} /> Back home
            </Link>

            <span className="inline-block rounded-full bg-secondary/15 px-3 py-1 text-xs font-mono uppercase tracking-wider text-secondary">
              Legal
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">Last updated: {updated}</p>

            <div className="mt-10">
              <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
                This page is maintained by QikMove to explain how we collect, use, and protect
                your information when you use our website, mobile apps, and delivery services
                (the "Service"). By using QikMove, you agree to this policy.
              </p>

              <Section title="1. Who We Are">
                <p>
                  QikMove is a Nigerian logistics and delivery platform connecting customers
                  with riders for on-demand dispatch. Our registered address is 143 Jedidiah
                  Estate Centenary, Enugu, Enugu State, Nigeria.
                </p>
              </Section>

              <Section title="2. Information We Collect">
                <p>We collect the following categories of personal data:</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li><strong>Account info:</strong> full name, email address, phone number, password.</li>
                  <li><strong>Delivery info:</strong> pickup and drop-off addresses, package details, recipient contact.</li>
                  <li><strong>Location data:</strong> real-time GPS location of riders during active deliveries; approximate location of customers when requesting a pickup.</li>
                  <li><strong>Payment info:</strong> transaction history and payment method metadata (full card numbers are handled by our payment processors, not stored by us).</li>
                  <li><strong>Rider verification:</strong> government-issued ID, vehicle details, and proof of address (riders only).</li>
                  <li><strong>Device & usage data:</strong> IP address, device type, OS, browser, app version, and interaction logs.</li>
                </ul>
              </Section>

              <Section title="3. How We Use Your Information">
                <ul className="list-disc space-y-1 pl-5">
                  <li>Create and manage your account.</li>
                  <li>Match customers with nearby riders and facilitate price negotiation.</li>
                  <li>Process payments and payouts.</li>
                  <li>Send transactional updates (order status, receipts, account alerts) and waitlist communications.</li>
                  <li>Improve safety, prevent fraud, and verify rider identity.</li>
                  <li>Provide customer support and resolve disputes.</li>
                  <li>Comply with Nigerian law, including the Nigeria Data Protection Act (NDPA) 2023.</li>
                </ul>
              </Section>

              <Section title="4. Sharing & Disclosure">
                <p>We do not sell your personal data. We share limited information with:</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li><strong>Riders and customers</strong> involved in your delivery (name, phone, pickup/drop-off).</li>
                  <li><strong>Service providers</strong> that help us operate, including cloud hosting, email delivery (Brevo), authentication, and payment processors.</li>
                  <li><strong>Law enforcement or regulators</strong> when required by law or to protect the rights, safety, and property of QikMove or others.</li>
                </ul>
              </Section>

              <Section title="5. Cookies & Analytics">
                <p>
                  We use essential cookies to keep you signed in and remember your preferences.
                  We may use privacy-respecting analytics to understand how the Service is used
                  so we can improve it. You can disable cookies in your browser, but parts of
                  the Service may not work properly.
                </p>
              </Section>

              <Section title="6. Data Retention">
                <p>
                  We keep your data only for as long as your account is active or as needed to
                  provide the Service, comply with legal obligations, resolve disputes, and
                  enforce our agreements. You can request deletion of your account at any
                  time.
                </p>
              </Section>

              <Section title="7. Security">
                <p>
                  We use industry-standard safeguards — including encryption in transit (HTTPS),
                  access controls, and secure cloud infrastructure — to protect your data. No
                  system is 100% secure, and we cannot guarantee absolute security.
                </p>
              </Section>

              <Section title="8. Your Rights">
                <p>Under the NDPA and similar laws, you have the right to:</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Access the personal data we hold about you.</li>
                  <li>Request correction of inaccurate data.</li>
                  <li>Request deletion of your data ("right to be forgotten").</li>
                  <li>Object to or restrict certain processing.</li>
                  <li>Withdraw consent for marketing communications at any time.</li>
                </ul>
                <p>To exercise these rights, contact us using the details below.</p>
              </Section>

              <Section title="9. Children's Privacy">
                <p>
                  QikMove is not intended for users under 18. We do not knowingly collect data
                  from children. If you believe a child has provided us with personal data,
                  please contact us so we can remove it.
                </p>
              </Section>

              <Section title="10. Changes to This Policy">
                <p>
                  We may update this Privacy Policy from time to time. We'll post the new
                  version here and update the "Last updated" date. Material changes will be
                  communicated via email or in-app notice.
                </p>
              </Section>

              <Section title="11. Contact Us">
                <p>
                  Questions, complaints, or data requests? Email{" "}
                  <a
                    href="mailto:privacy@qikmove.app"
                    className="text-secondary underline-offset-4 hover:underline"
                  >
                    privacy@qikmove.app
                  </a>{" "}
                  or write to 143 Jedidiah Estate Centenary, Enugu, Enugu State, Nigeria.
                </p>
              </Section>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;