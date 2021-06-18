const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();


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
// upload world
router.post("/", validUser, async (req, res) => {
  if (req.body.file) {
    try {

      const fileName = `image_${req.body.fileId}.png`;
      let imgData = req.body.file;
      var base64Data = imgData.replace(/^data:image\/png;base64,/, "");
      
      fs.writeFile(
        "../front-end/public/images/" + fileName,
        base64Data,
        {encoding: 'base64'},
        function (err) {
          if (err) throw err;
          // console.log("File saved.");
        }
      );
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  } else {
    return res.status(400).send({
      message: "Must upload a file.",
    });
  }

  const world = new World({
    user: req.user,
    path: "/images/" + `image_${req.body.fileId}.png`,
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

// get my worlds
router.get("/", validUser, async (req, res) => {
  // return worlds
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

// get all worlds
router.get("/all", async (req, res) => {
  try {
    let worlds = await World.find()
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
