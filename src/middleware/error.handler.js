import apiError from "./api.error.js";

const handleDuplicateFieldDB = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  const message = `${field} (${value}) qiymati allaqachon mavjud. Iltimos, Sign in qiling!.`;
  return new apiError(400, message);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Kiritilgan ma'lumotlar noto'g'ri: ${errors.join(". ")}`;
  return new apiError(400, message);
};

const globalErrorHandler = (err, req, res) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || `Serverda kutilmagan xatolik!`;

  let error = { ...err };
  error.message = err.message;

  if (err.name === `ValidationError`) {
    error = handleValidationErrorDB(err);
  }

  if (err.code === 11000) {
    error = handleDuplicateFieldDB(err);
  }

  res.status(error.statusCode).json({
    success: false,
    status: error.status || "error",
    message: error.message,
  });
};

export default globalErrorHandler;
