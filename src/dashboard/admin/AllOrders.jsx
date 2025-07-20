import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllOrders = () => {
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/admin/orders');
      return res.data;
    }
  });
console.log(orders)
  if (isLoading) return <div className="text-center py-20">Loading orders...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
  {/* Heading */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <h2 className="text-3xl font-extrabold text-my-primary tracking-tight">
      All Orders
    </h2>
  </div>

  {/* ✅ Orders Table */}
  <div className="overflow-x-auto rounded-xl border border-my-primary/20 shadow-md">
    <table className="table-auto w-full">
      <thead className="bg-my-primary/10 text-my-primary uppercase text-sm">
        <tr>
          <th className="p-3 text-left">#</th>
          <th className="p-3 text-left">Product</th>
          <th className="p-3 text-left">Market</th>
          <th className="p-3 text-left">Price</th>
          <th className="p-3 text-left">Status</th>
          <th className="p-3 text-left">Customer</th>
          <th className="p-3 text-left">Date</th>
        </tr>
      </thead>
      <tbody>
        {orders.length === 0 ? (
          <tr>
            <td colSpan="7" className="text-center py-6 text-gray-500">
              📭 No orders found
            </td>
          </tr>
        ) : (
          orders.map((order, idx) => (
            <tr
              key={order._id}
              className="even:bg-gray-50 hover:bg-my-primary/5 transition-colors"
            >
              {/* Serial */}
              <td className="p-3 font-medium">{idx + 1}</td>

              {/* Product Name */}
              <td className="p-3 font-semibold text-gray-800">
                {order.productName}
              </td>

              {/* Market Name */}
              <td className="p-3 text-gray-700">{order.marketName}</td>

              {/* Price */}
              <td className="p-3 font-bold text-my-primary">
                ৳{order.price}
              </td>

              {/* Status */}
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {order.status}
                </span>
              </td>

              {/* Customer Email */}
              <td className="p-3 text-sm text-gray-600">
                {order.userEmail}
              </td>

              {/* Date */}
              <td className="p-3 text-sm text-gray-500">
                {format(new Date(order.date), "dd MMM yyyy")}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default AllOrders;
