import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formHandler = async (e) => {
    e.preventDefault();
    const registerUserData = { name, role, email, password };
    console.log("Form Submitted:", registerUserData);
    setName("");
    setEmail("");
    setPassword("");
    setRole("");

    //do api call for save the data on backend
    await fetch("http://localhost:3000/users/register", {
      method: "POST", // Use POST to send data to the backend
      headers: {
        "Content-Type": "application/json", // Send JSON data
      },
      body: JSON.stringify(registerUserData), // Convert the data object to a JSON string
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to register");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        console.log("Registration successful:", data);
        toast.success("You are registerd successfully!", {
          className: "bg-green-500 text-white font-semibold p-4 rounded-md",
          progressClassName: "bg-white",
        });
      })
      .catch((error) => {
        console.error("Error registering:", error.message);
      });
  };
  //};

  //To navigate login page
  const navigate = useNavigate();
  const redirectToLogin = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-400 to-pink-500">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Create an Account
        </h2>
        <form className="space-y-4" onSubmit={formHandler}>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Role</label>
            <input
              type="text"
              placeholder="Enter your role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
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
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <button
            onClick={redirectToLogin}
            className="text-orange-500 font-medium hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
