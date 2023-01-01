const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const jwt = require("jsonwebtoken");

require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    "access-control-allow-credentials": true,
  })
);

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

//Database
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//Routes
let authRoutes = require("./routes/auth");
let offertRoutes = require("./routes/offert");
let profileRoutes = require("./routes/profile");

app.use("/auth", authRoutes);
app.use("/profile", authenticateToken, profileRoutes);
app.use("/offert", authenticateToken, offertRoutes);

function authenticateToken(req, res, next) {
  const authHeader = req.headers["auth"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

//Listen
let port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Listening on port ${port}`));
