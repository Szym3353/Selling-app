let { model, Schema } = require("mongoose");

let userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    createdAt: String,
    cart: [],
  },
  { collection: "user" }
);

module.exports = model("User", userSchema);
