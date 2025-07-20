import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdminDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/admin/dashboard-stats`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-my-primary text-xl font-semibold">
        Loading admin dashboard...
      </div>
    );

  return (
  <div className="p-8 max-w-7xl mx-auto space-y-12">
  {/* Admin Info */}
  <section className="flex flex-col md:flex-row items-center gap-6 p-8 rounded-2xl shadow-xl relative overflow-hidden bg-gradient-to-r from-my-primary/90 to-my-primary-dark text-white">
    {/* Decorative background */}
    <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')] bg-cover" />

    <img
      src={user.photoURL || "/admin-avatar.png"}
      alt="Admin Avatar"
      className="w-28 h-28 rounded-full ring-4 ring-white shadow-md object-cover z-10"
    />
    <div className="z-10 text-center md:text-left">
      <h2 className="text-4xl font-extrabold mb-2 tracking-tight">
        Welcome, {user.displayName || "Admin"} 👋
      </h2>
      <p className="text-white/90 text-lg">{user.email}</p>
      <span className="inline-block mt-4 px-5 py-1.5 text-sm font-semibold bg-white/20 backdrop-blur-md rounded-full tracking-wide capitalize">
        Admin Dashboard
      </span>
    </div>
  </section>

  {/* Stats Cards */}
  <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {/* Users */}
    <div className="group relative rounded-xl p-6 shadow-lg bg-white hover:shadow-2xl transition duration-300 border-t-4 border-my-primary">
      <h3 className="text-my-primary font-bold text-xl">Users</h3>
      <p className="text-5xl font-extrabold text-my-primary mt-2">{stats.totalUsers || 0}</p>
      <p className="text-gray-500 mt-1">Registered users</p>
      <div className="absolute top-4 right-4 text-my-primary/20 text-4xl group-hover:scale-110 transition">
        👤
      </div>
    </div>

    {/* Products */}
    <div className="group relative rounded-xl p-6 shadow-lg bg-white hover:shadow-2xl transition duration-300 border-t-4 border-my-secondary">
      <h3 className="text-my-secondary font-bold text-xl">Products</h3>
      <p className="text-5xl font-extrabold text-my-secondary mt-2">{stats.totalProducts || 0}</p>
      <p className="text-gray-500 mt-1">
        ✅ {stats.approvedProducts || 0} approved, ⏳ {stats.pendingProducts || 0} pending
      </p>
      <div className="absolute top-4 right-4 text-my-secondary/20 text-4xl group-hover:scale-110 transition">
        📦
      </div>
    </div>

    {/* Orders */}
    <div className="group relative rounded-xl p-6 shadow-lg bg-white hover:shadow-2xl transition duration-300 border-t-4 border-my-accent">
      <h3 className="text-my-accent font-bold text-xl">Orders</h3>
      <p className="text-5xl font-extrabold text-my-accent mt-2">{stats.totalOrders || 0}</p>
      <p className="text-gray-500 mt-1">Customer orders</p>
      <div className="absolute top-4 right-4 text-my-accent/20 text-4xl group-hover:scale-110 transition">
        📑
      </div>
    </div>

    {/* Ads */}
    <div className="group relative rounded-xl p-6 shadow-lg bg-white hover:shadow-2xl transition duration-300 border-t-4 border-my-warning">
      <h3 className="text-my-warning font-bold text-xl">Advertisements</h3>
      <p className="text-5xl font-extrabold text-my-warning mt-2">{stats.totalAds || 0}</p>
      <p className="text-gray-500 mt-1">Active ads</p>
      <div className="absolute top-4 right-4 text-my-warning/20 text-4xl group-hover:scale-110 transition">
        📢
      </div>
    </div>
  </section>

  {/* Quick Links */}
  <section className="mt-6 flex flex-wrap gap-6 justify-center md:justify-start">
    <a
      href="/dashboard/users"
      className="flex items-center gap-2 px-6 py-3 rounded-lg bg-my-primary hover:bg-my-primary-dark text-white font-semibold shadow-md hover:shadow-lg transition duration-300"
    >
      👤 Manage Users
    </a>
    <a
      href="/dashboard/products"
      className="flex items-center gap-2 px-6 py-3 rounded-lg bg-my-secondary hover:bg-my-secondary-dark text-white font-semibold shadow-md hover:shadow-lg transition duration-300"
    >
      📦 Manage Products
    </a>
    <a
      href="/dashboard/orders"
      className="flex items-center gap-2 px-6 py-3 rounded-lg bg-my-accent hover:bg-my-accent-dark text-white font-semibold shadow-md hover:shadow-lg transition duration-300"
    >
      📑 View Orders
    </a>
    <a
      href="/dashboard/ads"
      className="flex items-center gap-2 px-6 py-3 rounded-lg bg-my-accent hover:bg-my-warning-dark text-white font-semibold shadow-md hover:shadow-lg transition duration-300"
    >
      📢 Manage Ads
    </a>
  </section>
</div>

  );
};

export default AdminDashboard;
