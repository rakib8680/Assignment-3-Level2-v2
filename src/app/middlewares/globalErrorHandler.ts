import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { TErrorResponse } from "../types/TErrorResponse";
import handleZodError from "../errors/handleZodError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let errorResponse:TErrorResponse = {
    success: false,
    message: "Error",
    errorMessage: "Something Went Wrong",
  };


  // check error type and set customized error message
  // console.log(err instanceof ZodError);
  if(err instanceof ZodError){
    errorResponse = handleZodError(err);
  }


  res.status(err.statusCode || 500).json({
    success: errorResponse.success,
    message: errorResponse.message,
    errorMessage: errorResponse.errorMessage,
    errorDetails: err,
    stack: err?.stack,
  });
};

export default globalErrorHandler;
