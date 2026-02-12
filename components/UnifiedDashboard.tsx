"use client";

interface RiskBlockProps {
  title: string;
  score: number;
  level: string;
}

function RiskBlock({ title, score, level }: RiskBlockProps) {
  const color =
    level === "LOW"
      ? "text-green-600"
      : level === "MODERATE"
      ? "text-yellow-600"
      : level === "HIGH"
      ? "text-orange-600"
      : "text-red-600";

  return (
    <div className="border rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className={`text-3xl font-bold ${color}`}>
        {score}
      </p>
      <p className="text-sm text-gray-500">
        Risk Level: {level}
      </p>
    </div>
  );
}

interface DashboardProps {
  externalScore?: number;
  externalLevel?: string;
  deviceScore?: number;
  deviceLevel?: string;
  combinedScore: number;
  combinedLevel: string;
}

export default function UnifiedDashboard({
  externalScore,
  externalLevel,
  deviceScore,
  deviceLevel,
  combinedScore,
  combinedLevel,
}: DashboardProps) {
  return (
    <div className="space-y-8">
      {/* Overall Score */}
      <div className="border rounded-2xl p-8 text-center shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          Overall Digital Risk Score
        </h2>
        <p className="text-5xl font-bold mb-2">
          {combinedScore}
        </p>
        <p className="text-lg text-gray-600">
          {combinedLevel}
        </p>
      </div>

      {/* Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        {externalScore !== undefined && (
          <RiskBlock
            title="External Exposure"
            score={externalScore}
            level={externalLevel!}
          />
        )}

        {deviceScore !== undefined && (
          <RiskBlock
            title="Device Security"
            score={deviceScore}
            level={deviceLevel!}
          />
        )}
      </div>

      {/* Upsell */}
      <div className="border rounded-xl p-6 bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">
          Protect Yourself
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Reduce your fraud and identity risk with
          Digital Risk Protection.
        </p>
        <button className="bg-black text-white px-6 py-2 rounded-lg">
          Activate Protection
        </button>
      </div>
    </div>
  );
}
