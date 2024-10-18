import { Link } from 'react-router-dom'

export default function Button({ children, to }) {
  const className = `text-nowrap text-sm sm:text-xl bg-blue-500 py-3 rounded-md text-white hover:underline font-medium`
  if (to)
    return (
      <Link to={to} className={`${className} px-4`}>
        {children}
      </Link>
    )
  return <button className={`${className} px-6 lg:px-10`}>{children}</button>
}
