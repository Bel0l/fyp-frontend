import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SupervisorSideBar from "./SupervisorSidebar";
import axios from 'axios';

function SupervisorProjectsUnderMe() {
  const [acceptedProjects, setAcceptedProjects] = useState([]);

  useEffect(() => {
    fetchAcceptedProjects();
  }, []);

  const fetchAcceptedProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/projects/accepted', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setAcceptedProjects(response.data);
      // Assuming your API returns accepted projects in an array
    } catch (error) {
      console.error('Error fetching accepted projects:', error.response?.data || error.message);
    }
  };

  console.log(acceptedProjects);

  return (
    <div>
      <div>
        <SupervisorSideBar />
      </div>

      <div className='container flex ml-72 mr-12 items-center justify-center w-auto h-16 bg-gray-100 mt-16 '>
        <span className='font-bold mr-2'>Department Name: </span>
        <span>Computer Science </span>
      </div>

      <div className="w-[1030px] ml-[285px] h-96 mt-5 mb-10 rounded-lg bg-gray-100">
        <span className="font-semibold ml-5">Accepted Projects</span>
        <table className="table-auto w-full mt-8">
          <thead>
            <tr className="header bg-blue-200">
              <th>S/NO</th>
              <th>Project Title</th>
              <th>Supervisor</th>
              <th>Project Type</th>
              <th>Group Members</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {acceptedProjects.map((project, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-purple-200 py-2" : ""}>
                <td>{index + 1}</td>
                <td><Link to='/CreateMeeting'>{project.projectTitle}</Link></td>
                <td>{project.supervisor.profile.fullName}</td>
                <td>{project.projectType}</td>
                <td>{project.groupMembers.join(', ')}</td>
                <td>{project.description}</td>
                <td>{project.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SupervisorProjectsUnderMe;
