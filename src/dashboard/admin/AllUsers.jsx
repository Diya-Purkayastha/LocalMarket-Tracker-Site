import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  const { register, handleSubmit } = useForm();

  const { data: result = {}, isLoading } = useQuery({
    queryKey: ['users', searchTerm, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/users?search=${searchTerm}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  const users = result.users || [];

  const mutation = useMutation({
    mutationFn: async ({ id, role }) =>
      await axiosSecure.patch(`/admin/users/${id}`, { role }),
    onSuccess: () => {
      toast.success('Role updated successfully');
      queryClient.invalidateQueries(['users']);
    },
    onError: () => toast.error('Failed to update role'),
  });

  const onSearch = ({ search }) => {
    setSearchTerm(search);
    setPage(1);
  };

  if (isLoading) return <div className="text-center py-20">Loading users...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      {/* Search Form */}
      <form onSubmit={handleSubmit(onSearch)} className="mb-4 flex gap-2">
        <input
          {...register('search')}
          placeholder="Search by name or email"
          className="input input-bordered w-full max-w-md"
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Joined</th>
              <th>Role</th>
              <th>Update Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={u._id}>
                <td>{(page - 1) * limit + index + 1}</td>
                <td>
                  <img src={u.photoURL || '/avatar.png'} className="w-10 h-10 rounded-full" />
                </td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.createdAt ? format(new Date(u.createdAt), 'dd MMM yyyy') : '—'}</td>
                <td className="capitalize">{u.role}</td>
                <td>
                  <select
                    className="select select-bordered select-sm"
                    defaultValue={u.role}
                    onChange={(e) =>
                      mutation.mutate({ id: u._id, role: e.target.value })
                    }
                  >
                    <option value="user">User</option>
                    <option value="vendor">Vendor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex flex-wrap gap-2">
        {Array.from({ length: result.pages || 1 }, (_, i) => i + 1).map((n) => (
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

export default AllUsers;
