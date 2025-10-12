// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Announcements from './pages/Announcements';
import Events from './pages/Events';
import MajorFestivals from './pages/MajorFestivals';
import SpiritualTeachers from './pages/SpiritualTeachers';
import SponsorshipTiers from './pages/SponsorshipTiers';
import UpcomingEvents from './pages/UpcomingEvents';
import Photos from './pages/Photos';
import Videos from './pages/Videos';
import FeaturedMoments from './pages/FeaturedMoments';
import SevaOptions from './pages/SevaOptions';
import Campaigns from './pages/Campaigns';
import UrgentNeeds from './pages/UrgentNeeds';
import TempleAccommodation from './pages/TempleAccommodation';
import NearbyHotels from './pages/NearbyHotels';
import SocialPlatforms from './pages/SocialPlatforms';
import FestivalEmergencyInfo from './pages/FestivalEmergencyInfo';
import { Toaster } from 'react-hot-toast';
import ForgotPassword from './components/ForgotPassword';

function App() {
  return (

    <>
      {/* Toast Container */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          // Default options
          duration: 3000,
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
          // Success
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          // Error
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="events" element={<Events />} />
            <Route path="major-festivals" element={<MajorFestivals />} />
            <Route path="spiritual-teachers" element={<SpiritualTeachers />} />
            <Route path="sponsorship-tiers" element={<SponsorshipTiers />} />
            <Route path="upcoming-events" element={<UpcomingEvents />} />
            <Route path="photos" element={<Photos />} />
            <Route path="videos" element={<Videos />} />
            <Route path="featured-moments" element={<FeaturedMoments />} />
            <Route path="seva-options" element={<SevaOptions />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="urgent-needs" element={<UrgentNeeds />} />
            <Route path="temple-accommodation" element={<TempleAccommodation />} />
            <Route path="nearby-hotels" element={<NearbyHotels />} />
            <Route path="social-platforms" element={<SocialPlatforms />} />
            <Route path="festival-emergency-info" element={<FestivalEmergencyInfo />} />
            {/* Add more routes for events, campaigns, etc. */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  );
}

export default App;
