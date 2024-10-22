import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({

title:{
    type:String,
    required:[true,"title is required"],
    trim:true,
    lowercase:true,


},

image:{
    type:String
}
,
createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"admin",
    required:true
},


},


{
    timestamps:true})

const categoryModel = mongoose.model("category",categorySchema)
export default categoryModel