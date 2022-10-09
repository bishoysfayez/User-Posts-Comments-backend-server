import mongoose from "mongoose";

 const usersSchema = new mongoose.Schema({
    name : {type : String},
    email :{type : String}, 
    password : {type : String},
    age : {type :Number},
    phone : {type : String},

})
  const usersModel = mongoose.model('users', usersSchema);
  export default usersModel;