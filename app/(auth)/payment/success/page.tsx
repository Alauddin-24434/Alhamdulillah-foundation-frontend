// app/payment/success/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const PaymentSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tranId = searchParams.get('tranId');
  const amount = searchParams.get('amount');
  const messageParam = searchParams.get('message');

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (messageParam) {
      setMessage(decodeURIComponent(messageParam));
    }
  }, [messageParam]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Payment Successful ✅</h1>

        <p className="text-gray-700 mb-2">
          <strong>Transaction ID:</strong> {tranId}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Amount Paid:</strong> {amount} BDT
        </p>
        <p className="text-gray-700 mb-6">{message}</p>

        <button
          onClick={() => router.push('/dashboard')}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
