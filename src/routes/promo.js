const router = require("express").Router()
const promo = require("../controllers/promo/promo")

const needLogin = require("../middlewares/needLogin");

router.get("/", needLogin, promo.getAllPromos);
router.post("/", needLogin, promo.createPromo);
router.patch("/:id", needLogin, promo.updatePromo);
router.delete("/:id", needLogin, promo.deletePromo);

module.exports = router;