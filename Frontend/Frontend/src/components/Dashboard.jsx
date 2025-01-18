import React from "react";
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
  const toSwitchAddStudent = () => {
    navigate("/addstudent");
  };
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
      <div>
        <StudentRow />
      </div>
    </div>
  );
};

export default Dashboard;
