const promo = require("../../models/promo/promo");
const multer = require("multer")
const upload = require("../../utils/multerPromo")
const promoValidator = require("../../validators/promo");
const response = require("../../utils/response")
const pagination = require("../../utils/paginationPromo")

module.exports = {
  getAllPromos: async (req, res) => {
    try {
      const { result, pageInfo } = await pagination(
        req.query,
        promo.getPromos,
        promo.getPromoCount,
        "promo"
      );
      res.status(200).send(response(true, "List of promos", result, { pageInfo }));
    }
    catch (e) {
      res.status(500).send(response(false, e.message))
    }
  },
  createPromo: (req, res) => {
    upload(req, res, async (fileError) => {
      if (req.fileValidationError) {
        res.status(400).send(response(false, req.fileValidationError));
      } else if (fileError instanceof multer.MulterError) {
        res.status(400).send(response(false, "File size too large, Max 1 MB"));
      }
      if (!req.file) {
        res
          .status(400)
          .send(response(false, "Please select an image to upload"));
      }
      else {
        const promoValid = await promoValidator(req.body)
        if (promoValid.status) {
          const { title, description } = promoValid.passed;
          const data = {
            title,
            image: "banner/" + req.file.filename,
            description
          };
          try {
            const createPromo = await promo.createPromo(data);
            res.status(201).send(response(true, promoValid.msg, createPromo));
          } catch (e) {
            res.status(500).send(response(false, e.message));
          }
        } else { res.status(400).send(response(true, promoValid.msg)) }
      }
    })
  },
  updatePromo: (req, res) => {
    upload(req, res, async (fileError) => {
      if (req.fileValidationError) {
        res.status(400).send(response(false, req.fileValidationError));
      } else if (fileError instanceof multer.MulterError) {
        res.status(400).send(response(false, "File size too large, Max 1 MB"));
      }
      if (!req.file) {
        res
          .status(400)
          .send(response(false, "Please select an image to upload"));
      }
      else {
        const { id } = req.params;
        const promoExist = await promo.getPromoById({ id: parseInt(id) })
        if (promoExist) {
          const promoValid = await promoValidator(req.body)
          if (promoValid.status) {
            const { title, description } = promoValid.passed;
            const data = {
              title,
              image: "banner/" + req.file.filename,
              description
            };
            try {
              const updatePromo = await promo.updatePromo([data, { id: parseInt(id) }])
              res.status(201).send(response(true, promoValid.msg, updatePromo[0]));
            } catch (e) {
              res.status(500).send(response(false, e.message));
            }
          } else { res.status(400).send(response(false, promoValid.msg)) }
        } else { res.status(404).send(response(false, promoExist)) }
      }
    })
  },
  deletePromo: async (req, res) => {
    const { id } = req.params
    const promoExist = await promo.getPromoById({ id: parseInt(id) })
    if (promoExist) {
      try {
        const deletePromo = await promo.deletePromo({ id: parseInt(id) })
        console.log(deletePromo)
        res.status(201).send(response(true, `Promo No.${id} Deleted`));
      } catch (e) {
        res.status(500).send(response(false, e.message));
      }
    } else { res.status(404).send(response(false, promoExist)) }
  }
}