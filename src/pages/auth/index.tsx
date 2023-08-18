import React from "react";
import AuthInfo from "./AuthInfo";
import { Outlet } from "react-router-dom";

const SignIn: React.FC = () => {
  return (
    <div className="h-screen flex">
      <Outlet />
      <div className="hidden md:flex w-[50%]">
        <AuthInfo />
      </div>
    </div>
  );
};

export default SignIn;
