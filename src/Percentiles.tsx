import { Flex, Heading, Text } from '@radix-ui/themes';

import { getPercentile } from './monteCarloSimulation';

export const Percentiles = ({
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
