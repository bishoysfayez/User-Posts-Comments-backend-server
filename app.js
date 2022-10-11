import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import express from 'express';
import * as allRoutes from './modules/index.route.js';
import connection from './DB/connection.js';

const app = express();

app.use(express.json());

app.use("/api/v1/auth", allRoutes.authRouter);
app.use("/api/v1/posts", allRoutes.postsRouter);
app.use("/api/v1/comments", allRoutes.commentsRouter);


connection();


app.listen(3000, ()=>{
    console.log('running on port 3000')
});