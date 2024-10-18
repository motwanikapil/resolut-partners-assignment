const mongoose = require('mongoose')

async function connectDb() {
  const { MONGODB_URL } = process.env
  return await mongoose.connect(MONGODB_URL)
}

module.exports = { connectDb }
