import { Box, Flex, Heading, Text } from '@radix-ui/themes';

import { ForecastedResultsBarChart } from './ForecastedResultsBarChart';
import { Percentiles } from './Percentiles';

export const SimulationResults = ({
  simulationResults,
  unitOfTime,
}: {
  simulationResults: Array<number>;
  unitOfTime: string;
}) => {
  return (
    <Flex direction="column" gap="4">
      <Heading as="h2">Simulation results</Heading>
      {simulationResults.length ? (
        <>
          <ForecastedResultsBarChart data={simulationResults} />
          <Percentiles data={simulationResults} unitOfTime={unitOfTime} />
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
  );
};
