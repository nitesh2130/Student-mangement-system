import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddStudent = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");

    if (isLogin !== "true") {
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Details:", user);

    fetch("http://localhost:3000/users/student/registerStudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to register student");
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Student registered successfully!", {
          className: "bg-green-500 text-white font-semibold p-4 rounded-md",
          progressClassName: "bg-white",
        });

        navigate("/home");
      })
      .catch((error) => {
        console.error("Error registering:", error.message);
      });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Add Student
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={user.name || ""}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter student's name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={user.email || ""}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter student's email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Branch:
          </label>
          <input
            type="text"
            name="branch"
            value={user.branch || ""}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter student's branch"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Semester:
          </label>
          <input
            type="text"
            name="semester"
            value={user.semester || ""}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter semester"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth:
          </label>
          <input
            type="date"
            name="dob"
            value={user.dob || ""}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:outline-none"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
