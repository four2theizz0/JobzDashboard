import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../utils/supabase'

const Home: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsLoggedIn(!!session)
    }
    checkAuth()
  }, [])

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to JobTracker</h1>
      <p className="text-xl mb-8">Your ultimate job search and tracking companion</p>
      {!isLoggedIn && (
        <div className="space-x-4">
          <Link to="/register" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Get Started</Link>
          <Link to="/login" className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300">Login</Link>
        </div>
      )}
      {isLoggedIn && (
        <div>
          <p className="text-xl mb-4">You're logged in!</p>
          <Link to="/dashboard" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Go to Dashboard</Link>
        </div>
      )}
    </div>
  )
}

export default Home