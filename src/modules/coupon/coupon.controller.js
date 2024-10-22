
import { AppError } from "../../../utils/AppError.js";
import { handleError } from "../../../utils/globalErrorHandler.js";
import couponModel from './../../../db/models/coupon.model.js';


// ADD coupon
export const addCoupon = handleError(async (req, res, next) => {
  const { amount ,code,expireDate,fromDate} = req.body;

  const coupon = await couponModel.findOne({ code: code.toLowerCase() });
if(coupon){
  return next(new AppError("coupon already exists", 409));
}


  const newCoupon = await couponModel.create({
    amount,
    expireDate,
    fromDate,
    code,
    addedBy: req.user._id


  });

  res.status(201).json({ msg: "done", newCoupon });

})



// update coupon
export const updateCoupon = handleError(async (req, res, next) => {
  const { amount,code,expireDate } = req.body;
const {id}= req.query

  const coupon = await couponModel.findOneAndUpdate(
    { _id:id},

    { amount,code ,expireDate },

    { new: true }
  );

  if (!coupon) {
    return next(new AppError("coupon not found", 404));
  }

  res.status(200).json({ coupon });
});

