import React from "react";
import { useState } from "react";
const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const FormSubmitHandler = () => {};
  return (
    <div className="bg-pink-300 m-3 p-4 flex flex-col items-center ">
      <h1>You are on the Login</h1>
      <form
        className="flex flex-col p-5 gap-6 "
        onSubmit={FormSubmitHandler}
        action=""
      >
        <input
          className="p-3 border-none rounded-lg outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Please enter your E-mial"
        />
        <input
          className="p-3 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Please enter your Password"
        />
        <button className="bg-pink-500 rounded-md p-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LogIn;
