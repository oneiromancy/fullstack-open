### 9.8: Patientor backend, step1

Initialise project that will be used by the frontend. Configure eslint and tsconfig with the same configurations that are used in the material. Define an endpoint that responses to HTTP GET requests to route /ping.

The project should be runnable with npm scripts both in development mode and as compiled code in production mode.

### 9.9: Patientor backend, step2

Fork and clone the project patientor. Start the project with the help of the README file. You should be able to use the frontend without a functioning backend.

Ensure that backend answers to the ping request that frontend has made on startup. Check developer tool to make sure it really works:

You might also want to have a look at the tab console. If something fails part 3 of the course shows how the problem can be solved.

### 9.10: Patientor backend, step3

Create a type Diagnose and use it to create endpoint /api/diagnoses for fetching all diagnoses with HTTP GET.

Structure your code properly by using meaningfully named directories and files.

Note that diagnoses may or may not contain the field latin. You might want to use optional properties in the type definition.

### 9.11: Patientor backend, step4

Create data type Patient and set up a GET-endpoint /api/patients that returns all patients to the frontend excluding field ssn. Use a utility type to make sure you are selecting and returning only the wanted fields.

In this exercise you may assume that field gender has type string.

Try the endpoint with browser and ensure that ssn is not included in the response:

After creating the endpoint, ensure that the frontend shows the list of patients:

### 9.12: Patientor backend, step5

Create a POST-endpoint /api/patients for adding patients. Ensure that you can add patients also from the frontend.

### 9.13: Patientor backend, step6

Set up safe parsing, validation and type guards to the POST /api/patients request.

Refactor the Gender field to use an enum type.
