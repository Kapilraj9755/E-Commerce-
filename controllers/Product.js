const Product = require("../models/product");

module.exports.ShowAllProduct = async (req, res) => {
  try {
    // console.log(req.session);
    const products = await Product.find({});
    res.render("products/index", { products });
  } catch (e) {
    res.render("error", { err: e.message });
  }
};

module.exports.ProductForm = (req, res) => {
  try {
    res.render("products/new");
  } catch (e) {
    res.render("error", { err: e.message });
  }
};
module.exports.CreateProduct = async (req, res) => {
  try {
    // const {name, price, desc, image} = req.body;
    await Product.create({ ...req.body, author: req.user._id });

    req.flash("success", "Product added successfully!!");
    res.redirect("/products");
  } catch (e) {
    res.render("error", { err: e.message });
  }
};

module.exports.ShowProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("reviews");
    res.render("products/show", { product });
  } catch (e) {
    res.render("error", { err: e.message });
  }
};

module.exports.ProductEditForm = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    res.render("products/edit", { product });
  } catch (e) {
    res.render("error", { err: e.message });
  }
};

module.exports.UpdateForm = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndUpdate(id, req.body);

    req.flash("success", "Saved your product successfully!");
    res.redirect(`/products/${id}`);
  } catch (e) {
    res.render("error", { err: e.message });
  }
};

module.exports.DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    // for (let reviewId of product.reviews) {
    //     await Review.findByIdAndDelete(reviewId);
    // }

    await Product.findByIdAndDelete(id);

    req.flash("success", "Deleted your product successfully!");
    res.redirect(`/products`);
  } catch (e) {
    res.render("error", { err: e.message });
  }
};
