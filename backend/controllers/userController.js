import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  
  const { name, email, password, phone, role, education } = req.body;
  if (
    !name ||
    !email ||
    !password ||
    !phone ||
    !role ||
    !education
  ) {
    return next(new ErrorHandler("Please fill full details!", 400));
  }
  const user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists", 400));
  }

  await User.create({
    name,
    email,
    password,
    phone,
    role,
    education,
   
  });
  res.status(200).json({
    success:true,
    message:"User registered",
  });
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please fill full details!", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  if (user.role !== role) {
    return next(new ErrorHandler("Invalid role", 400));
  }

  res.status(200).json({
    success: true,
    message: "User logged in :)",
  });
});


