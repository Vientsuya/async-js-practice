function doubleNum(num, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(num), time);
  });
}

const tasks = [
  () => doubleNum(20, 1300),
  () => doubleNum(8, 1000),
  () => doubleNum(17, 2200),
  () => doubleNum(34, 900),
  () => doubleNum(72, 3000),
  () => doubleNum(4, 600),
];

function createQueue(tasks, maxNumOfWorkers) {
  let taskIndex = 0;

  return new Promise((resolve) => {
    const getNextTask = () => {
      if (taskIndex < tasks.length) {
        tasks[taskIndex]()
          .then((result) => {
            console.log(
              `Processed task number: ${taskIndex + 1} with value: ${result}`
            );
            tasks[taskIndex] = result * 2;
            taskIndex++;
            getNextTask();
          })
          .catch((error) => {
            console.log(`An error occured in task number ${taskIndex + 1}`);
            tasks[taskIndex] = error;
            taskIndex++;
            getNextTask();
          });
      } else {
        console.log("All task resolved");
        resolve(tasks);
      }
    };
    getNextTask();
  });
}

createQueue(tasks, 0);
