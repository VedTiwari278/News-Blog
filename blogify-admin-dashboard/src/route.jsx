import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./features/LandingPage";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import AuthLayout from "./features/auth/AuthLayout";
import Protected from "./protected/Protected";
import Dashboard from "./features/dashboard/Dashboard";
import { dashboardRoutes } from "./router/admin.router";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },

  {
    path: "/login",
    element: <AuthLayout />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: "/register",
    element: <AuthLayout />,
    children: [{ index: true, element: <Register /> }],
  },

  {
    path: "/dashboard",
    element: (
      <Protected>
        <Dashboard />
      </Protected>
    ),
    children: dashboardRoutes,
  },
]);

export default router;
