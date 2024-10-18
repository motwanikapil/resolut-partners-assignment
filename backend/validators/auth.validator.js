const { z } = require('zod')

// Creating an object schema

const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email({ message: 'Invalid email address' })
    .min(3, { message: 'Email must be more than 3 characters' })
    .max(255, { message: 'Email must not be more than 255 characters' }),
  password: z
    .string({ required_error: 'Password is required' })
    .trim()
    .min(6, { message: 'Password must be atleast 6 characters' })
    .max(1024, { message: 'Password must not be more than 1024 characters' }),
})

const signupSchema = loginSchema.extend({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(3, { message: 'Name must be atleast 3 characters' })
    .max(255, { message: 'Name must not be more than 255 characters' }),
})

module.exports = {
  signupSchema,
  loginSchema,
}
