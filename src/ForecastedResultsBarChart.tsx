import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export const ForecastedResultsBarChart = ({
  data = [],
}: {
  data: Array<number>;
}) => {
  const formattedDataObject = data.reduce(
    (acc: Record<number, number>, currentValue: number) => {
      if (acc[currentValue]) {
        acc[currentValue]++;
      } else {
        acc[currentValue] = 1;
      }
      return acc;
    },
    {}
  );

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
