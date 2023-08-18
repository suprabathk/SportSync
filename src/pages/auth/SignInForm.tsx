import React from "react";
import { Link } from "react-router-dom";

const SignInForm: React.FC = () => {
  return (
    <div className="w-full md:w-[50%] bg-white px-12 md:px-24 flex flex-col items-start justify-center">
      <h2 className="font-space-grotesk font-bold text-5xl">
        Welcome back to <br />
        <span className="text-blue-600">SportSync</span>
      </h2>
      <p className="font-lexend-deca mt-3 mb-6 text-gray-600">
        Sign in to your account.
      </p>
      <div className="mb-6 w-full">
        <label
          htmlFor="email"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          Email address
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="john.doe@company.com"
          required
        />
      </div>
      <div className="mb-6 w-full">
        <label
          htmlFor="password"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="•••••••••"
          required
        />
      </div>
      <button className="w-full md:w-fit bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition-colors">
        Sign In
      </button>
      <p className="font-lexend-deca mt-3 mb-6 text-gray-600">
        Don't have an account?{" "}
        <Link
          className="text-blue-600 hover:text-blue-400 hover:underline transition-colors"
          to="/auth/signup"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
