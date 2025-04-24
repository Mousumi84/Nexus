const express = require("express");
const { createBlogController, readAllBlogController, readMyBlogController, readBlogController, editBlogController, deleteBlogController, post } = require("../Controllers/BlogController");
const rateLimiting = require("../Middleware/rateLimiting");
const isAuth = require("../Middleware/isAuth");
const BlogRouter = express.Router();


BlogRouter.post('/create-blog',post.single('image'),isAuth,rateLimiting,createBlogController);
BlogRouter.get('/get-blogs',isAuth,readAllBlogController);
BlogRouter.get('/get-my-blogs',isAuth,readMyBlogController);
BlogRouter.get('/get-user-blogs',isAuth,readBlogController);
BlogRouter.post('/edit-blog',isAuth,rateLimiting,editBlogController);
BlogRouter.post('/delete-blog',isAuth,deleteBlogController);


module.exports = BlogRouter;