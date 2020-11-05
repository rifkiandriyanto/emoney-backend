const router = require("express").Router()
const user = require("../controllers/user/user")

const needLogin = require("../middlewares/needLogin");

router.get("/", user.getAllUsers);
router.get("/:id", needLogin, user.getUserById);
router.delete("/:id", needLogin, user.deleteUser);

module.exports = router;