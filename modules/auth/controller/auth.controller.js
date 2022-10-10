import userModel from "../../../DB/models/user.model.js";
import postsModel from "../../../DB/models/posts.model.js";
import commentsModel from "../../../DB/models/comments.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import usersModel from "../../../DB/models/user.model.js";


// 1- sign up
export const signUp = async (req, res) => {
    let { userName, email, password, age, phone } = req.body;
    // hash password

    // check if user exist
    const user = await userModel.findOne({ email });
    if (user) {
        res.json({ message: "already registered email" });
    } else {
        const hashed = await bcryptjs.hashSync(password, 3);
        const savedUser = await userModel({
            userName,
            email,
            password: hashed,
            age,
            phone,
        });
        const impelmentedUser = await savedUser.save();
        res.json({ message: "done added user", impelmentedUser });
    }
};

// 2- sign in

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
        // check password
        let matchPassword = await bcryptjs.compareSync(password, user.password);
        if (matchPassword) {
            const token = jwt.sign({ id: user._id }, 'bs');
            res.json({ message: "welcome you are now signed in", token });
        } else {
            res.json({ message: "password not right" });
        }
    } else {
        res.json({ message: "user not registered" });
    }
};

// 3- change password =================

export const changePassword = async (req, res) => {
    let {oldPassword, newPassword} = req.body
    // check decoded token to check user is signed in
    let user = await userModel.findOne({ _id: req.currentID });
    let matchPassword = await bcryptjs.compareSync(oldPassword, user.password);
    // check if old password matched
    if (matchPassword) {
        let newHash = await bcryptjs.hashSync(newPassword, 3);
        // update model DB
        let savedHash = await userModel.updateOne(
            { _id: req.currentID },
            { password: newHash }
        );
        res.json({ message: "updated password successfully" });
    } else {
        res.json({ message: "your old password is not right" });
    }
};

// 4- update account

export const updateAccount = async (req, res) => {
    let { email, phone } = req.body;

    let user = await userModel.findOne({ _id: req.currentID });
    // update model DB
    let updatedUser = await userModel.updateOne(
        { _id: req.currentID },
        { email, phone }
    );
    res.json({ message: "updated your data successfully" });
};

// 5- delete account incl. Posts and comments

export const deleteAccount = async (req, res) => {
  // delete user posts
  //console.log('req', req.currentID)
  let deletePosts = await postsModel.deleteMany({ createdBy: req.currentID });
  // get user comments and delete each comment from posts model
  let userComments = await commentsModel.find({ createdBy: req.currentID });
  let commentsArr = [...userComments];
  let commentsIdArr = commentsArr.map((comment) => comment._id);
  commentsIdArr.map(async (comment) => {
    let commentRemovalFromPosts = await postsModel.updateMany(
      { commentsID: comment._id },
      { $pull: { commentsID: comment._id } }
    );
  });
  // delete user's comments from comments model
  let deleteUserComments = await commentsModel.deleteMany({
    createdBy: req.currentID,
  });
  // finally delete user from users model
  let deleteUser = await usersModel.deleteOne({ _id: req.currentID });
  //console.log('del' , req.currentID);
  // acknowldege message
  res.json({ message: "user and all his/her data deleted successfully" });
};
