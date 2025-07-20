import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PriceTrends = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedProductId, setSelectedProductId] = useState(null);

  // ✅ Get user’s watchlist to populate dropdown
  const { data: watchlist = [] } = useQuery({
    queryKey: ['user-watchlist'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/user/watchlist');
      return res.data;
    }
  });

  // ✅ Fetch price trends only when a product is selected
  const { data: trendData = [], isLoading } = useQuery({
    queryKey: ['compare', selectedProductId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/compare?productId=${selectedProductId}`);
      console.log("Fetched price trends:", res.data);
      return res.data?.priceHistory || []; // return only priceHistory array
    },
    enabled: !!selectedProductId // ✅ Prevents fetching until a product is selected
  });

  return (
    <div className="p-6 bg-my-accent shadow-lg rounded-xl">
  {/* ✅ Title */}
  <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-2">
    📈 Price Trend Comparison
  </h2>

  {/* ✅ Product Dropdown */}
  <div className="mb-6">
    <label className="block mb-2 font-medium text-white">
      Select a product to view its price trend:
    </label>
    <select
      className="select select-bordered w-full md:max-w-md focus:outline-none focus:ring-2 focus:ring-my-primary"
      onChange={(e) => setSelectedProductId(e.target.value)}
      defaultValue=""
    >
      <option value="" disabled>
        🔽 Choose a product from your watchlist
      </option>
      {watchlist.map((item) => (
        <option key={item._id} value={item.productId}>
          {item.productName} — {item.marketName}
        </option>
      ))}
    </select>
  </div>

  {/* ✅ Loading State */}
  {isLoading && (
    <div className="text-center py-10 text-gray-500 animate-pulse">
      ⏳ Loading trend data...
    </div>
  )}

  {/* ✅ Chart Section */}
  {!isLoading && trendData.length > 0 && (
    <div className="w-full h-96 bg-my-accent rounded-lg shadow-inner p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={trendData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin - 5", "dataMax + 5"]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#2E7D32" // use your theme green
            strokeWidth={2.5}
            dot={{ r: 4, stroke: "#66BB6A", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )}

  {/* ✅ No data state */}
  {!isLoading && selectedProductId && trendData.length === 0 && (
    <div className="text-center text-gray-500 mt-6 italic">
      🚫 No trend data available for this product.
    </div>
  )}
</div>

  );
};

export default PriceTrends;
