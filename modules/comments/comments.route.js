import { Router } from "express";
import { addComment, updateComment, deleteComment } from "./controller/comments.controller.js";
import { auth } from "../../middleware/auth.js";

const commentsRouter = Router();


commentsRouter.post('/addcomment/:postID', auth(),addComment);
commentsRouter.post('/updatecomment/:commentID', auth(),updateComment);
commentsRouter.delete('/deletecomment/:commentID', auth(),deleteComment);




 export default commentsRouter;