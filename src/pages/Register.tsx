import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import { Mail, Github, Linkedin } from 'lucide-react'

const Register: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    try {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
      alert('Registration successful! Please check your email for confirmation.')
    } catch (error: any) {
      console.error('Error registering:', error)
      setErrorMessage(error.message || 'An error occurred during registration. Please try again.')
    }
  }

  const handleOAuth = async (provider: 'google' | 'github' | 'linkedin') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider })
      if (error) throw error
    } catch (error: any) {
      console.error(`Error signing in with ${provider}:`, error)
      setErrorMessage(error.message || `An error occurred during ${provider} sign-in. Please try again.`)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center">
          <Mail className="w-5 h-5 mr-2" />
          Register with Email
        </button>
      </form>
      <div className="mt-4 space-y-2">
        <button onClick={() => handleOAuth('google')} className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 flex items-center justify-center">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="#ffffff" d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
          </svg>
          Sign up with Google
        </button>
        <button onClick={() => handleOAuth('github')} className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 flex items-center justify-center">
          <Github className="w-5 h-5 mr-2" />
          Sign up with GitHub
        </button>
        <button onClick={() => handleOAuth('linkedin')} className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 flex items-center justify-center">
          <Linkedin className="w-5 h-5 mr-2" />
          Sign up with LinkedIn
        </button>
      </div>
      <div className="mt-4 text-center">
        <p>Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link></p>
      </div>
    </div>
  )
}

export default Register