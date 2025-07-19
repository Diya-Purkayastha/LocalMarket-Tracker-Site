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
    <div>
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Market</th>
              <th>Price</th>
              <th>Status</th>
              <th>Email</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={order._id}>
                <td>{idx + 1}</td>
                <td>{order.productName}</td>
                <td>{order.marketName}</td>
                <td>৳{order.price}</td>
                <td>{order.status}</td>
                <td>{order.userEmail}</td>
                <td>{format(new Date(order.date), 'dd MMM yyyy')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
