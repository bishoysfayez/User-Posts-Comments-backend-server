import postsModel from '../../../DB/models/posts.model.js'
//import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


// 1 - add post
export const addPost = async (req,res)=>{
    let {token} = req.params;
    let {title, content} = req.body
    const decoded = jwt.verify(token,"bs");
    if(decoded){
        console.log(decoded.id);
        const newPost = await postsModel({title, content, createdBy: decoded.id, comments:[]})
        const impelmentedPost = await newPost.save();
        res.json({message:"done added post", impelmentedPost})

    }else{
        res.json({message : "wrong token, you are not logged in"});
    }
}    


// 2- update Post

export const updatePost = async (req,res)=>{
    let {token} = req.params;
    let {postID, newTitle, newContent} = req.body;
    //console.log(req.body)
    const decoded = jwt.verify(token,"bs");
    console.log(decoded)
    if(decoded){
        //check if user is the original post creator
        let postData = await postsModel.findOne({_id: postID})
        if(decoded.id == postData.createdBy){
            //console.log("decoded-id :", decoded.id)
            //console.log("post data creator-id :", postData.createdBy)
            const newPost = await postsModel.updateOne({_id:postID},{title:newTitle, content: newContent})
            res.json({message:"done update post", newPost});
        } else{
            res.json({message: "you can't update post - only post creator can update"})
        }
       
    }else{
        res.json({message : "wrong token, you are not logged in"});
    }
}
// 3 - get all posts
export const getAllPosts = async (req,res)=>{
    let {token} = req.params;
    const decoded = jwt.verify(token,"bs");
    if(decoded){
        const allPosts = await postsModel.find().populate('createdBy');
        res.json({message:"done get all posts", allPosts});
    }else{
        res.json({message : "wrong token, you are not logged in"});
    }
}
// 4 - get User posts
export const getUserPosts = async (req,res)=>{
    let {token} = req.params;
    const decoded = jwt.verify(token,"bs");
    if(decoded){
        const userPosts = await postsModel.find({createdBy:decoded.id}).populate('createdBy');
        //check if user created posts
        if(userPosts.length){
            res.json({message:"done get all posts", userPosts});
        } else{
            res.json({message: "you don't have any posts yet"})
        }
       
    }else{
        res.json({message : "wrong token, you are not logged in"});
    }

}



// 5 - delete User posts
export const deleteUserPosts = async (req,res)=>{
    let {token, postID} = req.params;
    const decoded = jwt.verify(token,"bs");
    console.log(decoded)
    if(decoded){
        //check if user is the original post creator
        let postData = await postsModel.findOne({_id: postID});
        if(decoded.id == postData.createdBy){
            
            const deletePost = await postsModel.deleteOne({_id:postID});
            res.json({message:"done delete post", deletePost});
        } else{
            res.json({message: "you can't delete post - only post creator can delete"})
        }
       
    }else{
        res.json({message : "wrong token, you are not logged in"});
    }
}


