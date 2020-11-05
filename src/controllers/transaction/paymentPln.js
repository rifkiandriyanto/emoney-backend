const paymentPlnModel = require("../../models/transaction/plnPayment");
const {
  paymentPln: paymentPlnValidator,
} = require("../../validators/transaction");
const plnGenerator = require("../../utils/plnGenerator");
const response = require("../../utils/response");

module.exports = async (req, res) => {
  const plnGeneratorProccess = await plnGenerator(25);
  const paymentPlnValidatorChecked = await paymentPlnValidator({
    ...req.body,
    ...{ user_id: req.me.id, tokenPln: plnGeneratorProccess },
  });

  if (paymentPlnValidatorChecked.status) {
    try {
      const consumePlnPaymentModel = await paymentPlnModel(
        paymentPlnValidatorChecked.passed
      );
      res.status(200).send(response(true, "Success", consumePlnPaymentModel));
    } catch (e) {
      delete paymentPlnValidatorChecked.passed.tokenPln;
      res
        .status(500)
        .send(response(false, e.message, paymentPlnValidatorChecked.passed));
    }
  } else {
    delete paymentPlnValidatorChecked.passed.tokenPln;
    res
      .status(400)
      .send(
        response(
          false,
          paymentPlnValidatorChecked.msg,
          paymentPlnValidatorChecked.passed
        )
      );
  }
};
