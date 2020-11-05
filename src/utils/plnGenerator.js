module.exports = (len) =>
  new Promise((resolve) => {
    const rangeNumber = "1234567890";
    let token = "";
    for (let a = 0; a < len; a++) {
      if (a % 5 === 0 && a !== 0) {
        token += "-";
      } else if (a !== 0) {
        token += rangeNumber[
          Math.floor(Math.random() * rangeNumber.length)
        ].toString();
      }
    }
    resolve(token);
  });
