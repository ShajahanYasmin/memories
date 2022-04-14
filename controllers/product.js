const Product = require("../models/product");
const Feedback = require("../models/feedback");
const Cart = require("../models/cart");
const Order = require("../models/order");

exports.getIndex = (req, res, next) => {
  res.render("shop/home", {
    path: "/",
    isAuthenticated: req.session.isLoggedIn,
    role: req.session.loginrole,
    user: req.session.loginuser,
    id: req.session.user_id,
  });
  console.log(req.session);
};

exports.getGallery = (req, res, next) => {
  res.render("shop/gallery", {
    path: "/gallery",
    isAuthenticated: req.session.isLoggedIn,
    role: req.session.loginrole,
    user: req.session.loginuser,
    id: req.session.user_id,
  });
};

exports.getBookings = (req, res, next) => {
  Product.fetchAll()
    .then((product) => {
      res.render("shop/bookings", {
        path: "/bookings",
        isAuthenticated: req.session.isLoggedIn,
        role: req.session.loginrole,
        user: req.session.loginuser,
        products: product[0],
        id: req.session.user_id,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  const user_id = req.session.user_id;
  Cart.getCart(user_id)
    .then((cart) => {
      const result = cart[0].map((a) => a.id);
      return Cart.getProducts(result).then((prodcuts) => {
        res.render("shop/cart", {
          cart: prodcuts[0],
          path: "/cart",
          isAuthenticated: req.session.isLoggedIn,
          role: req.session.loginrole,
          user: req.session.loginuser,
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.addToCart = (req, res, next) => {
  const id = req.body.id;
  const user_id = req.session.user_id;
  let fetchedCart;
  let newQuantity = 1;
  Cart.getCart(user_id)
    .then((cart) => {
      fetchedCart = cart[0];
      let result = cart[0].map((a) => a.id);
      Cart.getProductsById(id, result).then((products) => {
        let product;
        if (products[0].length > 0) {
          product = products[0];
        }
        if (product) {
          let oldQuantity = product[0].quantity;
          newQuantity = oldQuantity + 1;
          return Cart.updateProduct(result, newQuantity, product[0].product_id);
        }
        return Product.findById(id).then((product) => {
          Cart.addProduct(result, newQuantity, product[0][0].product_id);
        });
      });
    })
    .then(res.redirect("/cart"))
    .catch((err) => console.log(err));
};

exports.deleteInCart = (req, res, next) => {
  const productId = parseInt(req.body.productId);
  const user_id = req.session.user_id;
  Cart.getCart(user_id)
    .then((cart) => {
      Cart.deleteProduct(cart[0][0].id, productId);
    })
    .then(res.redirect("/cart"))
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  const user_id = req.session.user_id;
  Cart.getCart(user_id)
    .then((cart) => {
      const result = cart[0].map((a) => a.id);
      return Cart.getProducts(result).then((products) => {
        const product = products[0];
        // console.log(products[0]);
        Order.addOrder(user_id).then((row) => {
          const cart_id = row[0].insertId;
          product.map((p) =>
            Order.addProduct(cart_id, p.quantity, p.productId)
          );
        });
      });
    })
    .then((result) => {
      Cart.getCart(user_id).then((cart) => {
        const result = cart[0].map((a) => a.id);
        return Cart.setProducts(result);
      });
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};
exports.getOrders = (req, res, next) => {
  const user_id = req.session.user_id;
  Order.getOrder(user_id)
    .then((order) => {
      const result = order[0].map((a) => a.id);
      return Order.getOrders(result).then((orders) => {
        console.log(orders[0]);
        res.render("shop/orders", {
          orders: orders[0],
          path: "/orders",
          isAuthenticated: req.session.isLoggedIn,
          role: req.session.loginrole,
          user: req.session.loginuser,
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.getFeedback = (req, res, next) => {
  res.render("shop/feedback", {
    path: "/feedback",
    isAuthenticated: req.session.isLoggedIn,
    role: req.session.loginrole,
    user: req.session.loginuser,
    id: req.session.user_id,
  });
};

exports.postFeedback = (req, res, next) => {
  const email = req.body.email;
  const content = req.body.content;
  res.render("shop/feedback", {
    pageTitle: "feedback",
    path: "/feedback",
    isAuthenticated: req.session.isLoggedIn,
    role: req.session.loginrole,
    user: req.session.loginuser,
    id: req.session.user_id,
  });
  const feedback = new Feedback(email, content);
  feedback
    .save()
    .then((result) => {
      res.redirect("/feedback");
    })
    .catch((err) => {
      console.log(err);
    });
};
