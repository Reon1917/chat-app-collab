import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// Lazy load pages for better performance
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const Chat = lazy(() => import('./pages/chat/Chat'))
const Profile = lazy(() => import('./pages/profile/Profile'))

// Loading component for suspense fallback
const LoadingSpinner = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <div className="loading loading-spinner loading-lg text-primary"></div>
  </div>
)

function App() {
  // TODO: Replace with actual auth check
  const isAuthenticated = false

  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="min-h-screen bg-base-100">
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={!isAuthenticated ? <Login /> : <Navigate to="/chat" />} 
            />
            <Route 
              path="/register" 
              element={!isAuthenticated ? <Register /> : <Navigate to="/chat" />} 
            />
            
            {/* Protected Routes */}
            <Route 
              path="/chat/*" 
              element={isAuthenticated ? <Chat /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/profile" 
              element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} 
            />
            
            {/* Default redirect */}
            <Route 
              path="*" 
              element={<Navigate to={isAuthenticated ? "/chat" : "/login"} />} 
            />
          </Routes>
        </div>
      </Suspense>
    </Router>
  )
}

export default App
