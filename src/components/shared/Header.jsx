import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import Logo from "./logo";

const Header = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then((result) => {
        console.log(result);
        toast.success("You have Logged Out");
      })
      .catch((error) => console.log(error));
  };

  return (
    <header className="bg-my-primary shadow-md sticky top-0 z-50">
      <div className="navbar container mx-auto px-8">
        {/* ✅ Left: Logo */}
        <div className="flex-1">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl text-white"
          >
            <Logo></Logo>
          </Link>
        </div>

        {/* ✅ Mobile Dropdown */}
        <div className="flex-none lg:hidden">
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="btn btn-ghost text-white"
              aria-label="Open Menu"
            >
              {/* DaisyUI hamburger icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to="/all-products">All Products</NavLink>
              </li>

              {!user && (
                <>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">Sign Up</NavLink>
                  </li>
                </>
              )}

              {user && (
                <>
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li>
                    <button onClick={handleLogOut}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* ✅ Desktop Menu */}
        <nav className="hidden lg:flex gap-4 text-white">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "font-bold" : "hover:text-white/80"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/all-products"
            className={({ isActive }) =>
              isActive ? "font-bold" : "hover:text-white/80"
            }
          >
            All Products
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "font-bold" : "hover:text-white/80"
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "font-bold" : "hover:text-white/80"
            }
          >
            Contact Us
          </NavLink>

          {!user && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "font-bold" : "hover:text-white/80"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "font-bold" : "hover:text-white/80"
                }
              >
                Sign Up
              </NavLink>
            </>
          )}

          {user && (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "font-bold" : "hover:text-white/80"
                }
              >
                Dashboard
              </NavLink>

              {/* User profile picture */}
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-white font-bold">
                  {user.displayName?.charAt(0) || "U"}
                </div>
              )}

              <button
                onClick={handleLogOut}
                className="btn btn-sm btn-outline ml-2"
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
