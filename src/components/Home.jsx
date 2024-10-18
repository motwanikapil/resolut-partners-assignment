import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
// import { useLoader } from '../contexts/LoadingContext'
import Loader from '../components/Loader'
import { usePost } from '../contexts/PostContext'
import Post from '../components/Post'
import { useAuth } from '../contexts/AuthContext'

export default function Home() {
  const { getPosts } = usePost()
  const { isLoggedIn } = useAuth()
  const {
    data: postsData,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['posts', isLoggedIn],
    queryFn: getPosts,
    refetchOnWindowFocus: false,
  })

  let posts = []

  if (isLoading || isFetching) {
    return <Loader />
  }

  if (postsData) {
    posts = postsData.data.posts
  }
  return posts.length > 0 ? (
    <div className="flex flex-col gap-10 items-center justify-center w-full my-10">
      {posts
        .slice()
        .reverse()
        .map((post) => (
          <Post post={post} key={post._id} refetch={refetch} />
        ))}
    </div>
  ) : (
    <div className="flex items-center justify-center h-[32rem] w-full">
      <h1 className="text-3xl font-semibold">No Posts found...</h1>
    </div>
  )
}
