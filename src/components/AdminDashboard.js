import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const AdminDashboard = () => {
  const [totals, setTotals] = useState({
    totalProjects: 0,
    totalSupervisors: 0,
    totalStudents: 0,
  });

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const projectsResponse = await axios.get('http://localhost:3000/api/admin/total-projects');
        const supervisorsResponse = await axios.get('http://localhost:3000/api/admin/total-supervisors');
        const studentsResponse = await axios.get('http://localhost:3000/api/admin/total-students');

        setTotals({
          totalProjects: projectsResponse.data.totalProjects,
          totalSupervisors: supervisorsResponse.data.totalSupervisors,
          totalStudents: studentsResponse.data.totalStudents,
        });
      } catch (error) {
        console.error('Error fetching totals:', error);
      }
    };

    fetchTotals();
  }, []);

  return (
    <div>
      <div className='sidebar'>
        <Sidebar />
      </div>

      <div className='container flex ml-72 mr-12 items-center justify-center w-auto h-16 bg-gray-100 mt-16 '>
        <span className='font-bold mr-2'>Department Name: </span>
        <span>Computer Science </span>
      </div>

      <div className='container w-auto h-[400px] bg-gray-100 mt-9 flex flex-wrap ml-72 mr-12 rounded-lg'>
        <div className='innercontainer w-80 h-20 bg-gray-100 border-gray-400 border-[1px] rounded-lg mt-11 ml-7'>
          <div className='flex mt-4 ml-3'>
            <span className='font-serif font-semibold text-blue-700'>Total Projects</span>
            <span className='font-serif font-semibold text-xl text-blue-700 ml-32'>{totals.totalProjects}</span>
          </div>
        </div>

        <div className='innercontainer w-80 h-20 bg-gray-100 border-gray-400 border-[1px] rounded-lg mt-11 ml-7'>
          <div className='flex mt-4 ml-3'>
            <span className='font-serif font-semibold text-blue-700'>Total Supervisors</span>
            <span className='font-serif font-semibold text-xl text-blue-700 ml-32'>{totals.totalSupervisors}</span>
          </div>
        </div>

        <div className='innercontainer w-80 h-20 bg-gray-100 border-gray-400 border-[1px] rounded-lg -mt-24 ml-7'>
          <div className='flex mt-4 ml-3'>
            <span className='font-serif font-semibold text-blue-700'>Total Students</span>
            <span className='font-serif font-semibold text-xl text-blue-700 ml-32'>{totals.totalStudents}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
