import apiError from "./api.error.js";

const handleDublicateFieldDB = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  const message = `${field} (${value} qiymati aloqachon mavjud siz "Sign In" qilishingiz kerak!)`;
  return new apiError(400, message);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Kiritilgan ma'lumotlar notog'ri: ${errors.join(". ")}`;
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
    error = handleDublicateFieldDB(err);
  }

  res.status(err.statusCode).json({
    success: false,
    status: error.status || "error",
    message: error.message,
  });
};

export default globalErrorHandler;
