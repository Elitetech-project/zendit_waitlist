"use client";

import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

import Image from "next/image";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ZenditLogo = ({ className = "" }: { className?: string }) => (
  <div className={`relative h-18 w-32 ${className}`}>
    <Image
      src="/logo.png"
      alt="Zendit Logo"
      fill
      className="object-contain dark:brightness-125 dark:contrast-125"
      priority
    />
  </div>
);

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    try {
      const { error: supabaseError } = await supabase
        .from("waitlist")
        .insert([{ email }]);

      if (supabaseError) {
        if (supabaseError.code === "23505") {
          toast.error("You're already on the waitlist! 🚀");
        } else {
          toast.error(supabaseError.message);
        }
      } else {
        toast.success("Successfully added to the Zendit waitlist!");
        setEmail("");
      }
    } catch (err) {
      toast.error("Connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen Selection:bg-brand-orange selection:text-white">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 -z-10 h-full w-full overflow-hidden opacity-20 dark:opacity-40">
        <div className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-brand-orange blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] h-[400px] w-[400px] rounded-full bg-brand-red blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-2 md:p-3">
        <div className="flex w-full max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-2 backdrop-blur-md dark:bg-black/20">
          <div className="flex items-center gap-1">
            <ZenditLogo />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500 transition-colors">
            <a href="https://zendit.gitbook.io/zendit" target="_blank" className="hover:text-foreground">Documentation</a>
            <a href="mailto:zendit.contact@gmail.com" className="rounded-full bg-foreground px-5 py-2 text-background hover:opacity-90 transition-opacity">Contact</a>
          </div>

          {/* Mobile Nav Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-zinc-500 hover:text-foreground"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-4 right-4 z-40 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/90 p-6 shadow-2xl backdrop-blur-xl dark:bg-zinc-900/90 md:hidden"
            >
              <a
                href="https://zendit.gitbook.io/zendit"
                target="_blank"
                className="text-lg font-semibold text-zinc-900 dark:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Documentation
              </a>
              <a
                href="mailto:zendit.contact@gmail.com"
                className="rounded-xl bg-foreground py-3 text-center font-bold text-background"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex flex-col items-center pt-32 pb-20 px-6">
        {/* Hero Section */}
        <section className="max-w-4xl text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center rounded-full border border-brand-orange/20 bg-brand-orange/5 px-3 py-1 text-xs font-semibold text-brand-orange mb-6">
              The Two-Rail Payment System
            </span>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 text-black dark:text-white">
              Bridge the Last Mile <br /> from Crypto to Fiat.
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed text-balance">
              Zendit enables seamless, real-time payouts from the Flare network directly to bank accounts. No wallet required for receivers. Pure efficiency for senders.
            </p>
          </motion.div>

          {/* Waitlist Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full max-w-md mx-auto"
          >
            <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-2 p-2 rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl shadow-brand-orange/10 border border-zinc-200 dark:border-zinc-800">
              <input
                type="email"
                placeholder="Enter your work email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-transparent outline-none text-sm text-black dark:text-white"
              />
              <button
                type="submit"
                disabled={loading}
                className="sm:px-6 py-3 rounded-xl bg-brand-gradient text-white text-sm font-semibold hover:opacity-90 transition-all active:scale-95 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Request Early Access"
                )}
              </button>
            </form>
            <p className="mt-4 text-xs text-zinc-500">
              Join the future of orchestrated liquidity on Flare.
            </p>
          </motion.div>
        </section>

        {/* How it Works / Process Flow */}
        <section className="w-full max-w-6xl mt-20 relative p-8 md:p-16 rounded-[48px] overflow-hidden">
          <div className="absolute inset-0 bg-dot-pattern -z-10 opacity-50 dark:opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-black dark:to-black -z-10" />

          <div className="flex flex-col items-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">The Gateway to Two-Rail Payments</h2>
            <p className="text-zinc-500 md:text-center md:max-w-xl leading-relaxed text-balance">
              ZendIT reduces technical friction by managing the entire lifecycle of a cross-rail payout in a single atomic flow.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative">
            {/* Connecting Line (Desktop) with Animation */}
            <div className="hidden lg:block absolute top-[60px] left-[15%] right-[15%] h-[2px] z-0 overflow-hidden">
              <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800" />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent"
              />
            </div>

            {[
              {
                step: "01",
                label: "Step 01",
                title: "On-Chain Funding",
                desc: "Send FLR or assets to the ZendIT vault. Our smart contracts verify funding instantly via Flare state connectors.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                step: "02",
                label: "Step 02",
                title: "Orchestration",
                desc: "The ZendIT engine locks in a guaranteed quote and moves the intent through the automated state machine.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                )
              },
              {
                step: "03",
                label: "Step 03",
                title: "Fiat Delivery",
                desc: "Local payout adapters trigger a bank transfer. The receiver gets fiat directly—no crypto knowledge required.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              }
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 flex flex-col items-center group"
              >
                <div className="w-20 h-20 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-lg flex items-center justify-center mb-10 group-hover:border-brand-orange/50 group-hover:shadow-brand-orange/5 transition-all duration-500">
                  <div className="text-zinc-400 group-hover:text-brand-orange transition-colors duration-500">
                    {item.icon}
                  </div>
                </div>
                <div className="text-center px-4">
                  <span className="text-[10px] font-black tracking-[0.2em] text-brand-orange mb-3 block uppercase opacity-70 group-hover:opacity-100 transition-opacity">{item.label}</span>
                  <h3 className="text-xl font-bold mb-4 tracking-tight">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed text-balance font-medium opacity-80">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technical Highlight Card */}
        <section className="w-full max-w-6xl mt-18">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[40px] p-8 md:p-16 border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <ZenditLogo className="w-48 h-12" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Built for Modular Connectivity</h2>
                <div className="space-y-6">
                  {[
                    "Standardized Payout Adapters for global reach",
                    "Stateful transaction management across rails",
                    "Atomic bridging with Flare smart accounts"
                  ].map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-zinc-600 dark:text-zinc-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-widest opacity-50">State: Payout_Initiated</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "30%" }}
                      whileInView={{ width: "85%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-brand-gradient"
                    />
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono opacity-50">QUOTE_ID: ZX-0912</span>
                    <span className="text-xs font-mono text-brand-orange font-bold">1 FLR ≈ 0.023 USD</span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className="h-1 flex-1 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 py-12 px-6 md:mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 grayscale brightness-75 dark:brightness-200">
            <ZenditLogo />
          </div>
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Zendit. Built on Flare.
          </p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <a href="https://x.com/zenditpay?t=1FdVhg0egfBAvboaTKIAoA&s=09" target="_blank" className="hover:text-foreground">Twitter / X</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
