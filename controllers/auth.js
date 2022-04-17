const User = require("../models/user");
const Admin = require("../models/admin");
const db = require("../util/database");
const hash = require("bcryptjs");
const Cart = require("../models/cart");
const { findPassword } = require("../models/user");
exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.session.isLoggedIn;
  res.render("auth/login", {
    path: "/login",
    isAuthenticated: isLoggedIn,
    role: req.session.loginrole,
    user: req.session.loginuser,
    id: req.session.user_id,
    message: req.flash("message"),
  });
};
exports.postLogin = (req, res, next) => {
  const { user_id, email, password } = req.body;
  User.findByEmail(email)
    .then((user) => {
      const log = user[0][0];
      if (!log) {
        req.flash("message", "Invalid user");
        return res.redirect("/login");
      }
      if (log.password === password) {
        // console.log(log);
        req.session.isLoggedIn = true;
        req.session.loginuser = log["name"];
        req.session.user_id = log["user_id"];
        req.session.loginrole = "user";
        req.flash("message", "Login Successful");
        // console.log(req.session.user);
        return res.redirect("/user");
      }
      return res.redirect("/login");
    })

    .catch((err) => console.log(err));
};
exports.postAdminLogin = (req, res, next) => {
  const { adminemail, adminPassword } = req.body;
  Admin.findByAdmin(adminemail)
    .then((user) => {
      const log = user[0][0];
      // console.log(log);
      if (!log) {
        return res.redirect("/admin");
      }
      if (log.admin_password === adminPassword) {
        req.session.isLoggedIn = true;
        req.session.loginuser = "admin";
        req.session.loginrole = "admin";
        req.flash("message", "login successully");
        return res.redirect("/admin");
      }
      return res.redirect("/login");
    })
    .catch((err) => console.log(err));
};
exports.postLogout = (req, res, next) => {
  req.flash("message", "logout successful");
  req.session.destroy(() => res.redirect("/"));
};

exports.getRegister = (req, res, next) => {
  res.render("auth/register", {
    path: "/register",
    isAuthenticated: req.session.isLoggedIn,
    role: req.session.loginrole,
    message: req.flash("message"),
    user: req.session.loginuser,
    id: req.session.user_id,
  });
};
exports.postRegister = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const results = db.execute("select email from users where email=?", [email]);
  // console.log(results);
  results
    .then(([rows, fieldData]) => {
      if (rows.length > 0) {
        req.flash("message", "Email already in use");
        return res.render("auth/register", {
          path: "/register",
          message: req.flash("message"),
          isAuthenticated: req.session.isLoggedIn,
          role: req.session.loginrole,
          user: req.session.loginuser,
        });
      } else if (password != confirmPassword) {
        req.flash("message", "Passwords did not match");
        return res.render("auth/register", {
          path: "/register",
          message: req.flash("message"),
          isAuthenticated: req.session.isLoggedIn,
          role: req.session.loginrole,
          user: req.session.loginuser,
          id: req.session.user_id,
        });
      }
      const user = new User(name, email, password);
      user.save().then(() => {
        User.findByEmail(email).then((user) => {
          // console.log(user[0]);
          // console.log("session", id);
          Cart.addCart(user[0][0].user_id).then();
        });
      });
    })
    .then(() => {
      req.flash("message", "Registration Successful");
      res.redirect("/login");
    })
    .catch((err) => console.log(err));
};
