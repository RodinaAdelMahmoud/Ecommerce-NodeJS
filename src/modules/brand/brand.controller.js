import categoryModel from "../../../db/models/category.model.js";
import subCategoryModel from "../../../db/models/subCategory.js";
import { AppError } from "../../../utils/AppError.js";
import { handleError } from "../../../utils/globalErrorHandler.js";
import brandModel from './../../../db/models/brand.model.js';


// ADD Brand
export const addBrand = handleError(async (req, res, next) => {
  const { name ,subCategory,category} = req.body;

  const brand = await brandModel.findOne({ name });
  const categories = await categoryModel.findOne({ title:category });
  const subCategories = await subCategoryModel.findOne({ name:subCategory });

  if (brand) {
    return next(new AppError("brand already exists", 409));
  }

  if (!req.file) {
    return next(new AppError("Image is required", 400));
  }

  if (!subCategory) {
    return next(new AppError("subCategory not found", 404));
  }

  if (!categories) {
    return next(new AppError("Category not found", 404));
  }

 


  const newBrand = await brandModel.create({
    name,
    subCategory:subCategories._id,
    category: categories._id,
    logo: req.file?.filename,
    addedBy: req.user.id


  });

  res.status(201).json({ msg: "done", newBrand });

})


// // GET brand
export const getBrands = handleError(async (req, res, next) => {
  const brands = await brandModel.find()
  res.status(200).json({ brands })
})




