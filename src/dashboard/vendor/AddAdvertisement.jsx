import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';

const AddAdvertisement = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const ad = {
      vendorEmail: user.email,
      title: data.title,
      description: data.description,
      image: data.image,
      status: 'pending',
    };

    try {
      const res = await axiosSecure.post('/vendor/ads', ad);
      if (res.data.insertedId) {
        toast.success('Advertisement submitted!');
        reset();
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit advertisement');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add Advertisement</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="md:col-span-2">
          <label className="label">Ad Title</label>
          <input
            {...register('title', { required: true })}
            className="input input-bordered w-full"
            placeholder="e.g. Special onion discount!"
          />
          {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
        </div>

        <div className="md:col-span-2">
          <label className="label">Short Description</label>
          <textarea
            {...register('description', { required: true })}
            className="textarea textarea-bordered w-full"
            placeholder="Your limited time offer..."
          />
          {errors.description && <span className="text-red-500 text-sm">Description is required</span>}
        </div>

        <div className="md:col-span-2">
          <label className="label">Banner/Image URL</label>
          <input
            {...register('image', { required: true })}
            className="input input-bordered w-full"
            placeholder="https://..."
          />
          {errors.image && <span className="text-red-500 text-sm">Image is required</span>}
        </div>

        <div className="md:col-span-2">
          <button type="submit" className="btn btn-primary w-full">
            Submit Advertisement
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdvertisement;
