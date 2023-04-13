const express = require("express");
const { createProduct, getProducts, getProductById } = require("../controller/productController");
const router = express.Router();
const { validateJWT } = require("../middleware/jwt");

router.post("/create", validateJWT, createProduct)
router.get("/getProducts", validateJWT, getProducts)
router.get("/getProductById/:id", validateJWT, getProductById)

module.exports = router;
