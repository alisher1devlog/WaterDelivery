import apiError from "./api.error.js";

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    next();
  } catch (e) {
    const errorMessages = e.errors.map((err) => err.message).join(", ");

    next(new apiError(400, errorMessages));
  }
};
