import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StudentSidebar from './StudentSideBar';

const StudentProjectCreation = () => {
    const [formData, setFormData] = useState({
        projectTitle: '',
        description: '',
        proposal: '',
        projectType: '',
        supervisor: '',
        program: '',
        groupMembers: ''
    });

    const [supervisors, setSupervisors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSupervisors = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/supervisors', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setSupervisors(response.data); // Assuming response data structure is an array of supervisors
            } catch (error) {
                console.error('Error fetching supervisors:', error.response?.data || error.message);
            }
        };

        fetchSupervisors();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/projects', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Project created successfully:', response.data);
            navigate('/StudentProject'); // Redirect to projects page or show success message
        } catch (error) {
            console.error('Error creating project:', error.response?.data || error.message);
        }
    };

    return (
        <div>
            <div>
                <StudentSidebar />
            </div>

            <div className='container flex ml-72 mr-12 items-center justify-center w-auto h-16 bg-gray-100 mt-16 '>
                <span className='font-bold mr-2'>Department Name: </span>
                <span>Computer Science </span>
            </div>
            <div className='w-[930px] ml-72 mt-5 h-96 mb-36 rounded-lg bg-gray-100'>
                <div className='bg-purple-300 h-10 w-5/3 mt-3 rounded-lg'>
                    <span className='ml-4 font-bold'>Project Creation Form</span>
                </div>
                <div className="flex">
                    <form className="bg-white shadow-md rounded-lg p-6 w-full" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-6 w-5/6">
                            <div className="col-span-1">
                                <div className="mb-4 flex items-center">
                                    <label htmlFor="projectTitle" className="block text-sm font-semibold text-gray-700">Project Title:</label>
                                    <input type="text" id="projectTitle" name="projectTitle" placeholder='Enter Project Title' className="mt-1 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md" value={formData.projectTitle} onChange={handleChange} />
                                </div>
                                <div className="mb-4 flex items-center">
                                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700 -ml-2">Description:</label>
                                    <textarea id="description" name="description" rows="4" placeholder='Write a brief Description' className="mt-1 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md" value={formData.description} onChange={handleChange}></textarea>
                                </div>
                                <div className="mb-4 flex items-center">
                                    <label htmlFor="proposal" className="block text-sm font-semibold text-gray-700 mr-2">Proposal:</label>
                                    <input type="text" id="proposal" name="proposal" placeholder='No files Uploaded' className="focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md" value={formData.proposal} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="col-span-1">
                                <div className="mb-4 flex items-center">
                                    <label htmlFor="projectType" className="block text-sm font-semibold text-gray-700 mr-2">Project Type:</label>
                                    <select id="projectType" name="projectType" className="mt-1 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md" value={formData.projectType} onChange={handleChange}>
                                        <option value="">Select</option>
                                        <option value="AI">Machine Learning Projects</option>
                                        <option value="Security Projects">Security Projects</option>
                                        <option value="Networking ProjectsFlutter">Networking Projects</option>
                                        <option value="Web Development Projects">Web Development Projects</option>
                                        <option value="Mobile App Development Projects">Mobile App Development Projects</option>
                                        <option value="Game Development Projects">Game Development Projects</option>
                                        <option value="Human-Computer Interaction">Human-Computer Interaction</option>
                                        <option value="Bioinformatics Projects">Bioinformatics Projects</option>
                                        <option value="Embedded Systems Projects">Embedded Systems Projects</option>
                                        <option value="Cloud Computing Projects">Cloud Computing Projects</option>
                                    </select>
                                </div>
                                <div className="mb-4 flex items-center">
                                    <label htmlFor="supervisor" className="block text-sm font-semibold text-gray-700 mr-2">Supervisor:</label>
                                    <select id="supervisor" name="supervisor" className="mt-1 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md" value={formData.supervisor} onChange={handleChange}>
                                        <option value="">Select Supervisor</option>
                                        {supervisors.map((supervisor) => (
                                            <option key={supervisor._id} value={supervisor._id}>
                                                {supervisor.profile?.fullName || 'Unnamed Supervisor'}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4 flex items-center">
                                    <label htmlFor="program" className="block text-sm font-semibold text-gray-700 mr-4">Program:</label>
                                    <select id="program" name="program" className="mt-1 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md" value={formData.program} onChange={handleChange}>
                                    <option value="">Select</option>
                                        <option value="Bcs">Bcs</option>
                                        <option value="Msc">Msc</option>
                                        <option value="Phd">Phd</option>
                                    </select>
                                </div>
                                <div className="mb-4 flex items-center">
                                    <label htmlFor="groupMembers" className="block text-sm font-semibold text-gray-700">Group Members:</label>
                                    <input type="text" id="groupMembers" name="groupMembers" placeholder='Enter Group Members IDs' autoComplete="groupMembers" className="mt-1 -ml-3 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md" value={formData.groupMembers} onChange={handleChange} />
                                </div>

                                <div className='ml-72'>
                                    <button type="submit" className="text-white bg-purple-800 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-800 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">APPLY</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StudentProjectCreation;
