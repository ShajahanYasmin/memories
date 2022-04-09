const Product = require("../models/product");
// const pro = new Product("birthday", "gallery-5.jpg", 230, "5hrs shooting");
// pro
//   .save()
//   .then()
//   .catch((err) => console.log(err));
exports.getIndex = (req, res, next) => {
  res.render("shop/home", {
    path: "/",
    isAuthenticated: req.session.isLoggedIn,
    role: req.session.loginrole,
    user:req.session.loginuser,
  });
  console.log(req.session);
};
exports.getGallery = (req, res, next) => {
  // console.log(req.session);
  res.render("shop/gallery", {
    path: "/gallery",
    isAuthenticated: req.session.isLoggedIn,
    role: req.session.loginrole,
    user:req.session.loginuser,
  });
};
exports.getBookings = (req, res, next) => {
  Product.fetchAll()
    .then((product) => {
      res.render("shop/bookings", {
        path: "/bookings",
        isAuthenticated: req.session.isLoggedIn,
        role: req.session.loginrole,
        user:req.session.loginuser,
        products: product[0],
        // products: Product.fetchAll()[0][0],
      });
    })
    .catch((err) => console.log(err));
};
exports.getCart = (req, res, next) => {
  Product.fetchAll()
    .then((product) => {
      res.render("shop/cart", {
        path: "/cart",
        isAuthenticated: req.session.isLoggedIn,
        role: req.session.loginrole,
        user:req.session.loginuser,
        products: product[0],
        // products: Product.fetchAll()[0][0],
      });
    })
    .catch((err) => console.log(err));
};
