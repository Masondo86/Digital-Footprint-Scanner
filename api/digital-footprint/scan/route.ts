import { getIPQSPhoneReputation } from '@/app/services/ipqsPhone';
import { checkEmailBreaches } from '@/app/services/hibp';
import { validateEmail } from '@/app/services/email-validation';

export async function POST(req: Request) {
  const { email, phone, deviceLiteData } = await req.json();
  // 1. External scan
  const breach = await checkEmailBreaches(email);
  const emailVal = await validateEmail(email);
  let phoneRisk: any = null;
  if (phone) phoneRisk = await getIPQSPhoneReputation(phone);
  // 2. Device Lite scan (client‑provided data)
  const deviceRisk = deviceLiteData ? evaluateDeviceLite(deviceLiteData) : null;
  // 3. Combined score (external 50%, device 50% if present, else external 100%)
  const externalScore = calculateExternalRiskScore(breach.breaches.length, emailVal.is_valid, phoneRisk?.riskScore);
  const finalScore = deviceLiteData ? (externalScore * 0.5 + deviceRisk.score * 0.5) : externalScore;
  const riskLevel = getRiskLevel(finalScore);
  const recommendations = generateRecommendations(breach, emailVal, phoneRisk, deviceRisk);
  return Response.json({ externalScore, deviceScore: deviceRisk?.score, finalScore, riskLevel, recommendations });
}
