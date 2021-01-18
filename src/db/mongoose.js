const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/portfolioApp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
