const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// setup express
const app = express();

// setup body parser middleware to conver to JSON and handle URL encoded forms
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// connect to the mongodb database
mongoose.connect("mongodb://localhost:27017/cellular-automata-1", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require("cookie-session");
app.use(
  cookieSession({
    name: "session",
    keys: ["secretValue"],
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

const users = require("./users.js");
app.use("/api/users", users.routes);

const worlds = require("./worlds.js");
app.use("/api/worlds", worlds.routes);

app.listen(3002, () => console.log("Server listening on port 3002!"));
