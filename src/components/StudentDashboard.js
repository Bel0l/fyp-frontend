import React from 'react';
import { Link } from 'react-router-dom';
import StudentSideBar from './StudentSideBar';

const StudentDashboard = () => {
  return (
    <div>
      <div>
        <StudentSideBar />
      </div>

      <div className='container flex ml-72 mr-12 items-center justify-center w-auto h-16 bg-gray-100 mt-16 '>
        <span className='font-bold mr-2'>Department Name: </span>
        <span>Computer Science </span>
      </div>

      <div className='w-[1030px] ml-72 mt-5 h-96 mb-36 rounded-lg bg-gray-100'>
        {/* <div className='bg-purple-300 h-10 w-full mt-3 rounded-lg'>
          <span className='ml-4 font-bold'>My Profile - Student</span>
        </div> */}

        <div className='ml-12 mt-4 '>
          <h1 className='font-bold text-xl pt-6 mb-4'>Steps to Create A New Project</h1>
          
          <div className='mb-4'>
            <span className='font-bold'>Step 1:</span>
            <br/>
            <span className='font-semibold'>Complete Your Profile</span>
          </div>
          
          <div className='mb-4'>
            <span className='font-bold'>Step 2:</span>
            <br/>
            <span className='font-semibold'>Create New Project</span>
          </div>
          
          <div className='mb-4'>
            <span className='font-bold'>Step 3:</span>
            <br/>
            <span className='font-semibold'>Follow Up Your Project</span>
          </div>
          <div className='mt-9 -ml-1'>
          <Link to='/StudentProfile'>
          <button
                type="submit"
                className="bg-[#6532A5] text-white p-2 px-3 rounded-md font-semibold"
              >
                Complete Profile
              </button>
              </Link>
              </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
