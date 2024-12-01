import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SupervisorSidebar from './SupervisorSidebar';

function SupervisorProReqDetails() {
  const { id } = useParams();
  const [projectRequest, setProjectRequest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectRequest = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(`http://localhost:3000/api/projects/requests/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProjectRequest(response.data);
      } catch (error) {
        console.error('Error fetching project request details:', error.response?.data || error.message);
      }
    };

    fetchProjectRequest();
  }, [id]);

  const handleAccept = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.put(`http://localhost:3000/api/projects/requests/${projectId}/accept`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response.data.message); // Log success message or handle as needed

      // Navigate to SupervisorProjectsUnderMe after successful accept
      navigate('/SupervisorProjectsUnderMe');

    } catch (error) {
      console.error('Error accepting request:', error.response?.data || error.message);
    }
  };

  const handleReject = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.put(`http://localhost:3000/api/projects/requests/${projectId}/reject`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response.data.message); // Log success message or handle as needed

      // Navigate to SupervisorProjectsUnderMe after successful reject
      navigate('/SupervisorProjectsUnderMe');

    } catch (error) {
      console.error('Error rejecting request:', error.response?.data || error.message);
    }
  };

  if (!projectRequest) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SupervisorSidebar />

      <div className='container flex ml-72 mr-12 items-center justify-center w-auto h-16 bg-gray-100 mt-16 '>
        <span className='font-bold'>Department Name: </span>
        <span>Computer Science and IT</span>
      </div>

      <div className=" w-[930px] ml-72 mt-5 h-96 mb-36 rounded-lg bg-gray-100 ">
        <div className="bg-purple-300 h-10 w-5/3  mt-3 rounded-lg">
          <span className="ml-4 font-bold">Project Request Details </span>
        </div>

        <div className="flex">
          <form className="bg-white shadow-md rounded-lg p-6 w-full  ">
            <div className="grid grid-cols-2 gap-6 w-5/6">
              {/* Left Side */}
              <div className="col-span-1">
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 w-24">
                    Student ID:
                  </label>
                  <div className="mt-1 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md p-4">
                    {projectRequest.student._id}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 w-24">
                    Project Title:
                  </label>
                  <div className="mt-1 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md p-4">
                    {projectRequest.projectTitle}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 w-24">
                    Project Type:
                  </label>
                  <div className="mt-1 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md p-4">
                    {projectRequest.projectType}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 w-36">
                    Project Proposal:
                  </label>
                  <div className="mt-1 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md p-4">
                    {projectRequest.proposal}
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="col-span-1">
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 w-36">
                    Student Profiles:
                  </label>
                  <div className="mt-1 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md p-8">
                    {projectRequest.student.profile.fullName}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 w-24">
                    Project Description:
                  </label>
                  <div className="mt-1 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md p-20">
                    {projectRequest.description}
                  </div>
                </div>

                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => handleAccept(projectRequest._id)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(projectRequest._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SupervisorProReqDetails;
