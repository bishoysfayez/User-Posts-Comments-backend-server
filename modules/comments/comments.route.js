import { Router } from "express";
import { addComment, updateComment, deleteComment } from "./controller/comments.controller.js";

const commentsRouter = Router();


commentsRouter.post('/addcomment/:token/:postID',addComment);
commentsRouter.post('/updatecomment/:token/:commentID',updateComment);
commentsRouter.delete('/deletecomment/:token/:commentID',deleteComment);




 export default commentsRouter;