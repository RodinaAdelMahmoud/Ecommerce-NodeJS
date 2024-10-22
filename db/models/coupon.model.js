import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({

amount:{
    type:Number,
    required:[true,"amount is required"],
    trim:true,
    lowercase:true,


}
,
addedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"admin",
},
code:{
    type:String,
    required:true
},
fromDate:{
    type:Date ,
    required:true,
   default:Date.now
    
}
,
expireDate:{
    type:Date,
    required:true
},
users:{

    type:[mongoose.Schema.Types.ObjectId],
    ref:"user",
    required:true
}

},


{
    timestamps:true})

const couponModel = mongoose.model("coupon",couponSchema)
export default couponModel