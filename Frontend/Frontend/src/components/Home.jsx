import React, { useEffect } from "react";
import UserDetails from "./UserDetails";
import Navbar from "./Navbar";
import Dashboard from "./dashboard";

const Home = () => {
  const id = localStorage.getItem("id");
  const accessToken = localStorage.getItem("accessToken");
  // console.log(id);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");

    if (isLogin === "true") {
      //setToken(localStorage.getItem("accessToken"));
    } else {
      // Redirect to login if not logged in
      navigate("/");
    }
  }, []);

  // useEffect(() => {

  // }, []);
  return (
    <div className="bg-[#efe9cc]">
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default Home;
