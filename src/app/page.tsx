"use client";

import ScannerForm from "@/components/ScannerForm";
import PricingCard from "@/components/PricingCard";
import { Lock, Globe, AlertTriangle } from "lucide-react";

export default function Home() {
  const handlePricingSelect = (plan: "basic" | "premium") => {
    // TODO: Handle selection/scroll to input or payment
    console.log("Selected plan:", plan);
  };

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[20%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="w-full max-w-5xl px-6 pt-24 pb-12 flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6 animate-pulse">
          <AlertTriangle size={14} />
          <span>85% of emails have been breached. Is yours safe?</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
          Digital Footprint <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Scanner</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12">
          Discover what the internet knows about you. Scan for data breaches, dark web mentions, and exposed personal information instantly.
        </p>

        <ScannerForm />
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-6xl px-6 py-20 grid md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-xl border border-white/5">
          <Lock className="w-10 h-10 text-primary mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Breach Monitoring</h3>
          <p className="text-gray-400">Instantly check if your email or passwords have been exposed in known data breaches.</p>
        </div>
        <div className="glass-panel p-6 rounded-xl border border-white/5">
          <Globe className="w-10 h-10 text-secondary mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Dark Web Scan</h3>
          <p className="text-gray-400">Search deep web marketplaces and paste sites for your sensitive information.</p>
        </div>
        <div className="glass-panel p-6 rounded-xl border border-white/5">
          <AlertTriangle className="w-10 h-10 text-accent mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Risk Assessment</h3>
          <p className="text-gray-400">Get a comprehensive risk score and actionable steps to secure your digital identity.</p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full py-20 bg-black/20 backdrop-blur-sm -my-10 pt-32">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Simple, Transparent Pricing</h2>
          <p className="text-gray-400 mt-2">Invest in your digital privacy today.</p>
        </div>
        <PricingCard onSelect={handlePricingSelect} />
      </section>

      {/* Footer */}
      <footer className="w-full py-10 mt-20 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Digital Footprint Scanner. All rights reserved.</p>
      </footer>
    </main>
  );
}
