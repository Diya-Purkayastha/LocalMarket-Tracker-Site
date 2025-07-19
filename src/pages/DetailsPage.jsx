import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ReviewCommentSection from "../components/ReviewCommentSection";
import PriceComparisonChart from "../components/PriceComparisonChart";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import useAxiosSecure from "../hooks/useAxiosSecure";

const DetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axios = useAxios();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()

  // ✅ Fetch single product
  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(`/api/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isError) {
    console.error("Product fetch error:", error);
    return <p>❌ Failed to load product: {error.message}</p>;
  }

  const handleAddToWatchlist = async () => {
    if (!product) return;
    try {
      const payload = {
        productId: id,
        productName: product.itemName,
        marketName: product.marketName,
        date: product.date,
      };
      await axiosSecure.post("/api/user/watchlist", payload);
      toast.success("✅ Added to Watchlist");
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message || "❌ Failed to add to watchlist");
    }
  };

  const handleBuyProduct = () => {
  navigate("/payment", { state: { product } });
};


  if (isLoading) return <p>⏳ Loading product details...</p>;
  if (isError) return <p>❌ Failed to load product </p>;
  if (!product) return <p>⚠️ No product found</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* ✅ Market Info */}
      <h2 className="text-2xl font-bold">
        🏪 {product.marketName} – {product.date}
      </h2>
      <p className="text-gray-500">{product.marketDescription}</p>

      {/* ✅ Product Image */}
      <img
        src={product.image}
        alt={product.itemName}
        className="w-full rounded-md shadow-md"
      />

      {/* ✅ Single Item Details */}
      <div className="bg-base-200 p-4 rounded shadow">
        <h3 className="text-xl font-semibold">{product.itemName}</h3>
        <p className="text-sm text-gray-700">{product.itemDescription}</p>
        <p className="text-lg font-bold mt-2">
          💰 Price: ৳{product.pricePerUnit}/kg
        </p>
      </div>

      {/* ✅ Vendor Info */}
      <div className="bg-base-100 p-4 rounded border shadow">
        <p>
          <strong>Vendor:</strong> {product.vendorName || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {product.vendorEmail || "N/A"}
        </p>
      </div>

      {/* ✅ Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {user && (
          <button
            onClick={handleAddToWatchlist}
            className="btn btn-outline btn-accent"
            disabled={ !user?.role ||  user?.role === "admin" || user?.role === "vendor"} // ✅ disable for admin/vendor
          >
            ➕ Add to Watchlist
          </button>
        )}
        <button
          className="btn btn-primary"
          onClick={handleBuyProduct}
        >
          🛒 Buy Product
        </button>
      </div>

      {/* ✅ Price History Chart (optional) */}
      {/* {product.prices && product.prices.length > 0 && ( */}
      <PriceComparisonChart productId={id} />
      {/* )} */}

      {/* ✅ Review & Comment Section */}
      <ReviewCommentSection productId={id} />
    </div>
  );
};

export default DetailsPage;
