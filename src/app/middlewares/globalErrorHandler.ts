import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let errorResponse = {
    success: false,
    message: "Error",
    errorMessage: "Something Went Wrong",
  };

  res.status(err.statusCode || 500).json({
    success: errorResponse.success,
    message: errorResponse.message,
    errorMessage: errorResponse.errorMessage,
    errorDetails: err,
    stack: err?.stack,
  });
};

export default globalErrorHandler;
