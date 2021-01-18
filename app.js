const express = require("express");
const ejs = require("ejs");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const methodOverride = require("method-override");
const dateFormat = require("dateformat");

const User = require("./src/models/user");
const Contact = require("./src/models/contact");
require("./src/db/mongoose");

const app = express();

// app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

const publicDirectoryPath = path.join(__dirname, "./public");
const viewPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

app.use(express.static(publicDirectoryPath));

app.set("view engine", "ejs");
app.set("views", viewPath);

const blogRouter = require("./src/routes/blog");

app.use(blogRouter);

// const checkUserLogin = function (req, res, next) {
//   if (!req.session.username) {
//     console.log("your not logged in sorry");
//     return res.render("login", { message: "Please Login First my brudda" });
//   }
//   next();
// };

app.get("/", (req, res) => {
  res.render("index", {
    page: "home",
    date: dateFormat(new Date(), "mmm d, yyyy"),
  });
});

app.get("/portfolio", (req, res) => {
  res.render("portfolio", { page: "portfolio" });
});

app.get("/about", (req, res) => {
  res.render("about", { page: "about" });
});

app.get("/resume", (req, res) => {
  res.render("resume", { page: "resume" });
});

app.get("/services", (req, res) => {
  res.render("services", { page: "services" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { page: "contact" });
});

app.post("/contact", async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    website: req.body.website,
    message: req.body.message,
  });

  await contact.save({});

  res.render("contact", { contactMessage: "Please Login First my brudda" });
});

app.get("/login", async (req, res) => {
  // try {
  //   const user = await User.find({});
  //   console.log(user);
  //   res.send(user);
  // } catch (e) {
  //   console.log(e);
  // }
  res.render("login", { page: "login" });
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (!user) {
      return res.render("login", { message: "Wrong Credientials" });
    }

    req.session.loggedin = true;
    req.session.username = req.body.username;
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
  // res.send({
  //   username: req.body.username,
  //   password: req.body.password,
  // });
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect("/");
  });
});

app.listen(3000, (req, res) => {
  console.log("listening on 3000");
});
