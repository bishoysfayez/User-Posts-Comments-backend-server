import mongoose from "mongoose";

 const postsSchema = new mongoose.Schema({
    title : {type : String},
    content :{type : String},
    createdBy : {type : mongoose.Schema.Types.ObjectId, ref: 'users'},
    commentsID :[{type:mongoose.Schema.Types.ObjectId, ref: 'comments'}]
})

const postsModel = mongoose.model('posts', postsSchema);
export default postsModel;