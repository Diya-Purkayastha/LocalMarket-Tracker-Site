import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyAdvertisements = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editingAd, setEditingAd] = useState(null);

  // Fetch Ads
  const { data: ads = [], isLoading } = useQuery({
    queryKey: ['myAds', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/vendor/advertisements?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Delete Mutation
  const deleteAd = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/api/vendor/advertisements/${id}`);
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
      const res = await axiosSecure.put(`/api/vendor/advertisements/${editingAd._id}`, updatedAd);
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
  const handleDelete = (adId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This advertisement will be permanently deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAd.mutate(adId);
        Swal.fire('Deleted!', 'Your advertisement has been removed.', 'success');
      }
    });
  };

  if (isLoading) return <div>Loading advertisements...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-my-primary/30">
  <h2 className="text-3xl font-extrabold text-my-primary mb-8 border-b-2 border-my-primary pb-3">
    My Advertisements
  </h2>

  <div className="overflow-x-auto rounded-lg border border-my-primary/20 shadow-sm">
    <table className="table-auto w-full border-collapse">
      <thead className="bg-my-primary/10 text-my-primary">
        <tr>
          <th className="p-3 text-left font-semibold">Image</th>
          <th className="p-3 text-left font-semibold">Title</th>
          <th className="p-3 text-left font-semibold">Description</th>
          <th className="p-3 text-center font-semibold">Status</th>
          <th className="p-3 text-center font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        {ads.map((ad) => (
          <tr
            key={ad._id}
            className="even:bg-my-primary/5 hover:bg-my-primary/20 transition-colors"
          >
            <td className="p-2">
              <img
                src={ad.image}
                alt={ad.title}
                className="w-20 h-12 object-cover rounded-md border border-my-primary/30 shadow-sm"
              />
            </td>
            <td className="p-3 align-top font-medium">{ad.title}</td>
            <td className="p-3 align-top text-my-primary/80 max-w-xs break-words">
              {ad.description}
            </td>
            <td className="p-3 text-center align-top">
              <span className="badge bg-my-primary text-white px-3 py-1 text-sm font-semibold capitalize">
                {ad.status}
              </span>
            </td>
            <td className="p-3 text-center space-x-2 whitespace-nowrap align-top">
              <button
                className="btn btn-sm btn-outline border-my-primary text-my-primary hover:bg-my-primary hover:text-white transition"
                onClick={() => setEditingAd(ad)}
                aria-label={`Edit ad: ${ad.title}`}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-error"
                onClick={() => handleDelete(ad._id)}
                aria-label={`Delete ad: ${ad.title}`}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Update Modal */}
  {editingAd && (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="update-ad-title"
    >
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg relative">
        <h3
          id="update-ad-title"
          className="text-2xl font-semibold text-my-primary mb-6"
        >
          Update Advertisement
        </h3>

        <form onSubmit={handleUpdate} className="space-y-5">
          <input
            defaultValue={editingAd.title}
            name="title"
            placeholder="Ad Title"
            className="input input-bordered w-full border-my-primary focus:border-my-primary focus:ring-2 focus:ring-my-primary/40 transition"
            required
          />
          <textarea
            defaultValue={editingAd.description}
            name="description"
            placeholder="Description"
            rows={4}
            className="textarea textarea-bordered w-full border-my-primary focus:border-my-primary focus:ring-2 focus:ring-my-primary/40 transition resize-none"
            required
          />
          <input
            defaultValue={editingAd.image}
            name="image"
            placeholder="Image URL"
            className="input input-bordered w-full border-my-primary focus:border-my-primary focus:ring-2 focus:ring-my-primary/40 transition"
            required
          />

          <div className="flex flex-col gap-3 mt-4">
            <button
              type="submit"
              className="btn w-full bg-my-primary hover:bg-my-primary-dark text-white font-semibold shadow-md transition"
            >
              Update
            </button>
            <button
              type="button"
              className="btn w-full btn-outline border-my-primary text-my-primary hover:bg-my-primary hover:text-white transition"
              onClick={() => setEditingAd(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>

  );
};

export default MyAdvertisements;
