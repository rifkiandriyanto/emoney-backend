const router = require("express").Router();
const getAllTransactionTypeController = require("../controllers/transactionType/getAll");

router.get("/", getAllTransactionTypeController);

module.exports = router;
