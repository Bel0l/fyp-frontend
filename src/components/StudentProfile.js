import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentSideBar from './StudentSideBar';
// import { useNavigate } from 'react-router-dom';

const StudentProfile = () => {
  // const navigate = useNavigate();
  const [profile, setProfile] = useState();

  const [loading, setLoading] = useState(true);
  
  const [editing, setEditing] = useState(); // New state to toggle form visibility
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const { user } = response.data;

        if (Object.keys(user).length === 0) {
          setEditing(true);
        }
         
        if (user) {
          setProfile(user);
        }
       
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:3000/api/auth/profile', profile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setEditing(false); // Hide the form and show the profile
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleEdit = () => {
    setEditing(true); // Show the form for editing
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <StudentSideBar />
      <div className="container flex ml-72 mr-12 items-center justify-center w-auto h-16 bg-gray-100 mt-16">
        <span className="font-bold mr-2">Department Name:</span>
        <span>Computer Science </span>
      </div>
      <div className="w-[930px] ml-72 mt-5 h-96 mb-36 rounded-lg bg-gray-100">
        <div className="bg-purple-300 h-10 w-5/3 mt-3 rounded-lg">
          <span className="ml-4 font-bold">My Profile - Student</span>
        </div>
        {editing ? (
          <div className="flex">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full">
              <div className="grid grid-cols-2 gap-6 w-5/6">
                <div className="col-span-1">
                  <div className="mb-4 flex items-center">
                    <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 w-24">
                      Full Name:
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={profile.fullName}
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      className="mt-1 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
                    />
                  </div>
                  <div className="mb-4 flex items-center">
                    <label htmlFor="batchNo" className="block text-sm font-semibold text-gray-700 w-24">
                      Batch No:
                    </label>
                    <input
                      type="text"
                      id="batchNo"
                      name="batchNo"
                      value={profile.batchNo}
                      onChange={(e) => setProfile({ ...profile, batchNo: e.target.value })}
                      className="mt-1 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
                    />
                  </div>
                  <div className="mb-4 flex items-center">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 w-24">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="mt-1 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
                    />
                  </div>
                  <div className="mb-4 flex items-center">
                    <label htmlFor="phoneNo" className="block text-sm font-semibold text-gray-700 w-24">
                      Phone No:
                    </label>
                    <input
                      type="text"
                      id="phoneNo"
                      name="phoneNo"
                      value={profile.phoneNo}
                      onChange={(e) => setProfile({ ...profile, phoneNo: e.target.value })}
                      className="mt-1 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="mb-4 flex items-center">
                    <label htmlFor="regNo" className="block text-sm font-semibold text-gray-700 w-24">
                      Reg No:
                    </label>
                    <input
                      type="text"
                      id="regNo"
                      name="regNo"
                      value={profile.regNo}
                      onChange={(e) => setProfile({ ...profile, regNo: e.target.value })}
                      className="mt-1 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
                    />
                  </div>
                  <div className="mb-4 flex items-center">
                    <label htmlFor="section" className="block text-sm font-semibold text-gray-700 w-24">
                      Section:
                    </label>
                    <input
                      type="text"
                      id="section"
                      name="section"
                      value={profile.section}
                      onChange={(e) => setProfile({ ...profile, section: e.target.value })}
                      className="mt-1 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
                    />
                  </div>
                  <div className="mb-4 flex items-center">
                    <label htmlFor="program" className="block text-sm font-semibold text-gray-700 w-24">
                      Program:
                    </label>
                    <input
                      type="text"
                      id="program"
                      name="program"
                      value={profile.program}
                      onChange={(e) => setProfile({ ...profile, program: e.target.value })}
                      className="mt-1 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
                    />
                  </div>
                  <div className="mb-4 flex items-center">
                    <label htmlFor="batchAdvisor" className="block text-sm font-semibold text-gray-700 w-24">
                      Batch Advisor:
                    </label>
                    <input
                      type="text"
                      id="batchAdvisor"
                      name="batchAdvisor"
                      value={profile.batchAdvisor}
                      onChange={(e) => setProfile({ ...profile, batchAdvisor: e.target.value })}
                      className="mt-1 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-4 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-1">
                <p><strong>Full Name:</strong> {profile.fullName}</p>
                <p><strong>Batch No:</strong> {profile.batchNo}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Phone No:</strong> {profile.phoneNo}</p>
              </div>
              <div className="col-span-1">
                <p><strong>Reg No:</strong> {profile.regNo}</p>
                <p><strong>Section:</strong> {profile.section}</p>
                <p><strong>Program:</strong> {profile.program}</p>
                <p><strong>Batch Advisor:</strong> {profile.batchAdvisor}</p>
              </div>
            </div>
            <button
              onClick={handleEdit}
              className="mt-4 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
