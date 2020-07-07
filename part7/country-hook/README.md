### 7.7: country hook

Let's return to the exercises 2.12-14.

Use the code from https://github.com/fullstack-hy2020/country-hook as your starting point.

The application can be used to search for country details from the https://restcountries.eu/ interface. If country is found, the details of the country are displayed

If country is not found, message is displayed to the user

The application is otherwise complete, but in this exercise you have to implement a custom hook useCountry, which can be used to search for the details of the country given to the hook as a parameter.

Use the api endpoint full name to fetch country details in a useEffect-hook within your custom hook.

Note, that in this exercise it is essential to use useEffect's second parameter array to control when the effect function is executed.
