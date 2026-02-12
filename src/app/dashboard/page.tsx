import UnifiedDashboard from "@/components/UnifiedDashboard";

export default function DashboardPage() {
  // Placeholder data (replace with real data from DB/session)
  const external = { score: 68, level: "HIGH" };
  const device = { score: 74, level: "MODERATE" };

  const combinedScore = Math.round(
    external.score * 0.6 + device.score * 0.4
  );

  const combinedLevel =
    combinedScore >= 80
      ? "LOW"
      : combinedScore >= 60
      ? "MODERATE"
      : combinedScore >= 40
      ? "HIGH"
      : "CRITICAL";

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <UnifiedDashboard
        externalScore={external.score}
        externalLevel={external.level}
        deviceScore={device.score}
        deviceLevel={device.level}
        combinedScore={combinedScore}
        combinedLevel={combinedLevel}
      />
    </div>
  );
}
