const express = require("express");
const slugify = require("slugify");
const marked = require("marked");
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDOMPurify(new JSDOM().window);

const Blog = require("../models/blog");

const router = express.Router();

const checkUserLogin = function (req, res, next) {
  if (!req.session.username) {
    return res.render("login", { message: "Please Login First my brudda" });
  }
  next();
};

router.get("/blogs", async (req, res) => {
  try {
    if (req.query.search) {
      const blog = await Blog.find({
        $or: [
          { "en.title": { $regex: new RegExp(req.query.search, "i") } },
          { category: { $regex: new RegExp(req.query.search, "i") } },
        ],
      });

      res.status(200).render("blogs", {
        blog,
      });
      return;
    }
    const blog = await Blog.find({}).sort({ createDate: -1 });

    res.status(200).render("blogs", { blog });
  } catch (e) {
    console.log(e);
  }
});

router.get("/blog/:slug", async (req, res) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug });

    var blog = {
      id: post.id,
      title: post.en.title,
      category: post.category,
      content: post.en.sanitizedHtml,
      slug: post.slug,
      date: post.createDate,
    };

    if (req.query.lang === "so") {
      blog = {
        id: post.id,
        title: post.so.title,
        category: post.category,
        content: post.so.sanitizedHtml,
        slug: post.slug,
        date: post.createDate,
      };
    }
    const category = await Blog.find({}).distinct("category");
    const similar = await Blog.find({
      $and: [{ category: blog.category }, { _id: { $ne: blog.id } }],
    });

    const all = await Blog.find({
      _id: { $ne: blog.id },
    });
    console.log(similar);
    // const similar = await Blog.find(
    //   {
    //     $and: [{ category: blog.category }, { _id: { $ne: blog.id } }],
    //   },
    //   async (err, data) => {
    //     if (data.length > 0) {
    //       return data;
    //     } else {
    //       const all = await Blog.find({});
    //       console.log(all);
    //       return all;
    //     }
    //   }
    // );
    // console.log(similar);
    res.render("blog", {
      blog,
      category,
      session: req.session.username,
      lang: req.query.lang,
      similar,
      all,
    });
  } catch (e) {
    console.log(e);
  }
});

//Admin Side to this
router.get("/add-blog", checkUserLogin, (req, res) => {
  res.render("add-blog");
});

router.post("/add-blog", checkUserLogin, async (req, res) => {
  //const blogPost = new Blog(req.body);
  //this.slug = slugify(this.en.title, { lower: true, strict: true });
  //this.en.sanitizedHtml = dompurify.sanitize(marked(this.en.content));
  try {
    // const blogPost = new Blog({
    //   title: [{ en: req.body.titleEn, so: req.body.titleSo }],
    //   category: req.body.category,
    //   content: [{ en: req.body.contentEn, so: req.body.contentSo }],
    // });
    const blogPost = new Blog({
      en: {
        title: req.body.titleEn,
        content: req.body.contentEn,
        sanitizedHtml: dompurify.sanitize(marked(req.body.contentEn)),
      },
      so: {
        title: req.body.titleSo,
        content: req.body.contentSo,
        sanitizedHtml: dompurify.sanitize(marked(req.body.contentSo)),
      },
      category: req.body.category,
      slug: slugify(req.body.titleEn, { lower: true, strict: true }),
    });

    await blogPost.save({});
    res.status(200).redirect("blogs");
  } catch (e) {
    console.log("there is some sort of error", e);
  }
});

router.get("/edit-blog/:slug", checkUserLogin, async (req, res) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug });
    res.render("edit-blog", {
      id: post.id,
      titleEn: post.en.title,
      titleSo: post.so.title,
      category: post.category,
      contentEn: post.en.content,
      contentSo: post.so.content,
      slug: post.slug,
      date: post.createDate,
    });
  } catch {
    const blog = await Blog.find({});
    res.render("blogs", {
      blog,
      session: req.session.username,
      error: "Blog Doesnt Exsist",
    });
  }
});

router.put("/edit-blog/:slug", checkUserLogin, async (req, res) => {
  try {
    const blog = await Blog.updateOne(
      { slug: req.params.slug },
      {
        en: {
          title: req.body.titleEn,
          content: req.body.contentEn,
          sanitizedHtml: dompurify.sanitize(marked(req.body.contentEn)),
        },
        so: {
          title: req.body.titleSo,
          content: req.body.contentSo,
          sanitizedHtml: dompurify.sanitize(marked(req.body.contentSo)),
        },
        category: req.body.category,
        slug: slugify(req.body.titleEn, { lower: true, strict: true }),
      }
    );
    res.redirect(
      "/blog/" + slugify(req.body.titleEn, { lower: true, strict: true })
    );
  } catch {
    res.send("Some error my brudda");
  }
});

router.delete("/delete-blog/:id", checkUserLogin, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect("/blogs");
  } catch {}
});
module.exports = router;
