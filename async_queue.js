function doubleNum(num, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(num * 2), time);
  });
}

const tasks = [
  () => doubleNum(8, 5000),
  () => doubleNum(17, 8000),
  () => doubleNum(34, 10000),
  () => doubleNum(72, 6000),
  () => doubleNum(3, 4000),
  () => doubleNum(6, 8000),
  () => doubleNum(99, 3000),
  () => doubleNum(328, 7000),
  () => doubleNum(883, 12000),
  () => doubleNum(333, 6000),
];

function createQueue(tasks, maxNumOfWorkers = 4) {
  let taskIndex = 0;
  let numOfWorkers = 0;

  return new Promise((resolve) => {
    const handleResult = (index) => (result) => {
      console.log(`Task number: ${index + 1} finished with result: ${result}`);
      tasks[index] = result;
      numOfWorkers--;
      console.log(`Number of workers: ${numOfWorkers}/${maxNumOfWorkers}`);
      getNextTask();
    };

    const getNextTask = () => {
      if (numOfWorkers < maxNumOfWorkers && taskIndex < tasks.length) {
        tasks[taskIndex]()
          .then(handleResult(taskIndex))
          .catch(handleResult(taskIndex));
        taskIndex++;
        numOfWorkers++;
        console.log(`Starting new task number: ${taskIndex}`);
        console.log(`Number of workers: ${numOfWorkers}/${maxNumOfWorkers}`);
        getNextTask();
      } else if (numOfWorkers === 0 && taskIndex === tasks.length) {
        console.log("All tasks done successfully");
        resolve(tasks);
      }
    };
    getNextTask();
  });
}

createQueue(tasks);
