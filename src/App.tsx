import React from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Theme,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes';

import { runMonteCarloSimulationNTimes } from './monteCarloSimulation';

import '@radix-ui/themes/styles.css';
import './App.css';

export const App = () => {
  const [historicalData, setHistoricalData] = React.useState('');
  const [numberOfTasksRemaining, setNumberOfTasksRemaining] =
    React.useState('');
  const [simulationResults, setSimulationResults] = React.useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const historicalDataArray = historicalData
      .split(',')
      .map((entry) => Number(entry.trim()));
    console.log(historicalData);
    console.log(historicalDataArray);
    console.log(
      runMonteCarloSimulationNTimes(
        historicalDataArray,
        numberOfTasksRemaining,
        100
      )
    );
  };

  return (
    <Theme>
      <main>
        <Container size="3">
          <Flex direction="column" gap="4">
            <Heading>
              Monte Carlo Simulation - Project Timeline Estimator
            </Heading>
            <form onSubmit={handleSubmit}>
              <Box maxWidth="480px">
                <Flex direction="column" gap="4">
                  <Flex direction="column" gap="2">
                    <Text as="label">Historical data</Text>
                    <TextArea
                      value={historicalData}
                      onChange={(e) => setHistoricalData(e.target.value)}
                    />
                  </Flex>
                  <Flex direction="column" gap="2">
                    <Text as="label">Number of tasks remaining</Text>
                    <TextField.Root
                      value={numberOfTasksRemaining}
                      onChange={(e) =>
                        setNumberOfTasksRemaining(e.target.value)
                      }
                    />
                  </Flex>
                  <Button>Run simulation</Button>
                </Flex>
              </Box>
            </form>
          </Flex>
        </Container>
      </main>
    </Theme>
  );
};
