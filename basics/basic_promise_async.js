function returnNum(num, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * 2);
    }, time);
  });
}

async function main() {
  const result = await returnNum(5, 1000);
  console.log(result);
}

main();
