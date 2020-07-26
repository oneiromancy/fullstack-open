### 9.14.

Create a new Create React App with TypeScript, and set up eslint for the project similarly to how we just did.

This exercise is similar to the one you have already done in Part 1 of the course, but with TypeScript and some extra tweaks. Start off by modifying the contents of index.tsx to the following:

```
import React from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <h1>{courseName}</h1>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
```

and remove the unnecessary files.

The whole app is now in one component. That is not what we want, so refactor the code so that it consists of three components: Header, Content and Total. All data is still kept in the App component, which passes all necessary data to each component as props. Be sure to add type declarations for each component's props!

The Header component should take care of rendering the name of the course. Content should render the names of the different parts and the amount of exercises in each part, and Total should render the total sum of exercises in all parts.

The App component should look somewhat like this:

```
const App = () => {
  // const-declarations

  return (
    <div>
      <Header name={courseName} />
      <Content ... />
      <Total ... />
    </div>
  )
};
```
