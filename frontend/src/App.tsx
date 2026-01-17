import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import JobSeekerDashboard from './dashboard/JobSeekerDashboard'
import RecruiterDashboard from './dashboard/RecruiterDashboard'
import AdminDashboard from './dashboard/AdminDashboard'
import ProtectedRoute from './routes/ProtectedRoutes'
import PostJob from './component/PostJob'
import RecruiterProfile from './pages/RecruiterProfile'
import PendingRecruiters from './pages/PendingRecruiters'
import AdminUsers from './pages/AdminUsers'
import AdminJobs from './pages/AdminJobs'
import RecruiterJobs from './pages/RecruiterJobs'
import RecruiterApplicants from './pages/RecruiterApplicants'
import JobSeekerProfile from './pages/JobSeekerProfile'
import JobSeekerJobs from './pages/JobSeekerJobs'
import JobDetails from './pages/JobDetails'
import JobSeekerApplications from './pages/JobSeekerApplications'


function App() {

  return (
    <>
      <div className='app-container min-h-screen bg-gray-50'>
        <Routes>

          <Route path='/' element={<Login />} />

          <Route path='/recruiter' element={
            <ProtectedRoute allowedRoles={["RECRUITER"]}>
              <RecruiterDashboard />
            </ProtectedRoute>
          } />
          <Route path='/admin' element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route
            path='/recruiter/post-job'
            element={
              <ProtectedRoute allowedRoles={['RECRUITER']} >
                <PostJob />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recruiter/profile"
            element={
              <ProtectedRoute allowedRoles={['RECRUITER']} >
                <RecruiterProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/recruiters"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <PendingRecruiters />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminUsers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/jobs"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminJobs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recruiter/jobs"
            element={
              <ProtectedRoute allowedRoles={['RECRUITER']}>
                <RecruiterJobs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recruiter/applicants"
            element={
              <ProtectedRoute allowedRoles={['RECRUITER']}>
                <RecruiterApplicants />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobseeker/profile"
            element={
              <ProtectedRoute allowedRoles={['JOB_SEEKER']}>
                <JobSeekerProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobseeker"
            element={
              <ProtectedRoute allowedRoles={['JOB_SEEKER']}>
                <JobSeekerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobseeker/jobs"
            element={
              <ProtectedRoute allowedRoles={['JOB_SEEKER']}>
                <JobSeekerJobs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobseeker/jobs/:id"
            element={
              <ProtectedRoute allowedRoles={['JOB_SEEKER']}>
                <JobDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobseeker/applications"
            element={
              <ProtectedRoute allowedRoles={['JOB_SEEKER']}>
                <JobSeekerApplications />
              </ProtectedRoute>
            }
          />



        </Routes>
      </div>
    </>
  )
}

export default App
