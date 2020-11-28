const validator = require('validator');
const exists = require('../models/auth/exists');
const { throw: throwValidator, safeString } = require('./validator');
const symbol = RegExp(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/);
const number = RegExp(/[0-9]/);

module.exports = async (request) => {
  const fullName = safeString(request.fullName);
  const phoneNumber = safeString(request.phoneNumber);

  if (!validator.isEmpty(fullName) && !validator.isEmpty(phoneNumber))
    if (
      !fullName.match(symbol) &&
      !fullName.match(number) &&
      validator.isNumeric(phoneNumber)
    ) {
      return throwValidator(true, 'Success', {
        full_name: validator.escape(fullName),
        phone_number: validator.escape(phoneNumber),
      });
    } else {
      return throwValidator(false, 'Form need to be valid data');
    }
  else {
    return throwValidator(false, 'Form need to be filled');
  }
};
