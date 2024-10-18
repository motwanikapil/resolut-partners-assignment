import axios from 'axios'
import { createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from './AuthContext'

const PostContext = createContext()

function getHeaders() {
  const token = localStorage.getItem('token')
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

function PostProvider({ children }) {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

  async function uploadImage(image) {
    try {
      const formData = new FormData()

      formData.append('image', image)

      const res = await axios.post('/image', formData, getHeaders())

      return res
    } catch (error) {
      toast.error(error.response?.data.message)
    }
  }

  async function createPost(post) {
    try {
      const image = await uploadImage(post.image)

      const res = await axios.post(
        '/post',
        { ...post, image: image.data.filePath },
        getHeaders()
      )
      if (res) {
        toast.success(res.data.message)
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  async function deletePost(id) {
    try {
      const res = await axios.delete(`/post/${id}`, getHeaders())

      if (res) {
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  async function getMyPosts() {
    return await axios.get('/post/myposts', getHeaders())
  }

  async function getPosts() {
    if (isLoggedIn) {
      return await getMyPosts()
    }
    return await axios.get('/post')
  }

  async function updatePost(post) {
    try {
      let imageRes
      if (typeof post.image === 'object') {
        imageRes = await uploadImage(post.image)
      }

      let updatedObject = { ...post }

      if (imageRes) {
        updatedObject = { ...post, image: imageRes.data?.filePath }
      }

      const res = await axios.put(
        `/post/${post.id}`,
        updatedObject,
        getHeaders()
      )
      if (res) {
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data.message)
    }
  }

  return (
    <PostContext.Provider
      value={{ createPost, deletePost, getPosts, updatePost, getMyPosts }}
    >
      {children}
    </PostContext.Provider>
  )
}

function usePost() {
  const context = useContext(PostContext)
  if (!context)
    throw new Error('PostContext is being used outside PostProvider')
  return context
}

export { PostProvider, usePost }
