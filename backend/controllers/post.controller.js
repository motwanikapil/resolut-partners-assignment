const Post = require('../models/post.model')
const mongoose = require('mongoose')

async function getAllPosts(req, res) {
  const posts = await Post.find({}).limit(20)

  if (!posts) {
    return res.status(404).json({ message: 'No posts found' })
  }

  res.status(200).json({ posts })
}

async function createPost(req, res) {
  const { title, image, description } = req.body
  const { userId: createdBy } = req
  try {
    const post = await Post.create({
      title,
      image,
      description,
      createdBy,
    })

    if (!post) return res.status(400).json({ message: 'Post Creation Failed' })
    res.status(201).json({ message: 'Post created successfully' })
  } catch (error) {
    console.log('Error occurred while creating post.')
  }
}

async function getPost(req, res) {
  try {
    const { id } = req.params

    const post = await Post.findOne({ _id: id, createdBy: req.userId })

    if (!post) return res.status(404).json({ message: 'Post not found' })

    return res.status(200).json({ message: 'Post found', post })
  } catch (error) {
    console.log('Error occured while finding post.')
  }
}

async function editPost(req, res) {
  try {
    const { id } = req.params

    const { title, description, image } = req.body
    const updateObject = {}

    if (title) updateObject.title = title
    if (description) updateObject.description = description
    if (image) updateObject.image = image

    const post = await Post.findOneAndUpdate(
      { _id: id, createdBy: req.userId },
      { $set: updateObject }
    )

    if (!post) return res.status(404).json({ message: 'Post not found' })

    res.status(200).json({ message: 'Post updated successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error occured while updating post.' })
  }
}

async function deletePost(req, res) {
  const { id } = req.params

  const post = await Post.findOneAndDelete({ _id: id, createdBy: req.userId })

  if (!post) return res.status(404).json({ message: 'No Post Found' })

  res.status(200).json({ message: 'Post deleted successfully' })
}

async function getAllMyPosts(req, res) {
  try {
    const posts = await Post.find({
      createdBy: req.userId,
    }).limit(20)

    if (!posts) {
      return res.status(404).json({ message: 'No posts found' })
    }

    res.status(200).json({ posts })
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  getAllPosts,
  createPost,
  getPost,
  editPost,
  deletePost,
  getAllMyPosts,
}
