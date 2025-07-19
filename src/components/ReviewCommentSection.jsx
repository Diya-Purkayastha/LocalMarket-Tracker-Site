import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure'; 
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';

const ReviewCommentSection = ({ productId }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const axios =  useAxios();

  const { register, handleSubmit, reset } = useForm();

  // Load existing reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      const res = await axios.get(`/api/reviews?productId=${productId}`);
       
      return res.data;
    },
  });

  // Submit a new review
  const mutation = useMutation({
    mutationFn: async (data) => {
      return await axiosSecure.post('/api/user/reviews', { ...data, productId });
    },
    onSuccess: () => {
      toast.success('Review submitted!');
      reset();
      queryClient.invalidateQueries(['reviews', productId]);
    },
    onError: () => toast.error('Failed to submit review'),
  });

  const onSubmit = (data) => {
    if (!user) return toast.error('You must be logged in');
    mutation.mutate(data);
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-4">💬 User Reviews</h3>

      {/* Submit Review Form */}
      {user ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-base-200 p-4 rounded-md">
          <div className="flex gap-4 items-center">
            <label className="font-semibold">Rating:</label>
            <select {...register('rating', { required: true })} className="select select-bordered w-32">
              <option value="">Select</option>
              {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Star</option>)}
            </select>
          </div>

          <textarea
            {...register('comment', { required: true })}
            placeholder="Write your comment about the price, freshness etc..."
            className="textarea textarea-bordered w-full"
          />

          <button className="btn btn-primary">Submit Review</button>
        </form>
      ) : (
        <p className="text-sm text-error">Please login to submit a review.</p>
      )}

      {/* All Reviews List */}
      <div className="mt-6 space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          reviews.map((r, idx) => (
            <div key={idx} className="p-4 border rounded-md shadow bg-base-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{r.userName}</p>
                  <p className="text-xs text-gray-500">{r.userEmail}</p>
                </div>
                <div className="text-sm text-yellow-500">⭐ {r.rating}</div>
              </div>
              <p className="mt-2">{r.comment}</p>
              <p className="text-xs text-gray-400 mt-1">{format(new Date(r.createdAt), 'PPpp')}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewCommentSection;
