// src/routes/posts.js
const express = require('express');
const { getAdmin, getHOme } = require('../controllers/postControllerv2');
const yusuf = express.Router();

yusuf.get('/admin', getAdmin);
yusuf.get('/', getHOme);


module.exports = yusuf;
