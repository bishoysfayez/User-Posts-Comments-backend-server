import { Router } from "express";
import {addPost, getAllPosts, updatePost, getUserPosts, deleteUserPosts} from './controller/posts.controller.js'
import { auth } from "../../middleware/auth.js";

const postsRouter = Router();

postsRouter.post('/addpost/', auth(),addPost);
postsRouter.post('/updatepost',auth(), updatePost);
postsRouter.get('/getallposts',auth(),getAllPosts);
postsRouter.get('/getuserposts',auth(),getUserPosts);
postsRouter.get('/deleteuserpost/:postID',auth(),deleteUserPosts);


export default postsRouter;