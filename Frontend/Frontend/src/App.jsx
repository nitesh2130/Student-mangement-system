import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/LogIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
