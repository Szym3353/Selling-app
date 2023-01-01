const express = require("express");
const router = express.Router();
const { default: mongoose } = require("mongoose");
const User = require("../models/UserSchema");
const Offert = require("../models/OffertSchema");
const { sliceOfferts } = require("../utils/offertFunctions");
const bcrypt = require("bcrypt");

router.get("/:id/:page", async (req, res) => {
  try {
    let id = req.params.id;
    if (!id || !mongoose.isValidObjectId(id))
      res
        .status(404)
        .send({ error: { message: "Can't find user with this id" } });

    let user = await User.findById(id);
    let { password, ...userData } = user._doc;

    let offerts = await Offert.find({ "author.id": id });

    res.send({ userData, offerts: sliceOfferts(offerts, req.params.page) });
  } catch (error) {
    res.status(400).send({ error: { message: error.message } });
  }
});

router.post("/password", async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    let inputErrors = {};
    if (!req.body.newPassword || req.body.newPassword.trim() == "")
      inputErrors.newPassword = "Incorrect new password";
    if (
      !req.body.confirmNewPassword ||
      req.body.confirmNewPassword.trim() == ""
    )
      inputErrors.confirmNewPassword = "New passwords do not match";

    let match = await bcrypt.compare(req.body.newPassword, user.password);
    if (!match) {
      inputErrors.oldPassword = "Incorrect current password";
    }

    if (Object.keys(inputErrors).length > 0) {
      res.status(400).send({ error: { inputErrors: { ...inputErrors } } });
    }

    let password = await bcrypt.hash(req.body.newPassword, 12);
    user.password = password;

    await user.save();

    res.send({});
  } catch (error) {
    res.status(400).send({ error: { message: error.message } });
  }
});

router.post("/account", async (req, res) => {
  try {
    if (!req.body.accountName || req.body.accountName.trim() === "") {
      res.status(400).send({
        error: { inputErrors: { accountName: "Name can't be empty" } },
      });
    }
    await User.findByIdAndUpdate(req.user.id, {
      username: req.body.accountName,
    });
    res.send({});
  } catch (error) {
    res.status(400).send({ error: { inputErrors: { ...inputErrors } } });
  }
});

router.post("/email", async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    let inputErrors = {};
    if (!req.body.newEmail || req.body.newEmail.trim() === "")
      inputErrors.newEmail = "New e-mail adress can't be empty";
    let match = await bcrypt.compare(req.body.password, user.password);
    if (!match) inputErrors.password = "Incorrect password";
    let checkExists = await User.exists({ email: req.body.email });
    if (checkExists)
      inputErrors.newEmail = "This e-mail adress is already used";

    if (Object.keys(inputErrors).length > 0) {
      res.status(400).send({ error: { inputErrors: { ...inputErrors } } });
    }

    user.email = req.body.newEmail;
    await user.save();

    res.send({});
  } catch (error) {
    res.status(400).send({ error: { message: error.message } });
  }
});

router.get("/cart", async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    let offerts = await Offert.find({ _id: { $in: user.cart } });
    res.send(offerts);
  } catch (error) {
    res.status(400).send({ error: { message: error.message } });
  }
});

router.post("/cart/update", async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    let offertId = req.body.id;
    if (user.cart.includes(offertId)) {
      user.cart = user.cart.filter((el) => el !== offertId);
    } else {
      user.cart = [...user.cart, offertId];
    }

    let offerts = await Offert.find({ _id: { $in: user.cart } });

    await user.save();

    res.send(offerts);
  } catch (error) {
    res.status(400).send({ error: { message: error.message } });
  }
});

module.exports = router;
