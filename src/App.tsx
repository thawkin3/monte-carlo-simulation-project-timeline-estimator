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

import {
  getPercentile,
  runMonteCarloSimulationNTimes,
} from './monteCarloSimulation';

import '@radix-ui/themes/styles.css';
import './App.css';

const ForecastedResultsBarChart = ({ data = [] }: { data: Array<number> }) => {
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
        maxHeight: '70vh',
        aspectRatio: 1.618,
      }}
      responsive
      data={formattedDataArray}
      margin={{
        top: 20,
        right: 0,
        left: 5,
        bottom: 30,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="daysToComplete"
        label={{
          value: 'Forecasted number of days to complete project',
          position: 'insideBottom',
          offset: -20,
        }}
      />
      <YAxis
        dataKey="timesResultOccurred"
        width="auto"
        label={{
          value: 'Number of forecasted occurrences',
          angle: -90,
          position: 'insideLeft',
          textAnchor: 'middle',
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

const Percentiles = ({
  data = [],
  unitOfTime,
}: {
  data: Array<number>;
  unitOfTime: string;
}) => {
  return (
    <Flex direction="column" gap="2">
      <Heading as="h2">When will the project be done?</Heading>
      <Text as="p">
        <Text weight="bold">50% confidence:</Text> {getPercentile(data, 50)}{' '}
        {unitOfTime}
      </Text>
      <Text as="p">
        <Text weight="bold">85% confidence:</Text> {getPercentile(data, 85)}{' '}
        {unitOfTime}
      </Text>
      <Text as="p">
        <Text weight="bold">90% confidence:</Text> {getPercentile(data, 90)}{' '}
        {unitOfTime}
      </Text>
      <Text as="p">
        <Text weight="bold">95% confidence:</Text> {getPercentile(data, 95)}{' '}
        {unitOfTime}
      </Text>
      <Text as="p">
        <Text weight="bold">99% confidence:</Text> {getPercentile(data, 99)}{' '}
        {unitOfTime}
      </Text>
      <Text as="p">
        <Text weight="bold">100% confidence:</Text> {getPercentile(data, 100)}{' '}
        {unitOfTime}
      </Text>
    </Flex>
  );
};

export const App = () => {
  const [historicalData, setHistoricalData] = React.useState(
    '1,3,5,4,4,2,3,3,0,2,0,1'
  );
  const [unitOfTime, setUnitOfTime] = React.useState('days');
  const [numberOfTasksRemaining, setNumberOfTasksRemaining] =
    React.useState('100');
  const [numberOfSimulationsToRun, setNumberOfSimulationsToRun] =
    React.useState('10000');
  const [simulationResults, setSimulationResults] = React.useState<
    Array<number>
  >([]);

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
    <Theme>
      <main>
        <Container size="4">
          <Flex direction="column" gap="6">
            <Heading size="8">
              Monte Carlo Simulation - Project Timeline Estimator
            </Heading>
            <Flex direction={{ initial: 'column', md: 'row' }} gap="8">
              <Box width={{ initial: '100%', md: '50%' }}>
                <form onSubmit={handleSubmit}>
                  <Box>
                    <Flex direction="column" gap="4">
                      <Heading as="h2">Simulation inputs</Heading>
                      <Flex direction="column" gap="2">
                        <Text as="label">Historical throughput data</Text>
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
                          onChange={(e) =>
                            setNumberOfTasksRemaining(e.target.value)
                          }
                        />
                      </Flex>
                      <Flex direction="column" gap="2">
                        <Text as="label">Number of simulations to run</Text>
                        <TextField.Root
                          value={numberOfSimulationsToRun}
                          onChange={(e) =>
                            setNumberOfSimulationsToRun(e.target.value)
                          }
                        />
                      </Flex>
                      <Button>Run simulation</Button>
                    </Flex>
                  </Box>
                </form>
              </Box>
              <Box width={{ initial: '100%', md: '50%' }}>
                <Flex direction="column" gap="4">
                  <Heading as="h2">Simulation results</Heading>
                  {simulationResults.length ? (
                    <>
                      <ForecastedResultsBarChart data={simulationResults} />
                      <Percentiles
                        data={simulationResults}
                        unitOfTime={unitOfTime}
                      />
                    </>
                  ) : (
                    <Box
                      style={{
                        background: 'var(--gray-3)',
                        borderRadius: 'var(--radius-3)',
                        padding: '8px 12px',
                      }}
                    >
                      <Text>Run the simulation to see the results.</Text>
                    </Box>
                  )}
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </Container>
      </main>
    </Theme>
  );
};
