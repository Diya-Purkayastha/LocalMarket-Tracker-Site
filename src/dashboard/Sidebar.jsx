import { Link, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import { useEffect } from "react";
import { Home, Menu } from "lucide-react"; // optional icon

const Sidebar = () => {
  const { user, loading: authLoading } = useAuth();
  const { role, roleLoading, refetch } = useUserRole();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (authLoading || roleLoading) {
    return (
      <span className="loading loading-spinner loading-lg block mx-auto my-10"></span>
    );
  }

  return (
    <div className="drawer lg:drawer-open">
      {/* Drawer Toggle Button for Mobile */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-4">
        {/* Top Navbar for Mobile */}
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <h2 className="text-xl text-my-primary font-bold">Dashboard</h2>
          <label
            htmlFor="dashboard-drawer"
            className="btn bg-my-primary text-white drawer-button lg:hidden"
          >
            <Menu size={20} /> {/* hamburger icon */}
          </label>
        </div>

        {/* ✅ Here you render the main dashboard content */}
        <div className="p-4">
          {/* Outlet or content goes here */}
          <Outlet></Outlet>
        </div>
      </div>

      {/* Sidebar Drawer */}
      <div className="drawer-side">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 w-64 min-h-full bg-my-primary text-white">
          <h2 className="text-xl font-bold mb-6">Dashboard</h2>
          <ul className="space-y-3">
            {role === "admin" && (
              <>
                <li>
                  <Link to="users">All Users</Link>
                </li>
                <li>
                  <Link to="products">All Products</Link>
                </li>
                <li>
                  <Link to="ads">All Ads</Link>
                </li>
                <li>
                  <Link to="all-orders">All Orders</Link>
                </li>
              </>
            )}
            {role === "vendor" && (
              <>
                <li>
                  <Link to="add-product">Add Product</Link>
                </li>
                <li>
                  <Link to="my-products">My Products</Link>
                </li>
                <li>
                  <Link to="add-ad">Add Advertisement</Link>
                </li>
                <li>
                  <Link to="my-ads">My Ads</Link>
                </li>
              </>
            )}
            {role === "user" && (
              <>
                <li>
                  <Link to="watchlist">My Watchlist</Link>
                </li>
                <li>
                  <Link to="orders">My Orders</Link>
                </li>
                <li>
                  <Link to="trends">Price Trends</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/" className="flex items-center gap-2 font-bold p-2 border-1">
                <Home size={18} /> 
                Back To Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
