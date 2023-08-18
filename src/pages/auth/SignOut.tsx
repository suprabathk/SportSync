import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const SignOut = () => {
  useEffect(() => {
    localStorage.removeItem("authToken");
  }, []);

  return <Navigate to="/auth/signin" />;
};

export default SignOut;
