const runMonteCarloSimulation = (historicalData, numberOfTasks) => {
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
  historicalData,
  numberOfTasks,
  numberOfSimulationsToRun
) => {
  const forecastedResults = [];
  for (let i = 0; i < numberOfSimulationsToRun; i++) {
    const result = runMonteCarloSimulation(historicalData, numberOfTasks);
    forecastedResults.push(result);
  }

  forecastedResults.sort((a, b) => (a < b ? -1 : 1));

  return forecastedResults;
};
