import userModel from '../../../DB/models/user.model.js'
import postsModel from '../../../DB/models/posts.model.js'
import commentsModel from '../../../DB/models/comments.model.js';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import usersModel from '../../../DB/models/user.model.js';


// 1- sign up
export const signUp = async (req,res) =>{
    let {userName, email, password, age, phone} = req.body;
    // hash password


    // check if user exist 
    const user = await userModel.findOne({email});
    if(user) {
        res.json({message : "already registered email"});
    } else {
        const hashed = await bcryptjs.hashSync(password,3);
        console.log(hashed);
        const savedUser = await userModel({userName, email, password: hashed, age, phone});
        const impelmentedUser = await savedUser.save();
        res.json({message:"done added user", impelmentedUser})
    }

}

// 2- sign in

export const signIn = async (req,res) =>{
    const {email, password} = req.body;
    let user = await userModel.findOne({email});
    if(user) {
        // check password
        let matchPassword = await bcryptjs.compareSync(password, user.password);
        if (matchPassword){
            const token = jwt.sign({id: user._id}, 'bs');
            res.json({message : "welcome you are now signed in", token});
            console.log(token);
        } else {
            res.json({message: "password not right"});
        }
    } else{
        res.json({message : "user not registered" });
    }
}

// 3- change password

export const changePassword = async (req,res)=>{
    let {token} = req.params;
    let {oldPassword, newPassword} = req.body;

    // check decoded token to check user is signed in
    const decoded = jwt.verify(token,"bs");
    if(decoded){
        console.log(decoded.id);
        let user = await userModel.findOne({_id: decoded.id});

        let matchPassword = await bcryptjs.compareSync(oldPassword, user.password);
        // check if old password matched
        if (matchPassword){
            let newHash = await bcryptjs.hashSync(newPassword,3);
            // update model DB
            let savedHash = await userModel.updateOne({_id:decoded.id}, {password: newHash})
            res.json({message: "updated password successfully"});
            console.log(savedHash);
        } else {
            res.json({message: "your old password is not right"});
        }

    }else{
        res.json({message : "wrong token, you are not logged in"});
    }
}



// 4- update account

export const updateAccount = async(req,res)=>{
    let {token} = req.params;
    let {email, phone} = req.body;

    // check decoded token to check user is signed in
    const decoded = jwt.verify(token,"bs");
    if(decoded){
        console.log(decoded.id);
        let user = await userModel.findOne({_id: decoded.id});
        // update model DB
        let updatedUser = await userModel.updateOne({_id:decoded.id}, {email, phone})
        res.json({message: "updated your data successfully"});
        console.log(updatedUser);
   
    }else{
        res.json({message : "wrong token, you are not logged in"});
    }
}


// 5- delete account incl. Posts and comments

export const deleteAccount = async(req,res)=>{
    let {token} = req.params;
    // check decoded token to check user is signed in
    const decoded = jwt.verify(token,"bs");

    if(decoded){
        // delete user posts
        let deletePosts = await postsModel.deleteMany({createdBy: decoded.id});
        // get user comments and delete each comment from posts model
        let userComments = await commentsModel.find({createdBy: decoded.id});
        let commentsArr = ([...userComments]);
        let commentsIdArr = commentsArr.map((comment)=> comment._id)
        commentsIdArr.map(async (comment)=>{
             let commentRemovalFromPosts = await postsModel.updateMany({commentsID:comment._id},{$pull:{commentsID: comment._id}})
             
         })
         // delete user's comments from comments model 
         let deleteUserComments = await commentsModel.deleteMany({createdBy : decoded.id})
         // finally delete user from users model
         let deleteUser = await usersModel.deleteOne({_id:decoded.id})
         // acknowldege message
         res.json({message: "user and all his/her data deleted successfully"});


    }else {
        res.json({message : "wrong token, you are not logged in"});

    }

}



