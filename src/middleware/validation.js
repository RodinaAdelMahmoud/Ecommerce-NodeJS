import { AppError } from "../../utils/AppError.js";

export const validation = (schema) =>{
    return (req,res,next) =>{
        let {error} = schema.validate({...req.body,...req.params,...req.query},{abortEarly:false})
console.log(error);

        if(!error){
            next()
        }else{
let errorList =[];
error.details.forEach(ele =>{
    errorList.push(ele.message)
});
console.log(errorList);
next(new AppError(errorList,400))   

        }


    }

}