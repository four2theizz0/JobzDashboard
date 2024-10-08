import React, { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import { Loader2 } from 'lucide-react'

const Profile: React.FC = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', content: '' })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, email, bio')
          .eq('id', user.id)
          .single()

        if (error && error.code !== 'PGRST116') {
          throw error
        }

        if (data) {
          setFullName(data.full_name || '')
          setEmail(data.email || user.email || '')
          setBio(data.bio || '')
        } else {
          // Profile doesn't exist, initialize with user's email
          setEmail(user.email || '')
        }
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error)
      setMessage({ type: 'error', content: `Failed to load profile: ${error.message || 'Unknown error'}` })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', content: '' })

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const profileData = {
          id: user.id,
          full_name: fullName,
          email,
          bio,
          updated_at: new Date().toISOString(),
        }

        const { error } = await supabase
          .from('profiles')
          .upsert(profileData)

        if (error) throw error

        setMessage({ type: 'success', content: 'Profile updated successfully' })
      } else {
        throw new Error('No authenticated user found')
      }
    } catch (error: any) {
      console.error('Error updating profile:', error)
      setMessage({ type: 'error', content: `Failed to update profile: ${error.message || 'Unknown error'}` })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      {message.content && (
        <div className={`p-4 rounded-md mb-4 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.content}
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Updating...
            </>
          ) : (
            'Update Profile'
          )}
        </button>
      </form>
    </div>
  )
}

export default Profile