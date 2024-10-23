import { AppError } from "../../../utils/AppError.js";
import { handleError } from "../../../utils/globalErrorHandler.js";
import categoryModel from '../../../db/models/category.model.js';
import subCategoryModel from './../../../db/models/subCategory.js';



// ADD SUBCATEGORY
export const addSubCategory = handleError(async(req,res,next)=>{
const { name,category} = req.body;

const subCategory = await subCategoryModel.findOne({name});

if(subCategory){
return next( new AppError(" already exists", 409));
}


const refCategory = await categoryModel.findOne({title:category});

if(!refCategory){
  return next(new AppError("Category not found", 404));
}



if(!req.file){
    return next(new AppError("Image is required", 400));
}

const newSubCategory = await subCategoryModel.create({
    name,
   image: req.file?.filename || req.body.image ,
    createdBy: req.user._id,
    category:category

});

res.status(200).json({msg:"sub-category added successfully",newSubCategory})
})


// get SUBCATEGORY
export const getSubCategory = handleError(async(req,res,next)=>{

const subCategories = await subCategoryModel.find();
if(!subCategories){
    return next(new AppError("Category not found", 404));

}
res.status(200).json({subCategories})
})


// // update CATEGORY
export const updateSubCategory = handleError(async (req, res, next) => {
    const { name } = req.body;
  
    if (req.file) {
      req.body.image = req.file.filename;
    }
  
    const category = await subCategoryModel.findOneAndUpdate(
      { name }, 
      { image: req.file?.filename || req.body.image }, 
      { new: true }
    );
  
    if (!subCategory) {
      return next(new AppError("subCategory not found", 404));
    }
  
    res.status(200).json({ msg: "subCategory updated successfully", category });
  });
  


// delete CATEGORY
export const deleteSubCategory = handleError(async (req, res, next) => {
    const { name } = req.body;  
   
  
    const subCategory = await subCategoryModel.findOneAndDelete({ name });

  
    if (!subCategory) {
      return next(new AppError("subCategory not found", 404));
    }
  
    res.status(200).json({ msg: "done" });
  });
  

  


