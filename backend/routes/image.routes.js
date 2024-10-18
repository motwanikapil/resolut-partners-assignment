const router = require('express').Router()
const { uploadImage } = require('../controllers/image.controller')
const { authMiddleware } = require('../middlewares/auth.middleware')

router.post('/', authMiddleware, uploadImage)

module.exports = router
