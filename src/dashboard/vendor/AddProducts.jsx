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
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="label">Market Name</label>
          <input
            {...register('marketName', { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Market Description</label>
          <textarea
            {...register('marketDescription', { required: true })}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Date</label>
          <Controller
            control={control}
            name="date"
            render={() => (
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                className="input input-bordered w-full"
              />
            )}
          />
        </div>

        <div>
          <label className="label">Item Name</label>
          <input
            {...register('itemName', { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Item Description</label>
          <textarea
            {...register('itemDescription')}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Price per Unit (৳)</label>
          <input
            type="number"
            step="0.01"
            {...register('pricePerUnit', { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Image URL</label>
          <input
            {...register('image', { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <button type="submit" className="btn btn-primary w-full">
            Submit Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
