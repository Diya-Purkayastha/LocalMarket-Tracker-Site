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
    <div className="max-w-7xl mx-auto p-4 space-y-10">
  {/* ✅ Market Info */}
  <div className="text-center md:text-left space-y-2">
    <h2 className="text-3xl font-bold text-my-primary">
      🏪 {product.marketName} – <span className="text-gray-700">{product.date}</span>
    </h2>
    <p className="text-gray-500 max-w-2xl">{product.marketDescription}</p>
  </div>

  {/* ✅ Main Product Section */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
    {/* ✅ Product Image */}
    <div className="w-full">
      <img
        src={product.image}
        alt={product.itemName}
        className="w-full h-auto max-h-[400px] object-cover rounded-xl shadow-md"
      />
    </div>

    {/* ✅ Product Details */}
    <div className="space-y-6">
      {/* Product Card */}
      <div className="bg-base-200 p-6 rounded-xl shadow-md">
        <h3 className="text-2xl font-semibold text-my-secondary">
          {product.itemName}
        </h3>
        <p className="text-gray-600 mt-2">{product.itemDescription}</p>
        <p className="text-2xl font-bold mt-4 text-my-primary">
          💰 ৳{product.pricePerUnit} <span className="text-base">/kg</span>
        </p>
      </div>

      {/* Vendor Info Card */}
      <div className="bg-base-100 p-6 rounded-xl border shadow-sm space-y-2">
        <h4 className="text-lg font-semibold text-my-secondary">Vendor Info</h4>
        <p>
          <strong>Name:</strong> {product.vendorName || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {product.vendorEmail || "N/A"}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {user && (
          <button
            onClick={handleAddToWatchlist}
            className="btn btn-outline btn-my-accent"
            disabled={
              !user?.role ||
              user?.role === "admin" ||
              user?.role === "vendor"
            }
          >
            ➕ Add to Watchlist
          </button>
        )}
        <button className="btn bg-my-primary text-white" onClick={handleBuyProduct}>
          🛒 Buy Product
        </button>
      </div>
    </div>
  </div>

  {/* Divider */}
  <div className="border-t border-gray-200 my-6"></div>

  {/* ✅ Price History Chart */}
  <div>
    <h3 className="text-2xl font-bold mb-4 text-my-primary">Price History</h3>
    <PriceComparisonChart productId={id} />
  </div>

  {/* ✅ Review Section */}
  <div>
    <h3 className="text-2xl font-bold mb-4 text-my-primary">Reviews & Comments</h3>
    <ReviewCommentSection productId={id} />
  </div>
</div>

  );
};

export default DetailsPage;
