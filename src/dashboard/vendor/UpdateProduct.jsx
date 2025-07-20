import { useForm, Controller } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const UpdateProduct = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/vendor/product/${id}`);
      setDate(new Date(res.data.date));
      return res.data;
    },
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(`/api/vendor/product/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Product updated!');
      // navigate('/dashboard');
    },
    onError: () => toast.error('Failed to update product'),
  });

  const onSubmit = (data) => {
    const formattedDate = date.toISOString().split('T')[0];
    const updateData = {
      marketName: data.marketName,
      marketDescription: data.marketDescription,
      date: formattedDate,
      itemName: data.itemName,
      itemDescription: data.itemDescription,
      pricePerUnit: parseFloat(data.pricePerUnit),
      image: data.image,
    };
    mutation.mutate(updateData);
  };

  if (isLoading) return <div className="text-center py-10">Loading product...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
  {/* Heading */}
  <div className="text-center">
    <h2 className="text-3xl font-extrabold text-my-primary">
      ✏️ Update Product
    </h2>
    <p className="text-gray-500 mt-1 text-sm">
      Modify the product details and save your changes
    </p>
  </div>

  {/* Form */}
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl shadow-md p-6 border border-my-primary/20"
  >
    {/* Market Name */}
    <div>
      <label className="label font-semibold text-gray-700">
        Market Name <span className="text-red-500">*</span>
      </label>
      <input
        defaultValue={product?.marketName}
        {...register("marketName", { required: true })}
        className="input input-bordered w-full focus:ring-2 focus:ring-my-primary transition"
        placeholder="e.g. Dhaka Main Market"
      />
    </div>

    {/* Market Description */}
    <div>
      <label className="label font-semibold text-gray-700">
        Market Description <span className="text-red-500">*</span>
      </label>
      <textarea
        defaultValue={product?.marketDescription}
        {...register("marketDescription", { required: true })}
        className="textarea textarea-bordered w-full focus:ring-2 focus:ring-my-primary transition"
        placeholder="Short description about the market..."
      />
    </div>

    {/* Date */}
    <div>
      <label className="label font-semibold text-gray-700">Date</label>
      <Controller
        control={control}
        name="date"
        render={() => (
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            className="input input-bordered w-full focus:ring-2 focus:ring-my-primary transition"
          />
        )}
      />
    </div>

    {/* Item Name */}
    <div>
      <label className="label font-semibold text-gray-700">
        Item Name <span className="text-red-500">*</span>
      </label>
      <input
        defaultValue={product?.itemName}
        {...register("itemName", { required: true })}
        className="input input-bordered w-full focus:ring-2 focus:ring-my-primary transition"
        placeholder="e.g. Fresh Onions"
      />
    </div>

    {/* Item Description */}
    <div>
      <label className="label font-semibold text-gray-700">Item Description</label>
      <textarea
        defaultValue={product?.itemDescription}
        {...register("itemDescription")}
        className="textarea textarea-bordered w-full focus:ring-2 focus:ring-my-primary transition"
        placeholder="Brief details about the product..."
      />
    </div>

    {/* Price Per Unit */}
    <div>
      <label className="label font-semibold text-gray-700">
        Price per Unit (৳) <span className="text-red-500">*</span>
      </label>
      <input
        type="number"
        step="0.01"
        defaultValue={product?.pricePerUnit}
        {...register("pricePerUnit", { required: true })}
        className="input input-bordered w-full focus:ring-2 focus:ring-my-primary transition"
        placeholder="e.g. 120.50"
      />
    </div>

    {/* Image URL */}
    <div>
      <label className="label font-semibold text-gray-700">
        Image URL <span className="text-red-500">*</span>
      </label>
      <input
        defaultValue={product?.image}
        {...register("image", { required: true })}
        className="input input-bordered w-full focus:ring-2 focus:ring-my-primary transition"
        placeholder="https://example.com/product.jpg"
      />
    </div>

    {/* Submit Button */}
    <div className="col-span-1 md:col-span-2 mt-4">
      <button
        type="submit"
        className="btn bg-my-primary hover:bg-my-primary-dark text-white font-semibold w-full shadow-md transition"
      >
        ✅ Update Product
      </button>
    </div>
  </form>
</div>

  );
};

export default UpdateProduct;
