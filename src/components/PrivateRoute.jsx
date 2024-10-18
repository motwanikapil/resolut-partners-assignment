import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    } else {
      async function checkAuth() {
        try {
          const user = await axios.get('/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        } catch {
          console.log('Some error occured while accessing protected route')
        }
      }
    }
  }, [navigate])

  return children
}
