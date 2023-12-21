const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/productController");

router.post("/add", ProductController.AddProduct);

router.get('/', ProductController.productPage)

router.post('/addtocart', ProductController.AddToCart)

router.get('/cartpage', ProductController.getCartPage)

router.get('/delete-prod/:id',ProductController.deleteProd)

router.post('/payment-paypal',ProductController.payment)

router.post('/success', ProductController.success)

module.exports = router;
