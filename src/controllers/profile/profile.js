const multer = require("multer")
const upload = require("../../utils/multerUser")
const profileValidator = require("../../validators/profile");
const response = require("../../utils/response");
const update = require("../../models/profile/updateProfile");
const getProfileById = require("../../models/profile/getProfileById");

module.exports = {

  updateProfile: (req, res) => {
    upload(req, res, async (fileError) => {
      if (req.fileValidationError) {
        res.status(400).send(response(false, req.fileValidationError));
      } else if (fileError instanceof multer.MulterError) {
        res.status(400).send(response(false, "File size too large, Max 1 MB"));
      }
      const { id } = req.me
      const userExist = await getProfileById({ user_id: parseInt(id) })
      if (userExist) {
        const profileValid = await profileValidator(req.body)
        if (profileValid.status) {
          const { full_name, phone_number } = profileValid.passed;
          const image = req.file ? "user/" + req.file.filename : userExist.image
          const data = {
            user_id: id,
            full_name,
            image,
            phone_number
          };
          try {
            const updateProfile = await update([data, { user_id: parseInt(id) }])
            // console.log(updateProfile)
            res.status(201).send(response(true, profileValid.msg, updateProfile[0]));
          } catch (e) {
            res.status(500).send(response(false, e.message));
          }
        } else { res.status(400).send(response(false, profileValid.msg)); }
      } else { res.status(404).send(response(false, 'User Not Found')); }

    });
  }
}