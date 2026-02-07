import { NextResponse } from "next/server";
import axios from "axios";

// Mock Data for demonstration if API Key is missing
const MOCK_BREACHES = [
    {
        Name: "LinkedIn",
        Title: "LinkedIn",
        Domain: "linkedin.com",
        BreachDate: "2016-05-17",
        AddedDate: "2016-05-21T21:35:40Z",
        Description: "In May 2016, LinkedIn had 164 million email addresses and passwords exposed.",
        DataClasses: ["Email addresses", "Passwords"],
        IsVerified: true,
        IsFabricated: false,
        IsSensitive: false,
        IsRetired: false,
        IsSpamList: false,
        LogoPath: "https://haveibeenpwned.com/Content/Images/PwnedLogos/LinkedIn.png"
    },
    {
        Name: "Adobe",
        Title: "Adobe",
        Domain: "adobe.com",
        BreachDate: "2013-10-04",
        AddedDate: "2013-12-04T00:00:00Z",
        Description: "In October 2013, 153 million Adobe accounts were breached.",
        DataClasses: ["Email addresses", "Password hints", "Passwords", "Usernames"],
        IsVerified: true,
        IsFabricated: false,
        IsSensitive: false,
        IsRetired: false,
        IsSpamList: false,
        LogoPath: "https://haveibeenpwned.com/Content/Images/PwnedLogos/Adobe.png"
    }
];

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes("@")) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            );
        }

        // 1. Check for API Key
        const hibpApiKey = process.env.HIBP_API_KEY;

        let breachData = [];

        if (hibpApiKey) {
            // Real API Call
            try {
                const response = await axios.get(
                    `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}?truncateResponse=false`,
                    {
                        headers: {
                            "hibp-api-key": hibpApiKey,
                            "user-agent": "DigitalFootprintScanner/1.0",
                        },
                    }
                );
                breachData = response.data;
            } catch (error: any) {
                if (error.response && error.response.status === 404) {
                    // No breaches found
                    breachData = [];
                } else {
                    console.error("HIBP API Error:", error.message);
                    // Fallback or re-throw? For MVP, fallback to empty or error.
                    return NextResponse.json(
                        { error: "Failed to scan email. Please try again later." },
                        { status: 502 }
                    );
                }
            }
        } else {
            // Mock Mode
            console.log("Using Mock Data for", email);
            // Simulate network delay
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Randomly decide if pwned for demo purposes, or hardcode specific emails
            if (email.toLowerCase().includes("safe")) {
                breachData = [];
            } else {
                breachData = MOCK_BREACHES;
            }
        }

        // 2. Check Hunter.io (Email Verification)
        const hunterApiKey = process.env.HUNTER_API_KEY;
        let verificationData = null;

        if (hunterApiKey) {
            // Real API Call
            try {
                const response = await axios.get(
                    `https://api.hunter.io/v2/email-verifier?email=${encodeURIComponent(email)}&api_key=${hunterApiKey}`
                );
                verificationData = response.data?.data;
            } catch (error) {
                console.error("Hunter.io Error:", error);
                // Fallback for demo
                verificationData = { status: "unknown", score: 50 };
            }
        } else {
            // Mock Data
            verificationData = {
                result: "deliverable",
                score: 95,
                user: email.split("@")[0],
                domain: email.split("@")[1],
                mx_records: true,
                smtp_server: true,
                smtp_check: true,
                accept_all: false,
                webmail: false,
                disposable: false,
                sources: []
            };
        }

        // Calculate Risk Score (Improved Logic)
        const riskScore = calculateRiskScore(breachData, verificationData);

        return NextResponse.json({
            email,
            breaches: breachData,
            breachCount: breachData.length,
            verification: verificationData,
            riskScore,
        });

    } catch (error) {
        console.error("Scan Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

function calculateRiskScore(breaches: any[], verification: any) {
    let score = 0;

    if (breaches.length > 0) score += 20;
    score += breaches.length * 10; // 10 points per breach

    // Verification risks
    if (verification) {
        if (verification.disposable) score += 30; // High risk for disposable
        if (verification.result === "undeliverable") score += 10; // Suspicious?
        if (verification.score < 50) score += 10; // Low quality email
    }

    // Cap at 100
    return Math.min(score, 100);
}
