import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/projects');
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleEdit = (id) => {
    try {
      navigate(`/AdminProjectEdit/${id}`);
    } catch (error) {
      console.error('Error navigating to project edit:', error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/projects/${id}`);
      setProjects(projects.filter(project => project._id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <Sidebar />
      </div>

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
          <thead className="">
            <tr className="header bg-blue-200">
              <th>Group #</th>
              <th>Project Name</th>
              <th>No of Students</th>
              <th>Supervisor</th>
              <th>Project Area</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {projects.map((project, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-purple-200 py-2" : ""}>
                <td>{index + 1}</td>
                <td>{project.projectTitle}</td>
                <td>{project.groupMembers.length}</td>
                <td>{project.supervisor?.profile?.fullName || 'N/A'}</td>
                <td>{project.projectType}</td>
                <td>{project.status}</td>
                <td>
                  <div className="flex">
                    <button onClick={() => handleEdit(project._id)} className="rounded px-4 py-1 text-xs bg-green-500 text-white hover:bg-green-600 duration-300">Edit</button>
                    <button onClick={() => handleRemove(project._id)} className="rounded mx-2 px-2 py-1 text-xs bg-red-500 text-white hover:bg-red-600 duration-300">REMOVE</button>
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

export default Projects;
