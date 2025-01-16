import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const FormSubmitHandler = (e) => {
    e.preventDefault();
    const formData = { email, password };
    console.log("Form Submitted:", formData);
    //API call for connect to backend and DB
  };

  //To navigate signUp page
  const navigate = useNavigate();
  const redirectToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-400 to-purple-500">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Log In
        </h2>
        <form className="space-y-6" onSubmit={FormSubmitHandler}>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-pink-600 transition"
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <button
            className="text-pink-500 font-medium hover:underline"
            onClick={redirectToSignUp}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
