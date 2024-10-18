import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useLoader } from './LoadingContext'

const AuthContext = createContext()

function AuthProvider({ children }) {
  const navigate = useNavigate()
  const { setIsLoading } = useLoader()

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('token') || false
  )
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (isLoggedIn) {
      async function fetchUser() {
        try {
          const res = await axios.get('/user', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })

          if (res) {
            setUser(res.data.userData)
          }
        } catch (error) {
          toast.error(error.response?.data.message)
        }
      }

      fetchUser()
    }
  }, [])

  async function login(credentials) {
    try {
      setIsLoading(true)
      const res = await axios.post('/user/login', credentials)
      const { message, token } = res.data
      if (message && token) {
        toast.success(res.data.message)
        localStorage.setItem('token', res.data.token)
        setIsLoggedIn(res.data.token)
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response?.data?.message)
    } finally {
      setIsLoading(false)
    }
  }
  async function signup(credentials) {
    try {
      const res = await axios.post('/user/register', credentials)
      const { message, token } = res.data
      if (message && token) {
        toast.success(res.data.message)
        localStorage.setItem('token', res.data.token)
        setIsLoggedIn(res.data.token)
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  function logout() {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
    toast.success('Logout success')
    navigate('/')
  }
  return (
    <AuthContext.Provider value={{ login, signup, isLoggedIn, user, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('AuthContext is being used outside the AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
