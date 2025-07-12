import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import ReviewCommentSection from '../components/ReviewCommentSection';
import PriceComparisonChart from '../components/PriceComparisonChart';

const DetailsPage = () => {
  const { id } = useParams(); // product ID
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  const handleAddToWatchlist = async () => {
    try {
      const payload = {
        productId: id,
        productName: product?.items?.[0]?.name,
        marketName: product.marketName,
        date: product.date,
      };
      await axiosSecure.post('/user/watchlist', payload);
      toast.success('Added to Watchlist');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to add to watchlist');
    }
  };

  if (isLoading) return <p>Loading product details...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold">{product.marketName} – {product.date}</h2>

      <img src={product.image} alt="Market Product" className="w-full rounded-md shadow-md" />

      {/* Item list */}
      <div>
        <h3 className="text-xl font-semibold mb-2">📋 Items & Prices</h3>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {product.items.map((item, idx) => (
            <li key={idx} className="bg-base-200 p-3 rounded shadow">
              🥕 {item.name} — ৳{item.price}/kg
            </li>
          ))}
        </ul>
      </div>

      {/* Vendor Info */}
      <div className="bg-base-100 p-4 rounded border shadow">
        <p><strong>Vendor:</strong> {product.vendorName || 'N/A'}</p>
        <p><strong>Email:</strong> {product.vendorEmail || 'N/A'}</p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        {user?.role === 'user' && (
          <button onClick={handleAddToWatchlist} className="btn btn-outline btn-accent">
            ➕ Add to Watchlist
          </button>
        )}
        <button className="btn btn-primary" disabled>🛒 Buy Product (Coming Soon)</button>
      </div>

      {/* Review & Comment */}
      <ReviewCommentSection productId={id} />

      {/* Price Comparison Chart */}
      <PriceComparisonChart productId={id} />
    </div>
  );
};

export default DetailsPage;
