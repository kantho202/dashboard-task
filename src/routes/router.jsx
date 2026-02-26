import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardLayout from "../layout/DashboardLayout";
import Products from "../components/Products/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    element:<DashboardLayout></DashboardLayout>,
    children:[
      {
        path:'/products',
        element:<Products></Products>
      }
    ]
  },
]);