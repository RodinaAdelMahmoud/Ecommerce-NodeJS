import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({

name:{
    type:String,
    required:[true,"title is required"],
    trim:true,
    lowercase:true,


},

logo:{
    type:String
}
,
addedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"admin",
    required:true
},
category:{
    type:String,
    ref:"category",
    required:true
},
subCategory:{
    type:String,
    ref:"subCategory",
    required:true
}

},


{
    timestamps:true})

const brandModel = mongoose.model("brand",brandSchema)
export default brandModel