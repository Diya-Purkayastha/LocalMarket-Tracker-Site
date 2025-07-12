import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyAdvertisements = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editingAd, setEditingAd] = useState(null);

  // Fetch Ads
  const { data: ads = [], isLoading } = useQuery({
    queryKey: ['myAds', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/vendor/advertisements?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Delete Mutation
  const deleteAd = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/vendor/advertisements/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Ad deleted');
      queryClient.invalidateQueries(['myAds']);
    },
    onError: () => toast.error('Delete failed'),
  });

  // Update Mutation
  const updateAd = useMutation({
    mutationFn: async (updatedAd) => {
      const res = await axiosSecure.patch(`/vendor/advertisements/${editingAd._id}`, updatedAd);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Ad updated');
      setEditingAd(null);
      queryClient.invalidateQueries(['myAds']);
    },
    onError: () => toast.error('Update failed'),
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      title: form.title.value,
      description: form.description.value,
      image: form.image.value,
    };
    updateAd.mutate(updated);
  };

  if (isLoading) return <div>Loading advertisements...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Advertisements</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad._id}>
                <td><img src={ad.image} className="w-16 h-10 object-cover" /></td>
                <td>{ad.title}</td>
                <td>{ad.description}</td>
                <td><span className="badge badge-info">{ad.status}</span></td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => setEditingAd(ad)}
                  >Edit</button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => {
                      if (confirm('Are you sure to delete this ad?')) {
                        deleteAd.mutate(ad._id);
                      }
                    }}
                  >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {editingAd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg relative">
            <h3 className="text-xl font-semibold mb-4">Update Advertisement</h3>

            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                defaultValue={editingAd.title}
                name="title"
                className="input input-bordered w-full"
              />
              <textarea
                defaultValue={editingAd.description}
                name="description"
                className="textarea textarea-bordered w-full"
              />
              <input
                defaultValue={editingAd.image}
                name="image"
                className="input input-bordered w-full"
              />
              <div className="flex justify-between gap-4 mt-3">
                <button type="submit" className="btn btn-primary w-full">Update</button>
                <button
                  type="button"
                  className="btn w-full"
                  onClick={() => setEditingAd(null)}
                >Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAdvertisements;
