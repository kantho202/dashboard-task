import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardLayout from "../layout/DashboardLayout";
import Products from "../components/Products/Products";
import Users from "../components/Users/User";
import Analytics from "../components/Analytics/Analytics";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRouter from "./PrivateRouter";
import RootLayout from "../layout/RootLayout";

export const router = createBrowserRouter([
 
  {
    path: "/",
    element:<PrivateRouter><DashboardLayout></DashboardLayout></PrivateRouter>,
    children:[
       {
        index: true,
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
   {
    path:'/',
    element: <AuthLayout />,
    children:[
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/register',
        element:<Register></Register>
      }
    ]
  },
]);