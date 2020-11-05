const validator = require("validator");
const exists = require("../models/auth/exists");
const existsOtp = require("../models/auth/existsOTP");
const { throw: throwValidator, safeString } = require("./validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {jwt_key} = require('../configs')

module.exports = {
  register: async (request) => {
    const password = safeString(request.password);
    const cpassword = safeString(request.confirm_password);
    const email = safeString(request.email);

    if (
      !validator.isEmpty(password) &&
      !validator.isEmpty(cpassword) &&
      !validator.isEmpty(email)
    )
      if (validator.equals(password, cpassword) && validator.isEmail(email)) {
        const regex = new RegExp("^[0-9]{6}$");
        if (regex.test(password)) {
          const existsCheck = await exists({ email });
          if (existsCheck) {
            return throwValidator(
              false,
              "Email has been taken by another user"
            );
          } else {
            return throwValidator(true, "Success", {
              email: validator.escape(email),
              password: validator.escape(password),
              confirm_password: validator.escape(cpassword),
            });
          }
        } else {
          return throwValidator(
            false,
            "Password only 6 digits and numeric only"
          );
        }
      } else
        return throwValidator(
          false,
          "Password, Confirm password and email must be valid data"
        );
    else
      return throwValidator(
        false,
        "Password, Confirm password, and email must be required"
      );
  },
  activation: async (request) => {
    const otp = safeString(request.otp);
    if (!validator.isEmpty(otp)) {
      const existsCheck = await existsOtp(otp, false);
      if (!existsCheck) {
        return throwValidator(false, "Otp is not valid");
      } else {
        return throwValidator(true, "Success", existsCheck);
      }
    } else {
      return throwValidator(false, "Otp is required");
    }
  },
  login: async (request) => {
    const email = safeString(request.email);
    const password = safeString(request.password);
    if (!validator.isEmpty(password) && !validator.isEmpty(email))
      if (validator.isEmail(email)) {
        const existsCheck = await exists({ email: email });
        if (!existsCheck) {
          return throwValidator(false, "Email is not yet been registered");
        } else {
          if (!existsCheck.isVerified) {
            return throwValidator(false, "Please activate your email");
          }
          if (!bcrypt.compareSync(password, existsCheck.password)) {
            return throwValidator(false, "Password not match");
          } else {
            return throwValidator(true, "Success", {
              id: validator.escape(existsCheck.id.toString()),
              email: validator.escape(email),
              password: validator.escape(password),
            });
          }
        }
      } else return throwValidator(false, "Email must be valid data");
    else return throwValidator(false, "Email, and Password must be required");
  },
  forgotPassword: async (request) => {
   
    const email = safeString(request.email);
    if (!validator.isEmpty(email)) {
      if (validator.isEmail(email)) {
        const existsCheck = await exists({ email });
        if (!existsCheck) {
          return throwValidator(false, "Email is not found", { email });
        } else {
          if (existsCheck.isVerified) {
            return throwValidator(true, "Success", {
              email,
              token: jwt.sign(email, jwt_key),
            });
          } else {
            return throwValidator(false, "Email is not activated", {
              email,
              token,
            });
          }
        }
      } else {
        return throwValidator(false, "Email is not valid", { email });
      }
    } else {
      return throwValidator(false, "Email must be required", { email });
    }
  },
  resetPassword: async (request) => {
    const password = safeString(request.password);
    const confirm_password = safeString(request.confirm_password);
    const token = safeString(request.token);
   
    if (
      !validator.isEmpty(token) &&
      !validator.isEmpty(confirm_password) &&
      !validator.isEmpty(password)
    ) {
      if (validator.equals(password, confirm_password)) {
        const regex = new RegExp("^[0-9]{6}$");
        if (regex.test(password)) {
          const email = jwt.decode(token, jwt_key);
          const isExists = await exists({ email });
          if (isExists) {
            return throwValidator(true, "Success", {
              id: isExists.id,
              email,
              password,
              confirm_password,
            });
          } else {
            return throwValidator(false, "Email is not valid", {
              email,
              password,
              confirm_password,
            });
          }
        } else {
          return throwValidator(
            false,
            "Password must be 6 digits and number only"
          );
        }
      } else {
        return throwValidator(
          false,
          "Password and confirm password is not equals",
          { password, confirm_password }
        );
      }
    } else {
      return throwValidator(
        false,
        "Token, password, confirm_password must be required"
      );
    }
  },
};
