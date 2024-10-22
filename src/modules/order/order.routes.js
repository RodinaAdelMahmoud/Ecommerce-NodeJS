import express from "express";
import * as OC from './order.controller.js'
import { auth } from '../../middleware/auth.js';
import { systemRoles } from "../../../utils/systemRoles.js";
const router = express.Router();

router.post('/',auth(systemRoles.user),OC.addOrder);
router.put('/',auth(systemRoles.user),OC.cancelOrder);



export default router;
