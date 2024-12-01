import React from 'react';
import StudentSideBar from "./StudentSideBar";
import { Link } from 'react-router-dom';



function StudentChat() {
  return (
    <div>
      <div>
        <StudentSideBar />
      </div>

      <div className='container flex ml-72 mr-12 items-center justify-center w-auto h-16 bg-gray-100 mt-16 '>
        <span className='font-bold mr-2'>Department Name: </span>
        <span>Computer Science </span>
      </div>

      <div className="w-[950px] ml-[285px] h-auto mt-5 mb-10 rounded-lg bg-gray-100">
        <span className="font-semibold ml-5">Student Portal</span>
        <div className="submenue rounded-full w-3/4  mt-2 border-blue-300 border-2 h-12">
          <ul className="flex">
            {/* <Link to='/CreateMeeting'>
            <li className="flex-1 ml-8 mt-2 cursor-pointer">Create Meeting</li>
            </Link> */}
            {/* <Link to='/CreateTask'>
              <li className="flex-1 mt-2 ml-5 cursor-pointer">Create Tasks</li>
            </Link> */}
            <Link to='/StudentTasks'>
            <li className="flex-1 mt-2 ml-8 cursor-pointer">Tasks</li>
            </Link>
            <Link to='/StudentMeeting'>
              <li className="flex-1 mt-2 ml-8 cursor-pointer">Meeting</li>
            </Link>
            
            <Link to='/StudentChat' className="flex-1 mt-2 ml-8 cursor-pointer">Chat</Link>
          </ul>
        </div>

        <div className='bg-purple-300 h-10 w-5/3 mt-3 rounded-lg'>
          <span className='ml-4 font-bold'>Chat</span>
        </div>

        <div className=''>
          <div className='text-lg bg-gray-200 p-4 rounded font-semibold' style={{ marginTop: '3px' }}>
            Click on the link below to join whatsapp group for project Discussion
            
            </div>
            <div className='text-blue-800 text-lg bg-gray-200 p-4 rounded font-semibold'>
            https://chat.whatsapp.com/group
            </div>
            
          
          
        </div>
      </div>
    </div>
  )
}

export default StudentChat