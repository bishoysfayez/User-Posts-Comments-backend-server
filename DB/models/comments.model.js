import mongoose from "mongoose";


 const commentsSchema = new mongoose.Schema({
    content : {type : String},
    createdBy : {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
})

const commentsModel = mongoose.model('comments', commentsSchema);
export default commentsModel;