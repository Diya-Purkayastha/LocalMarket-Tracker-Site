import {
  createBrowserRouter,
} from "react-router";
import mainLayout from "../layout/mainLayout";
import Home from "../pages/Home";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: mainLayout,
    children: [
        {
            index: true,
            Component:Home
        }
    ]
  },
]);


