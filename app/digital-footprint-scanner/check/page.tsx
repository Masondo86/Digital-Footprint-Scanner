'use client';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function DigitalFootprintCheck() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [scanType, setScanType] = useState<'email' | 'full'>('email');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    const priceId = scanType === 'email' ? 'price_R29' : 'price_R59';
    const res = await fetch('/api/digital-footprint/payment-intent', {
      method: 'POST',
      body: JSON.stringify({ priceId }),
      headers: { 'Content-Type': 'application/json' },
    });
    const { clientSecret } = await res.json();
    const stripe = await stripePromise;
    const { error } = await stripe!.confirmPayment({
      elements: stripe!.elements({ clientSecret }),
      confirmParams: { return_url: `${window.location.origin}/digital-footprint-scanner/result` },
    });
    if (error) alert(error.message);
    setLoading(false);
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1>Digital Footprint Scanner</h1>
      <input type="email" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} />
      {scanType === 'full' && <input type="tel" placeholder="Phone (optional)" value={phone} onChange={e => setPhone(e.target.value)} />}
      <div className="flex gap-4 my-4">
        <button onClick={() => setScanType('email')} className={scanType === 'email' ? 'bg-indigo-600' : 'bg-gray-600'}>Email Scan – R29</button>
        <button onClick={() => setScanType('full')} className={scanType === 'full' ? 'bg-indigo-600' : 'bg-gray-600'}>Full Scan – R59</button>
      </div>
      <button onClick={handlePayment} disabled={loading || !email} className="bg-green-600 px-6 py-3 rounded">
        {loading ? 'Processing...' : `Pay R${scanType === 'email' ? '29' : '59'} with Stripe`}
      </button>
      <div className="mt-6 text-sm text-slate-500">
        <p>✅ Privacy first: we never store your email or phone number.</p>
        <p>🔍 External scan: checks your email in known data breaches and validates deliverability.</p>
        <p>📱 Full scan adds device security audit (browser config, HTTPS, etc.) and phone reputation.</p>
      </div>
    </main>
  );
}
