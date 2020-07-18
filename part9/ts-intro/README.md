## 9.1 Body mass index

Create the code of this exercise to file bmiCalculator.ts

Write a function calculateBmi that counts BMI based on given weight (in kilograms) and height (in centimeters) and then returns a message that suits the results.

Call the function in the same file with hard-coded parameters and print out the result. The code

```
console.log(calculateBmi(180, 74))
```

should print the following message

```
Normal (healthy weight)
```

Create a npm script for running the program with command npm run calculateBmi

### 9.2 Exercise calculator

Create the code of this exercise to file exerciseCalculator.ts

Write a function calculateExercises that calculates the average time of daily exercise hours and compares it to the target amount of daily hours and returns an object that includes the following values:

-   the number of days
-   the number of training days
-   the original target value
-   the calculated average time
-   boolean value describing if the target was reached
-   a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
-   a text value explaining the rating
-   The daily exercise hours are given to the function as an array that contains the number of exercise hours for each day in the training period. Eg. a week with 3 hours of training at Monday, none at Tuesday, 2 hours at Wednesday, 4.5 hours at Thursday and so on would be represented by the following array:

```
[3, 0, 2, 4.5, 0, 3, 1]
```

For the Result object you should create an interface.

If you would call the function with parameters [3, 0, 2, 4.5, 0, 3, 1] and 2 it could return

```
{ periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286 }
```

Create a npm script npm run calculateExercises for calling the function with hard coded values.

### 9.3 Command line

Change the previous exercises so that you can give the parameters of bmiCalculator and exerciseCalculator as command line arguments.

Your program could work eg. as follows:

```$ npm run calculateBmi 180 91

Overweight
```

and

```
$ npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4

{ periodLength: 9,
  trainingDays: 6,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.7222222222222223 }
```

In the example the first argument is the target value.

Handle exceptions and errors appropriately. The exerciseCalculator should accept inputs of varied lengths. Determine by yourself how you manage to collect all needed input.
