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
    <div>
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">Market Name</label>
          <input
            defaultValue={product?.marketName}
            {...register('marketName', { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Market Description</label>
          <textarea
            defaultValue={product?.marketDescription}
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
            defaultValue={product?.itemName}
            {...register('itemName', { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Item Description</label>
          <textarea
            defaultValue={product?.itemDescription}
            {...register('itemDescription')}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Price per Unit</label>
          <input
            type="number"
            step="0.01"
            defaultValue={product?.pricePerUnit}
            {...register('pricePerUnit', { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Image URL</label>
          <input
            defaultValue={product?.image}
            {...register('image', { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <button type="submit" className="btn btn-primary w-full">
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
