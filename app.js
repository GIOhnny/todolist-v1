const express = require("express");
const ejs = require("ejs");
const date = require(__dirname+"/date.js");

const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const items = [];
const workItems = [];

app.get("/", function (req, res) {
  res.render("list", { listTitle: date.getDate(), newListItems: items });
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
    res.render("about");
  });

app.post("/work", function (req, res) {
  item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.post("/", function (req, res) {
  item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.listen(port, function () {
  console.log("Server started on port " + port);
});
