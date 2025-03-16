import { useEffect } from 'react';

export default function PiPayment({ amount, jobId, workerId }) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.Pi) {
      Pi.createPayment({
        amount: amount,
        memo: `Payment for job #${jobId}`,
        metadata: { jobId, workerId },
      }, {
        onReadyForServerApproval(paymentId) {
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/approve`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId, jobId }),
          });
        },
        onReadyForServerCompletion(paymentId, txid) {
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/complete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId, txid }),
          });
        },
        onCancel(paymentId) {
          console.log('Payment cancelled:', paymentId);
        },
        onError(error, payment) {
          console.error('Payment error:', error);
        }
      });
    } else {
      console.error("❌ Pi SDK not loaded correctly for payments.");
    }
  }, [amount, jobId, workerId]);

  return <div>Pi Payment Initialized...</div>;
}
