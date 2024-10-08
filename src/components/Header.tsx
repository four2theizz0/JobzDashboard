import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Briefcase, User, LogIn, LogOut, Bell } from 'lucide-react'
import { supabase } from '../utils/supabase'

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  const notificationCount = 5; // This is a sample count, replace with actual logic later

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsLoggedIn(!!session)
    }
    checkAuth()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsLoggedIn(false)
    navigate('/login')
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center text-xl font-bold text-blue-600">
          <Briefcase className="mr-2" />
          JobTracker
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li><Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link></li>
            <li><Link to="/job-search" className="text-gray-600 hover:text-blue-600">Job Search</Link></li>
            <li><Link to="/job-tracking" className="text-gray-600 hover:text-blue-600">Job Tracking</Link></li>
            <li className="relative">
              <Link to="/job-feed" className="text-gray-600 hover:text-blue-600">
                Job Feed
                {notificationCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/profile" className="text-gray-600 hover:text-blue-600">
                    <User className="w-6 h-6" />
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="flex items-center text-gray-600 hover:text-blue-600">
                    <LogOut className="w-5 h-5 mr-1" />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="flex items-center text-gray-600 hover:text-blue-600">
                  <LogIn className="w-5 h-5 mr-1" />
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header