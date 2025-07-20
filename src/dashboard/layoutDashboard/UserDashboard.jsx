import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaRegEye, FaShoppingCart, FaUserShield } from "react-icons/fa";

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch watchlist count
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["user-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/user/dashboard-stats?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading)
    return <div className="text-center py-20 text-lg">Loading your dashboard...</div>;

  return (
    <div className="pb-10">
      {/* ✅ Dashboard Header */}
      <div className="relative bg-gradient-to-r from-my-primary to-my-secondary text-white rounded-b-2xl shadow-md">
        <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row items-center gap-6">
          <img
            src={user.photoURL || "/avatar.png"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full ring ring-offset-2 ring-white shadow-lg"
          />
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {user.displayName || "User"} 👋
            </h1>
            <p className="text-gray-100">{user.email}</p>
            <span className="mt-2 inline-block badge badge-accent text-white capitalize">
              {stats.role || "user"}
            </span>
          </div>
        </div>
      </div>

      {/* ✅ Quick Dashboard Stats */}
      <div className="container mx-auto px-6 mt-10">
        <h2 className="text-2xl font-bold mb-6 text-my-primary">Your Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Watchlist */}
          <div className="card bg-base-100 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 rounded-xl">
            <div className="card-body text-center">
              <div className="flex justify-center items-center text-my-primary text-4xl mb-3">
                <FaRegEye />
              </div>
              <h2 className="card-title justify-center text-my-primary">
                Watchlist
              </h2>
              <p className="text-4xl font-extrabold">{stats.watchlistCount || 0}</p>
              <p className="text-gray-500">Items you’re watching</p>
            </div>
          </div>

          {/* Orders */}
          <div className="card bg-base-100 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 rounded-xl">
            <div className="card-body text-center">
              <div className="flex justify-center items-center text-my-secondary text-4xl mb-3">
                <FaShoppingCart />
              </div>
              <h2 className="card-title justify-center text-my-secondary">
                Orders
              </h2>
              <p className="text-4xl font-extrabold">{stats.orderCount || 0}</p>
              <p className="text-gray-500">Total orders placed</p>
            </div>
          </div>

          {/* Role */}
          <div className="card bg-base-100 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 rounded-xl">
            <div className="card-body text-center">
              <div className="flex justify-center items-center text-my-accent text-4xl mb-3">
                <FaUserShield />
              </div>
              <h2 className="card-title justify-center text-my-accent">Role</h2>
              <p className="text-2xl font-bold capitalize">{stats.role || "user"}</p>
              <p className="text-gray-500">Current access level</p>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Extra filler section (optional) */}
      <div className="container mx-auto px-6 mt-12 text-center">
        <p className="text-lg text-gray-500 italic">
          “Track, compare, and shop smarter every day with LocalMarket Tracker.”
        </p>
      </div>
    </div>
  );
};

export default UserDashboard;
