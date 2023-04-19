const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  deactivateProduct,
  updateQuantity
} = require("../controller/productController");
const router = express.Router();
const { validateJWT } = require("../middleware/jwt");

router.post("/create", validateJWT, createProduct);
router.get("/getProducts", validateJWT, getProducts);
router.get("/getProductById/:id", validateJWT, getProductById);
router.delete("/deleteProduct/:id", validateJWT, deleteProduct);
router.put("/updateProduct/:id", validateJWT, updateProduct);
router.put("/deactivateProduct/:id", validateJWT, deactivateProduct);
router.put("/updateQuantity/:id", validateJWT, updateQuantity);

module.exports = router;
