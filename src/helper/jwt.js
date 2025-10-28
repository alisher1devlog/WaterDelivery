import jwt from "jsonwebtoken";

const secret = "qwer12345";

const payloadd = {
  id: 12,
  name: "Alisher",
  role: "Student",
  staffId: 212345,
};

const token = jwt.sign(payloadd, secret);

console.log(token);
