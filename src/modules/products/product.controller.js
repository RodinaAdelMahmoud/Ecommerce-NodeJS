import categoryModel from "../../../db/models/category.model.js";
import { AppError } from "../../../utils/AppError.js";
import { handleError } from "../../../utils/globalErrorHandler.js";
import productModel from './../../../db/models/product.model.js';
import subCategoryModel from './../../../db/models/subCategory.js';


// ADD Product
export const addProduct = handleError(async (req, res, next) => {
  const { title, price ,category,stock,discount,subCategory,description,quantity} = req.body;

  const product = await productModel.findOne({ title });
  const categories = await categoryModel.findOne({ title:category });
  const subCategories = await subCategoryModel.findOne({ title:subCategory });

  if (product) {
    return next(new AppError("product already exists", 409));
  }

  if (!req.file) {
    return next(new AppError("Image is required", 400));
  }

  if (!categories) {
    return next(new AppError("Category not found", 404));
  }

 if(!subCategories){
  return next(new AppError("subCategory not found", 404));
 }



  const newProduct = await productModel.create({
    title,
    price,
    stock,
    category: categories._id,
    image: req.file?.filename,
    createdBy: req.user.id,
    discount,
    subCategory : subCategories._id,
    description ,quantity
  });

  res.status(201).json({ msg: "done", newProduct });

})


// GET Product
export const getProducts = handleError(async (req, res, next) => {

  // pagination
let page = req.query.page *1 || 1
if(page <1) page = 1
let limit =2 
let skip = (page -1 ) * limit

// filter
let excludeQuery = ["page", "sort", "search", "select"]
let filterQuery = {...req.query}
excludeQuery.forEach((e) => delete filterQuery[e])
filterQuery = JSON.parse(JSON.stringify(filterQuery).replace(/\b(gt|gte|lt|lte|in)\b/g, (m) => `$${m}`))

// sort
const mongooseQuery = productModel.find(filterQuery).skip(skip).limit(limit)

if(req.query.sort){
  mongooseQuery.sort(req.query.sort.replaceAll(",", " "))
}

// select
if(req.query.select){
  mongooseQuery.select(req.query.select.replaceAll(",", " "))
}

// search
if(req.query.search){
  mongooseQuery.find({
    $or: [
      { title: { $regex: req.query.search, $options: "i" } },
      { description: { $regex: req.query.search, $options: "i" } },
    ],
  })
}

  const products = await productModel.find({})
  res.status(200).json({ products })
})




// update product
export const updateProduct = handleError(async (req, res, next) => {
  const { title } = req.body;
  if (req.file) {
    req.body.image = req.file.filename;
  }

  const product = await productModel.findOneAndUpdate(
    { createdBy: req.user.id, },
    { title: title },

    { 

      image: req.file?.filename || req.body.image 
    },
    { new: true }
  );

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({ product });
});

