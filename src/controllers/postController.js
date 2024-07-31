// src/controllers/postsController.js
const { db } = require('../config/firebase');
const { calculateReadTime } = require('../utils/calculateReadTime');
const { convertToWIB, convertFirestoreTimestampToDate, convertFirestoreTimestampToFullDateTime } = require('../utils/timeHelper');
const url = require('url')

const createPost = async (req, res) => {
  // request
  const {title, subtitle, content, imageUrl } = req.body

  if(!title || !subtitle || !content || !imageUrl) {
    return res.status(400).send('Missing required fields');
  }

  // waktu posting
  const readTime = calculateReadTime(content);
  const currenDate = convertToWIB(new Date()); // set current time to wib

  // response
  const post = {
    title,
    subtitle,
    date: currenDate, // set current date as WIB
    readTime,
    content,
    imageUrl,
    createdAt: currenDate // set current date as WIB
  };

  try {
    // const post = req.body;
    const {title, subtitle, content, imageUrl} = req.body;
    const docRef = await db.collection('posts').add(post);
    res.status(201).send(`Post created with ID: ${docRef.id}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getPosts = async (req, res) => {
  try {
    const postsSnapshot = await db.collection('posts').orderBy('createdAt', 'desc').get();
    const posts = postsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        date: convertFirestoreTimestampToDate(data.date),
        createdAt: convertFirestoreTimestampToFullDateTime(data.createdAt)
      };
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('posts').doc(id).get();
    if (!doc.exists) {
      return res.status(404).send('Post not found');
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const docRef = db.collection('posts').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).send('Post not found');
    }
    await docRef.update(data);
    res.status(200).send('Post updated');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = db.collection('posts').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).send('Post not found');
    }
    await docRef.delete();
    res.status(200).send('Post deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getHello = async (req, res) => {
  try {

    const query = url.parse(req.url, true).query;
    const area_of_circle = 3.14 * query.a * query.a
    res.status(200).json({ query: query.lang, "area_of_circle": area_of_circle });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getApi = async (req, res) => {
  try {
    res.status(200).json({message: 'APIIIIIII'});
  } catch (error) {
    res.status(500).send(error.message);
  }
};


module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getHello,
  getApi
};
