import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({

user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true

},

products:[{
productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"product",
    required:true
},
quantity:{
    type:Number,
    required:true
}
}]
,
totalPrice:{
    type:Number,
    default:0,
    required:true
}
},


{
    timestamps:true})

const cartModel = mongoose.model("cart",cartSchema)
export default cartModel