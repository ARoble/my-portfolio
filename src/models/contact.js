const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: string,
  },
  message: {
    type: String,
    require: true,
  },
});

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
