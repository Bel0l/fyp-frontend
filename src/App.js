// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import WelcomeAdmin from './components/WelcomeAdmin';
import AdminDashboard from './components/AdminDashboard';
import AdminDashboardSupervisors from './components/AdminDashboardSupervisors';
import AdminDashboardProject from './components/AdminDashboardProject';
import StudentProjectCreation from './components/StudentProjectCreation';
import StudentProfile from './components/StudentProfile';
import StudentDashboard from './components/StudentDashboard';
import StudentSidebar from './components/StudentSideBar';
import StudentProject from './components/StudentProject';
import StudentChat from './components/StudentChat';
import SupervisorDashboard from './components/SupervisorDashboard';
import SupervisorProfile from './components/SupervisorProfile';
import Chat from './components/Chat';
import SupervisorProjectRequest from './components/SupervisorProjectRequest';
import SupervisorProjectsUnderMe from './components/SupervisorProjectsUnderMe';
import CreateMeeting from './components/CreateMeeting';
import CreateTask from './components/CreateTask';
import Meeting from './components/Meeting';
import Tasks from './components/Tasks';
import SupervisorProReqDetails from './components/SupervisorProReqDetails';
import StudentTasks from './components/StudentTasks';
import StudentMeeting from './components/StudentMeeting';
import AdminProjectEdit from './components/AdminProjectEdit';
import AdminEditSupervisor from './components/AdminEditSupervisor';
import AdminDashboardStudent from './components/AdminDashboardStudent';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import { ProjectRequestProvider } from './context/ProjectRequestContext';
const App = () => {
  return (
    <Router>
      <AuthProvider> 
      <ProjectRequestProvider>{/* Wrap your entire application with AuthProvider */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<div></div>} />
         
        {/* <Switch> */}
          <Route path="/supervisor" component={SupervisorProjectRequest} />
          {/* Other routes */}
        {/* </Switch> */}
    
          <Route path="/WelcomeAdmin" element={<ProtectedRoute role="admin"><WelcomeAdmin /></ProtectedRoute>} />
          <Route path="/AdminDashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/AdminDashboardStudent" element={<ProtectedRoute role="admin"><AdminDashboardStudent /></ProtectedRoute>} />
          <Route path="/AdminDashboardProject" element={<ProtectedRoute role="admin"><AdminDashboardProject /></ProtectedRoute>} />
          <Route path="/AdminDashboardSupervisors" element={<ProtectedRoute role="admin"><AdminDashboardSupervisors /></ProtectedRoute>} />
          <Route path="/StudentProjectCreation" element={<ProtectedRoute role="student"><StudentProjectCreation /></ProtectedRoute>} />
          <Route path="/StudentProfile" element={<ProtectedRoute role="student"><StudentProfile /></ProtectedRoute>} />
          <Route path="/StudentDashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
          <Route path="/StudentSideBar" element={<ProtectedRoute role="student"><StudentSidebar /></ProtectedRoute>} />
          <Route path="/StudentProject" element={<ProtectedRoute role="student"><StudentProject /></ProtectedRoute>} />
          <Route path="/StudentChat" element={<ProtectedRoute role="student"><StudentChat /></ProtectedRoute>} />
          <Route path="/SupervisorDashboard" element={<ProtectedRoute role="supervisor"><SupervisorDashboard /></ProtectedRoute>} />
          <Route path="/SupervisorProfile" element={<ProtectedRoute role="supervisor"><SupervisorProfile /></ProtectedRoute>} />
          <Route path="/Chat" element={<ProtectedRoute role="supervisor"><Chat /></ProtectedRoute>} />
          <Route path="/SupervisorProjectRequest" element={<ProtectedRoute role="supervisor"><SupervisorProjectRequest /></ProtectedRoute>} />
          <Route path="/SupervisorProjectsUnderMe" element={<ProtectedRoute role="supervisor"><SupervisorProjectsUnderMe /></ProtectedRoute>} />
          <Route path="/CreateMeeting" element={<ProtectedRoute><CreateMeeting /></ProtectedRoute>} />
          <Route path="/CreateTask" element={<ProtectedRoute><CreateTask /></ProtectedRoute>} />
          <Route path="/Tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
          <Route path="/Meeting" element={<ProtectedRoute><Meeting /></ProtectedRoute>} />
          <Route path="/SupervisorProReqDetails" element={<ProtectedRoute role="supervisor"><SupervisorProReqDetails /></ProtectedRoute>} />
          <Route path="/SupervisorProReqDetails/:id" element={<ProtectedRoute role="supervisor"><SupervisorProReqDetails /></ProtectedRoute>} />
          <Route path="/StudentTasks" element={<ProtectedRoute role="student"><StudentTasks /></ProtectedRoute>} />
          <Route path="/StudentMeeting" element={<ProtectedRoute role="student"><StudentMeeting /></ProtectedRoute>} />
          <Route path="/AdminProjectEdit/:id" element={<ProtectedRoute role="admin"><AdminProjectEdit /></ProtectedRoute>} />
          <Route path="/AdminEditSupervisor/:id" element={<ProtectedRoute role="admin"><AdminEditSupervisor /></ProtectedRoute>} />
        </Routes>
        </ProjectRequestProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
