import express from "express";
import * as RC from './review.controller.js'
import { auth } from '../../middleware/auth.js';
import { systemRoles } from "../../../utils/systemRoles.js";
const router = express.Router();

router.post('/',auth(systemRoles.user),RC.addReview);
router.delete('/',auth(systemRoles.user),RC.deleteReview);



export default router;
