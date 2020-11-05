module.exports = (status, msg = "", data = {}, options = {}) => ({
  status,
  msg,
  data,
  ...options,
});
