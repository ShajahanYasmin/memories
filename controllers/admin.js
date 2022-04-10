const Product = require("../models/product");
// const { validationResult } = require("express-validator");
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((product) => {
      res.render("admin/products", {
        path: "/admin/products",
        isAuthenticated: req.session.isLoggedIn,
        prods: product[0],
        role: req.session.loginrole,
        user: req.session.loginuser,
        // products: Product.fetchAll()[0][0],
      });
    })
    .catch((err) => console.log(err));
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    isAuthenticated: req.session.isLoggedIn,
    editing: false,
    role: req.session.loginrole,

    user: req.session.user,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
  });
};
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const image = req.file;
  const price = req.body.price;
  const description = req.body.description;
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   console.log(errors.array());
  //   return res.status(422).
  const imageUrl = image.filename;
  console.log(imageUrl);
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: true,
    // errorMessage: errors.array()[0].msg,
    // products: product[0],
    role: req.session.loginrole,
    user: req.session.user,
    // validationErrors: errors.array(),
    isAuthenticated: req.session.isLoggedIn,
  });

  const product = new Product(
    // _id: new mongoose.Types.ObjectId('5badf72403fd8b5be0366e81'),
    title,
    imageUrl,
    description,
    price
  );
  console.log(product);
  product
    .save()
    .then((result) => {
      // console.log(result);
      console.log("Created Product");
      res.redirect("/admin");
    })
    .catch((err) => {
      // res.redirect("/");
    });
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  console.log(editMode);
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      console.log(product[0][0].product_id);
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        products: product[0][0],
        hasError: false,
        products: product[0][0],
        errorMessage: null,
        validationErrors: [],
        isAuthenticated: req.session.isLoggedIn,
        role: req.session.loginrole,
        user: req.session.loginuser,
        Id: prodId,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const title = req.body.title;
  const image = req.file.filename;
  const price = req.body.price;
  const description = req.body.description;
  // const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: true,
        products: product[0][0],
        hasError: true,
        role: req.session.loginrole,
        user: req.session.loginuser,
        isAuthenticated: req.session.isLoggedIn,
      });
      Product.update(prodId, title, price, image, description);
      // res.redirect("/admin/products");
    })
    .catch(res.redirect("/admin/products"));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteOne(prodId)
    .then(() => {
      console.log("DESTROYED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getIndex = (req, res, next) => {
  res.render("admin/home", {
    path: "/admin",
    isAuthenticated: req.session.isLoggedIn,
    role: req.session.loginrole,
    user: req.session.loginuser,
  });
  console.log(req.session);
};
exports.getGallery = (req, res, next) => {
  // console.log(req.session);
  res.render("admin/gallery", {
    path: "/gallery",
    isAuthenticated: req.session.isLoggedIn,
    role: req.session.loginrole,
    user: req.session.loginuser,
  });
};
exports.getBookings = (req, res, next) => {
  Product.fetchAll()
    .then((product) => {
      res.render("admin/bookings", {
        path: "/bookings",
        isAuthenticated: req.session.isLoggedIn,
        role: req.session.loginrole,
        user: req.session.loginuser,
        products: product[0],
        // products: Product.fetchAll()[0][0],
      });
    })
    .catch((err) => console.log(err));
};
