import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const StudentRow = ({ student, setStudents, students }) => {
  const accessToken = localStorage.getItem("accessToken");
  const { id } = student;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Replace this with your actual API URL
  const apiUrl = "http://localhost:3000/users/student/Student";

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");

    if (isLogin !== "true") {
      navigate("/login");
      //setToken(localStorage.getItem("accessToken"));
    }
  }, []);

  //update student

  const toSwitchUpdatestudent = () => {
    const queryParams = new URLSearchParams({
      student: JSON.stringify(student),
    }).toString();
    navigate(`/updatestudent?${queryParams}`);
  };

  //delete student
  const deleteStudent = () => {
    fetch(`http://localhost:3000/users/student/deleteStudent/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        //navigate("/home");
        return response.json();
      })
      .then((data) => {
        const newStudent = students.filter((item) => item.id != id);
        console.log(newStudent, ".....newstudent");
        setStudents(newStudent);
        console.log(id, "........id");
        console.log(student, ".........student");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div>
      <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {" "}
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
            <FaEdit onClick={toSwitchUpdatestudent} />
          </button>
          <button>
            <MdDelete onClick={deleteStudent} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentRow;
