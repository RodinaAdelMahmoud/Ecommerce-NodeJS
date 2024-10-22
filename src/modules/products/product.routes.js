import express from "express";
import * as PC from './product.controller.js'
import { uploadImage } from "../../service/multer.js";
import { auth } from './../../middleware/auth.js';
import { systemRoles } from "../../../utils/systemRoles.js";
const router = express.Router();

router.post('/',auth(systemRoles.admin),uploadImage('image'),PC.addProduct);
router.get('/',PC.getProducts);
router.patch('/',auth(systemRoles.admin),PC.updateProduct);



export default router;
