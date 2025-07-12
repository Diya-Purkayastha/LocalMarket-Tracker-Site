import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PriceTrends = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Get user’s watchlist to populate dropdown
  const { data: watchlist = [] } = useQuery({
    queryKey: ['user-watchlist'],
    queryFn: async () => {
      const res = await axiosSecure.get('/user/watchlist');
      return res.data;
    }
  });

  // Fetch price trends for selected product
  const { data: trendData = [], isLoading } = useQuery({
    queryKey: ['price-trends', selectedProductId],
    enabled: !!selectedProductId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/price-trends/${selectedProductId}`);
      return res.data;
    }
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📈 Price Trend Comparison</h2>

      {/* Dropdown */}
      <div className="mb-6">
        <label className="block mb-1 font-medium">Select Product:</label>
        <select
          className="select select-bordered w-full max-w-md"
          onChange={(e) => setSelectedProductId(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>Select a product</option>
          {watchlist.map((item) => (
            <option key={item._id} value={item.productId}>
              {item.productName} — {item.marketName}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      {isLoading && <p>Loading trend data...</p>}

      {!isLoading && trendData.length > 0 && (
        <div className="w-full h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#ff014f" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {!isLoading && selectedProductId && trendData.length === 0 && (
        <p className="text-gray-500 mt-4">No trend data available for this product.</p>
      )}
    </div>
  );
};

export default PriceTrends;
