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
    <div>
      <h2 className="text-2xl font-bold mb-6">🛒 My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found. Try buying some products!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Market</th>
                <th>Price</th>
                <th>Date</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={order._id}>
                  <td>{idx + 1}</td>
                  <td>{order.productName}</td>
                  <td>{order.marketName}</td>
                  <td>৳{order.price}</td>
                  <td>{format(new Date(order.date), 'dd MMM yyyy')}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline"
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
