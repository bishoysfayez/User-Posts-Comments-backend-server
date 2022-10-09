import { Router } from "express";
import {addPost, getAllPosts, updatePost, getUserPosts, deleteUserPosts} from './controller/posts.controller.js'

const postsRouter = Router();

postsRouter.post('/addpost/:token',addPost);
postsRouter.post('/updatepost/:token', updatePost);
postsRouter.get('/getallposts/:token',getAllPosts);
postsRouter.get('/getuserposts/:token',getUserPosts);
postsRouter.get('/deleteuserpost/:token/:postID',deleteUserPosts);


export default postsRouter;