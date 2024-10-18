const User = require('../models/user.model')

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists)
      return res.status(400).json({ message: 'User already exists' })

    const userCreated = await User.create({ name, email, password })

    res.status(201).json({
      message: 'User created successfully',
      token: await userCreated.generateToken(),
      name: userCreated.name,
      email: userCreated.email,
      userId: userCreated._id.toString(),
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const userExists = await User.findOne({ email })

    if (!userExists) {
      return res.status(400).json({ message: 'Invalid Credentials' })
    }

    const user = await userExists.comparePassword(password)

    if (user) {
      res.status(200).json({
        message: 'Login Successful',
        name: user.name,
        email: user.email,
        token: await userExists.generateToken(),
        userId: userExists._id.toString(),
      })
    } else {
      res.status(401).json({ message: 'Invalid Credentials' })
    }
  } catch (error) {
    // res.status(500).send({ message: 'Internal server error' })
    next(error)
  }
}

const user = async (req, res) => {
  try {
    const userData = req.user
    res.status(200).json({ userData })
  } catch (error) {
    console.log(`Error from user route ${error}`)
  }
}

module.exports = { register, login, user }
