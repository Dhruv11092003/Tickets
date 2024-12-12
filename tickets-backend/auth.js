const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const auth = (role) => (req, res, next) => {
  const { authorization } = req.headers;

  const jwtToken = authorization.split(" ")[1];

  if (jwtToken == undefined) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  

  jwt.verify(jwtToken,`${process.env.SECRET_KEY}`, (err, payload) => {
    if (err) {
      res.status(400).send({ message: "Invalid JWT Token" });
    } else {
      if (payload.role !== role) {
        return res.status(401).send({ message: "Forbidden" });
      }
      req.user = payload;
      next();
    }
  });

};

module.exports = auth;
