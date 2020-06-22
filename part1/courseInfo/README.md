# Course Information Porject

### 1.1: course information, step1

The application that we will start working on in this exercise will be further developed in a few of the following exercises. In this and other upcoming exercise sets in this course, it is enough to only submit the final state of the application. If desired, you may also create a commit for each exercise of the series, but this is entirely optional.

Use create-react-app to initialize a new application. Modify index.js to match the following and remove extra files (App.js, App.css, App.test.js, logo.svg, setupTests.js, serviceWorker.js).

```
import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

	return (
		<div>
			<h1>{course}</h1>
			<p>
				{part1} {exercises1}
			</p>
			<p>
				{part2} {exercises2}
			</p>
			<p>
				{part3} {exercises3}
			</p>
			<p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))

```

Unfortunately, the entire application is in the same component. Refactor the code so that it consists of three new components: Header, Content, and Total. All data still resides in the App component, which passes the necessary data to each component using props. Header takes care of rendering the name of the course, Content renders the parts and their number of exercises and Total renders the total number of exercises.

The App component's body will approximately be as follows:

```

const App = () => {
	return (
		<div>
			<Header course={course} />
			<Content ... />
			<Total ... />
		</div>
	)
}

```

### 1.2: course information, step2

Refactor the Content component so that it does not render any names of parts or their number of exercises by itself. Instead it only renders three Part components of which each renders the name and number of exercises of one part.

```
const Content = ... {
	return (
		<div>
			<Part .../>
			<Part .../>
			<Part .../>
		</div>
	)
}

```

Our application passes on information in quite a primitive way at the moment, since it is based on individual variables. This situation will improve soon.
