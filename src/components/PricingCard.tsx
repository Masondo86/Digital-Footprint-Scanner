"use client";

import { Check, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";

interface PricingProps {
    onSelect: (plan: "basic" | "premium") => void;
}

export default function PricingCard({ onSelect }: PricingProps) {
    return (
        <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto px-4">
            {/* Basic Plan */}
            <motion.div
                whileHover={{ y: -5 }}
                className="glass-panel p-8 rounded-2xl border border-white/5 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Zap size={100} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Email Exposure</h3>
                <div className="text-4xl font-black text-primary mb-6">
                    R29 <span className="text-sm font-normal text-gray-400">/ scan</span>
                </div>

                <ul className="space-y-4 mb-8 text-gray-300">
                    <li className="flex gap-3">
                        <Check className="text-primary w-5 h-5" /> Have I Been Pwned check
                    </li>
                    <li className="flex gap-3">
                        <Check className="text-primary w-5 h-5" /> Email validity check
                    </li>
                    <li className="flex gap-3">
                        <Check className="text-primary w-5 h-5" /> Domain reputation
                    </li>
                    <li className="flex gap-3">
                        <Check className="text-primary w-5 h-5" /> Basic Risk Score
                    </li>
                </ul>

                <button
                    onClick={() => onSelect("basic")}
                    className="w-full py-3 rounded-xl border border-primary/30 hover:bg-primary/10 text-primary font-semibold transition-colors"
                >
                    Select Basic
                </button>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
                whileHover={{ y: -5 }}
                className="glass-panel p-8 rounded-2xl border border-primary/50 relative overflow-hidden bg-primary/5"
            >
                <div className="absolute top-0 right-0 bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-bl-xl">
                    RECOMMENDED
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Shield size={100} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">Full Identity</h3>
                <div className="text-4xl font-black text-white mb-6">
                    R59 <span className="text-sm font-normal text-gray-400">/ scan</span>
                </div>

                <ul className="space-y-4 mb-8 text-gray-300">
                    <li className="flex gap-3">
                        <Check className="text-secondary w-5 h-5" /> <strong>All Email Checks</strong>
                    </li>
                    <li className="flex gap-3">
                        <Check className="text-secondary w-5 h-5" /> Phone Number exposure
                    </li>
                    <li className="flex gap-3">
                        <Check className="text-secondary w-5 h-5" /> Social Media profiles
                    </li>
                    <li className="flex gap-3">
                        <Check className="text-secondary w-5 h-5" /> Detailed PDF Report
                    </li>
                    <li className="flex gap-3">
                        <Check className="text-secondary w-5 h-5" /> Actionable Mitigation Steps
                    </li>
                </ul>

                <button
                    onClick={() => onSelect("premium")}
                    className="w-full py-3 rounded-xl bg-primary text-black font-bold shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-shadow"
                >
                    Start Full Scan
                </button>
            </motion.div>
        </div>
    );
}
