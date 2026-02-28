const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const auth = (role) => (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const jwtToken = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : undefined;

  if (!jwtToken) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  return jwt.verify(jwtToken, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(400).send({ message: "Invalid JWT Token" });
    }

    if (payload.role !== role) {
      return res.status(401).send({ message: "Forbidden" });
    }

    req.user = payload;
    return next();
  });
};

module.exports = auth;
