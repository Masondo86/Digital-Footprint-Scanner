"use client";

import { motion } from "framer-motion";

interface RiskScoreProps {
    score: number; // 0-100
}

export default function RiskScore({ score }: RiskScoreProps) {
    let color = "text-green-500";
    let label = "Low Risk";
    let circleColor = "stroke-green-500";

    if (score > 30) {
        color = "text-yellow-500";
        label = "Medium Risk";
        circleColor = "stroke-yellow-500";
    }
    if (score > 70) {
        color = "text-red-500";
        label = "Critical Risk";
        circleColor = "stroke-red-500";
    }

    const circumference = 2 * Math.PI * 45; // r=45
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center p-6 glass-panel rounded-2xl w-full max-w-[250px]">
            <div className="relative w-32 h-32">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="64"
                        cy="64"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-800"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        cx="64"
                        cy="64"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeLinecap="round"
                        className={circleColor}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <span className={`text-3xl font-bold ${color}`}>{score}</span>
                    <span className="text-xs text-gray-500 uppercase">Score</span>
                </div>
            </div>
            <h3 className={`mt-4 text-lg font-bold ${color}`}>{label}</h3>
        </div>
    );
}
