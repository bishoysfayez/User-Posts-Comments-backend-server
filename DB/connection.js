import mongoose from "mongoose";

const connection = async () =>{
    return await mongoose.connect("mongodb://localhost:27017/test")
    .then(()=>{
        console.log('db connected');
    })
    .catch(()=>{
        console.log('db error')
    })

}

export default connection;
