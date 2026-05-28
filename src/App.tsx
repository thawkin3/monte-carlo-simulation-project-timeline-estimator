import {
  Button,
  Container,
  Flex,
  Heading,
  Theme,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './App.css';

export const App = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
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
              <Flex direction="column" gap="4">
                <Flex direction="column" gap="2">
                  <Text as="label">Historical data</Text>
                  <TextArea />
                </Flex>
                <Flex direction="column" gap="2">
                  <Text as="label">Number of tasks remaining</Text>
                  <TextField.Root />
                </Flex>
                <Button>Run simulation</Button>
              </Flex>
            </form>
          </Flex>
        </Container>
      </main>
    </Theme>
  );
};
