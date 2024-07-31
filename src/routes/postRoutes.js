// src/routes/posts.js
const express = require('express');
const { createPost, getPosts, getPostById, updatePost, deletePost, getHello, getApi } = require('../controllers/postController');
const router = express.Router();

router.post('/posts', createPost);
router.get('/posts', getPosts);
router.get('/posts/:id', getPostById);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);
router.get('/hello', getHello);
router.get('/', getApi);

module.exports = router;
