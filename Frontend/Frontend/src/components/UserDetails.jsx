import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState();
  const [token, setToken] = useState(null);
  const [name, setName] = useState();
  const [role, setRole] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  // let name = null;
  // let role = null;
  // let email = null;
  // let password = null;

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

  const apiUrl = `http://localhost:3000/users/profile/${id}`;
  const apiurlForUpdate = `http://localhost:3000/users/updateUser/${id}`;

  useEffect(() => {
    fetch(apiUrl, {
      method: "GET",
      headers: {
        containt: "appliction/json",
        Authorization: `bearer ${accessToken}`,
      },
      body: JSON.stringify(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to fetch the data");
        }
        return response.json();
      })
      .then((data) => {
        // name = user?.message?.user?.name;
        // role = user?.message?.user?.role;
        // email = user?.message?.user?.email;
        // password = user?.message?.user?.password;
        //console.log(`data in the {}...........${{ data }}`);
        //const { name, id, email } = data.message.user;
        // console.log(`data in the ...........${data}`);

        // console.log(`name {}...........${name}}`);
        setUser(data);
      })
      .catch((error) => {
        console.log(`Backend error : ${error.message}`);
      });
  }, [apiUrl, token]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // to save form
  const handleSave = (e) => {
    e.preventDefault();
    const formData = { name, role, email, password };
    setIsEditing(false);

    //call Api for the update the user data

    fetch(apiurlForUpdate, {
      method: "PUT",
      headers: {
        containt: "appliction/json",
        Authorization: `bearer ${accessToken}`,
        body: JSON.stringify({ name, role, email, password }),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update data");
        }

        console.log(user.name);
        return response.json(); // Parse the response as JSON
      })
      .catch((error) => console.log(error));

    alert("Details updated successfully!");
  };

  // for input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-center text-xl font-semibold mb-4">User Details</h2>

        {isEditing ? (
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Role</label>
              <input
                type="text"
                name="role"
                value={user.role}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded-md"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="text-gray-700 space-y-4">
            <p>
              <strong>Name:</strong> {user?.message?.user?.name}
            </p>
            <p>
              <strong>Role:</strong> {user?.message?.user?.role}
            </p>
            <p>
              <strong>Email:</strong> {user?.message?.user?.email}
            </p>
            <p>
              <strong>Password:</strong> {user?.message?.user?.password}
            </p>
            <button
              onClick={toggleEdit}
              className="bg-blue-500 text-white p-2 rounded-md w-full"
            >
              Edit Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
