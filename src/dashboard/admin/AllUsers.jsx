import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const { register, handleSubmit } = useForm();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users', searchTerm],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${searchTerm}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ email, role }) =>
      await axiosSecure.patch(`/user/role/${email}`, { role }),
    onSuccess: () => {
      toast.success('Role updated!');
      queryClient.invalidateQueries(['users']);
    },
    onError: () => toast.error('Failed to update role'),
  });

  const onSearch = ({ search }) => setSearchTerm(search);

  if (isLoading) return <div className="text-center py-10">Loading users...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      <form onSubmit={handleSubmit(onSearch)} className="mb-4 flex gap-2">
        <input
          {...register('search')}
          placeholder="Search by name or email"
          className="input input-bordered w-full max-w-md"
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Update Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={u._id}>
                <td>{index + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td className="capitalize">{u.role}</td>
                <td>
                  <select
                    className="select select-bordered select-sm"
                    defaultValue={u.role}
                    onChange={(e) =>
                      mutation.mutate({ email: u.email, role: e.target.value })
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
    </div>
  );
};

export default AllUsers;
