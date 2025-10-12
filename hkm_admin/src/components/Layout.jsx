// src/components/Layout.jsx
import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Layout() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut();
    navigate('/login');
    setIsLoggingOut(false);
  };

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: '📊' }, // Changed from /dashboard to /
    { name: 'Announcements', path: '/announcements', icon: '📢' },
    { name: 'Upcoming Events', path: '/upcoming-events', icon: '🎉' },
    { name: 'Events', path: '/events', icon: '📅' },
    { name: 'Major Festivals', path: '/major-festivals', icon: '🎊' },
    { name: 'Spiritual Teachers', path: '/spiritual-teachers', icon: '🧘' },
    { name: 'Sponsorship Tiers', path: '/sponsorship-tiers', icon: '💎' },
    { name: 'Photo Gallery', path: '/photos', icon: '📸' },
    { name: 'Video Gallery', path: '/videos', icon: '🎥' },
    { name: 'Featured Moments', path: '/featured-moments', icon: '✨' },
    { name: 'Seva Options', path: '/seva-options', icon: '🙏' },
    { name: 'Campaigns', path: '/campaigns', icon: '🎯' },
    { name: 'Urgent Needs', path: '/urgent-needs', icon: '🚨' },
    { name: 'Temple Accommodation', path: '/temple-accommodation', icon: '🏠' },
    { name: 'Nearby Hotels', path: '/nearby-hotels', icon: '🏨' },
    { name: 'Social Media', path: '/social-platforms', icon: '📱' },
    { name: 'Festival Emergency', path: '/festival-emergency-info', icon: '🆘' },
  ];

  return (
    <div className="flex h-screen bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 transition-all duration-300 ease-in-out shadow-xl flex flex-col`}>
        {/* Header - Fixed at top */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏛️</span>
              <h1 className="text-xl font-bold text-orange-500">Temple Admin</h1>
            </div>
          )}
          {!isSidebarOpen && <span className="text-2xl">🏛️</span>}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition"
          >
            {isSidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Navigation Menu - Scrollable */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      isActive
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`
                  }
                  title={!isSidebarOpen ? item.name : ''}
                >
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  {isSidebarOpen && <span className="font-medium text-sm">{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Info & Logout - Fixed at bottom */}
        <div className="border-t border-gray-700 p-3 flex-shrink-0 bg-gray-800">
          {isSidebarOpen ? (
            <>
              {/* User Info */}
              <div className="mb-3 p-3 bg-gray-700/50 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">Signed in as</p>
                <p className="text-sm text-white font-medium truncate">
                  {user?.email || 'Admin User'}
                </p>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingOut ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span className="font-medium text-sm">Signing out...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-medium text-sm">Sign Out</span>
                  </>
                )}
              </button>
            </>
          ) : (
            // Collapsed sidebar - just show logout icon
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              title="Sign Out"
            >
              {isLoggingOut ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              )}
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-gray-900">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
