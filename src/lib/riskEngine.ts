// src/lib/riskEngine.ts

export type RiskLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

export interface RiskResult {
  score: number;
  level: RiskLevel;
}

export interface DeviceLiteInput {
  browserVersion: number;
  isHttps: boolean;
  webauthnSupported: boolean;
  thirdPartyCookiesEnabled: boolean;
  referrerPolicySecure: boolean;
}

export interface ExternalInput {
  breachCount: number;
  highSeverityBreaches: number;
  emailValid: boolean;
  phoneValid?: boolean;
}

// -------------------------
// Risk Level Mapper
// -------------------------

export function mapRiskLevel(score: number): RiskLevel {
  if (score >= 80) return "LOW";
  if (score >= 60) return "MODERATE";
  if (score >= 40) return "HIGH";
  return "CRITICAL";
}

// -------------------------
// Device Lite Scoring
// -------------------------

export function scoreDeviceLite(input: DeviceLiteInput): RiskResult {
  let score = 100;

  // Browser outdated (example threshold)
  if (input.browserVersion < 120) score -= 15;

  if (!input.isHttps) score -= 20;
  if (!input.webauthnSupported) score -= 10;
  if (input.thirdPartyCookiesEnabled) score -= 5;
  if (!input.referrerPolicySecure) score -= 10;

  score = Math.max(score, 0);

  return {
    score,
    level: mapRiskLevel(score),
  };
}

// -------------------------
// External Scan Scoring
// -------------------------

export function scoreExternal(input: ExternalInput): RiskResult {
  let score = 100;

  score -= input.breachCount * 8;
  score -= input.highSeverityBreaches * 12;

  if (!input.emailValid) score -= 10;
  if (input.phoneValid === false) score -= 5;

  score = Math.max(score, 0);

  return {
    score,
    level: mapRiskLevel(score),
  };
}

// -------------------------
// Combined Risk
// -------------------------

export function combineRisk(
  external?: RiskResult,
  deviceLite?: RiskResult
): RiskResult {
  if (!external && !deviceLite) {
    return { score: 0, level: "CRITICAL" };
  }

  if (external && !deviceLite) return external;
  if (!external && deviceLite) return deviceLite;

  const combinedScore =
    external!.score * 0.6 +
    deviceLite!.score * 0.4;

  return {
    score: Math.round(combinedScore),
    level: mapRiskLevel(Math.round(combinedScore)),
  };
}
