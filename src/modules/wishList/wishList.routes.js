import express from "express";
import * as BC from './wishList.controller.js'
import { uploadImage } from "../../service/multer.js";
import { auth } from '../../middleware/auth.js';
import { systemRoles } from "../../../utils/systemRoles.js";
const router = express.Router();

router.post('/',auth(systemRoles.admin),BC.createWishList);



export default router;
