const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();

const Offert = require("../models/OffertSchema");
const { sliceOfferts } = require("../utils/offertFunctions");

router.post("/buy", async (req, res) => {
  try {
    if (req.body.offerts.length < 1) {
      res.status(400).send({ error: { message: "Invalid id" } });
    }

    //Change bought number
    await Offert.updateMany(
      { _id: { $in: req.body.offerts } },
      { $inc: { bought: 1 } },
      { multi: true }
    );

    //Delete offert if bought all products
    let offerts = await Offert.find({ _id: { $in: req.body.offerts } });
    offerts.forEach(async (offert) => {
      if (offert.bought === offert.inStock) {
        await Offert.findByIdAndDelete(offert._id);
      }
    });

    //Remove from cart
    await User.updateMany({
      cart: { $in: offerts.map((el) => el._id) },
      $pullAll: { cart: offert.map((el) => el._id) },
    });

    res.send({});
  } catch (error) {
    res.status(404).send({ error: { message: error.message } });
  }
});

router.get("/list/:page/:category/:query?", async (req, res) => {
  try {
    let offerts = await Offert.find();

    if (req.params.category !== "All") {
      offerts = offerts.filter(
        (offert) => offert.category === req.params.category
      );
    }

    if (req.params.query && req.params.query.trim() !== "") {
      offerts = offerts.filter((offert) =>
        offert.title.toUpperCase().includes(req.params.query.toUpperCase())
      );
    }

    let maxNumberOfPages = Math.ceil(offerts.length / 24);

    offerts = sliceOfferts(offerts, req.params.page - 1);

    res.send({ offerts, maxNumberOfPages });
  } catch (error) {
    res.status(404).send({ error: { message: error.message } });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    if (!id || !mongoose.isValidObjectId(id)) {
      res
        .status(404)
        .send({ error: { message: "Incorrect offert id", navigate: "/" } });
    }

    let offert = await Offert.findById(id);
    if (offert.discount) {
      if (new Date().getTime() >= new Date(offert.discount.expire).getTime()) {
        offert.discount = { value: 0, expire: "" };
      }
    }

    await offert.save();

    if (!offert)
      res
        .status(404)
        .send({ error: { message: "Can't find offert with this id" } });

    res.send(offert);
  } catch (error) {}
});

router.post("/create", async (req, res) => {
  console.log("/");
  try {
    //Form validation
    let inputErrors = {};
    if (!req.body.title || req.body.title.trim() === "")
      inputErrors.title = "Title is empty";
    if (!req.body.description || req.body.description.trim() === "")
      inputErrors.description = "Description is empty";
    if (!req.body.category || req.body.category.trim() === "")
      inputErrors.category = "Category is empty";
    if (!req.body.inStock || req.body.inStock < 1)
      inputErrors.inStock = "Incorrect stock value";
    if (!req.body.price || req.body.price < 1)
      inputErrors.price = "Incorrect price value";
    if (!req.body.photos || req.body.photos.length < 1)
      inputErrors.photos = "Need at least 1 photo";

    console.log(inputErrors);
    if (Object.keys(inputErrors).length > 0) {
      return res
        .status(400)
        .send({ error: { inputErrors: { ...inputErrors } } });
    }

    let offert = {
      title: req.body.title,
      description: req.body.description,
      photos: req.body.photos,
      price: req.body.price,
      bought: req.body.bought,
      inStock: req.body.inStock,
      category: req.body.category,
      author: { id: req.user.id, username: req.user.username },
    };

    let id = req.body.id;

    if (req.body.id) {
      //Update offert
      await Offert.findByIdAndUpdate(id, { ...offert });
    } else {
      //Create new offert
      let newOffert = new Offert({
        ...offert,
      });

      await newOffert.save();
      id = newOffert._id;
    }

    res.send({ offertId: id });
  } catch (error) {
    res.status(400).send({ error: { message: error.message } });
  }
});

router.post("/discount", async (req, res) => {
  try {
    let offert = await Offert.findByIdAndUpdate(req.body.id, {
      discount: { value: req.body.value, expire: req.body.expire },
    });

    res.send({ value: req.body.value, expire: req.body.expire });
  } catch (error) {
    res.status(400).send({ error: { message: error.message } });
  }
});

module.exports = router;
