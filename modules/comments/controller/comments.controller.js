import commentsModel from "../../../DB/models/comments.model.js";
import postsModel from "../../../DB/models/posts.model.js";

// 1- add comment

export const addComment = async (req, res) => {
  let { postID } = req.params;
  let { content } = req.body;

  // check if comment exists
  let post = await postsModel.findOne({ _id: postID });
  if (post) {
    //update comments model
    let newComment = await commentsModel({ content, createdBy: req.currentID });
    let savedComment = await newComment.save();
    res.json({ message: "comment saved successfully", savedComment });
    // update posts model

    let commentToPost = await postsModel.updateOne(
      { _id: postID },
      { $push: { commentsID: savedComment._id } }
    );
  } else {
    res.json({ message: "wrong post id " });
  }
};

// 2- update Comment
export const updateComment = async (req, res) => {
  let { commentID } = req.params;
  let { content } = req.body;
  const comment = await commentsModel.findOne({ _id: commentID });
  //console.log(req.currentID)
  //check if the updater is the comment owner
  if (req.currentID == comment.createdBy) {
    let updatedComment = await commentsModel.updateOne(
      { _id: commentID },
      { content }
    );
    res.json({ message: "updated successfully", updatedComment });
  } else {
    res.json({
      message: "you can't updte comment - only the comment owner can update",
    });
  }
};

// 3- delete Comment
export const deleteComment = async (req, res) => {
  let { commentID } = req.params;
// find the comment of the user  
  const comment = await commentsModel.findOne({ _id: commentID });

  //check if the user is the comment owner
  if (req.currentID == comment.createdBy) {
    // delete from posts' comments array

    let commentRemovalFromPosts = await postsModel.updateOne(
      { commentsID: comment._id },
      { $pull: { commentsID: comment._id } }
    );
    // delete from comments model

    let deletedCommentImplementation = await commentsModel.deleteOne({
      _id: commentID,
    });

    // send final acknowledgement
    res.json({
      message: "deleted successfully",
      deletedCommentImplementation,
    });
  } else {
    res.json({
      message: "you can't delete comment - only the comment owner can delete",
    });
  }
};
