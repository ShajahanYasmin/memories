const flash = require("connect-flash/lib/flash");
const Feedback = require("../models/feedback");
const Product = require("../models/product");
const Order = require("../models/order");
const nodemailer = require("nodemailer");
let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "digitalmemories124@gmail.com",
    pass: "Digital@123",
  },
});
let details = (name, text) => {
  return {
    from: "digitalmemories124@gmail.com",
    to: name,
    subject: "mail from bookings of photography studio Digital memories",
    text: text,
  };
};
// mailTransporter.sendMail(
//   details("mdyasmin0210@gmail.com", "<h1>Hello</h1>"),
//   (err) => {
//     if (err) {
//       console.log("it has an error", err);
//     } else {
//       console.log("email has sent");
//     }
//   }
// );
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
        id: req.session.user_id,
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
    user: req.session.loginuser,
    id: req.session.user_id,
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
    isAuthenticated: req.session.isLoggedIn,
    role: req.session.loginrole,
    user: req.session.loginuser,
    id: req.session.user_id,
  });

  const product = new Product(
    // _id: new mongoose.Types.ObjectId('5badf72403fd8b5be0366e81'),
    title,
    imageUrl,
    description,
    price
  );
  // console.log(product);
  product
    .save()
    .then((result) => {
      // console.log(result);
      // console.log("Created Product");
      res.redirect("/admin");
    })
    .catch((err) => {
      // res.redirect("/");
    });
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  // console.log(editMode);
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      // console.log(product[0][0].product_id);
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
        id: req.session.user_id,
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
        id: req.session.user_id,
      });
      // if (image) {
      //   console.log(image.path);
      //   image = image.path;
      // }
      Product.update(prodId, title, price, image, description);
      // res.redirect("/admin/products");
    })
    .catch(res.redirect("/admin/products"));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteOne(prodId)
    .then(() => {
      req.flash("message", "DESTROYED PRODUCT");
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
    id: req.session.user_id,
    message: req.flash("message"),
  });
  // console.log(req.session);
};
exports.getGallery = (req, res, next) => {
  // console.log(req.session);
  res.render("admin/gallery", {
    path: "admin/gallery",
    isAuthenticated: req.session.isLoggedIn,
    role: req.session.loginrole,
    user: req.session.loginuser,
    id: req.session.user_id,
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
        id: req.session.user_id,
        products: product[0],
        // products: Product.fetchAll()[0][0],
      });
    })
    .catch((err) => console.log(err));
};
exports.getFeedback = (req, res, next) => {
  Feedback.fetchAll().then((feed) => {
    // console.log(feed[0]);
    res.render("admin/feedback", {
      path: "admin/feedback",
      isAuthenticated: req.session.isLoggedIn,
      role: req.session.loginrole,
      user: req.session.loginuser,
      id: req.session.user_id,
      feedback: feed[0],
    });
  });
};
exports.getOrders = (req, res, next) => {
  Order.getAdminOrders()
    .then((order) => {
      // console.log(order[0]);
      res.render("admin/orders", {
        path: "admin/orders",
        isAuthenticated: req.session.isLoggedIn,
        role: req.session.loginrole,
        user: req.session.loginuser,
        id: req.session.user_id,
        order: order[0],
      });
    })
    .catch((err) => console.log(err));
};
exports.acceptOrder = (req, res, next) => {
  // console.log(req.body.orderId1);
  const id = req.body.orderId1;
  console.log(id);
  Order.addAccept(id)
    .then(() => {
      Order.getEmail(id).then((email) => {
        console.log(email[0][0].email);
        const mail = email[0][0].email;
        mailTransporter.sendMail(
          details(
            mail,
            "Your booking is accepted .please contact @9381034145,  for further communication"
          ),
          (err) => {
            if (err) {
              console.log("it has an error", err);
            } else {
              console.log("email has sent");
            }
          }
        );

        res.redirect("./orders");
      });
    })
    .catch((err) => console.log(err));
};
exports.rejectOrder = (req, res, next) => {
  // console.log(req.body.orderId2);
  const id = req.body.orderId2;
  Order.addReject(id)
    .then(() => {
      Order.getEmail(id).then((email) => {
        console.log(email[0][0].email);
        const mail = email[0][0].email;
        mailTransporter.sendMail(
          details(
            mail,
            "Your booking is rejected .Your paid amount will be refunded in 2-3 days"
          ),
          (err) => {
            if (err) {
              console.log("it has an error", err);
            } else {
              console.log("email has sent");
            }
          }
        );

        res.redirect("./orders");
      });
    })
    .catch((err) => console.log(err));
};
