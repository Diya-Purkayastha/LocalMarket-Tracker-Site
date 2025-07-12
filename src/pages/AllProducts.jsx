// src/pages/AllProducts.jsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import useAxios from '../hooks/useAxios';

const AllProducts = () => {
  const axiosPublic = useAxios();
  const [sort, setSort] = useState('desc');
  const [date, setDate] = useState('');
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data = {}, isLoading } = useQuery({
    queryKey: ['all-products', sort, date, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        sort,
        date,
        page,
        limit,
      }).toString();

      const res = await axiosPublic.get(`/products?${params}`);
      return res.data;
    },
  });

  const products = data.products || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">🛍️ All Market Products</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
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

      {/* Product Cards */}
      {isLoading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found for the selected filters.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p._id} className="card bg-base-100 shadow">
              <figure>
                <img src={p.image} alt={p.items?.[0]?.name || 'Market Product'} className="h-48 w-full object-cover" />
              </figure>
              <div className="card-body">
                <h3 className="text-lg font-bold">{p.items?.[0]?.name}</h3>
                <p>💵 Price: ৳{p.items?.[0]?.price}</p>
                <p>🏪 Market: {p.marketName}</p>
                <p>📅 Date: {format(new Date(p.date), 'dd MMM yyyy')}</p>
                <p>👨‍🌾 Vendor: {p.vendorName}</p>
                <div className="card-actions justify-end">
                  <a href={`/details/${p._id}`} className="btn btn-primary btn-sm">
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
            className={`btn btn-sm ${n === page ? 'btn-primary' : 'btn-outline'}`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
