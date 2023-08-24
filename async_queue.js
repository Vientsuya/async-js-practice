function doubleNum(num, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(num * 2), time);
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
    const handleResult = (index) => (result) => {
      console.log(`Task number: ${index + 1} finished with result: ${result}`);
      tasks[index] = result;
      taskIndex++;
      getNextTask();
    };

    const getNextTask = () => {
      if (taskIndex < tasks.length) {
        tasks[taskIndex]()
          .then(handleResult(taskIndex))
          .catch(handleResult(taskIndex));
      } else {
        console.log("All tasks done successfully");
        resolve(tasks);
      }
    };
    getNextTask();
  });
}

createQueue(tasks, 0);
