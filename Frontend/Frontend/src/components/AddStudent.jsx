import React, { useState } from "react";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [dob, setDob] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const studentDetails = { name, email, branch, semester, dob };
    console.log("Student Details:", studentDetails);

    // API call or data submission can be added here

    // Reset form fields
    setName("");
    setEmail("");
    setSemester("");
    setBranch("");
    setDob("");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Add Student
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter student's name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter student's email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Branch:
          </label>
          <input
            type="text"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter student's branch"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Semester:
          </label>
          <input
            type="text"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter semester"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth:
          </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:outline-none"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
