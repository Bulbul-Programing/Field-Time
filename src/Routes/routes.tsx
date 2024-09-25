import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AdminDashboardHome from "../pages/Dashboard/AdminDashboard/adminDashboardHome";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children : [
        {
            path : '/',
            element : <Home></Home>
        }
    ]
  },
  {
    path : '/admin/dashboard/home',
    element : <AdminDashboardHome></AdminDashboardHome>
  },
  {
    path : '/login',
    element: <Login></Login>
  },
  {
    path : '/register',
    element : <Register></Register>
  }
]);

export default router;
