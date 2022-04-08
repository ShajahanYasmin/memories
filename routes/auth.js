const path = require("path");

const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.post("/admin_login", authController.postAdminLogin);

router.get("/register", authController.getRegister);
router.post("/register", authController.postRegister);
router.post("/logout", authController.postLogout);

module.exports = router;
