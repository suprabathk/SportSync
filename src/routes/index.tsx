import { Navigate, createBrowserRouter } from "react-router-dom";
import AuthPage from "../pages/auth";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import SignOut from "../pages/auth/SignOut";
import HomeLayout from "../pages/home";
import MatchModal from "../pages/match";
import ArticleModal from "../pages/article";
import PreferencesModal from "../pages/preferences";
import ResetPassword from "../pages/auth/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomeLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <></> },
      {
        path: "match",
        children: [
          { index: true, element: <Navigate to="/" replace /> },
          {
            path: ":matchID",
            element: <MatchModal />,
          },
        ],
      },
      {
        path: "article",
        children: [
          { index: true, element: <Navigate to="/" replace /> },
          {
            path: ":articleID",
            element: <ArticleModal />,
          },
        ],
      },
      {
        path: "preferences",
        element: <PreferencesModal />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
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
