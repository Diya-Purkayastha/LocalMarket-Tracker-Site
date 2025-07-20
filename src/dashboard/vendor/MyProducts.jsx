import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Link } from 'react-router';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const MyProducts = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [deleteId, setDeleteId] = useState(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['my-products'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/vendor/products');
      return res.data;
    }
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/api/vendor/products/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Product deleted!');
      queryClient.invalidateQueries(['my-products']);
    },
    onError: () => toast.error('Failed to delete product'),
  });

  const confirmDelete = () => {
    mutation.mutate(deleteId);
    setDeleteId(null);
  };

  if (isLoading) return <div className="text-center py-20">Loading your products...</div>;

  return (

<div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-my-primary/30">
  <h2 className="text-3xl font-extrabold text-my-primary mb-8 border-b-2 border-my-primary pb-3">
    My Submitted Products
  </h2>

  {products.length === 0 ? (
    <div className="text-center text-my-primary text-lg font-semibold py-20">
      No products found.
    </div>
  ) : (
    <div className="overflow-x-auto rounded-lg border border-my-primary/20 shadow-sm">
      <table className="table w-full table-auto border-collapse">
        <thead className="bg-my-primary/10 text-my-primary">
          <tr>
            <th className="p-3 text-left font-semibold">#</th>
            <th className="p-3 font-semibold">Image</th>
            <th className="p-3 text-left font-semibold">Item</th>
            <th className="p-3 text-left font-semibold">Market</th>
            <th className="p-3 text-right font-semibold">Price</th>
            <th className="p-3 text-center font-semibold">Date</th>
            <th className="p-3 text-center font-semibold">Status</th>
            <th className="p-3 text-left font-semibold">Feedback</th>
            <th className="p-3 text-center font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr
              key={p._id}
              className="even:bg-my-primary/5 hover:bg-my-primary/20 transition-colors"
            >
              <td className="p-3">{index + 1}</td>
              <td className="p-3">
                <img
                  src={p.image}
                  alt={p.itemName}
                  className="w-14 h-14 rounded-lg object-cover border border-my-primary/30 shadow-sm"
                />
              </td>
              <td className="p-3">{p.itemName}</td>
              <td className="p-3">{p.marketName}</td>
              <td className="p-3 text-right font-medium">৳{p.pricePerUnit}</td>
              <td className="p-3 text-center">{p.date}</td>
              <td className="p-3 text-center">
                <span
                  className={`badge ${
                    p.status === "approved"
                      ? "badge-success"
                      : p.status === "pending"
                      ? "badge-warning"
                      : "badge-error"
                  } capitalize px-3 py-1 text-sm font-semibold`}
                >
                  {p.status}
                </span>
              </td>
              <td className="p-3 text-sm text-red-600 max-w-xs">
                {p.status === "rejected"
                  ? p.rejectionFeedback || "No reason provided"
                  : "--"}
              </td>
              <td className="p-3 text-center space-x-2 whitespace-nowrap">
                <Link
                  to={`/dashboard/update-product/${p._id}`}
                  className="btn btn-sm bg-my-primary hover:bg-my-primary-dark text-white transition"
                >
                  Update
                </Link>
                <button
                  onClick={() => setDeleteId(p._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {/* Delete Confirmation Modal */}
  {deleteId && (
    <dialog className="modal modal-open">
      <div className="modal-box rounded-lg border border-my-primary/50 shadow-lg">
        <h3 className="font-bold text-xl text-my-primary">Confirm Deletion</h3>
        <p className="py-4 text-my-primary/90">
          Are you sure you want to delete this product?
        </p>
        <div className="modal-action flex justify-end gap-4">
          <button
            className="btn btn-outline border-my-primary text-my-primary hover:bg-my-primary hover:text-white transition"
            onClick={() => setDeleteId(null)}
          >
            Cancel
          </button>
          <button
            className="btn btn-error"
            onClick={confirmDelete}
          >
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  )}
</div>

  );
};

export default MyProducts;
