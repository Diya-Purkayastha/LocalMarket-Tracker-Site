import {createBrowserRouter} from "react-router";
import mainLayout from "../layout/mainLayout";
import Home from "../pages/Home";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import Forbidden from "../pages/Forbidden";


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
        path:'users',
        element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path:'products',
         element:<AdminRoute><AllProduct></AllProduct></AdminRoute>
      }, 
      {

      }
    ]
  },

]);


