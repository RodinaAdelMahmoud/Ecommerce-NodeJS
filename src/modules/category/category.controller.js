import { AppError } from "../../../utils/AppError.js";
import { handleError } from "../../../utils/globalErrorHandler.js";
import categoryModel from './../../../db/models/category.model.js';



// ADD CATEGORY
export const addCategory = handleError(async(req,res,next)=>{
const { title} = req.body;

const category = await categoryModel.findOne({title});

if(category){
return next( new AppError("Category already exists", 409));
}

if(!req.file){
    return next(new AppError("Image is required", 400));
}

const newCategory = await categoryModel.create({
    title,
   image: req.file?.filename || req.body.image ,
    createdBy: req.user._id

});

res.status(200).json({msg:"Category added successfully",newCategory})
})


// get CATEGORY
export const getCategory = handleError(async(req,res,next)=>{

const categories = await categoryModel.find();
if(!categories){
    return next(new AppError("Category not found", 404));

}
res.status(200).json({categories})
})


// update CATEGORY
export const updateCategory = handleError(async (req, res, next) => {
    const { title } = req.body;
  
    if (req.file) {
      req.body.image = req.file.filename;
    }
  
    const category = await categoryModel.findOneAndUpdate(
      { title }, 
      { image: req.file?.filename || req.body.image }, 
      { new: true }
    );
  
    if (!category) {
      return next(new AppError("Category not found", 404));
    }
  
    res.status(200).json({ msg: "Category updated successfully", category });
  });
  


// delete CATEGORY
export const deleteCategory = handleError(async (req, res, next) => {
    const { title } = req.body;  
   
  
    const category = await categoryModel.findOneAndDelete({ title });

  
    if (!category) {
      return next(new AppError("Category not found", 404));
    }
  
    res.status(200).json({ msg: "done" });
  });
  

  


