import express from "express";
import * as UC from './user.controller.js'
import { auth } from './../../middleware/auth.js';
import { systemRoles } from './../../../utils/systemRoles.js';
import { uploadImage } from "../../service/multer.js";

const router = express.Router();

router.post('/sign-up', UC.signUp);
router.get('/verify-email', UC.verifyEmail);
router.get('/profile',auth(systemRoles.user),UC.getProfile);
router.post('/sign-in', UC.signIn);
router.patch('/forget-password', UC.forgetPassword);
router.patch('/reset-password', UC.resetPassword);
router.post('/resend-link', UC.resendLink);
router.patch('/profile', auth(systemRoles.user), uploadImage('image'),UC.updateProfile);

export default router;
