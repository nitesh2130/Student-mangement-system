import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const StudentRow = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [refresh, setrefresh] = useState(1);

  // Replace this with your actual API URL
  const apiUrl = "http://localhost:3000/users/student/Student";

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");

    if (isLogin === "true") {
      setToken(localStorage.getItem("accessToken"));
    } else {
      // Redirect to login if not logged in
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => setStudents(data?.message?.allStudent))
        .catch((err) => setError(err.message));
    }
  }, [apiUrl, token, refresh]);

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  //delete student
  const deleteStudent = () => {
    fetch(`http://localhost:3000/users/student/deleteStudent/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        id: id,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        setrefresh(refresh + 1);
        return response.json();
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        Student List
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 bg-white shadow-md"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {student.name}
            </h2>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Branch:</span> {student.branch}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Role:</span> {student.role}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Email:</span> {student.email}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Date of Birth:</span> {student.dob}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Semester:</span> {student.semester}
            </p>
            <div className="flex flex-row justify-between m-2 p-2">
              <button>
                <FaEdit onClick={updatestudentupdate} />
              </button>
              <button>
                <MdDelete onClick={deleteStudent} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentRow;
