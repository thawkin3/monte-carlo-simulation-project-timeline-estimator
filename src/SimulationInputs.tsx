import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes';

import { runMonteCarloSimulationNTimes } from './monteCarloSimulation';

export const SimulationInputs = ({
  unitOfTime,
  setUnitOfTime,
  setSimulationResults,
}) => {
  const [historicalData, setHistoricalData] = React.useState(
    '1,3,5,4,4,2,3,3,0,2,0,1'
  );
  const [numberOfTasksRemaining, setNumberOfTasksRemaining] =
    React.useState('100');
  const [numberOfSimulationsToRun, setNumberOfSimulationsToRun] =
    React.useState('10000');

  const handleSubmit = (e) => {
    e.preventDefault();

    const historicalDataArray = historicalData
      .split(',')
      .map((entry) => Number(entry.trim()));

    const results = runMonteCarloSimulationNTimes(
      historicalDataArray,
      Number(numberOfTasksRemaining),
      Number(numberOfSimulationsToRun)
    );

    setSimulationResults(results);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Flex direction="column" gap="4">
          <Heading as="h2">Simulation inputs</Heading>
          <Flex direction="column" gap="2">
            <Text as="label">
              Historical throughput data (Number of tasks completed per unit of
              time)
            </Text>
            <TextArea
              value={historicalData}
              onChange={(e) => setHistoricalData(e.target.value)}
            />
          </Flex>
          <Flex direction="column" gap="2">
            <Text as="label">Unit of time</Text>
            <TextField.Root
              value={unitOfTime}
              onChange={(e) => setUnitOfTime(e.target.value)}
            />
          </Flex>
          <Flex direction="column" gap="2">
            <Text as="label">Number of tasks remaining</Text>
            <TextField.Root
              value={numberOfTasksRemaining}
              onChange={(e) => setNumberOfTasksRemaining(e.target.value)}
            />
          </Flex>
          <Flex direction="column" gap="2">
            <Text as="label">Number of simulations to run</Text>
            <TextField.Root
              value={numberOfSimulationsToRun}
              onChange={(e) => setNumberOfSimulationsToRun(e.target.value)}
            />
          </Flex>
          <Button>Run simulation</Button>
        </Flex>
      </Box>
    </form>
  );
};
