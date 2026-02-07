"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import RiskScore from "@/components/RiskScore";
import BreachResult from "@/components/BreachResult";
import { Loader2, ArrowLeft, Download, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ScanContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (!email) {
            setError("No email provided.");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const res = await axios.post("/api/scan", { email });
                setData(res.data);
            } catch (err) {
                setError("Failed to fetch scan results.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [email]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
                <h2 className="text-xl text-white font-medium animate-pulse">Scanning digital footprint...</h2>
                <p className="text-gray-500 mt-2">Searching 11 billion records</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="text-red-500 text-6xl mb-4">:(</div>
                <h2 className="text-2xl text-white font-bold mb-2">{error || "Something went wrong"}</h2>
                <Link href="/" className="text-primary hover:underline flex items-center gap-2 mt-4">
                    <ArrowLeft size={16} /> Go Back
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Search
            </Link>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Sidebar / Summary */}
                <div className="md:col-span-1 space-y-6">
                    <div className="glass-panel p-6 rounded-2xl border border-white/5">
                        <h2 className="text-gray-400 text-sm uppercase font-semibold tracking-wider mb-6">Risk Assessment</h2>
                        <div className="flex justify-center mb-6">
                            <RiskScore score={data.riskScore} />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-800">
                                <span className="text-gray-400">Target</span>
                                <span className="text-white font-mono text-sm">{data.email}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-800">
                                <span className="text-gray-400">Breaches Found</span>
                                <span className="text-white font-bold">{data.breachCount}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-800">
                                <span className="text-gray-400">Data Sources</span>
                                <span className="text-white">HIBP (Mock)</span>
                            </div>
                        </div>

                        <button className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-all">
                            <Download size={18} /> Download Report
                        </button>
                    </div>

                    {/* CTA */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20">
                        <h3 className="text-white font-bold text-lg mb-2">Upgrade to Full Scan</h3>
                        <p className="text-gray-300 text-sm mb-4">Unlock phone number exposure, detailed dark web analysis, and removal assistance.</p>
                        <button className="w-full py-2 bg-primary text-black font-bold rounded-lg hover:shadow-lg transition-all">
                            Get Full Protection (R59)
                        </button>
                    </div>
                </div>

                {/* Results List */}
                <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <ShieldCheck className="text-primary" /> Scan Results
                    </h2>

                    {data.breaches.length === 0 ? (
                        <div className="glass-panel p-12 rounded-2xl text-center border border-green-500/20">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShieldCheck className="w-10 h-10 text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Good News!</h3>
                            <p className="text-gray-400">We didn't find your email in any known data breaches.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {data.breaches.map((breach: any) => (
                                <BreachResult key={breach.Name} breach={breach} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ScanPage() {
    return (
        <Suspense fallback={<div className="text-white text-center p-20">Loading...</div>}>
            <ScanContent />
        </Suspense>
    );
}
