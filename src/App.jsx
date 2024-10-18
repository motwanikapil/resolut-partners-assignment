import axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import { AuthProvider } from './contexts/AuthContext'
import { PostProvider } from './contexts/PostContext'
import { useLoader } from './contexts/LoadingContext'
import Loader from './components/Loader'
import CreatePost from './components/CreatePost'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

function App() {
  const { isLoading } = useLoader()
  return !isLoading ? (
    <main className="min-h-screen">
      <BrowserRouter>
        <AuthProvider>
          <PostProvider>
            <Navbar />
            <ToastContainer autoClose={1700} />
            <Routes>
              <Route index element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/post/new" element={<CreatePost />} />
            </Routes>
          </PostProvider>
        </AuthProvider>
      </BrowserRouter>
    </main>
  ) : (
    <Loader />
  )
}

export default App
