import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SupervisorSidebar from './SupervisorSidebar';

const Meeting = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://localhost:3000/api/meetings/meetings', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMeetings(response.data); // Assuming your API returns meetings in the structure { meetings: [...] }
    } catch (error) {
      console.error('Error fetching meetings:', error.response?.data || error.message);
    }
  };
  return (
    <div>
      <div>
        <SupervisorSidebar />
      </div>

      <div className='container flex ml-72 mr-12 items-center justify-center w-auto h-16 bg-gray-100 mt-16 '>
        <span className='font-bold mr-2'>Department Name: </span>
        <span>Computer Science </span>
      </div>

      <div className="w-[1030px] ml-[285px] h-auto mt-5 mb-10 rounded-lg bg-gray-100">
        <span className="font-semibold ml-5">Supervisor Portal</span>
        <div className="submenue rounded-full w-1/2 mt-2 border-blue-300 border-2 h-12">
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
          <span className='ml-4 font-bold'>Meetings</span>
        </div>

        <div className='grid grid-cols-3 gap-4 p-4'>
          {meetings.map((meeting, index) => (
            <div key={index} className='text-sm bg-gray-200 p-4 rounded' style={{ marginTop: '3px' }}>
              {meeting.meetingType}
              <br />
              Time: {meeting.time}
              <br />
              Location: {meeting.location}
              <br />
              Due date: {meeting.date}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Meeting;
