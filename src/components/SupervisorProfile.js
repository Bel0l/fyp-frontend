import React, { useState, useEffect } from "react";
import axios from "axios";
import SupervisorSidebar from "./SupervisorSidebar";

  function SupervisorProfile() {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false); // State to toggle form visibility
  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/auth/profile", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const { user } = response.data;
  
          if (Object.keys(user).length === 0) {
            setEditing(true); // Enable editing mode if no profile data exists
          } else {
            setProfile(user); // Set profile data if it exists
          }
  
          setLoading(false);
        } catch (error) {
          console.error("Error fetching profile:", error);
          setLoading(false);
        }
      };
  
      fetchProfile();
    }, []);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.put("http://localhost:3000/api/auth/profile", profile, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEditing(false); // Hide the form after successful update
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    };
  
    const handleEdit = () => {
      setEditing(true); // Enable editing mode
    };
  
    if (loading) {
      return <div>Loading...</div>;
    }

  return (
    <div>
      <div>
        <SupervisorSidebar />
      </div>

      <div className="container flex ml-72 mr-12 items-center justify-center w-auto h-16 bg-gray-100 mt-16 ">
        <span className="font-bold mr-2">Department Name:</span>
        <span>Computer Science </span>
      </div>
      <div className="w-[930px] ml-72 mt-5 h-96 mb-36 rounded-lg bg-gray-100">
        <div className="bg-purple-300 h-10 w-5/3 mt-3 rounded-lg">
          <span className="ml-4 font-bold">My Profile - Supervisor</span>
        </div>

        {editing ? (
  <div className="flex">
    <form className="bg-white shadow-md rounded-lg p-6 w-full">
      <div className="grid grid-cols-2 gap-6 w-5/6">
        {/* Left Side */}
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
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="regNo" className="block text-sm font-semibold text-gray-700 w-14">
              ID No:
            </label>
            <input
              type="text"
              id="regNo"
              name="regNo"
              value={profile.regNo}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 ml-6 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mr-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="focus:ring-indigo-500 bg-gray-200 ml-7 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="phoneNo" className="block text-sm font-semibold text-gray-700 w-24 mr-2">
              Phone No:
            </label>
            <input
              type="text"
              id="phoneNo"
              name="phoneNo"
              value={profile.phoneNo}
              onChange={handleChange}
              className="focus:ring-indigo-500 -ml-1 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="designation" className="block text-sm font-semibold text-gray-700 w-24 mr-2">
              Designation:
            </label>
            <input
              type="text"
              id="designation"
              name="designation"
              value={profile.designation}
              onChange={handleChange}
              className="focus:ring-indigo-500 -ml-1 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="col-span-1">
          <div className="mb-4 flex items-center">
            <label htmlFor="interestedArea" className="block text-sm font-semibold text-gray-700 w-16 mr-2">
              Interested Area:
            </label>
            <select
              id="interestedArea"
              name="interestedArea"
              value={profile.interestedArea}
              onChange={handleChange}
              className="mt-1 ml-2 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
            >
              <option value="AI">Artificial Intelligence</option>
              <option value="CyberSecurity">Cyber Security</option>
              <option value="DataScience">Data Science & Big Data</option>
              <option value="SoftwareEngineering">Software Engineering</option>
              <option value="MobileWebDevelopment">Mobile & Web Development</option>
              <option value="Blockchain">Blockchain & Cryptocurrency</option>
              <option value="ComputerVision">Computer Vision</option>
              <option value="IoT">Internet of Things</option>
              <option value="DistributedComputing">Distributed Computing</option>
              <option value="BioInformatics">Bio Informatics</option>
            </select>
          </div>

          <div className="mb-4 flex items-center">
            <label htmlFor="projectType" className="block text-sm font-semibold text-gray-700 mr-2">
              Project Type:
            </label>
            <select
              id="projectType"
              name="projectType"
              value={profile.projectType}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
            >
              <option value="Machine Learning">Machine Learning</option>
              <option value="Networking">Networking</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Game Development">Game Development</option>
              <option value="Human Computer Interection">Human Computer Interection</option>
              <option value="Bio Informatics Projects">Bio Informatics Projects</option>
              <option value="Embeded System Projects">Embeded System Projects</option>
              <option value="Cloud Copmuting">Cloud Computing</option>
            </select>
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="program" className="block text-sm font-semibold text-gray-700 mr-4">
              Program:
            </label>
            <select
              id="program"
              name="program"
              value={profile.program}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 -ml-3 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
            >
              <option value="">Select Program</option>
              <option value="Compueter Science">Computer Science</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value='AI'>AI</option>
            </select>
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="levelOfStudies" className="block text-sm font-semibold text-gray-700 w-42">
              Level of Studies:
            </label>
            <input
              type="text"
              id="levelOfStudies"
              name="levelOfStudies"
              value={profile.levelOfStudies}
              onChange={handleChange}
              className="mt-1 -ml-3 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
            />
          </div>

          <div className="ml-72">
            <button
              type="button"
              onClick={handleSubmit
              }
              className="text-white bg-purple-800 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-purple-800 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
        ) : (
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Profile Details</h3>
            <div>
              <p><strong>Full Name:</strong> {profile.fullName}</p>
              <p><strong>ID No:</strong> {profile.regNo}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone No:</strong> {profile.phoneNo}</p>
              <p><strong>Designation:</strong> {profile.designation}</p>
              <p><strong>Interested Area:</strong> {profile.interestedArea}</p>
              <p><strong>Project Type:</strong> {profile.projectType}</p>
              <p><strong>Program:</strong> {profile.program}</p>
              <p><strong>Level of Studies:</strong> {profile.levelOfStudies}</p>
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
}

export default SupervisorProfile;
