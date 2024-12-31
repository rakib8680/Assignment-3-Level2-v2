import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { TErrorResponse } from "../types/TErrorResponse";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let errorResponse:TErrorResponse = {
    success: false,
    message: "Error",
    errorMessage: "Something Went Wrong",
  };



  // console.log(Object.values(err));


  // check error type and set customized error message
  if(err instanceof ZodError){
    errorResponse = handleZodError(err);
  }else if(err?.name ==="ValidationError"){
    errorResponse = handleValidationError(err);
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
