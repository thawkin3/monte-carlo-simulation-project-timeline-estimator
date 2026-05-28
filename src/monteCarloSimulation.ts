const runMonteCarloSimulation = (
  historicalData: Array<number>,
  numberOfTasks: number
) => {
  let days = 0;
  let numberOfTasksRemaining = numberOfTasks;

  while (numberOfTasksRemaining > 0) {
    days++;
    const forecastedNumberOfTasksCompletedThisDay =
      historicalData[Math.floor(Math.random() * historicalData.length)];
    numberOfTasksRemaining -= forecastedNumberOfTasksCompletedThisDay;
  }

  return days;
};

export const runMonteCarloSimulationNTimes = (
  historicalData: Array<number>,
  numberOfTasks: number,
  numberOfSimulationsToRun: number
) => {
  const forecastedResults = [];
  for (let i = 0; i < numberOfSimulationsToRun; i++) {
    const result = runMonteCarloSimulation(historicalData, numberOfTasks);
    forecastedResults.push(result);
  }

  forecastedResults.sort((a, b) => a - b);

  return forecastedResults;
};

export const getPercentile = (data: Array<number>, percentile: number) => {
  const indexToFind = (percentile / 100) * (data.length - 1);
  const actualIndex = Math.floor(indexToFind);
  return data[actualIndex];
};
