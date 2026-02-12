import { NextRequest, NextResponse } from "next/server";
import { scoreDeviceLite } from "@/lib/riskEngine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      browser,
      securitySignals,
    } = body;

    if (!browser || !securitySignals) {
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 }
      );
    }

    const risk = scoreDeviceLite({
      browserVersion: parseInt(browser.version),
      isHttps: securitySignals.https,
      webauthnSupported: securitySignals.webauthnSupported,
      thirdPartyCookiesEnabled:
        securitySignals.thirdPartyCookiesEnabled,
      referrerPolicySecure:
        securitySignals.referrerPolicySecure,
    });

    return NextResponse.json({
      scanId: `lite_${Date.now()}`,
      riskScore: risk.score,
      riskLevel: risk.level,
    });
  } catch (error) {
    console.error("Device Lite Scan Error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
