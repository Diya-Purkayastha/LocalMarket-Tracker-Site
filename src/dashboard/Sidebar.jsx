import { Link } from 'react-router'; 
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { useEffect } from 'react';


const Sidebar = () => {
  const { user, loading: authLoading, } = useAuth();
  const { role, roleLoading, refetch } = useUserRole(); 

  useEffect(() => {
    refetch();
  }, [refetch]);
  if (authLoading || roleLoading) {
    return <span className="loading loading-spinner loading-lg block mx-auto my-10"></span>;
  }


  return (
    <div className="w-64 bg-base-100 shadow-lg p-5">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <ul className="space-y-3">
        {role === 'admin' && (
          <>
            <li><Link to="users">All Users</Link></li>
            <li><Link to="products">All Products</Link></li>
            <li><Link to="ads">All Ads</Link></li>
            <li><Link to="orders">All Orders</Link></li>
          </>
        )}
        {role === 'vendor' && (
          <>
            <li><Link to="add-product">Add Product</Link></li>
            <li><Link to="my-products">My Products</Link></li>
            <li><Link to="add-ad">Add Advertisement</Link></li>
            <li><Link to="my-ads">My Ads</Link></li>
          </>
        )}
        {role === 'user' && (
          <>
            <li><Link to="watchlist">My Watchlist</Link></li>
            <li><Link to="orders">My Orders</Link></li>
            <li><Link to="trends">Price Trends</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
