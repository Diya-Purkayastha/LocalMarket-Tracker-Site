import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { FaBoxOpen, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa";

const VendorDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["vendor-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/vendor/dashboard-stats?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-gray-500 animate-pulse">
        Loading your dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-my-neutral via-white to-my-accent p-6 space-y-8">
      
      {/* ✅ Vendor Info Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-base-100 shadow-xl rounded-xl border border-my-accent">
        <img
          src={user.photoURL || "/avatar.png"}
          alt="Vendor Avatar"
          className="w-24 h-24 rounded-full ring-4 ring-my-primary shadow-md"
        />
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-my-primary">
            Welcome, {user.displayName || "Vendor"} 👋
          </h2>
          <p className="text-gray-500">{user.email}</p>
          <div className="badge bg-my-secondary text-white mt-3 capitalize">
            {stats.role || "vendor"}
          </div>
        </div>
      </div>

      {/* ✅ Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Products */}
        <div className="card bg-my-neutral hover:scale-105 transition duration-200 shadow-lg border-t-4 border-my-primary">
          <div className="card-body text-center">
            <FaBoxOpen className="text-4xl text-my-primary mx-auto mb-2" />
            <h2 className="text-xl font-bold text-my-primary">Total Products</h2>
            <p className="text-4xl font-extrabold">{stats.totalProducts || 0}</p>
            <p className="text-gray-600">All your submissions</p>
          </div>
        </div>

        {/* Approved */}
        <div className="card bg-base-100 hover:scale-105 transition duration-200 shadow-lg border-t-4 border-my-secondary">
          <div className="card-body text-center">
            <FaCheckCircle className="text-4xl text-my-secondary mx-auto mb-2" />
            <h2 className="text-xl font-bold text-my-secondary">Approved</h2>
            <p className="text-4xl font-extrabold">{stats.approvedProducts || 0}</p>
            <p className="text-gray-600">Live on marketplace</p>
          </div>
        </div>

        {/* Pending */}
        <div className="card bg-my-accent hover:scale-105 transition duration-200 shadow-lg border-t-4 border-yellow-400">
          <div className="card-body text-center">
            <FaHourglassHalf className="text-4xl text-yellow-500 mx-auto mb-2" />
            <h2 className="text-xl font-bold text-yellow-600">Pending</h2>
            <p className="text-4xl font-extrabold">{stats.pendingProducts || 0}</p>
            <p className="text-gray-700">Awaiting admin approval</p>
          </div>
        </div>

        {/* Rejected */}
        <div className="card bg-base-100 hover:scale-105 transition duration-200 shadow-lg border-t-4 border-red-500">
          <div className="card-body text-center">
            <FaTimesCircle className="text-4xl text-red-500 mx-auto mb-2" />
            <h2 className="text-xl font-bold text-red-500">Rejected</h2>
            <p className="text-4xl font-extrabold">{stats.rejectedProducts || 0}</p>
            <p className="text-gray-600">Needs correction</p>
          </div>
        </div>

      </div>

      {/* ✅ Divider for Actions */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-my-primary mb-4">
          Quick Actions
        </h3>
        <div className="w-24 mx-auto border-b-4 border-my-secondary"></div>
      </div>

      {/* ✅ Quick Actions */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <Link 
          to="/dashboard/add-product" 
          className="btn bg-my-primary hover:bg-my-secondary text-white shadow-lg"
        >
          ➕ Add New Product
        </Link>
        <Link 
          to="/dashboard/my-products" 
          className="btn bg-my-secondary hover:bg-my-primary text-white shadow-lg"
        >
          📦 View My Products
        </Link>
      </div>

    </div>
  );
};

export default VendorDashboard;
