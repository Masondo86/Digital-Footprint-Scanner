"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ShieldAlert, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ScannerForm() {
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input) return;

        setIsLoading(true);
        // Redirect to scan page with email query param
        router.push(`/scan?email=${encodeURIComponent(input)}`);
    };

    return (
        <div className="w-full max-w-xl mx-auto p-1">
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative group"
            >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative flex items-center bg-card rounded-xl border border-card-border p-2 shadow-2xl">
                    <Search className="w-6 h-6 text-gray-400 ml-3" />
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter email or phone number..."
                        className="w-full bg-transparent border-none text-white px-4 py-3 focus:outline-none focus:ring-0 text-lg placeholder-gray-500"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-gradient-to-r from-primary to-blue-600 text-black font-bold py-3 px-6 rounded-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Scanning..." : (
                            <>
                                Scan Now <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            </motion.form>

            <div className="mt-4 flex justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                    <ShieldAlert className="w-4 h-4 text-primary" />
                    <span>11B+ Records</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span>Live Updates</span>
                </div>
            </div>
        </div>
    );
}
