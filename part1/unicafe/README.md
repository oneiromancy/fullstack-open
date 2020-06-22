# Unicafe Project

### 1.6: unicafe step1

Like most companies, Unicafe collects feedback from its customers. Your task is to implement a web application for collecting customer feedback. There are only three options for feedback: good, neutral, and bad.

The application must display the total number of collected feedback for each category.

Note that your application needs to work only during a single browser session. Once you refresh the page, the collected feedback is allowed to disappear.

You can implement the application in a single index.js file. You can use the code below as a starting point for your application.

```
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
	// save clicks of each button to own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
		<div>
		code here
		</div>
	)
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
```

### 1.7: unicafe step2

Expand your application so that it shows more statistics about the gathered feedback: the total number of collected feedback, the average score (good: 1, neutral: 0, bad: -1) and the percentage of positive feedback.

### 1.8: unicafe step3

Refactor your application so that displaying the statistics is extracted into its own Statistics component. The state of the application should remain in the App root component.

Remember that components should not be defined inside other components:

```
// a proper place to define a component
const Statistics = (props) => {
// ...
}

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	// do not define a component within another component
	const Statistics = (props) => {
	// ...
	}

	return (
	// ...
	)
}
```

### 1.9: unicafe step4

Change your application to display statistics only once feedback has been gathered.

### 1.10: unicafe step5

Let's continue refactoring the application. Extract the following two components:

Button for defining the buttons used for submitting feedback
Statistic for displaying a single statistic, e.g. the average score.
To be clear: the Statistic component always displays a single statistic, meaning that the application uses multiple components for rendering all of the statistics:

```

const Statistics = (props) => {
	/// ...
	return(

		<div>
			<Statistic text="good" value ={...} />
			<Statistic text="neutral" value ={...} />
			<Statistic text="bad" value ={...} />
			// ...
		</div>
	)
}

```

The application's state should still be kept in the root App component.

### 1.11: unicafe step6

Display the statistics in an HTML table/

Remember to keep your console open at all times.
