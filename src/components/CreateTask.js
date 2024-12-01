import React, { useState } from 'react';
import axios from 'axios';
import SupervisorSidebar from './SupervisorSidebar';
import { Link, useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const [taskData, setTaskData] = useState({
    title: '',
    assignedTo: '',
    dueDate: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.post('http://localhost:3000/api/tasks', taskData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response.data.message); // Log success message or handle as needed
      navigate('/Tasks'); // Navigate to the Tasks component

    } catch (error) {
      console.error('Error creating task:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <SupervisorSidebar />
      <div className='container flex ml-72 mr-12 items-center justify-center w-auto h-16 bg-gray-100 mt-16 '>
        <span className='font-bold mr-2'>Department Name: </span>
        <span>Computer Science </span>
      </div>

      <div className="w-[1030px] ml-[285px] h-auto mt-5 mb-10 rounded-lg bg-gray-100">
        <span className="font-semibold ml-5">Supervisor Portal</span>
        <div className="submenue rounded-full w-1/2  mt-2 border-blue-300 border-2 h-12">
          <ul className="flex">
            <Link to='/CreateMeeting'>
              <li className="flex-1 ml-8 mt-2 cursor-pointer">Create Meeting</li>
            </Link>
            <Link to='/CreateTask'>
              <li className="flex-1 mt-2 ml-5 cursor-pointer">Create Tasks</li>
            </Link>
            <Link to='/Meeting'>
              <li className="flex-1 mt-2 ml-8 cursor-pointer">Meeting</li>
            </Link>
            <Link to='/Tasks'>
              <li className="flex-1 mt-2 ml-8 cursor-pointer">Tasks</li>
            </Link>
            <Link to='/Chat' className="flex-1 mt-2 ml-8 cursor-pointer">Chat</Link>
          </ul>
        </div>
       
        <div className='bg-purple-300 h-10 w-5/3 mt-3  rounded-lg'>
          <span className='ml-4 font-bold'>Task Creation Form</span>
        </div>

        <div className="flex justify-center mt-4 mb-10">
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
            <div className="grid grid-cols-1 gap-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">Title:</label>
                <input type="text" id="title" name="title" value={taskData.title} onChange={handleChange} placeholder='Enter Task Title' className="focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md py-1" required />
              </div>

              <div>
                <label htmlFor="assignedTo" className="block text-sm font-semibold text-gray-700 mb-1">Assigned to:</label>
                <textarea id="assignedTo" name="assignedTo" rows="1" value={taskData.assignedTo} onChange={handleChange} placeholder='Enter Assigned Person' className="focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md py-1" required></textarea>
              </div>

              <div>
                <label htmlFor="dueDate" className="block text-sm font-semibold text-gray-700 mb-1">Due date:</label>
                <input type="text" id="dueDate" name="dueDate" value={taskData.dueDate} onChange={handleChange} placeholder='Enter Due Date' className="focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md py-1" required />
              </div>

              <div className="flex justify-center">
                <button type="submit" className="rounded px-4 py-2 bg-green-500 text-white hover:bg-green-600 duration-300">Create Task</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
