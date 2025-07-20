import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AllAdvertisements = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editingAdId, setEditingAdId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ['admin-ads'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/admin/advertisements');
      return res.data;
    }
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) =>
      await axiosSecure.patch(`/api/admin/advertisements/${id}`, { status }),
    onSuccess: () => {
      toast.success('Ad status updated');
      queryClient.invalidateQueries(['admin-ads']);
      setEditingAdId(null);
      setNewStatus('');
    },
    onError: () => toast.error('Failed to update ad status')
  });

  const deleteAd = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/api/admin/advertisements/${id}`),
    onSuccess: () => {
      toast.success('Ad deleted');
      queryClient.invalidateQueries(['admin-ads']);
    },
    onError: () => toast.error('Failed to delete ad')
  });
  const handleDelete = (adId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This advertisement will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAd.mutate(adId);
        Swal.fire('Deleted!', 'The advertisement has been removed.', 'success');
      }
    });
  };

  if (isLoading) return <div className="text-center py-20">Loading advertisements...</div>;

  return (
  <div className="p-6 max-w-7xl mx-auto space-y-6">
  {/* Heading */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <h2 className="text-3xl font-extrabold text-my-primary tracking-tight">
      All Advertisements
    </h2>
  </div>

  {/* ✅ Ads Table */}
  <div className="overflow-x-auto rounded-xl border border-my-primary/20 shadow-md">
    <table className="table-auto w-full">
      <thead className="bg-my-primary/10 text-my-primary uppercase text-sm">
        <tr>
          <th className="p-3 text-left">Image</th>
          <th className="p-3 text-left">Title</th>
          <th className="p-3 text-left">Description</th>
          <th className="p-3 text-left">Status</th>
          <th className="p-3 text-left">Update Status</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {ads.length === 0 ? (
          <tr>
            <td colSpan="6" className="text-center py-6 text-gray-500">
              📢 No advertisements found
            </td>
          </tr>
        ) : (
          ads.map((ad) => (
            <tr
              key={ad._id}
              className="even:bg-gray-50 hover:bg-my-primary/5 transition-colors"
            >
              {/* Image */}
              <td className="p-3">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-20 h-14 rounded-lg object-cover border border-gray-200 shadow-sm"
                />
              </td>

              {/* Title */}
              <td className="p-3 font-semibold text-gray-800">{ad.title}</td>

              {/* Description */}
              <td className="p-3 text-sm text-gray-600 max-w-xs truncate">
                {ad.description}
              </td>

              {/* Status Badge */}
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    ad.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : ad.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {ad.status}
                </span>
              </td>

              {/* Update Status */}
              <td className="p-3">
                {editingAdId === ad._id ? (
                  <div className="flex gap-2">
                    <select
                      className="select select-bordered select-sm"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                    >
                      <option disabled value="">
                        Choose
                      </option>
                      <option value="approved">Approve</option>
                      <option value="rejected">Reject</option>
                      <option value="pending">Pending</option>
                    </select>
                    <button
                      className="btn btn-xs bg-my-primary hover:bg-my-primary-dark text-white shadow-sm"
                      onClick={() =>
                        updateStatus.mutate({ id: ad._id, status: newStatus })
                      }
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn btn-xs btn-outline"
                    onClick={() => {
                      setEditingAdId(ad._id);
                      setNewStatus(ad.status);
                    }}
                  >
                    Edit
                  </button>
                )}
              </td>

              {/* Actions */}
              <td className="p-3">
                <button
                  className="btn btn-xs bg-red-500 hover:bg-red-600 text-white shadow-sm"
                  onClick={() => handleDelete(ad._id)}
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
</div>

  );
};

export default AllAdvertisements;
