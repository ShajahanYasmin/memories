const Product = require("../models/product");
const Feedback = require("../models/feedback");
const Cart = require("../models/cart");
const Order = require("../models/order");
const session = require("express-session");
const stripe = require("stripe")(
  "sk_test_51KoMkJSJCf3gevk29fAVZoujlLUcJ6rFUd3LXIaJiWeVzmXbrHEqQD3s8JC52IC81gycNfEz0Z8cWqIbxbPgaH1M0089upIKp4"
);

exports.getIndex = (req, res, next) => {
  res.render("shop/home", {
    path: "/",
    isAuthenticated: req.session.isLoggedIn,
    role: req.session.loginrole,
    user: req.session.loginuser,
    id: req.session.user_id,
    message: req.flash("message"),
  });
  // console.log(req.session);
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
        // console.log(prodcuts[0]);
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
  const name = req.body.client_name;
  const email = req.body.client_email;
  const phone = req.body.client_phone;
  const eventdate = req.body.checkin;
  const address = req.body.client_address;
  const message = req.body.client_message;
  // console.log(id);
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
          Cart.addProduct(
            result,
            newQuantity,
            product[0][0].product_id,
            address,
            email,
            phone,
            name,
            eventdate,
            message
          );
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
            Order.addProduct(
              cart_id,
              p.quantity,
              p.productId,
              p.address,

              p.email,
              p.phno,
              p.name,
              p.eventdate,
              p.extra
            )
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
        // console.log(orders[0]);
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
exports.getCheckout = (req, res, next) => {
  let total = 0;
  let product;
  const user_id = req.session.user_id;
  Cart.getCart(user_id)
    .then((cart) => {
      const result = cart[0].map((a) => a.id);
      return Cart.getProducts(result)
        .then((products) => {
          product = products[0];
          for (i of products[0]) total += i.product_price * i.quantity;
          return stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: product.map((p) => {
              return {
                name: p.product_title,
                description: p.product_description,
                amount: p.product_price * 100,
                currency: "INR",
                quantity: p.quantity,
              };
            }),
            success_url:
              req.protocol + "://" + req.get("host") + "/checkout/success", // => http://localhost:3000
            cancel_url:
              req.protocol + "://" + req.get("host") + "/checkout/cancel",
            id: session.id,
          });
        })
        .then((session) => {
          res.render("shop/checkout", {
            products: product,
            path: "/checkout",
            isAuthenticated: req.session.isLoggedIn,
            role: req.session.loginrole,
            user: req.session.loginuser,
            totalSum: total,
            sessionId: session.id,
          });
        });
    })
    .catch((err) => console.log(err));
};
exports.getBookForm = (req, res, next) => {
  res.render("shop/booking_form", {
    pageTitle: "feedback",
    path: "/booking_form",
    isAuthenticated: req.session.isLoggedIn,
    role: req.session.loginrole,
    user: req.session.loginuser,
    id: req.session.user_id,
    productId: req.body.id,
  });
};
