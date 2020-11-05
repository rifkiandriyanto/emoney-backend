const plnGenerator = require("./src/utils/plnGenerator");
const test = async () => {
  const test = await plnGenerator(20);
  console.log(test);
};

test();
