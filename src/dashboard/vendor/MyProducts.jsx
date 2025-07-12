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
      const res = await axiosSecure.get('/vendor/products');
      return res.data;
    }
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/vendor/products/${id}`);
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
    <div>
      <h2 className="text-2xl font-bold mb-6">My Submitted Products</h2>

      {products.length === 0 ? (
        <div className="text-center">No products found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Item</th>
                <th>Market</th>
                <th>Price</th>
                <th>Date</th>
                <th>Status</th>
                <th>Feedback</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, index) => (
                <tr key={p._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={p.image} alt={p.itemName} className="w-12 h-12 rounded" />
                  </td>
                  <td>{p.itemName}</td>
                  <td>{p.marketName}</td>
                  <td>৳{p.pricePerUnit}</td>
                  <td>{p.date}</td>
                  <td>
                    <span
                      className={`badge ${
                        p.status === 'approved'
                          ? 'badge-success'
                          : p.status === 'pending'
                          ? 'badge-warning'
                          : 'badge-error'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td>
                    {p.status === 'rejected' ? (
                      <span className="text-sm text-red-500">{p.rejectionFeedback || 'No reason'}</span>
                    ) : (
                      '--'
                    )}
                  </td>
                  <td className="space-x-2">
                    <Link to={`/dashboard/update-product/${p._id}`} className="btn btn-sm btn-info">
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
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Deletion</h3>
            <p className="py-4">Are you sure you want to delete this product?</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-outline" onClick={() => setDeleteId(null)}>
                  Cancel
                </button>
                <button className="btn btn-error ml-2" onClick={confirmDelete}>
                  Confirm
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyProducts;
