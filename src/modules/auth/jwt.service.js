import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES || "1h";
  const { id, email, role } = user;
  const payload = { id, email, role };

  if (!secret) throw new Error("Jwt secret is not defined");
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token) => {
  const withoutBearer = token.split(" ")[1];
  return jwt.verify(withoutBearer, process.env.JWT_SECRET);
};
