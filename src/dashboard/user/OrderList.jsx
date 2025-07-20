import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { format } from 'date-fns';

const OrderList = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['user-orders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/user/orders');
      return res.data;
    }
  });

  if (isLoading) return <div className="text-center py-20">Loading orders...</div>;

  return (
    <div className="mt-5">
  <h2 className="text-3xl font-bold text-my-primary mb-6 flex items-center gap-2">
    🛒 My Orders
  </h2>

  {orders.length === 0 ? (
    <p className="text-gray-500 italic">
      No orders found. Try buying some products!
    </p>
  ) : (
    <div className="overflow-x-auto shadow-lg rounded-xl bg-base-100">
      <table className="table w-full">
        {/* ✅ Table Header */}
        <thead className="bg-my-primary text-white text-sm uppercase">
          <tr>
            <th className="rounded-tl-xl">#</th>
            <th>Product</th>
            <th>Market</th>
            <th>Price</th>
            <th>Date</th>
            <th className="text-center">Details</th>
          </tr>
        </thead>

        {/* ✅ Table Body */}
        <tbody>
          {orders.map((order, idx) => (
            <tr
              key={order._id}
              className="hover:bg-my-neutral transition duration-200"
            >
              {/* Order Index */}
              <td className="font-semibold">{idx + 1}</td>

              {/* Product Name */}
              <td className="font-medium text-my-primary">
                {order.productName}
              </td>

              {/* Market Badge */}
              <td>
                <span className="badge badge-outline badge-accent text-xs">
                  {order.marketName}
                </span>
              </td>

              {/* Price Highlight */}
              <td className="font-bold text-my-secondary">
                ৳{order.price}
              </td>

              {/* Date Badge */}
              <td>
                <span className="badge badge-outline badge-secondary text-xs">
                  {format(new Date(order.date), "dd MMM yyyy")}
                </span>
              </td>

              {/* View Details Button */}
              <td className="text-center">
                <button
                  className="btn btn-sm bg-my-primary text-white hover:btn-accent"
                  onClick={() => navigate(`/details/${order.productId}`)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

  );
};

export default OrderList;
