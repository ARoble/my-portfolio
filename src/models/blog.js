const mongoose = require("mongoose");
const dateFormat = require("dateformat");

const blogSchema = new mongoose.Schema({
  en: {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    sanitizedHtml: {
      type: String,
      required: true,
    },
  },
  so: {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    sanitizedHtml: {
      type: String,
      required: true,
    },
  },

  category: {
    type: String,
    required: true,
    trim: true,
  },
  createDate: {
    type: String,
    required: false,
    default: dateFormat(new Date(), "mmm d, yyyy"),
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

// blogSchema.pre("updateOne", function (next) {
//   console.log(this.en.title);
// if (this.en.title) {
//   // this.slug = slugify(this.en.title, { lower: true, strict: true });
//   // this.set({ slug: "hi" });
// }

// if (this.en.content) {
//   this.en.sanitizedHtml = dompurify.sanitize(marked(this.en.content));
// }

// if (this.so.content) {
//   this.so.sanitizedHtml = dompurify.sanitize(marked(this.so.content));
// }

//   next();
// });

// blogSchema.pre("validate", function (next) {
//   console.log("validate!");
//   if (this.en.title) {
//     this.slug = slugify(this.en.title, { lower: true, strict: true });
//     console.log(this.slug);
//   }

//   if (this.en.content) {
//     this.en.sanitizedHtml = dompurify.sanitize(marked(this.en.content));
//   }

//   if (this.so.content) {
//     this.so.sanitizedHtml = dompurify.sanitize(marked(this.so.content));
//   }

//   next();
// });
// this.set({ updatedAt: new Date() });

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
