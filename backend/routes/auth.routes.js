const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const authValidator = require('../validators/auth.validator')
const validate = require('../middlewares/validate.middleware')
const { authMiddleware } = require('../middlewares/auth.middleware')

router
  .route('/register')
  .post(validate(authValidator.signupSchema), authController.register)

router
  .route('/login')
  .post(validate(authValidator.loginSchema), authController.login)

router.route('/').get(authMiddleware, authController.user)

module.exports = router
