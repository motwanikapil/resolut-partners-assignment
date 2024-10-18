import { useState } from 'react'
import EditPost from './EditPost'
import { useAuth } from '../contexts/AuthContext'
import { usePost } from '../contexts/PostContext'

export default function Post({ post, refetch }) {
  const { title, image, description } = post
  const { isLoggedIn } = useAuth()
  const { deletePost } = usePost()
  const [editMode, setEditMode] = useState(false)
  const [showMoreDescription, setShowMoreDescription] = useState(false)
  const descriptionCut =
    description.length > 100 ? description.slice(0, 100) : description
  const moreDescription = description.length > 100 ? description.slice(100) : ''

  return (
    <div className="relative flex justify-center items-center w-full h-full">
      {isLoggedIn && editMode ? (
        <section className="w-full mx-10 h-full flex items-start justify-start bg-stone-200 p-5 relative">
          <EditPost post={post} setEditMode={setEditMode} refetch={refetch} />
          <div className="absolute top-2 right-2 text-xl px-2 py-1 rounded-full transition-colors">
            <div className="flex gap-2 w-full justify-end">
              <button onClick={() => setEditMode((prev) => !prev)}>✏️</button>
              <button
                onClick={async () => {
                  await deletePost(post._id)
                  refetch()
                }}
                className="bg-red-500 font-semibold rounded-full w-7 h-7 text-white"
              >
                X
              </button>
            </div>
          </div>
        </section>
      ) : (
        <main className="flex flex-col items-center justify-center bg-stone-200 lg:w-1/3 mx-10 rounded-lg relative p-5">
          {isLoggedIn && (
            <div className="flex gap-2 w-full justify-end">
              <button onClick={() => setEditMode((prev) => !prev)}>✏️</button>
              <button
                onClick={async () => {
                  await deletePost(post._id)
                  refetch()
                }}
                className="bg-red-500 font-semibold rounded-full w-7 h-7 text-white"
              >
                X
              </button>
            </div>
          )}
          <h1 className="text-2xl font-semibold capitalize text-start w-full h-10 px-10 pt-5 pb-10">
            {title}
          </h1>
          <section className="flex items-center justify-center flex-col">
            <img
              src={`http://localhost:4000/${image}`}
              alt="image"
              className="w-6/12 lg:w-9/12 rounded-lg object-cover py-3"
            />
            <p className="text-stone-500 shrink-0 me-auto pb-10 px-10 w-full">
              {descriptionCut}
              {showMoreDescription && moreDescription}
              {moreDescription && (
                <button
                  onClick={() => setShowMoreDescription((prev) => !prev)}
                  className="text-blue-500"
                >{` show ${showMoreDescription ? 'less' : 'more'}`}</button>
              )}
            </p>
          </section>
        </main>
      )}
    </div>
  )
}
