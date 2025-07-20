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
      const res = await axiosSecure.post('/api/vendor/advertisements', ad);
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
  <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-my-primary/30">
  <h2 className="text-3xl font-extrabold text-my-primary mb-8 border-b-2 border-my-primary pb-3">
    Add Advertisement
  </h2>

  <form
    onSubmit={handleSubmit(onSubmit)}
    className="grid grid-cols-1 gap-6"
    noValidate
  >
    {/* Ad Title */}
    <div className="flex flex-col">
      <label htmlFor="title" className="mb-2 font-semibold text-my-primary">
        Ad Title <span className="text-red-500">*</span>
      </label>
      <input
        id="title"
        {...register("title", { required: true })}
        placeholder="e.g. Special onion discount!"
        className={`input input-bordered w-full border-my-primary focus:border-my-primary focus:ring-2 focus:ring-my-primary/40 transition ${
          errors.title ? "border-red-500 focus:ring-red-300" : ""
        }`}
      />
      {errors.title && (
        <span className="text-red-500 text-sm mt-1">Title is required</span>
      )}
    </div>

    {/* Short Description */}
    <div className="flex flex-col">
      <label
        htmlFor="description"
        className="mb-2 font-semibold text-my-primary"
      >
        Short Description <span className="text-red-500">*</span>
      </label>
      <textarea
        id="description"
        {...register("description", { required: true })}
        placeholder="Your limited time offer..."
        rows={4}
        className={`textarea textarea-bordered w-full border-my-primary focus:border-my-primary focus:ring-2 focus:ring-my-primary/40 transition resize-none ${
          errors.description ? "border-red-500 focus:ring-red-300" : ""
        }`}
      />
      {errors.description && (
        <span className="text-red-500 text-sm mt-1">Description is required</span>
      )}
    </div>

    {/* Banner/Image URL */}
    <div className="flex flex-col">
      <label htmlFor="image" className="mb-2 font-semibold text-my-primary">
        Banner/Image URL <span className="text-red-500">*</span>
      </label>
      <input
        id="image"
        {...register("image", { required: true })}
        placeholder="https://..."
        className={`input input-bordered w-full border-my-primary focus:border-my-primary focus:ring-2 focus:ring-my-primary/40 transition ${
          errors.image ? "border-red-500 focus:ring-red-300" : ""
        }`}
      />
      {errors.image && (
        <span className="text-red-500 text-sm mt-1">Image is required</span>
      )}
    </div>

    {/* Submit Button */}
    <div>
      <button
        type="submit"
        className="btn w-full bg-my-primary hover:bg-my-primary-dark text-white font-semibold shadow-md transition"
      >
        Submit Advertisement
      </button>
    </div>
  </form>
</div>

  );
};

export default AddAdvertisement;
