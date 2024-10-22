import express from "express";
import * as SC from './subCategory.controller.js'
import {  uploadImage } from '../../service/multer.js';
import { auth } from '../../middleware/auth.js';
import { systemRoles } from "../../../utils/systemRoles.js";
const router = express.Router();

router.post('/',auth(systemRoles.admin),  uploadImage('image'), SC.addSubCategory);

router.get('/', SC.getSubCategory);
router.patch('/', auth(systemRoles.admin),uploadImage('image'),SC.updateSubCategory);
router.delete('/', auth(systemRoles.admin),SC.deleteCategory);


export default router;