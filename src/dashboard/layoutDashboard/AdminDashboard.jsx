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
    <div className="p-6 max-w-7xl mx-auto">
      {/* Admin Info */}
      <section className="flex flex-col md:flex-row items-center gap-6 p-6 bg-my-primary bg-opacity-10 rounded-xl shadow-lg border border-my-primary">
        <img
          src={user.photoURL || "/admin-avatar.png"}
          alt="Admin Avatar"
          className="w-24 h-24 rounded-full ring-4 ring-my-primary shadow-md object-cover"
        />
        <div>
          <h2 className="text-3xl font-extrabold text-my-primary mb-1">
            Welcome Admin, {user.displayName || "Admin"} 👋
          </h2>
          <p className="text-my-primary/70 text-lg">{user.email}</p>
          <span className="inline-block mt-3 px-4 py-1 text-my-primary bg-my-primary/20 rounded-full font-semibold tracking-wide capitalize select-none">
            Admin
          </span>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Users */}
        <div className="bg-my-primary/10 border-l-8 border-my-primary rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-shadow">
          <h3 className="text-my-primary font-bold text-xl mb-3">Users</h3>
          <p className="text-5xl font-extrabold text-my-primary">{stats.totalUsers || 0}</p>
          <p className="text-my-primary/70 mt-1">Registered users</p>
        </div>

        {/* Products */}
        <div className="bg-my-secondary/10 border-l-8 border-my-secondary rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-shadow">
          <h3 className="text-my-secondary font-bold text-xl mb-3">Products</h3>
          <p className="text-5xl font-extrabold text-my-secondary">{stats.totalProducts || 0}</p>
          <p className="text-my-secondary/70 mt-1">
            ✅ {stats.approvedProducts || 0} approved, ⏳ {stats.pendingProducts || 0} pending
          </p>
        </div>

        {/* Orders */}
        <div className="bg-my-accent/10 border-l-8 border-my-accent rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-shadow">
          <h3 className="text-my-accent font-bold text-xl mb-3">Orders</h3>
          <p className="text-5xl font-extrabold text-my-accent">{stats.totalOrders || 0}</p>
          <p className="text-my-accent/70 mt-1">Customer orders</p>
        </div>

        {/* Ads */}
        <div className="bg-my-warning/10 border-l-8 border-my-warning rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-shadow">
          <h3 className="text-my-warning font-bold text-xl mb-3">Advertisements</h3>
          <p className="text-5xl font-extrabold text-my-warning">{stats.totalAds || 0}</p>
          <p className="text-my-warning/70 mt-1">Active ads</p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="mt-12 flex flex-wrap gap-5 justify-center md:justify-start">
        <a
          href="/dashboard/users"
          className="btn bg-my-primary hover:bg-my-primary-dark text-white font-semibold shadow-lg transition duration-300"
        >
          👤 Manage Users
        </a>
        <a
          href="/dashboard/products"
          className="btn bg-my-secondary hover:bg-my-secondary-dark text-white font-semibold shadow-lg transition duration-300"
        >
          📦 Manage Products
        </a>
        <a
          href="/dashboard/orders"
          className="btn bg-my-accent hover:bg-my-accent-dark text-white font-semibold shadow-lg transition duration-300"
        >
          📑 View Orders
        </a>
        <a
          href="/dashboard/ads"
          className="btn bg-my-warning hover:bg-my-warning-dark text-white font-semibold shadow-lg transition duration-300"
        >
          📢 Manage Ads
        </a>
      </section>
    </div>
  );
};

export default AdminDashboard;
