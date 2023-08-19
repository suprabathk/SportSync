import { Navigate, createBrowserRouter } from "react-router-dom";
import AuthPage from "../pages/auth";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import SignOut from "../pages/auth/SignOut";
import HomeLayout from "../pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomeLayout />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <></> }],
  },
  {
    path: "auth",
    element: <AuthPage />,
    children: [
      { index: true, element: <Navigate to="/auth/signup" replace /> },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "signout",
        element: <SignOut />,
      },
    ],
  },
]);

export default router;
