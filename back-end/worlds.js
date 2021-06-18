const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// const multer = require("multer");
// const upload = multer({
//   dest: "../front-end/public/images/",
//   limits: {
//     fileSize: 50000000,
//   },
// });

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const worldSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  path: String,
  rule: String,
  initialType: String,
  numOfStates: Number,
  size: Number,
  colors: [
    {
      type: String,
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
});

const World = mongoose.model("World", worldSchema);

var fs = require("fs");
// upload photo
router.post("/", validUser, async (req, res) => {
  if (req.body.file) {
    try {
      let image = Buffer.from(req.body.file, "base64");
      fs.writeFile(
        "../front-end/public/images/" + req.body.fileId,
        image,
        "base64",
        function (err) {
          if (err) throw err;
          console.log("File saved.");
        }
      );
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
      // fs.writeFile(image, "../front-end/public/images/" + req.body.fileId);
    }
  } else {
    return res.status(400).send({
      message: "Must upload a file.",
    });
  }

  const world = new World({
    user: req.user,
    path: "/images/" + req.body.fileId,
    rule: req.body.rule,
    initialType: req.body.initialType,
    numOfStates: req.body.numOfStates,
    size: req.body.size,
    colors: req.body.colors,
  });
  try {
    await world.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get my photos
router.get("/", validUser, async (req, res) => {
  // return photos
  try {
    let worlds = await World.find({
      user: req.user,
    })
      .sort({
        created: -1,
      })
      .populate("user");
    return res.send(worlds);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: World,
  routes: router,
};
