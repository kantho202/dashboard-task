import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardLayout from "../layout/DashboardLayout";
import Products from "../components/Products/Products";
import Users from "../components/Users/User";
import Analytics from "../components/Analytics/Analytics";

export const router = createBrowserRouter([
  {
    path: "/",
    element:<DashboardLayout></DashboardLayout>,
    children:[
       {
        path:'/',
        element:<Dashboard></Dashboard>
      },
      {
        path:'/analytics',
        element:<Analytics></Analytics>
      },
      {
        path:'/products',
        element:<Products></Products>
      },
      {
        path:'/users',
        element:<Users></Users>
      }
    ]
  },
]);