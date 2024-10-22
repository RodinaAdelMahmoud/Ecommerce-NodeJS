import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema({

user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"user"

}
,
products:[{
  
  productId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"product",
      required:true
  }
  }]


},


{
    timestamps:true})

const wishListModel = mongoose.model("wishList",wishListSchema)
export default wishListModel