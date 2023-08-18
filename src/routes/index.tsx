import { Navigate, createBrowserRouter } from "react-router-dom";
import AuthPage from "../pages/auth";
import SignInForm from "../pages/auth/SignInForm";
import SignUpForm from "../pages/auth/SignUpForm";

const router = createBrowserRouter([
  { path: "/", element: <div className="text-green-700">Hi</div> },
  {
    path: "auth",
    element: <AuthPage />,
    children: [
      { index: true, element: <Navigate to="/auth/signup" replace /> },
      {
        path: "signin",
        element: <SignInForm />,
      },
      {
        path: "signup",
        element: <SignUpForm />,
      },
    ],
  },
]);

export default router;
