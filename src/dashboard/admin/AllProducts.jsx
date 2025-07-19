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
    <div>
      <h2 className="text-2xl font-bold mb-4">All Products</h2>

      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Product</th>
              <th>Market</th>
              <th>Vendor</th>
              <th>Price</th>
              <th>Date</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>
                  <div className="flex items-center gap-2">
                    <img src={p.image} className="w-10 h-10 rounded" />
                    <span>{p.itemName}</span>
                  </div>
                </td>
                <td>{p.marketName}</td>
                <td>{p.vendorName || p.vendorEmail}</td>
                <td>৳{p.pricePerUnit}/kg</td>
                <td>{p.date}</td>
                <td>
                  <span className={`badge badge-${p.status === 'approved' ? 'success' : p.status === 'rejected' ? 'error' : 'warning'}`}>
                    {p.status}
                  </span>
                </td>
                <td>
                  {p.status === 'rejected' ? (
                    <span className="text-xs italic text-red-500">{p.rejectionFeedback || '—'}</span>
                  ) : '—'}
                </td>
                <td className="space-x-1">
                  {p.status === 'pending' && (
                    <>
                      <button onClick={() => approveMutation.mutate(p._id)} className="btn btn-xs btn-success">
                        Approve
                      </button>
                      <button onClick={() => setRejectionModal(p)} className="btn btn-xs btn-warning">
                        Reject
                      </button>
                    </>
                  )}
                  <Link to={`/dashboard/update-product/${p._id}`} className="btn btn-xs btn-info">
                    Update
                  </Link>
                  <button onClick={() => handleDelete(p._id)} className="btn btn-xs btn-error">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rejection Feedback Modal */}
      {rejectionModal && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Reject Product</h3>
            <p className="py-2">Provide a reason for rejection:</p>
            <textarea
              className="textarea textarea-bordered w-full"
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write feedback..."
            />
            <div className="modal-action">
              <button
                className="btn btn-error"
                onClick={() => rejectMutation.mutate({ id: rejectionModal._id, feedback })}
              >
                Submit
              </button>
              <button className="btn" onClick={() => setRejectionModal(null)}>Cancel</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AllProducts;
