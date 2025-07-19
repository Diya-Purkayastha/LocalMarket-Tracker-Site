import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold text-red-600">❌ Payment Canceled</h1>
      <p className="mt-2">Your payment was canceled. Try again.</p>
      <Link to="/" className="btn btn-primary mt-4">
        Back to Home
      </Link>
    </div>
  );
};

export default PaymentCancelled;
