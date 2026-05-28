import React from 'react';
import { Box, Container, Flex, Heading, Theme } from '@radix-ui/themes';

import { SimulationInputs } from './SimulationInputs';
import { SimulationResults } from './SimulationResults';

import '@radix-ui/themes/styles.css';
import './App.css';

export const App = () => {
  const [unitOfTime, setUnitOfTime] = React.useState('days');
  const [simulationResults, setSimulationResults] = React.useState<
    Array<number>
  >([]);

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
                <SimulationInputs
                  unitOfTime={unitOfTime}
                  setUnitOfTime={setUnitOfTime}
                  setSimulationResults={setSimulationResults}
                />
              </Box>
              <Box width={{ initial: '100%', md: '50%' }}>
                <SimulationResults
                  simulationResults={simulationResults}
                  unitOfTime={unitOfTime}
                />
              </Box>
            </Flex>
          </Flex>
        </Container>
      </main>
    </Theme>
  );
};
