import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";


const Header = () => {
  const { user, logOut } = useAuth();
  const handleLogOut = () => {
        logOut()
            .then(result => { 
              console.log(result) 
              toast.success("You have Logged Out")
            })
            .catch(error => console.log(error))
    }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-0">
        {/* Logo + Site Name */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-pink-600">
          <span className="text-3xl">🛍️</span>
          <span>LocalMarket Tracker</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <NavLink
            to="/all-products"
            className={({ isActive }) =>
              isActive ? "text-pink-600 font-semibold" : "hover:text-pink-500"
            }
          >
            All Products
          </NavLink>

          {!user && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "text-pink-600 font-semibold" : "hover:text-pink-500"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "text-pink-600 font-semibold" : "hover:text-pink-500"
                }
              >
                Sign Up
              </NavLink>
            </>
          )}

          {user && (
            <>
              <NavLink
                to={`/dashboard`}
                className={({ isActive }) =>
                  isActive ? "text-pink-600 font-semibold" : "hover:text-pink-500"
                }
              >
                Dashboard
              </NavLink>
              {/* User profile picture */}
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full border-2 border-pink-600"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-pink-300 flex items-center justify-center text-white font-bold">
                  {user.displayName?.charAt(0) || "U"}
                </div>
              )}
              <button
                onClick={handleLogOut}
                className="btn btn-sm btn-outline btn-error ml-2"
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
