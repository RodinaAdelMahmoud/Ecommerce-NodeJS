
import { AppError } from "../../../utils/AppError.js";
import { handleError } from "../../../utils/globalErrorHandler.js";
import cartModel from './../../../db/models/cart.model.js';
import productModel from './../../../db/models/product.model.js';


// ADD CART
export const addCart = handleError(async (req, res, next) => {
  const { productId,quantity} = req.body;

  const product = await productModel.findOne({ _id: productId ,stock:{$gte:quantity}});
if(!product){
  return next(new AppError("product not exist or out of stock", 409));
}

const cartExist = await cartModel.findOne({user:req.user._id});
if(!cartExist){

  const newCart = await cartModel.create({
    user:req.user._id,
    products:[{
      productId,
      quantity
    }]
  
  
  });
  res.status(201).json({ msg: "done", newCart });
}

let flag = false;
for(product of cartExist.products){

  if(product.id == productId){
    product.quantity = quantity;
    flag = true;}


}

if(!flag){
  cartExist.products.push({
    productId,
    quantity
  })
}
await cartExist.save();
res.status(201).json({ msg: "done", cartExist });

})



// REMOVE cart
export const updateCart = handleError(async (req, res, next) => {
  const { productId} = req.body;

  const cartExist = await cartModel.findOneAndUpdate(
    {user:req.user._id,"products.productId":productId},
    { $pull: { products: { productId } } },

    { new: true }
  );


  res.status(200).json({ cartExist });
});

// Clear cart
export const clearCart = handleError(async (req, res, next) => {

  const cartExist = await cartModel.findByIdAndUpdate( req.user._id,
    { products  : [] }, 

    { new: true }
  );
if(!cartExist){
  return next(new AppError("Cart not found", 404));}

  res.status(200).json({ cartExist });
});

