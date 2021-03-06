const path = require("path");

const express = require("express");

const productController = require("../controllers/product");

const router = express.Router();

router.get("/", productController.getIndex);
// router.get("/user", productController.getIndex);
// router.get("/admin", productController.getIndex);

router.get("/bookings", productController.getBookings);

router.get("/gallery", productController.getGallery);

router.get("/cart", productController.getCart);
router.get("/feedback", productController.getFeedback);
router.post("/feedback", productController.postFeedback);

router.post("/add-to-cart", productController.addToCart);
router.post("/cart-delete-item", productController.deleteInCart);

router.post("/orders", productController.postOrder);
router.get("/orders", productController.getOrders);
router.post("/book_form", productController.getBookForm);

router.get("/checkout", productController.getCheckout);
router.get("/checkout/cancel", productController.getCheckout);
router.get("/checkout/success", productController.postOrder);

module.exports = router;
