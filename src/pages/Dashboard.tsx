import React from 'react'
import { Link } from 'react-router-dom'
import { Search, Briefcase, User, Bell } from 'lucide-react'

const Dashboard: React.FC = () => {
  const notificationCount = 5; // This is a sample count, replace with actual logic later

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/job-search" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Search className="w-12 h-12 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Job Search</h2>
          <p className="text-gray-600">Find and track new job opportunities</p>
        </Link>
        <Link to="/job-tracking" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Briefcase className="w-12 h-12 text-green-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Job Tracking</h2>
          <p className="text-gray-600">Manage your job applications</p>
        </Link>
        <Link to="/profile" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <User className="w-12 h-12 text-purple-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          <p className="text-gray-600">Update your profile and preferences</p>
        </Link>
        <Link to="/job-feed" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow relative">
          <Bell className="w-12 h-12 text-yellow-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Job Feed</h2>
          <p className="text-gray-600">View new job postings and updates</p>
          {notificationCount > 0 && (
            <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  )
}

export default Dashboard