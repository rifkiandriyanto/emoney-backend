const router = require("express").Router();
const register = require("../controllers/auth/register");
const activation = require("../controllers/auth/activation");
const login = require("../controllers/auth/login");
const forgotPassword = require("../controllers/auth/forgot");
const resetPassword = require("../controllers/auth/reset");

router.post("/register", register);
router.patch("/activation", activation);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password", resetPassword);

module.exports = router;
