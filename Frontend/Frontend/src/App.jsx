import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import SingUp from "./components/SingUp";
import Home from "./components/Home";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SingUp" element={<SingUp />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
