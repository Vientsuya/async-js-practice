function returnNum(num, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * 2);
    }, time);
  });
}

returnNum(5, 1000).then((val) => console.log(val));
