# Phonebook Project

### 2.6: The Phonebook Step1

Let's create a simple phonebook. In this part we will only be adding names to the phonebook.

Let us start with implementing the addition of a person to phonebook.

You can use the code below as a starting point for the App component of your application:

```
import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App
```

The newName state is meant for controlling the form input element.

Sometimes it can be useful to render state and other variables as text for debugging purposes. You can temporarily add the following element to the rendered component:

```
<div>debug: {newName}</div>
```

It's also important to put what we learned in the debugging React applications chapter of part one into good use. The React developer tools extension especially, is incredibly useful for tracking changes that occur in the application's state.

NB: you can use the person's name as value of the key property remember to prevent the default action of submitting HTML forms!

### 2.7: The Phonebook Step2

Prevent the user from being able to add names that already exist in the phonebook. JavaScript arrays have numerous suitable methods for accomplishing this task.

Issue a warning with the alert command when such an action is attempted:

fullstack content
Hint: when you are forming strings that contain values from variables, it is recommended to use a template string:

`${newName} is already added to phonebook`

If the newName variable holds the value Arto Hellas, the template string expression returns the string

`Arto Hellas is already added to phonebook`

The same could be done in a more Java-like fashion by using the plus operator:

`newName + ' is already added to phonebook'`

Using template strings is the more idiomatic option and the sign of a true JavaScript professional.

### 2.8: The Phonebook Step3

Expand your application by allowing users to add phone numbers to the phone book. You will need to add a second input element to the form (along with its own event handler):

```
<form>
  <div>name: <input /></div>
  <div>number: <input /></div>
  <div><button type="submit">add</button></div>
</form>
```

### 2.9: The Phonebook Step4

Implement a search field that can be used to filter the list of people by name:

fullstack content
You can implement the search field as an input element that is placed outside the HTML form. The filtering logic shown in the image is case insensitive, meaning that the search term arto also returns results that contain Arto with an uppercase A.

NB: When you are working on new functionality, it's often useful to "hardcode" some dummy data into your application, e.g.

```
const App = () => {
	const [persons, setPersons] = useState([
	{ name: 'Arto Hellas', number: '040-123456' },
	{ name: 'Ada Lovelace', number: '39-44-5323523' },
	{ name: 'Dan Abramov', number: '12-43-234345' },
	{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	])

	// ...
}
```

This saves you from having to manually input data into your application for testing out your new functionality.

### 2.10: The Phonebook Step5

If you have implemented your application in a single component, refactor it by extracting suitable parts into new components. Maintain the application's state and all event handlers in the App root component.

It is sufficient to extract three components from the application. Good candidates for separate components are, for example, the search filter, the form for adding new people into the phonebook, a component that renders all people from the phonebook, and a component that renders a single person's details.

The application's root component could look similar to this after the refactoring. The refactored root component below only renders titles and lets the extracted components take care of the rest.

```
const App = () => {
// ...

return (
	<div>
		<h2>Phonebook</h2>

		<Filter ... />

		<h3>Add a new</h3>

		<PersonForm
			...
		/>

		<h3>Numbers</h3>

		<Persons ... />
    </div>

)
}
```

NB: You might run into problems in this exercise if you define your components "in the wrong place". Now would be a good time to rehearse the chapter do not define a component in another component from last part.

### 2.11: The Phonebook Step6

We continue with developing the phonebook. Store the initial state of the application in the file db.json, which should be placed in the root of the project.

```
{
  "persons":[
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
  ]
}
```

Start json-server on port 3001 and make sure that the server returns the list of people by going to the address http://localhost:3001/persons in the browser.

If you receive the following error message:

```
events.js:182
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE 0.0.0.0:3001
    at Object._errnoException (util.js:1019:11)
    at _exceptionWithHostPort (util.js:1041:20)
```

it means that port 3001 is already in use by another application, e.g. in use by an already running json-server. Close the other application, or change the port in case that doesn't work.

Modify the application such that the initial state of the data is fetched from the server using the axios-library. Complete the fetching with an Effect hook.
