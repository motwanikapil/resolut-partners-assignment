import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from './Button'
import { useState } from 'react'
import { usePost } from '../contexts/PostContext'

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
})

export default function CreatePost() {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) })

  const [image, setImage] = useState(null)

  const [imageError, setImageError] = useState('')

  const { createPost } = usePost()

  function onSubmit(data) {
    createPost({ ...data, image })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center mt-10"
    >
      {image && (
        <section className="relative mb-10">
          <img
            src={URL.createObjectURL(image)}
            alt="post image"
            className="w-48 rounded-md"
          />
          <button
            onClick={() => setImage(null)}
            className="bg-red-400 hover:bg-red-500 transition-colors duration-300 absolute top-0 right-0 w-10 h-10 rounded-full"
          >
            <span className="text-white font-semibold">X</span>
          </button>
        </section>
      )}
      {!image && (
        <section>
          <label
            htmlFor="image"
            className="w-20 h-20 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-3 cursor-pointer flex items-center justify-center"
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

      <p className="text-red-500 h-6 my-1">{imageError}</p>
      <label className="font-medium text-xl mb-5" htmlFor="title">
        Title
      </label>
      <input
        type="text"
        id="title"
        {...register('title')}
        className={`bg-stone-100 focus:bg-white transition-colors duration-300 hover:border-blue-500 w-2/5 px-3.5 py-3 rounded-lg border-2 border-black outline-blue-500 mb-2`}
        placeholder="Enter Post title"
      />
      <p className="text-red-500 h-6 my-1">{errors.title?.message}</p>
      <label className="font-medium text-xl mb-5" htmlFor="description">
        Description
      </label>
      <input
        type="description"
        id="description"
        {...register('description')}
        className="bg-stone-100 focus:bg-white transition-colors duration-300 hover:border-blue-500 w-2/5 px-3.5 py-3 rounded-lg border-2 border-black outline-blue-500 mb-2"
        placeholder="Enter Post description"
      />
      <p className="text-red-500 h-6 my-1">{errors.description?.message}</p>
      <Button size={10}>Create Post</Button>
    </form>
  )
}
