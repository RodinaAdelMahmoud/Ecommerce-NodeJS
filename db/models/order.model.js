import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"user"

}
,
products:[{
  title:{
      type:String,
      required:true
  },
  price:{
      type:Number,
      required:true
  },
  quantity:{
      type:Number,
      required:true
  },
  productId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"product",
      required:true
  },
  totalPrice:{
      type:Number,
  }
}],
subPrice:{
    type:Number,
    required:true
},
couponId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"coupon"
    
},
totalPrice:{
    type:Number,

},
address:{
    type:String,
    required:true
},
phone:{
    type:Number,
    required:true
},
status:{
    type:String,
    required:true,
    default:"pending",
    enum:["pending","shipped","delivered","canceled"]
},
paymentMethod:{
    type:String,
    required:true,
    enum:["card","cash"]
},
canceledBy:{

    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
},
reason:{
    type:String,
    trim:true
}


},


{
    timestamps:true})

const orderModel = mongoose.model("order",orderSchema)
export default orderModel