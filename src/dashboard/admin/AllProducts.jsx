import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [rejectionModal, setRejectionModal] = useState(null);
  const [feedback, setFeedback] = useState('');

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/admin/products');
      return res.data;
    }
  });

  const approveMutation = useMutation({
    mutationFn: async (id) =>
      await axiosSecure.patch(`/api/admin/products/${id}`, { status: 'approved' }),
    onSuccess: () => {
      toast.success('Product approved');
      queryClient.invalidateQueries(['admin-products']);
    }
  });

  const rejectMutation = useMutation({
    mutationFn: async ({ id, feedback }) =>
      await axiosSecure.patch(`/api/admin/products/${id}/rejection`, { feedback }),
    onSuccess: () => {
      toast.success('Product rejected with feedback');
      setRejectionModal(null);
      setFeedback('');
      queryClient.invalidateQueries(['admin-products']);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/api/admin/products/${id}`),
    onSuccess: () => {
      toast.success('Product deleted');
      queryClient.invalidateQueries(['admin-products']);
    }
  });
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This product will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
        Swal.fire('Deleted!', 'The product has been removed.', 'success');
      }
    });
  };

  if (isLoading) return <div className="text-center py-20">Loading products...</div>;

  return (
   <div className="p-6 max-w-7xl mx-auto space-y-6">
  {/* Heading */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <h2 className="text-3xl font-extrabold text-my-primary tracking-tight">
      All Products
    </h2>
  </div>

  {/* ✅ Products Table */}
  <div className="overflow-x-auto rounded-xl border border-my-primary/20 shadow-md">
    <table className="table-auto w-full">
      <thead className="bg-my-primary/10 text-my-primary">
        <tr>
          <th className="p-3 text-left">Product</th>
          <th className="p-3 text-left">Market</th>
          <th className="p-3 text-left">Vendor</th>
          <th className="p-3 text-left">Price</th>
          <th className="p-3 text-left">Date</th>
          <th className="p-3 text-left">Status</th>
          <th className="p-3 text-left">Feedback</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan="8" className="text-center py-6 text-gray-500">
              🚫 No products found
            </td>
          </tr>
        ) : (
          products.map((p) => (
            <tr
              key={p._id}
              className="even:bg-gray-50 hover:bg-my-primary/5 transition-colors"
            >
              {/* Product */}
              <td className="p-3">
                <div className="flex items-center gap-3">
                  <img
                    src={p.image}
                    className="w-12 h-12 rounded-lg border border-gray-200 shadow-sm object-cover"
                    alt={p.itemName}
                  />
                  <span className="font-medium text-gray-800">{p.itemName}</span>
                </div>
              </td>

              {/* Market */}
              <td className="p-3 text-gray-700">{p.marketName}</td>

              {/* Vendor */}
              <td className="p-3 text-sm text-gray-600">
                {p.vendorName || p.vendorEmail}
              </td>

              {/* Price */}
              <td className="p-3 font-semibold text-my-primary">
                ৳{p.pricePerUnit}/kg
              </td>

              {/* Date */}
              <td className="p-3 text-sm text-gray-500">{p.date}</td>

              {/* Status */}
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    p.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : p.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {p.status}
                </span>
              </td>

              {/* Feedback */}
              <td className="p-3">
                {p.status === "rejected" ? (
                  <span className="text-xs italic text-red-500">
                    {p.rejectionFeedback || "—"}
                  </span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>

              {/* Actions */}
              <td className="p-3 space-x-2 flex flex-wrap gap-2">
                {p.status === "pending" && (
                  <>
                    <button
                      onClick={() => approveMutation.mutate(p._id)}
                      className="btn btn-xs bg-green-500 hover:bg-green-600 text-white shadow-sm"
                    >
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => setRejectionModal(p)}
                      className="btn btn-xs bg-yellow-500 hover:bg-yellow-600 text-white shadow-sm"
                    >
                      ❌ Reject
                    </button>
                  </>
                )}

                <Link
                  to={`/dashboard/update-product/${p._id}`}
                  className="btn btn-xs bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
                >
                  ✏️ Update
                </Link>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="btn btn-xs bg-red-500 hover:bg-red-600 text-white shadow-sm"
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>

  {/* Rejection Feedback Modal */}
  {rejectionModal && (
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box rounded-xl">
        <h3 className="font-bold text-xl text-red-600 flex items-center gap-2">
          ❌ Reject Product
        </h3>
        <p className="py-3 text-gray-600">
          Please provide a reason for rejection:
        </p>
        <textarea
          className="textarea textarea-bordered w-full focus:border-red-400 focus:ring-2 focus:ring-red-200"
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write rejection feedback..."
        />
        <div className="modal-action flex gap-3">
          <button
            className="btn bg-red-500 hover:bg-red-600 text-white shadow-sm"
            onClick={() =>
              rejectMutation.mutate({ id: rejectionModal._id, feedback })
            }
          >
            Submit
          </button>
          <button
            className="btn btn-outline"
            onClick={() => setRejectionModal(null)}
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  )}
</div>

  );
};

export default AllProducts;
