import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({

name:{
    type:String,
    required:[true,"name is required"],
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
}

,
category:{
    type:String,
    ref:"category",
    required:true
}

},


{
    timestamps:true})

const subCategoryModel = mongoose.model("subCategory",subCategorySchema)
export default subCategoryModel