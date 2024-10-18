import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from './Button'
import { useState } from 'react'
import { usePost } from '../contexts/PostContext'
import { toast } from 'react-toastify'

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
})

export default function EditPost({ post, setEditMode, refetch }) {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema), defaultValues: post })

  const [image, setImage] = useState(post.image || null)
  const [imageError, setImageError] = useState('')
  const { updatePost } = usePost()

  async function onSubmit(data) {
    if (!image) {
      toast.error('Enter a valid image')
      return
    }
    const updateObject = { id: post._id }
    const { title, description } = data
    if (post.title !== title) updateObject.title = data.title
    if (post.description !== description) updateObject.description = description
    if (image) updateObject.image = image

    await updatePost(updateObject)
    setEditMode(false)
    refetch()
  }

  return (
    <main className="flex flex-col items-center justify-center w-full h-full bg-stone-200 rounded-lg p-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center w-full"
      >
        {image && (
          <section className="mb-4 w-full flex justify-center">
            <img
              src={
                typeof image === 'string'
                  ? `http://localhost:4000/${post.image}`
                  : URL.createObjectURL(image)
              }
              alt="post image"
              className="w-4/12 rounded-lg object-cover py-3"
            />
            <button
              onClick={() => setImage(null)}
              className="bg-red-400 hover:bg-red-500 transition-colors duration-300 w-7 h-7 rounded-full -ms-5"
            >
              <span className="text-white font-semibold">X</span>
            </button>
          </section>
        )}

        {!image && (
          <section className="mb-4">
            <label
              htmlFor="image"
              className="w-20 h-20 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 cursor-pointer flex items-center justify-center"
            >
              <p className="text-white text-5xl -mt-2">+</p>
            </label>
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={(e) => {
                const img = e.target.files[0]
                if (
                  (img.type === 'image/png' ||
                    img.type === 'image/jpg' ||
                    img.type === 'image/jpeg') &&
                  img.size < 5000000 &&
                  img.size > 30000
                ) {
                  if (imageError) setImageError('')
                  setImage(img)
                } else {
                  setImageError('Invalid image selected')
                }
              }}
            />
          </section>
        )}

        <p className="text-red-500 h-6 mb-3">{imageError}</p>

        <label className="font-medium text-xl mb-2 self-start" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          {...register('title')}
          className="bg-stone-100 focus:bg-white transition-colors duration-300 hover:border-blue-500 w-full px-3.5 py-3 rounded-lg border-2 border-black outline-blue-500 mb-3"
          placeholder="Enter Post title"
        />
        <p className="text-red-500 h-6 mb-3">{errors.title?.message}</p>

        <label
          className="font-medium text-xl mb-2 self-start"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          {...register('description')}
          className="bg-stone-100 focus:bg-white transition-colors duration-300 hover:border-blue-500 w-full px-3.5 py-3 rounded-lg border-2 border-black outline-blue-500 mb-3 h-32"
          placeholder="Enter Post description"
        />
        <p className="text-red-500 h-6 mb-3">{errors.description?.message}</p>

        <Button size={10}>Update Post</Button>
      </form>
    </main>
  )
}
