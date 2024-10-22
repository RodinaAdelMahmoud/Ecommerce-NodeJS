import express from "express";
import * as BC from './brand.controller.js'
import { uploadImage } from "../../service/multer.js";
import { auth } from '../../middleware/auth.js';
import { systemRoles } from "../../../utils/systemRoles.js";
const router = express.Router();

router.post('/',auth(systemRoles.admin),uploadImage('image'),BC.addBrand);
router.get('/',BC.getBrands);



export default router;
