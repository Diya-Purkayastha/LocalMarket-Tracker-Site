import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AddProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [date, setDate] = useState(new Date());
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formattedDate = date.toISOString().split('T')[0];

    const product = {
      vendorEmail: user.email,
      vendorName: user.displayName || '',
      marketName: data.marketName,
      marketDescription: data.marketDescription,
      date: formattedDate,
      itemName: data.itemName,
      itemDescription: data.itemDescription,
      pricePerUnit: parseFloat(data.pricePerUnit),
      image: data.image,
      status: 'pending',
      prices: [
        {
          date: formattedDate,
          price: parseFloat(data.pricePerUnit),
        },
      ],
    };

    try {
      const res = await axiosSecure.post('/api/vendor/products', product);
      if (res.data.insertedId) {
        toast.success('Product added!');
        reset();
        setDate(new Date());
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to add product');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-my-primary/30">
  <h2 className="text-3xl font-extrabold text-my-primary mb-6 border-b-2 border-my-primary pb-2">
    Add New Product
  </h2>

  <form
    onSubmit={handleSubmit(onSubmit)}
    className="grid grid-cols-1 md:grid-cols-2 gap-6"
  >
    {/* Market Name */}
    <div className="flex flex-col">
      <label
        htmlFor="marketName"
        className="mb-2 font-semibold text-my-primary"
      >
        Market Name <span className="text-red-500">*</span>
      </label>
      <input
        id="marketName"
        {...register("marketName", { required: true })}
        placeholder="Enter market name"
        className="input input-bordered w-full border-my-primary focus:border-my-primary focus:ring-2 focus:ring-my-primary/40 transition"
      />
    </div>

    {/* Market Description */}
    <div className="flex flex-col">
      <label
        htmlFor="marketDescription"
        className="mb-2 font-semibold text-my-primary"
      >
        Market Description <span className="text-red-500">*</span>
      </label>
      <textarea
        id="marketDescription"
        {...register("marketDescription", { required: true })}
        placeholder="Brief description of the market"
        className="textarea textarea-bordered w-full border-my-primary focus:border-my-primary focus:ring-2 focus:ring-my-primary/40 transition resize-none"
        rows={4}
      />
    </div>

    {/* Date */}
    <div className="flex flex-col">
      <label
        htmlFor="date"
        className="mb-2 font-semibold text-my-primary"
      >
        Date <span className="text-red-500">*</span>
      </label>
      <Controller
        control={control}
        name="date"
        render={() => (
          <DatePicker
            id="date"
            selected={date}
            onChange={(date) => setDate(date)}
            placeholderText="Select a date"
            className="input input-bordered w-full border-my-primary focus:border-my-primary focus:ring-2 focus:ring-my-primary/40 transition"
          />
        )}
      />
    </div>

    {/* Item Name */}
    <div className="flex flex-col">
      <label
        htmlFor="itemName"
        className="mb-2 font-semibold text-my-primary"
      >
        Item Name <span className="text-red-500">*</span>
      </label>
      <input
        id="itemName"
        {...register("itemName", { required: true })}
        placeholder="Enter item name"
        className="input input-bordered w-full border-my-primary focus:border-my-primary focus:ring-2 focus:ring-my-primary/40 transition"
      />
    </div>

    {/* Item Description */}
    <div className="flex flex-col">
      <label
        htmlFor="itemDescription"
        className="mb-2 font-semibold text-my-primary"
      >
        Item Description
      </label>
      <textarea
        id="itemDescription"
        {...register("itemDescription")}
        placeholder="Describe the item (optional)"
        className="textarea textarea-bordered w-full border-my-primary focus:border-my-primary focus:ring-2 focus:ring-my-primary/40 transition resize-none"
        rows={4}
      />
    </div>

    {/* Price per Unit */}
    <div className="flex flex-col">
      <label
        htmlFor="pricePerUnit"
        className="mb-2 font-semibold text-my-primary"
      >
        Price per Unit (৳) <span className="text-red-500">*</span>
      </label>
      <input
        id="pricePerUnit"
        type="number"
        step="0.01"
        {...register("pricePerUnit", { required: true })}
        placeholder="e.g. 100.00"
        className="input input-bordered w-full border-my-primary focus:border-my-primary focus:ring-2 focus:ring-my-primary/40 transition"
      />
    </div>

    {/* Image URL */}
    <div className="flex flex-col">
      <label
        htmlFor="image"
        className="mb-2 font-semibold text-my-primary"
      >
        Image URL <span className="text-red-500">*</span>
      </label>
      <input
        id="image"
        {...register("image", { required: true })}
        placeholder="https://example.com/image.jpg"
        className="input input-bordered w-full border-my-primary focus:border-my-primary focus:ring-2 focus:ring-my-primary/40 transition"
      />
    </div>

    {/* Submit Button */}
    <div className="col-span-1 md:col-span-2 mt-4">
      <button
        type="submit"
        className="btn w-full bg-my-primary hover:bg-my-primary-dark text-white font-semibold shadow-md transition"
      >
        Submit Product
      </button>
    </div>
  </form>
</div>

  );
};

export default AddProducts;
