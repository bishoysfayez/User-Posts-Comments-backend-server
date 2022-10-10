import postsModel from "../../../DB/models/posts.model.js";

// 1 - add post
export const addPost = async (req, res) => {
  //console.log('req id = ',req.currentID)
  let { title, content } = req.body;
  const newPost = await postsModel({
    title,
    content,
    createdBy: req.currentID,
    comments: [],
  });
  const impelmentedPost = await newPost.save();
  res.json({ message: "done added post", impelmentedPost });
};

// 2- update Post

export const updatePost = async (req, res) => {
  let { postID, newTitle, newContent } = req.body;
  //check if user is the original post creator
  let postData = await postsModel.findOne({ _id: postID });
  if (req.currentID == postData.createdBy) {
    const newPost = await postsModel.updateOne(
      { _id: postID },
      { title: newTitle, content: newContent }
    );
    res.json({ message: "done update post", newPost });
  } else {
    res.json({
      message: "you can't update post - only post creator can update",
    });
  }
};

// 3 - get all posts
export const getAllPosts = async (req, res) => {
  const allPosts = await postsModel.find().populate("createdBy");
  res.json({ message: "done get all posts", allPosts });
};
// 4 - get User posts
export const getUserPosts = async (req, res) => {
  const userPosts = await postsModel
    .find({ createdBy: req.currentID })
    .populate("createdBy");
  //check if user created posts
  if (userPosts.length) {
    res.json({ message: "done get all posts", userPosts });
  } else {
    res.json({ message: "you don't have any posts yet" });
  }
};

// 5 - delete User posts
export const deleteUserPosts = async (req, res) => {
  let { postID } = req.params;
  //check if user is the original post creator
  let postData = await postsModel.findOne({ _id: postID });
  if (req.currentID == postData.createdBy) {
    const deletePost = await postsModel.deleteOne({ _id: postID });
    res.json({ message: "done delete post", deletePost });
  } else {
    res.json({
      message: "you can't delete post - only post creator can delete",
    });
  }
};
