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
    <div>
      <h2 className="text-2xl font-bold mb-4">All Advertisements</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Update Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad._id}>
                <td>
                  <img src={ad.image} className="w-16 h-12 object-cover rounded" />
                </td>
                <td>{ad.title}</td>
                <td className="text-sm">{ad.description}</td>
                <td>
                  <span className={`badge badge-${ad.status === 'approved' ? 'success' : ad.status === 'rejected' ? 'error' : 'warning'}`}>
                    {ad.status}
                  </span>
                </td>
                <td>
                  {editingAdId === ad._id ? (
                    <div className="flex gap-2">
                      <select
                        className="select select-bordered select-sm"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                      >
                        <option disabled value="">Choose</option>
                        <option value="approved">Approve</option>
                        <option value="rejected">Reject</option>
                        <option value="pending">Pending</option>
                      </select>
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() => updateStatus.mutate({ id: ad._id, status: newStatus })}
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
                <td>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(ad._id)} 
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAdvertisements;
