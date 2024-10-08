import React from 'react'
import { Link } from 'react-router-dom'
import { Briefcase } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center text-xl font-bold text-blue-600">
          <Briefcase className="mr-2" />
          JobTracker
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link></li>
            <li><Link to="/job-search" className="text-gray-600 hover:text-blue-600">Job Search</Link></li>
            <li><Link to="/job-tracking" className="text-gray-600 hover:text-blue-600">Job Tracking</Link></li>
            <li><Link to="/profile" className="text-gray-600 hover:text-blue-600">Profile</Link></li>
            <li><Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header