import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Dating from './pages/Dating.jsx'
import TravelBuddy from './pages/TravelBuddy.jsx'
import PartyBuddy from './pages/PartyBuddy.jsx'
import Safety from './pages/Safety.jsx'
import Membership from './pages/Membership.jsx'
import ExploreGifts from './pages/ExploreGifts.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/dating" element={<Dating />} />
      <Route path="/travel-buddy" element={<TravelBuddy />} />
      <Route path="/party-buddy" element={<PartyBuddy />} />
      <Route path="/safety" element={<Safety />} />
      <Route path="/membership" element={<Membership />} />
      <Route path="/explore-gifts" element={<ExploreGifts />} />

      {/* Admin routes — not linked from any public page */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
