# Monte Carlo Simulation Project Timeline Estimator

Tired of people asking how long the project will take? Use some actual data and this estimation tool!

![Monte Carlo Simulation App](/MonteCarloSimulationApp.png)

## Key Principles

1. Historical data for how long similar work took is the best indicator of how long future work will take.
2. Project timeline estimates should never be treated as a single date.
3. The future is unknown. It is not deterministic, but it is probablistic.
4. Near term forecasts are almost always more predictable than more distant ones.
5. If you want to improve the predictability of your forecasts, improve the predictability of your process so that you have fairly consistent throughput.
6. There is a tradeoff between confidence and range – the two are directly correlated. Higher confidence means a higher range of outcomes that must be included in the forecast.

## Assumptions

1. The historical data chosen is a good representation for the new project (type of work, complexity of work, size of tasks)
2. Team availability remains similar to the past

## What To Do If You Don't Like the Timeline Estimates

1. Change the scope of the project
2. Change the planned release date
3. Add resources (beware of Brooks' Law: "Adding manpower to a late software project makes it later.")
4. Work longer hours
5. Find ways to be more efficient
6. Accept the risk of failure
7. Some combination of any of the above

## How Monte Carlo Simulation Works (In General)

1. Define a probability distribution of possible inputs.
2. Randomly select values from the input distribution and perform a computation on the selected inputs.
3. Repeat step 2 an arbitrary number of times and aggregate the results (usually in a histogram).
4. Repeat step 3 an arbitrary number of times until you have a clear picture of what the result set looks like.

## How Monte Carlo Simulation Works (For Project Timeline Estimation)

1. Collect historical throughput data that you think will closely resemble future throughput data.
2. Define how many tasks you think you have remaining for the project.
3. Randomly select a value from the historical throughput data. Subtract that number from the remaining tasks, and increment the count of days by one.
4. Repeat step 3 until you reach zero tasks left.
5. Record the number of days this possible future took to complete all the tasks. This is one round of the simulation.
6. Repeat steps 3-5 a sufficiently large number of times. (Something like 1,000 or 10,000 should do.)
7. Plot those numbers in a histogram.
8. Calculate percentiles for the given confidence levels you're interested in (for example, 50th, 85th, 90th, 95th, 99th).
