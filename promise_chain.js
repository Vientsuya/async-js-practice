function returnNum(num, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * 2);
    }, time);
  });
}

returnNum(5, 1000)
  .then((val1) => {
    console.log(`First promise was resolved with value: ${val1}`);
    return returnNum(val1, 2000);
  })
  .then((val2) => {
    console.log(`Second promise was resolved with value: ${val2}`);
    return returnNum(val2, 500);
  })
  .then((val3) => {
    console.log(`Third promise was resolved with value: ${val3}`);
  });
