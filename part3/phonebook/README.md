# Phonebook Project

## Final version of my project can be found at https://fullstack-open-2020-phonebook.herokuapp.com/

### 3.1: Phonebook backend step1

Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons:

Notice that the forward slash in the route api/persons is not a special character, and is just like any other character in the string.

The application must be started with the command npm start.

The application must also offer an npm run dev command that will run the application and restart the server whenever changes are made and saved to a file in the source code.

### 3.2: Phonebook backend step2

Implement a page at the address http://localhost:3001/info that looks roughly like this:

The page has to show the time that the request was received and how many entries are in the phonebook at the time of processing the request.

### 3.3: Phonebook backend step3

Implement the functionality for displaying the information for a single phonebook entry. The url for getting the data for a person with the id 5 should be http://localhost:3001/api/persons/5

If an entry for the given id is not found, the server has to respond with the appropriate status code.

### 3.4: Phonebook backend step4

Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry.

Test that your functionality works with either Postman or the Visual Studio Code REST client.

### 3.5: Phonebook backend step5

Expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address http://localhost:3001/api/persons.

Generate a new id for the phonebook entry with the Math.random function. Use a big enough range for your random values so that the likelihood of creating duplicate id's is small.

### 3.6: Phonebook backend step6

Implement error handling for creating new entries. The request is not allowed to succeed, if:

The name or number is missing
The name already exists in the phonebook
Respond to requests like these with the appropriate status code, and also send back information that explains the reason for the error, e.g.:

```
{ error: 'name must be unique' }
```

### 3.7: Phonebook backend step7

Add the morgan middleware to your application for logging. Configure it to log messages to your console based on the tiny configuration.

The documentation for Morgan is not the best, and you may have to spend some time figuring out how to configure it correctly. However, most documentation in the world falls under the same category, so it's good to learn to decipher and interpret cryptic documentation in any case.

Morgan is installed just like all other libraries with the npm install command. Taking morgan into use happens the same way as configuring any other middleware by using the app.use command.

### 3.8: Phonebook backend step8

Configure morgan so that it also shows the data sent in HTTP POST requests:

This exercise can be quite challenging, even though the solution does not require a lot of code.

This exercise can be completed in a few different ways. One of the possible solutions utilizes these two techniques:

creating new tokens
JSON.stringify

### 3.9 phonebook backend step9

Make the backend work with the frontend from the previous part. Do not implement the functionality for making changes to the phone numbers yet, that will be implemented in exercise 3.17.

You will probably have to do some small changes to the frontend, at least to the URLs for the backend. Remember to keep the developer console open in your browser. If some HTTP requests fail, you should check from the Network-tab what is going on. Keep an eye on the backend's console as well. If you did not do the previous exercise, it is worth it to print the request data or request.body to the console in the event handler responsible for POST requests.

### 3.10 phonebook backend step10

Deploy the backend to the internet, for example to Heroku.

NB the command heroku works on the department's computers and the freshman laptops. If for some reason you cannot install Heroku to your computer, you can use the command npx heroku-cli.

Test the deployed backend with a browser and Postman or VS Code REST client to ensure it works.

PRO TIP: When you deploy your application to Heroku, it is worth it to at least in the beginning keep an eye on the logs of the heroku application AT ALL TIMES with the command heroku logs -t.

The following is a log about one typical problem. Heroku cannot find application dependency express:

The reason is that the option --save was forgotten when express was installed, so information about the dependency was not saved to the file package.json.

Another typical problem is that the application is not configured to use the port set to environment variable PORT:

Create a README.md at the root of your repository, and add a link to your online application to it.

### 3.11 phonebook full stack

Generate a production build of your frontend, and add it to the internet application using the method introduced in this part.

NB Make sure the directory build is not gitignored

Also make sure that the frontend still works locally.

### 3.12: Command-line database

Create a cloud-based MongoDB database for the phonebook application with MongoDB Atlas.

Create a mongo.js file in the project directory, that can be used for adding entries to the phonebook, and for listing all of the existing entries in the phonebook.

NB: Do not include the password in the file that you commit and push to GitHub!

The application should work as follows. You use the program by passing three command-line arguments (the first is the password), e.g.:

