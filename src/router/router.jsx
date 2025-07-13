import {createBrowserRouter} from "react-router";
import mainLayout from "../layout/mainLayout";
import Home from "../pages/Home";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import Forbidden from "../pages/Forbidden";
import DashboardHome from "../dashboard/DashboardHome";
import Watchlist from '../dashboard/user/Watchlist';
import OrderList from '../dashboard/user/OrderList';
import PriceTrends from '../dashboard/user/PriceTrends';
import AdminRoute from '../routes/AdminRoute'
import AllOrders from '../dashboard/admin/AllOrders'
import AllProducts from '../dashboard/admin/AllProducts'
import AllUsers from '../dashboard/admin/AllUsers'
import AllAdvertisements from '../dashboard/admin/AllAdvertisements'



export const router = createBrowserRouter([
  {
    path: "/",
    Component: mainLayout,
    children: [
        {
            index: true,
            Component:Home
        },
        {
            path:'/login',
            Component:Login
        },
        {
            path: '/register',
            Component: Register
        },
        {
          path:'/forbidden',
          Component:Forbidden
        }
    ]
  },
  {
    path:'/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        index: true,
        Component: DashboardHome
      },
      {
        path:'watchlist',
        element:<Watchlist></Watchlist>
      }, 
      {
        path:'orders',
        element: <OrderList></OrderList>
      },
      {
        path: 'trends',
        element:<PriceTrends></PriceTrends>
      },
      //admin routes
      {
        path: 'users',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path:'products',
        element: <AdminRoute><AllProducts></AllProducts></AdminRoute>
      },
      {
        path:'ads',
        element: <AdminRoute><AllAdvertisements></AllAdvertisements></AdminRoute>
      },
      {
        path: 'orders',
        element: <AdminRoute><AllOrders></AllOrders></AdminRoute>
      }
    ]
  },

]);


