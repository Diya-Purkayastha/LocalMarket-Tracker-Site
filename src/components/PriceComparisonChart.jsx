// src/pages/Details/PriceComparisonChart.jsx
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const PriceComparisonChart = ({ productId }) => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ['compare', productId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/compare?productId=${productId}`);
      console.log("Fetched reviews:", res.data);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading price trends...</p>;
  if (!data?.priceHistory?.length) return <p>No price history available</p>;

  return (
    <div className="bg-base-100 p-4 mt-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">📊 Price Trend for {data.marketName}</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data.priceHistory}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey="price" unit="৳" />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#ff014f" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceComparisonChart;
