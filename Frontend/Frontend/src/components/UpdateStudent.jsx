import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateStudent = () => {
  const [newStudent, setNewStudent] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const studentInString = queryParams.get("student");

  useEffect(() => {
    if (studentInString) {
      setNewStudent(JSON.parse(studentInString));
    }
  }, [studentInString]);

  const id = newStudent?.id;
  const accessToken = localStorage.getItem("accessToken");
  const apiUrl = `http://localhost:3000/users/student/updateStudent/${id}`;

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin !== "true") {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(newStudent),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Update successful", data);
        navigate("/home");
      })
      .catch((error) => console.log(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        User Information Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            name="name"
            required
            value={newStudent.name || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            name="email"
            required
            value={newStudent.email || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Branch:
          </label>
          <input
            type="text"
            name="branch"
            required
            value={newStudent.branch || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter your branch"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Semester:
          </label>
          <input
            type="text"
            name="semester"
            required
            value={newStudent.semester || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter your semester"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth:
          </label>
          <input
            type="date"
            name="dob"
            required
            value={newStudent.dob || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateStudent;
