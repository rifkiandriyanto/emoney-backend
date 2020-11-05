const validator = require("validator");
const { throw: throwValidator, safeString } = require("./validator");

module.exports = async (request) => {
  const title = safeString(request.title);
  const desc = safeString(request.description);
  if (!validator.isEmpty(title) && !validator.isEmpty(desc)) {
    return throwValidator(true, "Success", {
      title: validator.escape(title),
      description: validator.escape(desc),
    });
  } else {
    return throwValidator(false, "Form need to be filled");
  }
};
