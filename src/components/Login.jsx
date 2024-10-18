import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from './Button'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const schema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
})

export default function Login() {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) })

  const { login } = useAuth()

  function onSubmit(data) {
    login(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center mt-10 border-2 border-gray-500 w-2/5 mx-auto py-8 mb-5"
    >
      <h1 className="text-5xl mb-12 font-semibold">Login</h1>
      <label className="font-medium text-xl mb-5" htmlFor="email">
        Email
      </label>
      <input
        type="email"
        id="email"
        {...register('email')}
        className="bg-stone-100 focus:bg-white transition-colors duration-300 hover:border-blue-500 w-4/5 px-3.5 py-3 rounded-lg border-2 border-black outline-blue-500 mb-2"
        placeholder="Enter your email"
      />
      <p className="text-red-500 h-6 my-1">{errors.email?.message}</p>

      <label className="font-medium text-xl mb-5" htmlFor="password">
        Password
      </label>
      <input
        type="password"
        id="password"
        {...register('password')}
        className="bg-stone-100 focus:bg-white transition-colors duration-300 hover:border-blue-500 w-4/5 px-3.5 py-3 rounded-lg border-2 border-black outline-blue-500 mb-2"
        placeholder="Enter your password"
      />
      <p className="text-red-500 h-6 my-1">{errors.password?.message}</p>

      <Button size={10}>Login</Button>
    </form>
  )
}
