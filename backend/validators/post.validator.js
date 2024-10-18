const { z } = require('zod')

const postSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .trim()
    .min(5)
    .max(100),
  description: z
    .string({ required_error: 'Description is required' })
    .trim()
    .min(10)
    .max(500),
  image: z.string({ required_error: 'Image is required' }).trim(),
})

module.exports = {
  postSchema,
}
