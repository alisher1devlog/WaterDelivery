import jwt from "jsonwebtoken";
const token = {
  generateAccessToken: (id) => {
    return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });
  },
  generateRefreshToken: (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });
  },
};

export { token as generateToken };
