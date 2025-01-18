import React, { useState } from "react";

const UserDetails = () => {
  const [isEditing, setIsEditing] = useState(true);
  const [user, setUser] = useState({
    name: "John Doe",
    role: "Admin",
    email: "john.doe@example.com",
    password: "password123",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Details updated successfully!");
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
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Password:</strong> {user.password}
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
