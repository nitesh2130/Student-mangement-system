import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Home from "./Home";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState();
  const [accessToken, setAccessToken] = useState();
  const navigate = useNavigate();

  const FormSubmitHandler = (e) => {
    e.preventDefault();
    const formData = { email, password };
    console.log("Form Submitted:", formData);
    //API call for connect to backend and DB

    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Correct header value
      },
      body: JSON.stringify(formData), // Serialize formData
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        console.log("Response data:", data);
        toast.success("You are login successfully!", {
          className: "bg-green-500 text-white font-semibold p-4 rounded-md",
          progressClassName: "bg-white",
        });

        localStorage.setItem("id", data.message.loggedInUser.id);
        localStorage.setItem("accessToken", data.message.accessToken);
        localStorage.setItem("isLogin", "true");

        navigate("/home");
      })
      .catch((error) => {
        console.error("This is an error:", error.message); // Proper error handling
      });
    //console.log(`login:....................${id}`);
  };

  //To navigate signUp page
  const redirectToSignUp = () => {
    navigate("/signup");
  };

  // console.log(`this is id ..........${id}`);
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

// fetch("http://your-backend-url/api/endpoint")
//   .then((response) => {
//     if (!response.ok) {
//       // Handle backend-defined errors
//       return response.json().then((data) => {
//         throw new Error(data.error); // Backend-defined error
//       });
//     }
//     return response.json();
//   })
//   .catch((error) => {
//     console.error("Backend error:", error.message); // "Invalid request"
//   });
