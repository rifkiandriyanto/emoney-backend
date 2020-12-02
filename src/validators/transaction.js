const validator = require('validator');
const { throw: throwValidator, safeString } = require('./validator');
const exists = require('../models/auth/exists');

module.exports = {
  topup: (request) => {
    const amount = safeString(request.amount);
    const user_id = safeString(request.user_id);
    if (!validator.isEmpty(amount) && !validator.isEmpty(user_id)) {
      if (Number.isInteger(parseInt(amount))) {
        if (amount > 0) {
          return throwValidator(true, 'Success', {
            amount: validator.toInt(amount),
            user_id: validator.toInt(user_id),
          });
        } else {
          return throwValidator(false, 'Amount is more than 0', request);
        }
      } else {
        return throwValidator(false, 'Amount must be integer', request);
      }
    } else {
      return throwValidator(
        false,
        'User id, type id, and amount must be required'
      );
    }
  },
  transfer: async (request) => {
    const amount = safeString(request.amount);
    const user_id = safeString(request.user_id);
    const email_from = safeString(request.email_from);
    const email_to = safeString(request.email_to);

    if (
      !validator.isEmpty(email_to) &&
      !validator.isEmpty(user_id) &&
      !validator.isEmpty(amount)
    ) {
      if (Number.isInteger(parseInt(amount))) {
        if (amount > 0) {
          const { balance } = await exists({ id: user_id });
          if (amount <= balance) {
            if (email_from !== email_to) {
              const existsUser = await exists({ email: email_to });
              if (existsUser) {
                return throwValidator(true, 'Success', {
                  email_to,
                  user_id,
                  amount,
                });
              } else {
                return throwValidator(false, 'Email is not valid', {
                  email_to,
                  user_id,
                  amount,
                });
              }
            } else {
              return throwValidator(false, "Can't send transfer to yourself", {
                email_to,
                user_id,
                amount,
              });
            }
          } else {
            return throwValidator(false, 'Less balance', {
              email_to,
              user_id,
              amount,
            });
          }
        } else {
          return throwValidator(false, 'Amount must be more than 0', {
            email_to,
            user_id,
            amount,
          });
        }
      } else {
        return throwValidator(false, 'Amount must be integer', {
          email_to,
          user_id,
          amount,
        });
      }
    } else {
      return throwValidator(
        false,
        'Email_to, user_id, and amount must be required',
        {
          email_to,
          user_id,
          amount,
        }
      );
    }
  },
  paymentPln: async (request) => {
    const amount = safeString(request.amount);
    const user_id = safeString(request.user_id);
    const tokenPln = safeString(request.tokenPln);

    if (!validator.isEmpty(amount)) {
      if (Number.isInteger(parseInt(amount))) {
        if (amount > 0) {
          const { balance } = await exists({ id: user_id });
          if (amount <= balance) {
            return throwValidator(true, 'Success', {
              user_id,
              amount,
              tokenPln,
            });
          } else {
            return throwValidator(false, 'Less balance', {
              user_id,
              amount,
              tokenPln,
            });
          }
        } else {
          return throwValidator(false, 'Amount must be more than 0', {
            user_id,
            amount,
            tokenPln,
          });
        }
      } else {
        return throwValidator(false, 'Amount must be integer', {
          user_id,
          amount,
          tokenPln,
        });
      }
    } else {
      return throwValidator(false, 'Amount must be required', {
        user_id,
        amount,
        tokenPln,
      });
    }
  },
};
