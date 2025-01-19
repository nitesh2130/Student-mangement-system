import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentRow from "./StudentRow";

const SearchStudent = () => {
  const [searchType, setSearchType] = useState("name");
  const [nameSearch, setNameSearch] = useState("");
  const [semesterSearch, setSemesterSearch] = useState("");
  const [resultForSearch, setResultForSearch] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const apiUrl = "http://localhost:3000/users/student/filterdStudent";

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin !== "true") {
      navigate("/");
    }
  }, [navigate]);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    if (searchType === "name") {
      setNameSearch(value);
    } else {
      setSemesterSearch(value);
    }
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    if (e.target.value === "name") {
      setSemesterSearch("");
    } else {
      setNameSearch("");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setStudents({});

    fetch(apiUrl, {
      method: "POST", // Change to POST
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the access token
      },
      body: JSON.stringify({
        name: nameSearch,
        semester: semesterSearch,
      }), // Send data in the body
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => setStudents(data?.message?.students)) // Handle the response
      .catch((err) => setError(err.message));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Search Student</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="mb-2">
          <label className="mr-2">
            <input
              type="radio"
              value="name"
              checked={searchType === "name"}
              onChange={handleSearchTypeChange}
            />
            Search by Name
          </label>
          <label className="ml-4">
            <input
              type="radio"
              value="semester"
              checked={searchType === "semester"}
              onChange={handleSearchTypeChange}
            />
            Search by Semester
          </label>
        </div>
        <input
          type="text"
          value={searchType === "name" ? nameSearch : semesterSearch}
          onChange={handleSearchChange}
          placeholder={`Enter ${searchType === "name" ? "Name" : "Semester"}`}
          className="border rounded-md p-2 w-full mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </form>
      {students.length > 0 ? (
        students.map((student) => <StudentRow student={student} />)
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
};

export default SearchStudent;
