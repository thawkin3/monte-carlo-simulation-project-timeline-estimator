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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

import { runMonteCarloSimulationNTimes } from './monteCarloSimulation';

import '@radix-ui/themes/styles.css';
import './App.css';

const SimpleBarChart = ({ data = [] }) => {
  const formattedDataObject = data.reduce((acc, currentValue) => {
    if (acc[currentValue]) {
      acc[currentValue]++;
    } else {
      acc[currentValue] = 1;
    }
    return acc;
  }, {});

  const formattedDataArray = Object.entries(formattedDataObject).map(
    ([key, value]) => ({ daysToComplete: key, timesResultOccurred: value })
  );

  return (
    <BarChart
      style={{
        width: '100%',
        maxWidth: '700px',
        maxHeight: '400px',
        aspectRatio: 1.618,
      }}
      responsive
      data={formattedDataArray}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 20,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="daysToComplete"
        label={{
          value: 'Forecasted number of days to complete project',
          position: 'insideBottom',
          offset: -10,
        }}
      />
      <YAxis
        dataKey="timesResultOccurred"
        width="auto"
        label={{
          value: 'Number of forecasted occurrences',
          angle: -90,
          position: 'middle',
          offset: -40,
          height: 80,
        }}
      />
      <Bar
        dataKey="timesResultOccurred"
        fill="var(--accent-9)"
        radius={[4, 4, 0, 0]}
      />
    </BarChart>
  );
};

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
    const results = runMonteCarloSimulationNTimes(
      historicalDataArray,
      numberOfTasksRemaining,
      10000
    );

    setSimulationResults(results);
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
          <SimpleBarChart data={simulationResults} />
        </Container>
      </main>
    </Theme>
  );
};
