import commentsModel from '../../../DB/models/comments.model.js'
import postsModel from '../../../DB/models/posts.model.js'
import jwt from 'jsonwebtoken'

// 1- add comment

export const addComment = async (req,res)=>{ 
    let {token, postID} = req.params;
    let {content} = req.body;
    

    // check decoded token to check user is signed in
    const decoded = jwt.verify(token,"bs");
    if(decoded){
        
        // check if comment exists
        let post = await postsModel.findOne({_id:postID});
        if (post){
            //update comments model
            let newComment = await commentsModel({content, createdBy: decoded.id});
            let savedComment = await newComment.save();
            console.log(savedComment)
            res.json({message: "comment saved successfully", savedComment})
            // update posts model

            let commentToPost = await postsModel.updateOne({_id:postID},{$push:{commentsID:savedComment._id}})
        } else{
            res.json({message: "wrong post id "})
        }

    }else{
        res.json({message : "wrong token, you are not logged in"});

    }

}


// 2- update Comment
export const updateComment = async (req,res)=>{
    let {token, commentID} = req.params;
    let {content} = req.body;
    // check decoded token to check user is signed in
    const decoded = jwt.verify(token,"bs");
    const comment = await commentsModel.findOne({_id:commentID})
    if(decoded){
        //check if the updater is the comment owner
        if(decoded.id == comment.createdBy){
            let updatedComment = await commentsModel.updateOne({_id:commentID}, {content})
            res.json({message: 'updated successfully', updatedComment})
        }else{
            res.json({message: "you can't updte comment - only the comment owner can update"})
        }
    
    }else{
        res.json({message : "wrong token, you are not logged in"});
    }
}


// 3- delete Comment
export const deleteComment = async (req,res)=>{
    let {token, commentID} = req.params;
    // check decoded token to check user is signed in
    const decoded = jwt.verify(token,"bs");
    const comment = await commentsModel.findOne({_id:commentID})
    if(decoded){
        //check if the user is the comment owner
        if(decoded.id == comment.createdBy){
            // delete from posts' comments array

            let commentRemovalFromPosts = await postsModel.updateOne({commentsID:comment._id},{$pull:{commentsID: comment._id}})
            //console.log('from posts', commentRemovalFromPosts)
            // delete from comments model

            let deletedCommentImplementation = await commentsModel.deleteOne({_id:commentID});
           
            // send final acknowledgement
            res.json({message: 'deleted successfully', deletedCommentImplementation})
        }else{
            res.json({message: "you can't delete comment - only the comment owner can delete"})
        }
    
    }else{
        res.json({message : "wrong token, you are not logged in"});
    }
}

