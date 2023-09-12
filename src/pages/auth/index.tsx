import React, { Suspense } from "react";
const AuthInfo = React.lazy(() => import("./AuthInfo"));
import { Outlet } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";

const SignIn: React.FC = () => {
  return (
    <div className="h-screen flex">
      <Outlet />
      <div className="hidden md:flex w-[50%]">
        <ErrorBoundary>
          <Suspense
            fallback={<div className="suspense-loading">Loading...</div>}
          >
            <AuthInfo />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default SignIn;
