import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

function AdminDashboardSupervisors() {
  const [supervisors, setSupervisors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:3000/api/supervisors", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSupervisors(response.data);
      } catch (error) {
        console.error("Error fetching supervisors:", error);
      }
    };

    fetchSupervisors();
  }, []);

  const handleDelete = async (id) => {
     
      try {
        const token = localStorage.getItem('token'); // Replace with your method of getting the token
        await axios.delete(`http://localhost:3000/api/supervisors/supervisors/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSupervisors(supervisors.filter(supervisor => supervisor._id !== id));
        // Perform any additional actions such as updating the UI
      } catch (error) {
        console.error('Error deleting supervisor:', error);
        alert('Error deleting supervisor. Please try again.');
      }
    };

  const filteredSupervisors = supervisors.filter(supervisor =>
    supervisor.profile && supervisor.profile.fullName && supervisor.profile.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Sidebar />

      <div className='container flex ml-72 mr-12 items-center justify-center w-auto h-16 bg-gray-100 mt-16 '>
        <span className='font-bold mr-2'>Department Name: </span>
        <span>Computer Science</span>
      </div>

      <div className="w-[1030px] ml-[285px] h-96 mt-5 mb-10 rounded-lg bg-gray-100">
        <span className="font-semibold ml-5">Admin Portal</span>
        {/* <div className="submenue rounded-full w-3/4 ml-6 mt-2 border-blue-300 border-2 h-12">
          <ul className="flex">
            <Link to='/AdminDashboardStudent' className="flex-1 ml-8 mt-2">Students</Link>
            <Link to='/AdminDashboardSupervisors' className="flex-1 mt-2 cursor-pointer">Supervisors</Link>
            <Link to="/AdminDashboardProject" className="flex-1 mt-2 cursor-pointer">Projects</Link>
          </ul>
        </div> */}
        {/* SearchBar */}
        {/* <div className="search mx-1 my-1">
          <div className="relative flex w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 pl-10"
              type="text"
              id="search"
              placeholder="Search something.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div> */}

        <table className="table-auto w-full mt-2">
          <thead>
            <tr className="header bg-blue-200">
              <th>ID</th>
              <th>Supervisor Name</th>
              <th>Designation</th>
              <th>Interested Area</th>
              <th>Project Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSupervisors.map((supervisor, index) => (
              <tr key={supervisor._id} className={index % 2 === 0 ? "bg-purple-200 py-2" : ""}>
                <td>{supervisor._id}</td>
                <td>{supervisor.profile && supervisor.profile.fullName}</td>
                <td>{supervisor.profile && supervisor.profile.designation}</td>
                <td>{supervisor.profile && supervisor.profile.interestedArea}</td>
                <td>{supervisor.profile && supervisor.profile.projectType}</td>
                <td>
                  <div className="flex">
                    <button
                      className="rounded px-5 py-1 text-xs bg-green-500 text-white hover:bg-green-600 duration-300"
                      onClick={() => navigate(`/AdminEditSupervisor/${supervisor._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="rounded mx-2 px-2 py-1 text-xs bg-red-500 text-white hover:bg-red-600 duration-300"
                      onClick={() => handleDelete(supervisor._id)}
                    >
                      REMOVE
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboardSupervisors;
