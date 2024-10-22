import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({

createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"user"

}
,
productId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"product"
},
rate:{
    type:Number,
    required:true
},
comment:{
    type:String,
    required:true
},


},


{
    timestamps:true})

const reviewModel = mongoose.model("review",reviewSchema)
export default reviewModel