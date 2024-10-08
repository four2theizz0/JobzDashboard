import React, { useState } from 'react'
import { Search } from 'lucide-react'

const JobSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement job search logic here
    console.log('Searching for:', searchTerm, 'in', location)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Job Search</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="Job title, keywords, or company"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-md"
          />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center">
            <Search className="mr-2" />
            Search
          </button>
        </div>
      </form>
      {/* Add job search results component here */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-600">Job search results will be displayed here.</p>
      </div>
    </div>
  )
}

export default JobSearch