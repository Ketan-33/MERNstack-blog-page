class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorMiddleware = (err, req, res, next) => {
  if (!err) {
    err = new ErrorHandler("Internal Server Error", 500);
  } else if (!(err instanceof ErrorHandler)) {
    err = new ErrorHandler(
      err.message || "Internal Server Error",
      err.statusCode || 500
    );
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    err = new ErrorHandler(`Invalid: Resource not found: ${err.path}`, 404);
  }

  console.error("Error:", err);

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

export default ErrorHandler;
