import { Link } from "react-router";

const PaymentSuccess = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold text-green-600">✅ Payment Successful!</h1>
      <p className="mt-2">Your order has been placed successfully.</p>
      <Link to="/dashboard/orders" className="btn btn-primary mt-4">
        View My Orders
      </Link>
    </div>
  );
};

export default PaymentSuccess;
