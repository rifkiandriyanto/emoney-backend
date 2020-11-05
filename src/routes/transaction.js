const router = require("express").Router();
const topUpController = require("../controllers/transaction/topUp");
const transferController = require("../controllers/transaction/transfer");
const historyController = require("../controllers/transaction/history");
const paymentPlnController = require("../controllers/transaction/paymentPln");

const needLogin = require("../middlewares/needLogin");

router.post("/top-up", needLogin, topUpController);
router.post("/transfer", needLogin, transferController);
router.get("/history", needLogin, historyController);
router.post("/payment/pln", needLogin, paymentPlnController);

module.exports = router;
