import { Navigate, createBrowserRouter } from "react-router-dom";
import AuthPage from "../pages/auth";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import SignOut from "../pages/auth/SignOut";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <div className="text-green-700">Hi</div>
      </ProtectedRoute>
    ),
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
