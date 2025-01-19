import React, { useState, useEffect } from "react";
import AddStudent from "./AddStudent";
import SearchStudent from "./SearchStudent";
import StudentRow from "./StudentRow";
import { FiSearch } from "react-icons/fi";
import { GrAddCircle } from "react-icons/gr";
import {
  BrowserRouter,
  Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState();
  const [error, setError] = useState();
  const accessToken = localStorage.getItem("accessToken");
  const apiUrl = "http://localhost:3000/users/student/Student";
  const toSwitchAddStudent = () => {
    navigate("/addstudent");
  };

  useEffect(() => {
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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
  }, [apiUrl]);

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  const toSwitchSearchStudent = () => {
    navigate("/searchstudent");
  };

  return (
    <div className="">
      <div className="p-4 flex flex-row justify-between">
        <button onClick={toSwitchAddStudent} className="flex flex-row gap-4">
          Add New Student
          <GrAddCircle className="text-2xl" />
        </button>
        <button className="flex flex-row gap-4" onClick={toSwitchSearchStudent}>
          Search Student
          <FiSearch className="text-2xl" />
        </button>
      </div>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          Student List
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {students?.map((student) => {
            return (
              <StudentRow
                student={student}
                students={students}
                setStudents={setStudents}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
