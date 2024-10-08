import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to JobTracker</h1>
      <p className="text-xl mb-8">Your ultimate job search and tracking companion</p>
      <div className="space-x-4">
        <Link to="/register" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Get Started</Link>
        <Link to="/login" className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300">Login</Link>
      </div>
    </div>
  )
}

export default Home