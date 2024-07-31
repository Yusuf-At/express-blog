// src/app.js
const express = require('express');
const postsRouter = require('./routes/postRoutes');
const postRoutesv2 = require('./routes/postRoutesv2');
const app = express();

app.use(express.json());

app.use('/api', postsRouter);

app.use('/v2', postRoutesv2);

app.get('/', (req, res) => {
  res.send('Hello again!');
});

module.exports = app;