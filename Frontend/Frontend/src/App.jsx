import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/LogIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import UserDetails from "./components/UserDetails";
import UserDetailsEdit from "./components/UserDetailsEdit";
import AddStudent from "./components/AddStudent";
import SearchStudent from "./components/SearchStudent";
import { ToastContainer, toast } from "react-toastify";
import UpdateStudent from "./components/UpdateStudent";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/userdetails" element={<UserDetails />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/searchstudent" element={<SearchStudent />} />
        <Route path="/updatestudent" element={<UpdateStudent />} />
      </Routes>
    </div>
  );
};

export default App;
