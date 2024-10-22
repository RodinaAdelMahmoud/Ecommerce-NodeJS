import express from "express";
import * as CC from './cart.controller.js'
import { uploadImage } from "../../service/multer.js";
import { auth } from '../../middleware/auth.js';
import { systemRoles } from "../../../utils/systemRoles.js";
const router = express.Router();

router.post('/',auth(systemRoles.admin),CC.addCart);
router.patch('/',auth(systemRoles.admin),CC.updateCart);
router.put('/',auth(systemRoles.admin),CC.clearCart);


export default router;
