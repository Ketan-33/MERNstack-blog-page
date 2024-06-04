import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import jwt from "jsonwebtoken";

// AUTHENTICATION
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // console.log("Cookies received:", req.cookies); // Log received cookies

  const { token } = req.cookies;

  if (!token) {
    console.log("Token not found in cookies");
    return next(new ErrorHandler("User is not authenticated!", 400));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("Decoded token:", decoded);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      console.log("User not found in database");
      return next(new ErrorHandler("User is not authenticated!", 400));
    }

    next();
  } catch (error) {
    console.log("JWT verification failed:", error.message);
    return next(new ErrorHandler("User is not authenticated!", 400));
  }
});

// AUTHORIZATION
export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `User with this role(${req.user.role}) not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
