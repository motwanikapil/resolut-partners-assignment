const router = require('express').Router()
const { authMiddleware } = require('../middlewares/auth.middleware')
const postController = require('../controllers/post.controller')
const { postSchema } = require('../validators/post.validator')
const validate = require('../middlewares/validate.middleware')

router
  .route('/')
  .get(postController.getAllPosts)
  .post(authMiddleware, validate(postSchema), postController.createPost)

router.route('/myposts').get(authMiddleware, postController.getAllMyPosts)

router
  .route('/:id')
  .get(authMiddleware, postController.getPost)
  .put(authMiddleware, postController.editPost)
  .delete(authMiddleware, postController.deletePost)

module.exports = router
