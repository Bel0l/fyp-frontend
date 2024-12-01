import React, { useState } from 'react';
import axios from 'axios';
import SupervisorSidebar from './SupervisorSidebar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CreateMeeting = () => {
  const [meetingData, setMeetingData] = useState({
    meetingType: '',
    time: '',
    location: '',
    date: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeetingData({ ...meetingData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.post('http://localhost:3000/api/meetings', meetingData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/Meeting');
      console.log(response.data.message); // Log success message or handle as needed
      // Optionally, redirect or perform additional actions after meeting creation

    } catch (error) {
      console.error('Error creating meeting:', error.response?.data || error.message);
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

        <div className='bg-purple-300 h-10 w-5/3 mt-3 rounded-lg'>
          <span className='ml-4 font-bold'>Meeting Creation Form</span>
        </div>

        <div className="flex justify-center mt-4 mb-10">
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
            <div className="grid grid-cols-1 gap-y-6">
              <div>
                <label htmlFor="meetingType" className="block text-sm font-semibold text-gray-700 mb-1">Meeting Type:</label>
                <input type="text" id="meetingType" name="meetingType" value={meetingData.meetingType} onChange={handleChange} placeholder='Enter Meeting Type' className="focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md py-1" required />
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-semibold text-gray-700 mb-1">Time:</label>
                <input type="text" id="time" name="time" value={meetingData.time} onChange={handleChange} placeholder='Enter Time' className="focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md py-1" required />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-1">Location:</label>
                <input type="text" id="location" name="location" value={meetingData.location} onChange={handleChange} placeholder='Enter Location' className="focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md py-1" required />
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-1">Date:</label>
                <input type="text" id="date" name="date" value={meetingData.date} onChange={handleChange} placeholder='Enter Date' className="focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md py-1" required />
              </div>

              <div className="flex justify-center">
                <button type="submit" className="rounded px-4 py-2 bg-green-500 text-white hover:bg-green-600 duration-300">Create Meeting</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateMeeting;
