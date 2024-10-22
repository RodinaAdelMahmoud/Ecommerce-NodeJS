import express from "express";
import * as CC from './category.controller.js'
import {  uploadImage } from './../../service/multer.js';
import { auth } from './../../middleware/auth.js';
import { systemRoles } from "../../../utils/systemRoles.js";
const router = express.Router();

router.post('/',auth(systemRoles.admin),  uploadImage('image'), CC.addCategory);

router.get('/', CC.getCategory);
router.patch('/', auth(systemRoles.admin),uploadImage('image'),CC.updateCategory);
router.delete('/', auth(systemRoles.admin),CC.deleteCategory);


export default router;