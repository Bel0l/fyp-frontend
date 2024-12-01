import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SupervisorSidebar from './SupervisorSidebar';
import axios from 'axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get('http://localhost:3000/api/tasks',{
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        setTasks(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);
console.log(tasks);
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
          <span className='ml-4 font-bold'>Tasks</span>
        </div>

        <div className='grid grid-cols-3 gap-4 p-4'>
          {tasks.map((task, index) => (
            <div key={index} className='text-sm bg-gray-200 p-4 rounded' style={{ marginTop: '3px' }}>
              Task #{index + 1}
              <br />
              Title: {task.title}
              <br />
              Assigned to: {task.assignedTo}
              <br />
              Due date: {task.dueDate}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
