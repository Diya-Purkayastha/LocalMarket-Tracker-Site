import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import Swal from 'sweetalert2';

const Watchlist = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [removingId, setRemovingId] = useState(null);

  const { data: watchlist = [], isLoading } = useQuery({
    queryKey: ['user-watchlist'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/user/watchlist');
      return res.data;
    }
  });

  const mutation = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/api/user/watchlist/${id}`),
    onSuccess: () => {
      toast.success('Removed from watchlist');
      queryClient.invalidateQueries(['user-watchlist']);
      setRemovingId(null);
    },
    onError: () => toast.error('Failed to remove item'),
  });

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be removed from your watchlist!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it",
    }).then((result) => {
      if (result.isConfirmed) {
        setRemovingId(id);
        mutation.mutate(id);

        Swal.fire({
          title: "Deleted!",
          text: "The product has been removed from your watchlist.",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  };

  if (isLoading) return <div className="text-center py-20">Loading watchlist...</div>;

  return (
   <div className="mt-5">
  <h2 className="text-3xl font-bold text-my-primary mb-6 flex items-center gap-2">
    ⭐ My Watchlist
  </h2>

  {watchlist.length === 0 ? (
    <div className="text-gray-500 italic">
      You haven’t added anything to your watchlist yet.
    </div>
  ) : (
    <div className="overflow-x-auto shadow-lg rounded-xl bg-base-100">
      <table className="table w-full">
        {/* ✅ Table Header */}
        <thead className="bg-my-primary text-white text-sm uppercase">
          <tr>
            <th className="rounded-tl-xl">#</th>
            <th>Product</th>
            <th>Market</th>
            <th>Date</th>
            <th className="text-center" colSpan="2">
              Actions
            </th>
          </tr>
        </thead>

        {/* ✅ Table Body */}
        <tbody>
          {watchlist.map((item, idx) => (
            <tr
              key={item._id}
              className="hover:bg-my-neutral transition duration-200"
            >
              <td className="font-semibold">{idx + 1}</td>

              {/* Product Name */}
              <td className="font-medium text-my-primary">
                {item.productName}
              </td>

              {/* Market as Badge */}
              <td>
                <span className="badge badge-outline badge-accent text-xs">
                  {item.marketName}
                </span>
              </td>

              {/* Date as Badge */}
              <td>
                <span className="badge badge-outline badge-secondary text-xs">
                  {item.date}
                </span>
              </td>

              {/* Actions */}
              <td className="text-center">
                <button
                  className="btn btn-sm btn-outline btn-accent"
                  onClick={() => navigate("/all-products")}
                >
                  ➕ Add More
                </button>
              </td>
              <td className="text-center">
                <button
                  className="btn btn-sm btn-error hover:btn-warning"
                  onClick={() => handleRemove(item._id)}
                  disabled={removingId === item._id}
                >
                  {removingId === item._id ? "Removing..." : "❌ Remove"}
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

export default Watchlist;
