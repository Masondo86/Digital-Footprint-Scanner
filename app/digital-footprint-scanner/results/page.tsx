// app/digital-footprint-scanner/result/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function DigitalFootprintResult() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [scanResult, setScanResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const sessionId = searchParams.get('session_id'); // Stripe returns this

  useEffect(() => {
    if (!sessionId) {
      setError('No payment session found.');
      setLoading(false);
      return;
    }

    const fetchResult = async () => {
      try {
        // Verify payment and run scan
        const res = await fetch('/api/digital-footprint/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        if (res.ok) {
          setScanResult(data);
        } else {
          setError(data.error || 'Failed to fetch scan results.');
        }
      } catch (err) {
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [sessionId]);

  if (loading) return <div className="p-8 text-center">Loading your digital footprint report...</div>;
  if (error) return <div className="p-8 text-center text-red-600">❌ {error}</div>;

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">Your Digital Footprint Report</h1>

      {/* Trust Score */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100 mb-6">
        <h2 className="text-2xl font-bold mb-4">Unified Risk Score</h2>
        <div className="flex items-center gap-6">
          <div className="text-6xl font-extrabold text-indigo-600">{scanResult?.finalScore || 0}</div>
          <div className="text-lg">
            <span className={`px-4 py-2 rounded-full text-white font-semibold ${
              scanResult?.riskLevel === 'Critical' ? 'bg-red-600' :
              scanResult?.riskLevel === 'High' ? 'bg-orange-500' :
              scanResult?.riskLevel === 'Medium' ? 'bg-yellow-500' :
              'bg-green-500'
            }`}>
              {scanResult?.riskLevel || 'Low'}
            </span>
          </div>
        </div>
      </div>

      {/* External Scan Results */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100 mb-6">
        <h2 className="text-2xl font-bold mb-4">🔍 External Exposure</h2>
        <div className="space-y-3">
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span>Breaches found</span>
            <span className="font-semibold">{scanResult?.breaches?.length || 0}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span>Email valid</span>
            <span className="font-semibold">{scanResult?.emailValid ? '✅' : '❌'}</span>
          </div>
          <div className="flex justify-between">
            <span>Phone reputation</span>
            <span className="font-semibold">{scanResult?.phoneRisk || 'N/A'}</span>
          </div>
          {scanResult?.breaches?.length > 0 && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="font-semibold text-red-700">Breaches detected:</p>
              <ul className="list-disc pl-5 mt-2 text-red-600 text-sm">
                {scanResult.breaches.slice(0, 5).map((b: string) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Device Scan Results (if full scan) */}
      {scanResult?.deviceScore !== undefined && (
        <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100 mb-6">
          <h2 className="text-2xl font-bold mb-4">💻 Device Security</h2>
          <div className="flex items-center gap-6 mb-4">
            <div className="text-4xl font-extrabold text-purple-600">{scanResult.deviceScore}</div>
            <div className="text-lg">{scanResult.deviceRiskLevel}</div>
          </div>
          {scanResult?.deviceIssues?.map((issue: string, idx: number) => (
            <div key={idx} className="text-sm text-slate-600 mb-1">• {issue}</div>
          ))}
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
        <h2 className="text-xl font-bold text-indigo-800 mb-3">📋 Recommended Actions</h2>
        <ul className="list-disc pl-5 space-y-2 text-slate-700">
          {scanResult?.recommendations?.map((rec: string, idx: number) => (
            <li key={idx}>{rec}</li>
          )) || (
            <>
              <li>Enable two-factor authentication on your email.</li>
              <li>Use a password manager to generate unique passwords.</li>
              <li>Regularly check for data breaches using our scanner.</li>
            </>
          )}
        </ul>
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-indigo-600 hover:underline">← Back to Home</Link>
      </div>
    </main>
  );
}
