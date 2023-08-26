import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const [signUpErrors, setSignUpErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_ENDPOINT}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const JSONData = await response.json();
      setLoading(false);
      if (!response.ok) {
        setSignUpErrors(JSONData.errors);
        throw new Error("Sign-up failed");
      }
      console.log("Sign-up successful");
      localStorage.setItem("authToken", JSONData.auth_token);
      localStorage.setItem("userData", JSON.stringify(JSONData.user));
      navigate("/");
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };

  useEffect(() => {
    !!localStorage.getItem("authToken") && navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full md:w-[50%] bg-white px-12 md:px-24 flex flex-col items-start justify-center"
    >
      <h2 className="font-space-grotesk font-bold text-5xl">
        Welcome to <br />
        <Link to="/" className="text-sky-600">
          SportSync
        </Link>
      </h2>
      <p className="font-lexend-deca mt-3 mb-3 text-gray-600">
        Create an account.
      </p>
      <div className="mb-3">
        {signUpErrors.map((err, id) => (
          <span className="text-red-500" key={id}>
            {err}
          </span>
        ))}
      </div>
      <div className="mb-6 w-full">
        <label
          htmlFor="name"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          Name
        </label>
        {errors.name && <span className="text-red-500">Name is required</span>}
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
          placeholder="John Doe"
        />
      </div>
      <div className="mb-6 w-full">
        <label
          htmlFor="email"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          Email address
        </label>
        {errors.email && (
          <span className="text-red-500">Email is required</span>
        )}
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
          placeholder="john.doe@company.com"
        />
      </div>
      <div className="mb-6 w-full">
        <label
          htmlFor="password"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          Set a password
        </label>
        {errors.password && (
          <span className="text-red-500">Password is required</span>
        )}
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
          placeholder="•••••••••"
        />
      </div>
      <button className="w-full md:w-fit bg-sky-600 text-white px-6 py-2 rounded-md hover:bg-sky-700 transition-colors">
        {loading ? "Signing up..." : "Sign up"}
      </button>
      <p className="font-lexend-deca mt-3 mb-6 text-gray-600">
        Already have an account?{" "}
        <Link
          className="text-sky-600 hover:text-sky-700 hover:underline transition-colors"
          to="/auth/signin"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
