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
   <div className="p-6 max-w-7xl mx-auto space-y-6">
  {/* Heading */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <h2 className="text-3xl font-extrabold text-my-primary tracking-tight">
      All Users
    </h2>
  </div>

  {/* ✅ Search Form */}
  <form
    onSubmit={handleSubmit(onSearch)}
    className="flex flex-col sm:flex-row items-center gap-3 bg-white shadow-md rounded-xl p-4 border border-my-primary/20"
  >
    <input
      {...register("search")}
      placeholder="🔍 Search by email"
      className="input input-bordered w-full sm:flex-1 focus:border-my-primary focus:ring-2 focus:ring-my-primary/30 transition"
    />
    <button
      type="submit"
      className="btn bg-my-primary hover:bg-my-primary-dark text-white shadow-md w-full sm:w-auto"
    >
      Search
    </button>
  </form>

  {/* ✅ Users Table */}
  <div className="overflow-x-auto rounded-xl border border-my-primary/20 shadow-md">
    <table className="table-auto w-full">
      <thead className="bg-my-primary/10 text-my-primary">
        <tr>
          <th className="p-3 text-left">#</th>
          <th className="p-3 text-left">Photo</th>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Email</th>
          <th className="p-3 text-left">Joined</th>
          <th className="p-3 text-left">Role</th>
          <th className="p-3 text-left">Update Role</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan="7" className="text-center py-6 text-gray-500">
              🚫 No users found
            </td>
          </tr>
        ) : (
          users.map((u, index) => (
            <tr
              key={u._id}
              className="even:bg-gray-50 hover:bg-my-primary/5 transition-colors"
            >
              <td className="p-3 font-medium">
                {(page - 1) * limit + index + 1}
              </td>
              <td className="p-3">
                <img
                  src={u.photoURL || "/avatar.png"}
                  className="w-10 h-10 rounded-full border border-gray-200 shadow-sm"
                  alt="user"
                />
              </td>
              <td className="p-3">{u.name || "—"}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3 text-sm text-gray-500">
                {u.createdAt
                  ? format(new Date(u.createdAt), "dd MMM yyyy")
                  : "—"}
              </td>
              <td className="p-3 capitalize font-semibold text-my-primary">
                {u.role}
              </td>
              <td className="p-3">
                <select
                  className="select select-bordered select-sm w-32 focus:border-my-primary focus:ring-my-primary/30 transition"
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

  {/* ✅ Elegant Pagination */}
  {totalPages > 1 && (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      {/* Prev Button */}
      <button
        className="btn btn-sm btn-outline hover:border-my-primary hover:text-my-primary transition"
        onClick={handlePrev}
        disabled={page === 1}
      >
        « Prev
      </button>

      {/* Page Numbers */}
      <div className="flex flex-wrap gap-2 justify-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => setPage(n)}
            className={`btn btn-sm ${
              n === page
                ? "bg-my-primary text-white shadow-md"
                : "btn-outline hover:border-my-primary hover:text-my-primary"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        className="btn btn-sm btn-outline hover:border-my-primary hover:text-my-primary transition"
        onClick={handleNext}
        disabled={page === totalPages}
      >
        Next »
      </button>
    </div>
  )}
</div>

  );
};

export default AllUsers;
