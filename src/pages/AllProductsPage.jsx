// src/pages/AllProducts.jsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import useAxios from '../hooks/useAxios';


const AllProductsPage = () => {
  const axios = useAxios();
  const [sort, setSort] = useState('desc');
  const [date, setDate] = useState('');
  const [page, setPage] = useState(1);
  

  const { data = {}, isLoading } = useQuery({
    queryKey: ['all-products', sort, date, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        sort,
        date,
        page,
        
      }).toString();

      const res = await axios.get(`/api/products?${params}`);
      return res.data;
    },
  });

  const products = data.products || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className='text-center'>
        <h2 className="text-4xl text-my-primary font-bold mb-4">All Market Products</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <div>
          <label className="label">Sort by Price:</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="select select-bordered"
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        <div>
          <label className="label">Filter by Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setPage(1);
            }}
            className="input input-bordered"
          />
        </div>
      </div>
      </div>

      {/* Product Cards */}
      {isLoading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found for the selected filters.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="card bg-base-100 shadow-md rounded-xl hover:shadow-lg transition duration-300"
            >
              {/* Product Image */}
              <figure className="relative">
                <img
                  src={p.image}
                  alt={p.items?.[0]?.name || "Market Product"}
                  className="h-48 w-full object-cover rounded-t-xl"
                />
                {/* Date Badge on Image */}
                <div className="absolute top-2 left-2">
                  <div className="badge bg-my-secondary text-white text-xs">
                    {format(new Date(p.date), "dd MMM yyyy")}
                  </div>
                </div>
              </figure>

              {/* Card Body */}
              <div className="card-body p-4 space-y-2">
                {/* Product Name */}
                <h3 className="text-lg font-bold text-my-primary line-clamp-1">
                  {p.itemName}
                </h3>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <div className="badge badge-outline badge-my-accent text-xs">
                    🏪 {p.marketName}
                  </div>
                  <div className="badge badge-outline badge-my-primary text-xs">
                    👨‍🌾 {p.vendorName}
                  </div>
                </div>

               

                {/* Card Footer Action */}
                <div className="card-actions justify-end pt-2">
                  <a
                    href={`/details/${p._id}`}
                    className="btn btn-sm bg-my-primary text-white hover:btn-outline"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      )}

      {/* Pagination */}
      <div className="mt-8 flex flex-wrap gap-2">
        {Array.from({ length: data.pages || 1 }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => setPage(n)}
            className={`btn btn-sm ${n === page ? 'bg-my-primary text-white' : 'btn-outline'}`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage;
