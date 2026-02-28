const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const superAdminRoutes = require("./routes/superAdminRoutes");

const app = express();
dotenv.config();

const allowedOrigin = process.env.CLIENT_ORIGIN || "*";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    exposedHeaders: ["Authorization"],
  })
);
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err, "Error Connecting to DB");
  });

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/s-admin", superAdminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Listening on Port ${PORT}`);
});
