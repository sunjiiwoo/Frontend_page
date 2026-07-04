import React, { useState } from "react";
import "./App.css";

function App() {

  const [search, setSearch] = useState("");

  const students = [
    {
     id: 168,
      name: "Swathi S",
      department: "CSE",
      year: "III",
      cgpa: 9.9,
      status: "topper",
    },
    {
     id: 115,
      name: "Suriya S",
      department: "ECE",
      year: "IV",
      cgpa: 8.0,
      status: "Average",
    },
    {
      id: 103,
      name: "Priya",
      department: "ECE",
      year: "IV",
      cgpa: 9.4,
      status: "Topper",
    },
    {
      id: 104,
      name: "Arjun",
      department: "Mechanical",
      year: "I",
      cgpa: 7.8,
      status: "Inactive",
    },
    {
      id: 105,
      name: "Anitha",
      department: "Civil",
      year: "III",
      cgpa: 8.9,
      status: "Active",
    },
  ];

  const filtered = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">

      <aside className="sidebar">
        <h1>EduManage</h1>

        <ul>
          <li className="active">🏠 Dashboard</li>
          <li>🎓 Students</li>
          <li>👩‍🏫 Teachers</li>
          <li>📖 Courses</li>
          <li>📊 Reports</li>
          <li>⚙ Settings</li>
        </ul>
      </aside>

      <main className="main">

        <div className="topbar">
          <h2>Student Management Dashboard</h2>

          <input
            type="text"
            placeholder="Search Student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="cards">

          <div className="card blue">
            <h3>Total Students</h3>
            <h1>500</h1>
          </div>

          <div className="card green">
            <h3>Teachers</h3>
            <h1>35</h1>
          </div>

          <div className="card orange">
            <h3>Courses</h3>
            <h1>18</h1>
          </div>

          <div className="card purple">
            <h3>Placements</h3>
            <h1>95%</h1>
          </div>

        </div>

        <div className="table-container">

          <div className="table-header">
            <h2>Students List</h2>

            <button>Add Student</button>
          </div>

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Year</th>
                <th>CGPA</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {filtered.map((student) => (

                <tr key={student.id}>

                  <td>{student.id}</td>

                  <td>{student.name}</td>

                  <td>{student.department}</td>

                  <td>{student.year}</td>

                  <td>{student.cgpa}</td>

                  <td>

                    <span className={student.status.toLowerCase()}>
                      {student.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}

export default App;