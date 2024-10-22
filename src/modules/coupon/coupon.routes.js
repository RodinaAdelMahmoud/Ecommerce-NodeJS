import express from "express";
import * as CC from './coupon.controller.js'
import { uploadImage } from "../../service/multer.js";
import { auth } from '../../middleware/auth.js';
import { systemRoles } from "../../../utils/systemRoles.js";
const router = express.Router();

router.post('/',auth(systemRoles.admin),CC.addCoupon);
router.patch('/',auth(systemRoles.admin),CC.updateCoupon);


export default router;
