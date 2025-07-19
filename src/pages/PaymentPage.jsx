import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ product }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent when page loads
    axiosSecure
      .post("/api/create-payment-intent", {
        productId: product._id,
        productName: product.itemName,
        marketName: product.marketName,
        price: product.pricePerUnit
      })
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch(() => toast.error("Failed to initialize payment"));
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: "Test User",
          email: "test@example.com" // you can use logged-in user email
        }
      }
    });

    if (error) {
      toast.error(error.message);
    } else if (paymentIntent.status === "succeeded") {
      toast.success("✅ Payment Successful!");

      // Save order in DB
      await axiosSecure.post("/api/save-order", {
        productId: product._id,
        productName: product.itemName,
        marketName: product.marketName,
        price: product.pricePerUnit
      });

      navigate("/payment-success");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <CardElement className="border p-4 rounded-md" />
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!stripe || !clientSecret}
      >
        Pay ৳{product.pricePerUnit}
      </button>
    </form>
  );
};

const PaymentPage = () => {
  const location = useLocation();
  const product = location.state?.product; // Coming from DetailsPage
  const navigate = useNavigate();

  if (!product) {
    navigate("/"); // if no product data, go back
    return null;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">💳 Pay for {product.itemName}</h2>
      <p>Market: {product.marketName}</p>
      <p>Price: ৳{product.pricePerUnit}</p>

      <Elements stripe={stripePromise}>
        <CheckoutForm product={product} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
