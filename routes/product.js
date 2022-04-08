const path = require("path");

const express = require("express");

const productController = require("../controllers/product");

const router = express.Router();

router.get("/", productController.getIndex);

router.get("/bookings", productController.getBookings);

router.get("/gallery", productController.getGallery);

router.get("/cart", productController.getCart);

// router.get("/orders", productController.getOrders);

// router.get("/checkout", productController.getCheckout);

module.exports = router;
