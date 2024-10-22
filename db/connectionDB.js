import mongoose  from "mongoose";

const connectionDb = async()  => {
    return await  mongoose.connect("mongodb://localhost:27017/ecommerce")
    .then(() => console.log("DB connected")).catch((err)=>{
        console.log("DB connection error",err)
    })
}
export default connectionDb