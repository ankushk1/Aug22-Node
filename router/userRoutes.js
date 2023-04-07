const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controller/userController");
const { validateJWT } = require("../middleware/jwt");

router.post("/signup", signup);
router.post("/signin", signin);

router.get("/test", validateJWT, () => {
  console.log("test");
});

module.exports = router;
