import { Link } from 'react-router-dom'
import Button from './Button'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth()
  return (
    <main className="flex items-center justify-between bg-stone-200 px-3.5 py-3">
      <em>
        <Link className="text-md sm:text-xl" to="/">
          <u>Resolut Partners Assignment</u>
        </Link>
      </em>

      {!isLoggedIn ? (
        <section className="space-x-5">
          <Button size={10} to="/signup" className="my-10">
            Signup
          </Button>
          <Link
            className="text-blue-500 text-xl hover:underline font-medium"
            to="/login"
          >
            Login
          </Link>
        </section>
      ) : (
        <section className="flex items-center gap-2">
          <Button size={4} to="/post/new">
            Create New Post
          </Button>
          <button
            onClick={() => logout()}
            className="text-sm font-semibold text-blue-500"
          >
            Logout
          </button>
        </section>
      )}
    </main>
  )
}
