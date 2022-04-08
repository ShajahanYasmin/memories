const User = require("../models/user");
const Admin = require("../models/admin");
const db = require("../util/database");
const hash = require("bcryptjs");
const { findPassword } = require("../models/user");
exports.getLogin = (req, res, next) => {
  //   console.log(req.get("Cookie"));
  const isLoggedIn = req.session.isLoggedIn;
  res.render("auth/login", {
    path: "/login",
    isAuthenticated: isLoggedIn,
    role: req.session.loginrole,
  });
};
exports.postLogin = (req, res, next) => {
  //   req.isLoggedIn = true;
  //   res.setHeader("Set-Cookie", "LoggedIn=true");
  const { email, password } = req.body;
  User.findByEmail(email)
    .then((user) => {
      const log = user[0][0];
      if (!log) {
        return res.redirect("/login");
      }
      if (log.password === password) {
        req.session.isLoggedIn = true;
        req.session.user = log;
        req.session.loginrole = "user";
        return res.redirect("/");
      }
      return res.redirect("/login");
    })
    .catch((err) => console.log(err));
  // req.session.isLoggedIn = true;
  // res.redirect("/");
};
exports.postAdminLogin = (req, res, next) => {
  //   req.isLoggedIn = true;
  //   res.setHeader("Set-Cookie", "LoggedIn=true");
  const { adminemail, adminPassword } = req.body;
  Admin.findByAdmin(adminemail)
    .then((user) => {
      const log = user[0][0];
      console.log(log);
      if (!log) {
        return res.redirect("/admin");
      }
      if (log.admin_password === adminPassword) {
        req.session.isLoggedIn = true;
        // req.session.user = log;
        req.session.loginrole = "admin";
        return res.redirect("/admin");
      }
      return res.redirect("/login");
    })
    .catch((err) => console.log(err));
  // req.session.isLoggedIn = true;
  // res.redirect("/");
};
exports.postLogout = (req, res, next) => {
  req.session.destroy(() => res.redirect("/"));
};

exports.getRegister = (req, res, next) => {
  res.render("auth/register", {
    path: "/register",
    isAuthenticated: req.session.isLoggedIn,
    role: req.session.loginrole,
    message: undefined,
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
        return res.render("auth/register", {
          path: "/register",
          message: "That email is already in use",
          isAuthenticated: req.session.isLoggedIn,
          role: req.session.loginrole,
        });
      } else if (password != confirmPassword) {
        return res.render("auth/register", {
          path: "/register",
          message: "Passwords did not match",
          isAuthenticated: req.session.isLoggedIn,
          role: req.session.loginrole,
        });
      }
      const user = new User(name, email, password);
      user.save();
    })
    .then(() => res.redirect("/login"))
    .catch((err) => console.log(err));
};
