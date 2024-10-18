require('dotenv').config()
const morgan = require('morgan')
const { connectDb } = require('./utils/db')
const express = require('express')

const cors = require('cors')

const app = express()
const authRoutes = require('./routes/auth.routes')
const postRoutes = require('./routes/post.routes')
const imageRoutes = require('./routes/image.routes')
const errorMiddleware = require('./middlewares/error.middleware')

const { PORT, DOMAIN } = process.env

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/user', authRoutes)
app.use('/post', postRoutes)
app.use('/image', imageRoutes)
app.use('/uploads', express.static('uploads'))
app.use(errorMiddleware)

connectDb()
  .then((res) => {
    console.log('Database connected successfully')
    app.listen(PORT, () => {
      console.log(`Server listening on http://${DOMAIN}:${PORT}`)
    })
  })
  .catch((err) => console.log(err))
