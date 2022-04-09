const path = require("path");
const express = require("express");
const app = express();

const adminController = require("../controllers/admin");
// const { body } = require("express-validator/check");
const isAuth = require("../middleware/is-auth");

const router = express.Router();
app.use(express.static(path.join(__dirname, "public")));
// /admin/add-product => GET
// router.get("/add-product", adminController.getAddProduct);

// /admin/products => GET
router.get("/", adminController.getIndex);
router.get("/add-product", isAuth, adminController.getAddProduct);

router.get("/bookings", adminController.getBookings);

router.get("/gallery", adminController.getGallery);

// router.get("/cart", adminController.getCart);

router.get("/products", adminController.getProducts);
router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);
router.post("/edit-product", isAuth, adminController.postEditProduct);
router.post("/delete-product", isAuth, adminController.postDeleteProduct);

// /admin/add-product => POST
router.post(
  "/add-product",
  // [
  //   body("title").isString().isLength({ min: 3 }).trim(),
  //   body("price").isFloat(),
  //   body("description").isLength({ min: 5, max: 400 }).trim(),
  // ],
  adminController.postAddProduct
);

module.exports = router;
