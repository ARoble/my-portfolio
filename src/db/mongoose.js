const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://roble:roble123@@cluster0.1drql.mongodb.net/portfolio?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

// mongodb://localhost:27017/portfolioApp
