import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AdminDashboardHome from "../pages/Dashboard/AdminDashboard/AdminDashboardHome";
import DashboardHome from "../pages/Dashboard/UserDashboard/DashboardHome";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import UserDashboardHome from "../pages/Dashboard/UserDashboard/UserDashboardHome";
import MyBooking from "../pages/Dashboard/UserDashboard/MyBooking";
import Facility from "../pages/Facility/Facility";
import FacilityDetails from "../pages/Facility/FacilityDetails";
import Booking from "../pages/Booking/Booking";
import Dashboard from "../pages/Dashboard/AdminDashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path : '/facility',
        element : <Facility></Facility>
      },
      {
        path : '/facilityDetails/:id',
        element : <FacilityDetails></FacilityDetails>
      },
      {
        path : '/facilityBooking/:id',
        element : <Booking></Booking>
      },
    ],
  },
  {
    path: "/admin/dashboard/home",
    element: (
      <ProtectedRoute role="admin">
        <AdminDashboardHome />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/admin/dashboard/home",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/user/dashboard",
    element: (
      <ProtectedRoute role="user">
        <UserDashboardHome />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/user/dashboard/home",
        element: <DashboardHome />,
      },
      {
        path: "/user/dashboard/bookings",
        element: <MyBooking />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);

export default router;
