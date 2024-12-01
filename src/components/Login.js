import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !password || !role) {
      setError('Please enter username, password, and select a role.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        username,
        password,
        role,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);

      // Set the user data in the context
      await login({ username, role });

      // Navigate to the appropriate dashboard
      if (role.toLowerCase() === 'admin') {
        navigate('/AdminDashboard');
      } else if (role.toLowerCase() === 'supervisor') {
        navigate('/SupervisorDashboard');
      } else if (role.toLowerCase() === 'student') {
        navigate('/StudentDashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials or unauthorized');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-80 h-full fixed top-0 left-0 bg-[#5c3675]">
        <img src={logo} alt="Logo" className="w-auto h-auto my-36 bg-white rounded-full" />
      </div>

      <div className='flex justify-center items-center'>
        <div className="form flex justify-center items-center bg-slate-100 rounded-xl shadow-lg m-4 ml-52 p-8 md:mr-20 md:mt-12 md:w-auto">
          <form onSubmit={handleLogin} className="flex flex-col">
            <h2 className='text-3xl font-bold font-sans'>Welcome to FYP Portal</h2>
            <h4 className='text-gray-500 mt-2'>Final Year Project Management System</h4>
            <p className='font-bold text-gray-700 font-sans text-sm mt-8'>Login your account</p>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="mt-2 space-y-2">
              <div>
                <label htmlFor="username" className="text-sm font-bold">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username..."
                  className="ring-1 ring-gray-300 w-full rounded-md px-2 py-1 mt-1 mb-2 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-bold">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password..."
                  className="ring-1 ring-gray-300 w-full rounded-md px-2 py-1 mt-1 mb-2 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="SelectRole" className="text-sm font-bold">Select Role:</label>
                <select
                  id="SelectRole"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="ring-1 ring-gray-300 w-full rounded-md px-2 py-1 mt-1 mb-2 outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="" disabled>Select a role</option>
                  <option value="admin">Admin</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="student">Student</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-[#6532A5] text-white p-2 px-3 rounded-md font-semibold"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
