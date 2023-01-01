let express = require("express");
let router = express.Router();

const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");

function generateToken(user) {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.ACCESS_TOKEN_SECRET
  );
}

router.post("/register", async (req, res) => {
  //Form validation
  let inputErrors = {};

  if (!req.body.username || req.body.username.trim() === "")
    inputErrors.username = "Username can't be empty";
  if (!req.body.email || req.body.email.trim() === "")
    inputErrors.email = "E-mail adress can't be empty";
  if (!req.body.password || req.body.password.trim() === "")
    inputErrors.password = "Password can't be empty";
  if (req.body.password !== req.body.confirmPassword)
    inputErrors.confirmPassword = "Passwords are not the same";
  let checkUsername = await User.exists({ username: req.body.username });
  if (checkUsername) inputErrors.username = "Username already taken";
  let checkEmail = await User.exists({ email: req.body.email });
  if (checkEmail) inputErrors.email = "E-mail adress already taken";

  if (Object.keys(inputErrors).length > 0) {
    return res.status(400).send(inputErrors);
  }

  //Create new user
  let password = await bcrypt.hash(req.body.password, 12);

  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password,
    cart: [],
    createdAt: new Date().toUTCString(),
  });

  let user = await newUser.save();
  let token = generateToken(user);
  res.json({ token });
});

router.post("/login", async (req, res) => {
  //Form validation
  let inputErrors = {};
  if (!req.body.email || req.body.email.trim() === "")
    inputErrors.email = "Adress e-mail can't be empty";
  if (!req.body.password || req.body.password.trim() === "")
    inputErrors.password = "Password can't be empty";

  if (Object.keys(inputErrors).length > 0) {
    return res.status(400).send({ error: inputErrors });
  }

  //Get user data
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({ email: "User does not exists" });

  let match = await bcrypt.compare(req.body.password, user.password);
  if (!match)
    return res.status(400).send({ password: "Incorrect credentials" });

  const token = generateToken(user);
  res.json({ token });
});

module.exports = router;
