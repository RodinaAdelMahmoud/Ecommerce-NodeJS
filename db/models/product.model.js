import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
        trim:true
    },
   
    price:{
        type:Number,
        required:true 
    },
    image:{
        type:String
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"admin",
        required:true
    }
,
category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"category",
    required:true
},
stock:{
    type:Number,
    required:true
},
quantity:{
    type:Number,
    required:true
},
discount:{
    type:Number,
    default:1,
    min:0,
    max:100
},
subPrice:{
    type:Number,
    default:1
},
rateAvg:{
    type:Number,
    default:0
}
,
description:{
    type:String
},

subCategory:{
    type:mongoose.Schema.Types.ObjectId,    
    ref:"subCategory",
    required:true
},
rateAvg:{
    type:Number,
    default:0
},
rateNum:{
    type:Number,
    default:0
}
})
const productModel = mongoose.model("product",productSchema)
export default productModel