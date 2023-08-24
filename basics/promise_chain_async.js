function returnNum(num, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * 2);
    }, time);
  });
}

async function main() {
  let val = 0;

  val = await returnNum(5, 1000);
  console.log(`First promise is resolved with value: ${val}`);

  val = await returnNum(val, 2000);
  console.log(`Second promise is resolved with value: ${val}`);

  val = await returnNum(val, 500);
  console.log(`Third promise is resolved with value: ${val}`);
}

main();
