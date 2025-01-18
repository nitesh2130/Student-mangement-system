import React, { useEffect } from "react";
import { FaUserCheck } from "react-icons/fa6";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";
const Navbar = () => {
  // console.log(`navbar id ..................${id}`);
  // console.log(`navbar accesstoken ..................${accessToken}`);
  // const apiUrl = `http://localhost:3000/users/profile/:${id}`;

  // useEffect(() => {
  //   fetch(apiUrl, {
  //     method: "GET",
  //     headers: {
  //       containt: "appliction/json",
  //       Authorization: `bearer ${accessToken}`,
  //       //id: id,
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("failed to fetch the data");
  //         return response.json();
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(`Backend error : error.message`);
  //     });
  // }, []);

  const navigate = useNavigate();
  const toSwitchUserDetails = () => {
    navigate("/userdetails");
  };

  return (
    <div className="flex flex-row justify-between p-8 m-2 bg-[#F9E795]">
      <div className="">
        <h1 className="text-lg">Student Management</h1>
      </div>
      <div className="">
        <FaUserCheck className="size-7" onClick={toSwitchUserDetails} />
      </div>
    </div>
  );
};

export default Navbar;
