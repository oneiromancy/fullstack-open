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

### 9.16: patientor, step1

Create an endpoint /api/patients/:id that returns all of the patient information for one patient, including the array of patient entries that is still empty for all the patients. For the time being, expand the backend types as follows:

```
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >
```

### 9.17: patientor, step2

Create a page for showing a patient's full information in the frontend.

User should be able to access a patient's information e.g by clicking the patient's name.

Fetch the data from the enpoint created in the previous exercise. After fetching the patient information from the backend, add the fetched information to the application's state. Do not fetch the information if it already is in the app state, i.e. if the user is visiting the same patient's information many times.

Since we now have the state in the context, you'll need to define a new action type for updating an individual patient's data.

The Application uses Semantic UI React for styling, which is quite similar to React Bootstrap and MaterialUI that we covered in part 7. You may also use it for the new components but that is up to you since our main focus now is Typescript.

The Application also uses react router to control which view is visible in the frontend. You might want to have a look at part 7 if you don't yet have a grasp on how the router works.

Note that in order to access the id in the url, you need to give useParams a proper type argument:

```
const { id } = useParams<{ id: string }>();
```

### 9.18: patientor, step3

Currently we create the action objects wherever we dispatch the actions, e.g. component App has the following:

```
dispatch({
  type: "SET_PATIENT_LIST", payload: patientListFromApi
});
```

Refactor the code to use action creator functions that are all defined in the file reducer.tsx.

For example the App changes like this

```
import { useStateValue, setPatientList } from "./state";

// ...

dispatch(setPatientList(patientListFromApi));
```
