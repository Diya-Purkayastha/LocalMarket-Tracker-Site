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
import VendorRoute from '../routes/VendorRoute'
import AllOrders from '../dashboard/admin/AllOrders'
import AllProducts from '../dashboard/admin/AllProducts'
import AllUsers from '../dashboard/admin/AllUsers'
import AllAdvertisements from '../dashboard/admin/AllAdvertisements'
import AddProducts from '../dashboard/vendor/AddProducts'
import AddAdvertisement from '../dashboard/vendor/AddAdvertisement'
import MyProducts from '../dashboard/vendor/MyProducts'
import UpdateProduct from '../dashboard/vendor/UpdateProduct'
import MyAdvertisements from '../dashboard/vendor/MyAdvertisements'
import AllProductsPage from "../pages/AllProductsPage";
import DetailsPage from "../pages/DetailsPage";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentCancelled from "../pages/PaymentCancel";
import PaymentPage from "../pages/PaymentPage";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import ForgetPass from "../pages/authentication/ForgetPass";
import AboutPage from "../pages/AboutPage";
import ContactUs from "../pages/ContactUs";
import AuthLayout from "../layout/AuthLayout";



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
          path: '/about',
          Component: AboutPage
        },
        {
          path: '/contact',
          Component: ContactUs
        },
        {
          path:'/forbidden',
          Component:Forbidden
        },
        {
          path:'all-products',
          Component: AllProductsPage
        },
      {
        path: '/details/:id',
        Component: DetailsPage
      },
      {
        path:"/payment-success",
        element: <PaymentSuccess />
      },
      {
        path:"/payment-cancelled",
         element:<PaymentCancelled />
      },
      {
        path: '/payment',
        Component: PaymentPage
      }, 
      {
        path: '/privacypolicy',
        Component: PrivacyPolicy
      },
      
    ]
  },
  {
    path:'/auth',
    element: <AuthLayout></AuthLayout>,
    children: [
       {
            path:'login',
            Component:Login
        },
        {
            path: 'register',
            Component: Register
        },
        {
        path: 'forgetpass',
        Component: ForgetPass
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
        path: 'all-orders',
        element: <AdminRoute><AllOrders></AllOrders></AdminRoute>
      },

      //vendor routes
      {
        path: 'add-product',
        element:<VendorRoute><AddProducts></AddProducts></VendorRoute>
      }, 
    {
      path: 'my-products',
      element:<VendorRoute><MyProducts></MyProducts></VendorRoute>
    },
    {
      path: 'add-ad',
      element: <VendorRoute><AddAdvertisement></AddAdvertisement></VendorRoute>
    },
    {
      path: 'my-ads',
      element:<VendorRoute><MyAdvertisements></MyAdvertisements></VendorRoute>
    },
    {
      path: 'update-product/:id',
      element:<UpdateProduct></UpdateProduct>
    }
    ]
  },

]);


