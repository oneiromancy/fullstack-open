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

### 9.4 Express

Add express to your dependencies and create a HTTP GET endpoint hello that answers 'Hello Full Stack!'

The web app should be started with command npm start in production mode and npm run dev in development mode that should use ts-node-dev to run the app.

Replace also your existing tsconfig.json file with the following content:

```
{
  "compilerOptions": {
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "strictNullChecks": true,
    "strictPropertyInitialization": true,
    "strictBindCallApply": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "esModuleInterop": true,
    "declaration": true,
  }
}
```

make sure there are not any errors!

### 9.5 WebBMI

Add an endpoint for BMI-calculator that can be used by doing a HTTP GET request to endpoint bmi and specifying the input with query string parameters. For example to get bmi for a person having height 180 and weight 72, the url is http://localhost:3002/bmi?height=180&weight=72

The response is a json of the form

```
{
  weight: 72,
  height: 180,
  bmi: "Normal (healthy weight)"
}
```

See the express documentation for info how to access the query parameters.

If the query parameters of the request are of the wrong type or missing, response with proper status code and error message are given

```
{
  error: "malformatted parameters"
}
```

Do not copy the calculator code to file index.ts, make it a typescript module that can be imported in index.ts.

### 9.6 Eslint

Configure your project to use the above eslint settings and fix all the warnings.

### 9.7 WebExercises

Add an endpoint to your app for the exercise calculator. It should be used by doing a HTTP POST request to endpoint exercises with the input in the request body

```
{
  "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
  "target": 2.5
}
```

Response is a json of the following form

```
{
    "periodLength": 7,
    "trainingDays": 4,
    "success": false,
    "rating": 1,
    "ratingDescription": "bad",
    "target": 2.5,
    "average": 1.2142857142857142
}
```

If the body of the request is not of the right form, response with proper status code and error message is given. The error message is either

```
{
  error: "parameters missing"
}
```

or

```
{
  error: "malformatted parameters"
}
```

depending on the error. The latter happens if the input values do not have the right type, i.e. they are not numbers or convertable to numbers.

In this exercise you might find it beneficial to use the explicit any type when handling the data in the request body. Our eslint configuration is preventing this but you may unset this rule for a particular line by inserting the following comment as the previous line:

```
// eslint-disable-next-line @typescript-eslint/no-explicit-any
```
