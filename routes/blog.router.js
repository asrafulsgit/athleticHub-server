const express = require('express');
const userAuthentication = require('../middlewares/userAuth-middleware');
const { getBlogBySlug, getAllBlogs } = require('../controllers/blog.controllers');
const blogRouter = express.Router();



blogRouter.get('/blogs', getAllBlogs)
blogRouter.get('/blog/:slug',userAuthentication,  getBlogBySlug)


module.exports = blogRouter;