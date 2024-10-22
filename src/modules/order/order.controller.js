
import { AppError } from "../../../utils/AppError.js";
import { handleError } from "../../../utils/globalErrorHandler.js";
import orderModel from './../../../db/models/order.model.js';
import couponModel from './../../../db/models/coupon.model.js';
import cartModel from './../../../db/models/cart.model.js';
import productModel from './../../../db/models/product.model.js';


// ADD order
export const addOrder = handleError(async (req, res, next) => {
  const { productId ,quantity,couponCode,address,paymentMethod,phone} = req.body;

if(couponCode){
  const coupon = await couponModel.findOne({ code: couponCode.toLowerCase(),
    usedBy:{$nin:[req.user._id]},
   });
  if(!coupon || coupon.expireDate < Date.now()){
    return next(new AppError("coupon not found or expired", 404));
  }
  req.body.coupon = coupon._id;
}

let products = []
let flag = false
if(productId){
  products = [{productId,quantity}]
}
else{
  const cart = await cartModel.findOne({user:req.user._id});
  if(!cart.products.length){
    return next(new AppError("Cart is empty", 404));

  }
  products = cart.products
  flag = true
}
 let finalProducts = []
 let subPrice = 0
 for(let product of products){
  const checkProduct = await productModel.findOne({ _id: product.productId,stock:{$gte:product.quantity} });  


if(!checkProduct){
  return next(new AppError("product not exist or out of stock", 409));
}


if(flag){
  product = product.toObject()
}
product.title = checkProduct.title
product.price = checkProduct.price
product.finalPrice = checkProduct.subPrice * product.quantity
subPrice += product.finalPrice  
finalProducts.push(product)

 }



const order = await orderModel.create({
  user:req.user._id,
  products:finalProducts,
  subPrice,
  address,
  paymentMethod,
  phone,
  coupon:req.body.coupon?._id ,
  status:paymentMethod =="cash"? "pending":"pending",
totalPrice: subPrice - subPrice *((req.body.coupon?.amount || 0)/100)
})


if(req.body.coupon){
  await couponModel.updateOne({ _id: req.body.coupon._id },
    {$push:{usedBy:req.user._id}
  });




for(const product of finalProducts){
  await productModel.updateOne({ _id: product.productId },
    {$inc:{stock:-product.quantity}}
  );
}
}

if(flag){
  await cartModel.updateOne({ user: req.user._id },
    {  products: [] } 
  );
}







return res.status(201).json({ msg: "done", order })
})




// CANCEL order
export const cancelOrder = handleError(async (req, res, next) => {
  const { orderId } = req.query;
  const { reason} = req.body
const order = await orderModel.findById({ _id: orderId });
if(!order){
  return next(new AppError("order not found", 404));
}
if((order.paymentMethod === "cash" && order.status === "placed") || (order.paymentMethod !== "cash" && order.status === "pending")){
  return next(new AppError("you can not cancel this order", 400));
}


  await orderModel.updateOne({ _id: orderId }, { status: "cancelled" , cancelledBy:req.user._id , reason});

  if (order?.couponId){
    await couponModel.updateOne({ _id: order.couponId },
      {$pull:{usedBy:req.user._id}}
    );
  }
for(const product of order.products){
  await productModel.updateOne({ _id: product.productId },
    {$inc:{stock:product.quantity}}
  );
}
res.status

})