`node mongo.js yourpassword Anna 040-1234556`

As a result, the application will print:

`added Anna number 040-1234556 to phonebook`

The new entry to the phonebook will be saved to the database. Notice that if the name contains whitespace characters, it must be enclosed in quotes:

`node mongo.js yourpassword "Arto Vihavainen" 045-1232456`

If the password is the only parameter given to the program, meaning that it is invoked like this:

`node mongo.js yourpassword`

Then the program should display all of the entries in the phonebook:

```
phonebook:
Anna 040-1234556
Arto Vihavainen 045-1232456
Ada Lovelace 040-1231236
```

You can get the command-line parameters from the process.argv variable.

NB: do not close the connection in the wrong place. E.g. the following code will not work:

```
Person
.find({})
.then(persons=> {
// ...
})

mongoose.connection.close()
```

In the code above the mongoose.connection.close() command will get executed immediately after the Person.find operation is started. This means that the database connection will be closed immediately, and the execution will never get to the point where Person.find operation finishes and the callback function gets called.

The correct place for closing the database connection is at the end of the callback function:

```
Person
.find({})
.then(persons=> {
// ...
mongoose.connection.close()
})
```

NB: If you define a model with the name Person, mongoose will automatically name the associated collection as people.

### 3.13: Phonebook database, step1

Change the fetching of all phonebook entries so that the data is fetched from the database.

Verify that the frontend works after the changes have been made.

In the following exercises, write all Mongoose-specific code into its own module, just like we did in the chapter Database configuration into its own module.

### 3.14: Phonebook database, step2

Change the backend so that new numbers are saved to the database. Verify that your frontend still works after the changes.

At this point, you can choose to simply allow users to create all phonebook entries. At this stage, the phonebook can have multiple entries for a person with the same name.

### 3.15: Phonebook database, step3

Change the backend so that deleting phonebook entries is reflected in the database.

Verify that the frontend still works after making the changes.

### 3.16: Phonebook database, step4

Move the error handling of the application to a new error handler middleware.

### 3.17: Phonebook database, step5

If the user tries to create a new phonebook entry for a person whose name is already in the phonebook, the frontend will try to update the phone number of the existing entry by making an HTTP PUT request to the entry's unique URL.

Modify the backend to support this request.

Verify that the frontend works after making your changes.

### 3.18: Phonebook database step6

Also update the handling of the api/persons/:id and info routes to use the database, and verify that they work directly with the browser, Postman, or VS Code REST client.

### 3.19: Phonebook database, step7

Add validation to your phonebook application, that will make sure that a newly added person has a unique name. Our current frontend won't allow users to try and create duplicates, but we can attempt to create them directly with Postman or the VS Code REST client.

Mongoose does not offer a built-in validator for this purpose. Install the mongoose-unique-validator package with npm and use it instead.

If an HTTP POST request tries to add a name that is already in the phonebook, the server must respond with an appropriate status code and error message.

NB: unique-validator causes a warning to be printed to the console

```
(node:49251) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
connected to MongoDB
```

Read the mongoose documentation to find out how to get rid of the warning.

### 3.20: Phonebook database, step8

Expand the validation so that the name stored in the database has to be at least three characters long, and the phone number must have at least 8 digits.

Expand the frontend so that it displays some form of error message when a validation error occurs. Error handling can be implemented by adding a catch block as shown below:

```
personService
    .create({ ... })
    .then(createdPerson => {
      // ...
    })
    .catch(error => {
      // this is the way to access the error message
      console.log(error.response.data)
    })
```

You can display the default error message returned by Mongoose, even though they are not as readable as they could be:

NB: On update operations, mongoose validators are off by default. Read the documentation to determine how to enable them.

### 3.21 Deploying the database backend to production

Generate a new "full stack" version of the application by creating a new production build of the frontend, and copy it to the backend repository. Verify that everything works locally by using the entire application from the address https://localhost:3001.

Push the latest version to Heroku and verify that everything works there as well.

### 3.22: Lint configuration

Add ESlint to your application and fix all the warnings.

This was the last exercise of this part of the course. It's time to push your code to GitHub and mark all of your finished exercises to the exercise submission system.
