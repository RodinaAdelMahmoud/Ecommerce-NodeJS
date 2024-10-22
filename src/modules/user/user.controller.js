import jwt from "jsonwebtoken";
import { AppError } from "../../../utils/AppError.js";
import { handleError } from "../../../utils/globalErrorHandler.js";
import bcrypt from 'bcrypt';
import userModel from './../../../db/models/user.model.js';
import { sendEmail } from "../../service/sendEmail.js";
import { nanoid,customAlphabet } from "nanoid";
import slugify from "slugify";

// =========== SignUp ===========

export const signUp = handleError(async (req, res, next) => {
  const { name, email, password ,role} = req.body;
  const emailExist = await userModel.findOne({ email: email.toLowerCase() });

  if (emailExist) return next(new AppError("User already exists", 409));

  const token = jwt.sign({ email }, process.env.signatureKey, { expiresIn: '10m' });
  const link = `${process.env.baseUrl}/users/verify-email?token=${token}`;
  await sendEmail(
    email,
    "Verify your email",
    `
    <p><a href="${link}">Click here to verify your email</a></p>
    `
  );

  const hash = await bcrypt.hash(password, +process.env.saltRounds);

  const newUser = await userModel.create({
    name,
    email,
    password: hash,
    verified: false,
role : role || "user",
    slug: slugify(name, { lower: true, strict: true })
  });

  res.status(201).json({ msg: "User created successfully", user: newUser });
});
// =========== verifyEmail ===========

export const verifyEmail = handleError(async (req, res, next) => {
  const { token } = req.query; 

  try {
    const decoded = jwt.verify(token, process.env.signatureKey);
    if (!decoded?.email) {
      return next(new AppError("Invalid token", 400));
    }

    const user = await userModel.findOneAndUpdate(
      { email: decoded.email, verified: false },
      { verified: true },
      { new: true }
    );

    if (!user) {
      return next(new AppError("User not found or already verified", 400));
    }

    res.status(200).json({ msg: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email:", error);
    next(new AppError("Token verification failed", 500));
  }
});


// =========== resendLink ===========

export const resendLink = handleError(async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email: email.toLowerCase() });

  if (!user) {
    return next(new AppError("User does not exist", 404));
  }

  if (user.verified) {
    return next(new AppError("Email already verified", 400));
  }


  const token = jwt.sign({ email }, process.env.signatureKey, { expiresIn: '10m' });
  const link = `${process.env.baseUrl}/users/verify-email?token=${token}`;

  await sendEmail(
    email,
    "Verify your email",
    `<a href="${link}">Click here to verify your email</a>
    `
  );

  

  res.status(200).json({ msg: "New verification email sent" });
});

// =========== signIn ===========

export const signIn = handleError(async (req, res, next) => {
  const { email, password } = req.body;
  const emailExist = await userModel.findOne({ email: email.toLowerCase() });

  if (!emailExist) {
    return next(new AppError("Invalid credentials", 404));
  }

  if (!emailExist.verified) {
    return next(new AppError("Please verify your email first", 401));
  }

  const passwordMatch = bcrypt.compareSync(password, emailExist.password);
  if (!passwordMatch) {
    return next(new AppError("Invalid credentials", 404));
  }

  const token = jwt.sign(
    { id: emailExist._id, email },
    process.env.signatureKey,
    { expiresIn: '1h' }
  );

  res.status(200).json({ msg: "Sign-in successful", token });
});


// =========== forgetPassword ===========
export const forgetPassword = handleError(async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email: email.toLowerCase() });

  if (!user) {
    return next(new AppError("user not exist", 404));
  }

  const code = customAlphabet('0123456789', 5);
  const newCode = code();

  await sendEmail(email,"reset password", `<p>Your reset code is: <strong>${newCode}</strong></p>`);
  await userModel.findByIdAndUpdate(user._id, { code: newCode });
  res.status(200).json({ msg: "done" });
});



// =========== resetPassword ===========
export const resetPassword = handleError(async (req, res, next) => {
  const { email, password, code } = req.body;
  const user = await userModel.findOne({ email: email.toLowerCase() });

  if (!user) {
    return next(new AppError("User does not exist", 404));
  }

  if (user.code !== code || !code) {
    return next(new AppError("Invalid code", 404));
  }

  const hash = await bcrypt.hash(password, bcrypt.genSaltSync(12));

  await userModel.updateOne({ email }, { password: hash, code: "" });

  res.status(200).json({ msg: "done" });
});




// =========== get profile ===========
export const getProfile = handleError(async (req, res, next) => {

    const profile = await userModel.findOne({ _id: req.user.id });
    if (!profile) {
      return next(new AppError("User not found", 404));
    }
  
    res.status(200).json({ profile });
  
  });
  
  
  // =========== update profile ===========
  export const updateProfile = handleError(async (req, res, next) => {
    if (req.file) req.body.profileImage = req.file.filename;
    
  
    const profile = await userModel.findByIdAndUpdate(
      { _id: req.user.id },
      { image: req.file?.filename || req.body.image }, 
      { new: true }
    );
  
    if (!profile) {
      return next(new AppError("User not found", 404));
    }
  
    res.status(200).json({ profile });
  });
  