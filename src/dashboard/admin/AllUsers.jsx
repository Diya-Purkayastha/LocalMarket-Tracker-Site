import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { format } from "date-fns";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { register, handleSubmit, reset } = useForm();

  // ✅ Fetch Users with search + pagination
  const { data: result = {}, isLoading, isError } = useQuery({
    queryKey: ["users", searchTerm, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/search?email=${searchTerm}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const users = result.users || [];
  const totalPages = result.totalPages || 1;

  // ✅ Mutation: Update role
  const mutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosSecure.patch(`/users/${id}/role`, { role });
      return res.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Role updated successfully");
        queryClient.invalidateQueries(["users"]); 
      } else {
        toast.error(data.message || "Role update failed");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update role");
    },
  });

  // ✅ Search form handler
  const onSearch = ({ search }) => {
    setSearchTerm(search);
    setPage(1);
    reset();
  };

  // ✅ Handle Prev/Next
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  if (isLoading)
    return <div className="text-center py-20 text-lg">Loading users...</div>;
  if (isError)
    return (
      <div className="text-center py-20 text-red-500">
        Failed to fetch users
      </div>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      {/* ✅ Search Form */}
      <form onSubmit={handleSubmit(onSearch)} className="mb-4 flex gap-2">
        <input
          {...register("search")}
          placeholder="Search by email"
          className="input input-bordered w-full max-w-md"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {/* ✅ Users Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table w-full table-zebra">
          <thead className="bg-base-200">
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
            {users.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((u, index) => (
                <tr key={u._id}>
                  <td>{(page - 1) * limit + index + 1}</td>
                  <td>
                    <img
                      src={u.photoURL || "/avatar.png"}
                      className="w-10 h-10 rounded-full"
                      alt="user"
                    />
                  </td>
                  <td>{u.name || "—"}</td>
                  <td>{u.email}</td>
                  <td>
                    {u.createdAt
                      ? format(new Date(u.createdAt), "dd MMM yyyy")
                      : "—"}
                  </td>
                  <td className="capitalize">{u.role}</td>
                  <td>
                    <select
                      className="select select-bordered select-sm"
                      defaultValue={u.role}
                      disabled={mutation.isLoading}
                      onChange={(e) =>
                        mutation.mutate({ id: u._id, role: e.target.value })
                      }
                    >
                      <option value="user">User</option>
                      <option value="vendor">Vendor</option>
                      <option value="admin">Admin</option>
                    </select>

                    {mutation.isLoading && (
                      <span className="loading loading-spinner ml-2"></span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Beautiful Pagination */}
      <div className="flex justify-between items-center mt-6">
        {/* Prev Button */}
        <button
          className="btn btn-sm btn-outline"
          onClick={handlePrev}
          disabled={page === 1}
        >
          « Prev
        </button>

        {/* Page Numbers */}
        <div className="join">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`join-item btn btn-sm ${
                n === page ? "btn-primary" : "btn-outline"
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          className="btn btn-sm btn-outline"
          onClick={handleNext}
          disabled={page === totalPages}
        >
          Next »
        </button>
      </div>
    </div>
  );
};

export default AllUsers;
