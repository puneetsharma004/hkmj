// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSupabaseCRUD } from '../hooks/useSupabaseCRUD';

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Fetch data from all tables
  const { data: announcements } = useSupabaseCRUD('announcements', { orderBy: 'created_at', orderDirection: 'desc' });
  const { data: events } = useSupabaseCRUD('events', { orderBy: 'date', orderDirection: 'asc' });
  const { data: campaigns } = useSupabaseCRUD('campaigns', { orderBy: 'created_at', orderDirection: 'desc' });
  const { data: photos } = useSupabaseCRUD('photos', { orderBy: 'created_at', orderDirection: 'desc' });
  const { data: videos } = useSupabaseCRUD('videos', { orderBy: 'created_at', orderDirection: 'desc' });
  const { data: featuredMoments } = useSupabaseCRUD('featuredMoments', { orderBy: 'created_at', orderDirection: 'desc' });
  const { data: sevaOptions } = useSupabaseCRUD('sevaOptions', { orderBy: 'created_at', orderDirection: 'desc' });
  const { data: socialPlatforms } = useSupabaseCRUD('socialPlatforms', { orderBy: 'created_at', orderDirection: 'desc' });
  const { data: urgentNeeds } = useSupabaseCRUD('urgentNeeds', { orderBy: 'created_at', orderDirection: 'desc' });
  const { data: upcomingEvents } = useSupabaseCRUD('upcomingEvents', { orderBy: 'date', orderDirection: 'asc' });

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Calculate dynamic stats
  const stats = [
    { 
      label: 'Total Announcements', 
      value: announcements.length, 
      icon: '📢', 
      color: 'from-orange-500 to-orange-600', 
      link: '/announcements' 
    },
    { 
      label: 'Upcoming Events', 
      value: events.filter(e => new Date(e.date) >= new Date()).length, 
      icon: '📅', 
      color: 'from-blue-500 to-blue-600', 
      link: '/events' 
    },
    { 
      label: 'Active Campaigns', 
      value: campaigns.length, 
      icon: '🎯', 
      color: 'from-green-500 to-green-600', 
      link: '/campaigns' 
    },
    { 
      label: 'Total Photos', 
      value: photos.length, 
      icon: '📸', 
      color: 'from-purple-500 to-purple-600', 
      link: '/photos' 
    },
    { 
      label: 'Video Content', 
      value: videos.length, 
      icon: '🎥', 
      color: 'from-red-500 to-red-600', 
      link: '/videos' 
    },
    { 
      label: 'Featured Moments', 
      value: featuredMoments.length, 
      icon: '✨', 
      color: 'from-pink-500 to-pink-600', 
      link: '/featured-moments' 
    },
    { 
      label: 'Seva Options', 
      value: sevaOptions.length, 
      icon: '🙏', 
      color: 'from-indigo-500 to-indigo-600', 
      link: '/seva-options' 
    },
    { 
      label: 'Social Platforms', 
      value: socialPlatforms.length, 
      icon: '📱', 
      color: 'from-cyan-500 to-cyan-600', 
      link: '/social-platforms' 
    },
  ];

  const quickActions = [
    { name: 'Add Announcement', icon: '📢', link: '/announcements', color: 'bg-orange-500' },
    { name: 'Create Event', icon: '📅', link: '/events', color: 'bg-blue-500' },
    { name: 'New Campaign', icon: '🎯', link: '/campaigns', color: 'bg-green-500' },
    { name: 'Upload Photo', icon: '📸', link: '/photos', color: 'bg-purple-500' },
  ];

  // Get recent activity from all tables
  const getRecentActivity = () => {
    const activities = [];

    // Announcements
    announcements.slice(0, 3).forEach(item => {
      activities.push({
        action: 'New announcement created',
        item: item.title,
        time: item.created_at,
        icon: '📢',
        color: 'text-orange-400',
        link: '/announcements'
      });
    });

    // Events
    events.slice(0, 3).forEach(item => {
      activities.push({
        action: 'Event added',
        item: item.title,
        time: item.created_at,
        icon: '📅',
        color: 'text-blue-400',
        link: '/events'
      });
    });

    // Campaigns
    campaigns.slice(0, 2).forEach(item => {
      activities.push({
        action: 'Campaign created',
        item: item.title,
        time: item.created_at,
        icon: '🎯',
        color: 'text-green-400',
        link: '/campaigns'
      });
    });

    // Photos
    photos.slice(0, 2).forEach(item => {
      activities.push({
        action: 'Photo uploaded',
        item: item.title,
        time: item.created_at,
        icon: '📸',
        color: 'text-purple-400',
        link: '/photos'
      });
    });

    // Videos
    videos.slice(0, 2).forEach(item => {
      activities.push({
        action: 'Video added',
        item: item.title,
        time: item.created_at,
        icon: '🎥',
        color: 'text-red-400',
        link: '/videos'
      });
    });

    // Urgent Needs
    urgentNeeds.slice(0, 2).forEach(item => {
      activities.push({
        action: 'Urgent need posted',
        item: item.title,
        time: item.created_at,
        icon: '🚨',
        color: 'text-red-400',
        link: '/urgent-needs'
      });
    });

    // Sort by time (newest first) and take top 8
    return activities
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 8);
  };

  // Get upcoming events (next 5)
  const getUpcomingEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return upcomingEvents
      .filter(event => new Date(event.date) >= today)
      .slice(0, 5)
      .map(event => {
        const eventDate = new Date(event.date);
        const daysUntil = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
        
        return {
          name: event.title,
          date: event.date,
          days: daysUntil
        };
      });
  };

  // Format relative time
  const getRelativeTime = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Calculate total content count
  const totalContent = announcements.length + events.length + campaigns.length + 
                       photos.length + videos.length + featuredMoments.length + 
                       sevaOptions.length + socialPlatforms.length;

  // Get critical urgent needs count
  const criticalNeeds = urgentNeeds.filter(need => need.urgent).length;

  const recentActivity = getRecentActivity();
  const nextEvents = getUpcomingEvents();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{getGreeting()}, Admin! 🙏</h1>
            <p className="text-orange-100">{formatDate()}</p>
            <div className="mt-3 flex items-center gap-4 text-orange-100 text-sm">
              <span>📊 Total Content: <strong>{totalContent}</strong></span>
              {criticalNeeds > 0 && (
                <Link 
                  to="/urgent-needs"
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-full text-white font-semibold animate-pulse transition"
                >
                  🚨 {criticalNeeds} Urgent {criticalNeeds === 1 ? 'Need' : 'Needs'}
                </Link>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-5xl font-bold text-white">{formatTime()}</p>
            <p className="text-orange-100 text-sm mt-1">Current Time</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={`${action.color} hover:opacity-90 p-6 rounded-lg shadow-md transition transform hover:scale-105 text-center`}
            >
              <div className="text-4xl mb-2">{action.icon}</div>
              <p className="text-white font-semibold">{action.name}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Overview Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 hover:border-orange-500 transition group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                </div>
                <div className={`text-4xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition`}>
                  {stat.icon}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
          <h2 className="text-xl font-semibold text-orange-500 mb-4 flex items-center gap-2">
            📋 Recent Activity
            {recentActivity.length > 0 && (
              <span className="px-2 py-1 text-xs bg-orange-500/20 text-orange-400 rounded-full">
                {recentActivity.length}
              </span>
            )}
          </h2>
          <div className="space-y-3">
            {recentActivity.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p className="text-4xl mb-2">📭</p>
                <p>No recent activity yet</p>
                <p className="text-sm mt-1">Start by creating content!</p>
              </div>
            ) : (
              recentActivity.map((activity, index) => (
                <Link
                  key={index}
                  to={activity.link}
                  className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition"
                >
                  <span className={`text-2xl ${activity.color}`}>{activity.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-300 text-sm">{activity.action}</p>
                    <p className="text-orange-400 text-sm font-medium truncate">"{activity.item}"</p>
                    <p className="text-gray-500 text-xs mt-1">{getRelativeTime(activity.time)}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
          <h2 className="text-xl font-semibold text-orange-500 mb-4 flex items-center gap-2">
            📅 Upcoming Events
            {nextEvents.length > 0 && (
              <span className="px-2 py-1 text-xs bg-orange-500/20 text-orange-400 rounded-full">
                {nextEvents.length}
              </span>
            )}
          </h2>
          <div className="space-y-3">
            {nextEvents.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p className="text-4xl mb-2">📅</p>
                <p>No upcoming events</p>
                <Link 
                  to="/upcoming-events"
                  className="text-sm mt-2 text-orange-400 hover:text-orange-300 inline-block"
                >
                  Add an event →
                </Link>
              </div>
            ) : (
              nextEvents.map((event, index) => (
                <div key={index} className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-white font-medium">{event.name}</p>
                    {event.days === 0 ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-orange-500/20 text-orange-400 font-semibold">
                        Today!
                      </span>
                    ) : event.days === 1 ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-400 font-semibold">
                        Tomorrow
                      </span>
                    ) : event.days <= 7 ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-400">
                        {event.days} days left
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                        {event.days} days left
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
              ))
            )}
          </div>
          {nextEvents.length > 0 && (
            <Link 
              to="/upcoming-events" 
              className="block mt-4 text-center text-orange-400 hover:text-orange-300 text-sm transition"
            >
              Manage All Events →
            </Link>
          )}
        </div>
      </div>

      {/* System Status */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
        <h2 className="text-xl font-semibold text-orange-500 mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-green-400 font-semibold">Database</p>
            </div>
            <p className="text-gray-400 text-sm">Connected & Operational</p>
            <p className="text-green-400 text-xs mt-1">{totalContent} items stored</p>
          </div>
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-green-400 font-semibold">Content</p>
            </div>
            <p className="text-gray-400 text-sm">All Systems Active</p>
            <p className="text-green-400 text-xs mt-1">
              {photos.length + videos.length + featuredMoments.length} media files
            </p>
          </div>
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-green-400 font-semibold">Live Status</p>
            </div>
            <p className="text-gray-400 text-sm">Real-time Updates Active</p>
            <p className="text-green-400 text-xs mt-1">Last sync: {formatTime()}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats Summary */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg shadow-md border border-gray-700">
        <h2 className="text-xl font-semibold text-orange-500 mb-4">📊 Quick Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-white">{announcements.length + campaigns.length}</p>
            <p className="text-gray-400 text-sm mt-1">Announcements & Campaigns</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{events.length + upcomingEvents.length}</p>
            <p className="text-gray-400 text-sm mt-1">Total Events</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{photos.length + videos.length}</p>
            <p className="text-gray-400 text-sm mt-1">Media Files</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{sevaOptions.length + urgentNeeds.length}</p>
            <p className="text-gray-400 text-sm mt-1">Seva & Needs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
