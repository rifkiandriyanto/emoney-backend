module.exports = (len) =>
  new Promise((resolve) => {
    const rangeNumber = '1234567890';
    let OTP = '';
    for (let a = 0; a < len; a++) {
      OTP += rangeNumber[
        Math.floor(Math.random() * rangeNumber.length)
      ].toString();
    }
    resolve(OTP);
  });
