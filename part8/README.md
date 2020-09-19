## 8.1: The number of books and authors

Implement queries bookCount and authorCount which return the number of books and the number of authors.

The query

```
query {
  bookCount
  authorCount
}
```

should return

```
{
  "data": {
    "bookCount": 7,
    "authorCount": 5
  }
}
```

## 8.2: All books

Implement query allBooks, which returns the details of all books.

In the end, the user should be able to do the following query:

```
query {
  allBooks {
    title
    author
    published
    genres
  }
}
```

## 8.3: All authors

Implement query allAuthors, which returns the details of all authors. The response should include a field bookCount containing the number of books the author has written.

For example the query

```
query {
  allAuthors {
    name
    bookCount
  }
}
```

should return

```
{
  "data": {
    "allAuthors": [
      {
        "name": "Robert Martin",
        "bookCount": 2
      },
      {
        "name": "Martin Fowler",
        "bookCount": 1
      },
      {
        "name": "Fyodor Dostoevsky",
        "bookCount": 2
      },
      {
        "name": "Joshua Kerievsky",
        "bookCount": 1
      },
      {
        "name": "Sandi Metz",
        "bookCount": 1
      }
    ]
  }
}
```

## 8.4: Books of an author

Modify the allBooks query so, that a user can give an optional parameter author. The response should include only books written by that author.

For example query

```
query {
  allBooks(author: "Robert Martin") {
    title
  }
}
```

should return

```
{
  "data": {
    "allBooks": [
      {
        "title": "Clean Code"
      },
      {
        "title": "Agile software development"
      }
    ]
  }
}
```

## 8.5: Books by genre

Modify the query allBooks so that a user can give an optional parameter genre. The response should include only books of that genre.

For example query

```
query {
  allBooks(genre: "refactoring") {
    title
    author
  }
}
```

should return

```
{
  "data": {
    "allBooks": [
      {
        "title": "Clean Code",
        "author": "Robert Martin"
      },
      {
        "title": "Refactoring, edition 2",
        "author": "Martin Fowler"
      },
      {
        "title": "Refactoring to patterns",
        "author": "Joshua Kerievsky"
      },
      {
        "title": "Practical Object-Oriented Design, An Agile Primer Using Ruby",
        "author": "Sandi Metz"
      }
    ]
  }
}
```

The query must work when both optional parameters are given:

```
query {
  allBooks(author: "Robert Martin", genre: "refactoring") {
    title
    author
  }
}
```

## 8.6: Adding a book

Implement mutation addBook, which can be used like this:

```
mutation {
  addBook(
    title: "NoSQL Distilled",
    author: "Martin Fowler",
    published: 2012,
    genres: ["database", "nosql"]
  ) {
    title,
    author
  }
}
```

The mutation works even if the author is not already saved to the server:

```
mutation {
  addBook(
    title: "Pimeyden tango",
    author: "Reijo Mäki",
    published: 1997,
    genres: ["crime"]
  ) {
    title,
    author
  }
}
```

If the author is not yet saved to the server, a new author is added to the system. The birth years of authors are not saved to the server yet, so the query

```
query {
  allAuthors {
    name
    born
    bookCount
  }
}
```

returns

```
{
  "data": {
    "allAuthors": [
      // ...
      {
        "name": "Reijo Mäki",
        "born": null,
        "bookCount": 1
      }
    ]
  }
}
```

## 8.7: Updating the birth year of an author

Implement mutation editAuthor, which can be used to set a birth year for an author. The mutation is used like so

```
mutation {
  editAuthor(name: "Reijo Mäki", setBornTo: 1958) {
    name
    born
  }
}
```

If the correct author is found, the operation returns the edited author:

```
{
  "data": {
    "editAuthor": {
      "name": "Reijo Mäki",
      "born": 1958
    }
  }
}
```

If the author is not in the system, null is returned:

```
{
  "data": {
    "editAuthor": null
  }
}
```

## 8.17 Listing books

After the backend changes the list of books does not work anymore. Fix it.

## 8.18 Log in

Adding new books and changing the birth year of an author do not work because they require user to be logged in.

Implement login functionality and fix the mutations.

It is not necessary yet to handle validation errors.

You can decide how the log in looks on the user interface. One possible solution is to make the login form into a separate view which can be accessed through a navigation menu:

When a user is logged in, the navigation changes to show the functionalities which can only be done by a logged in user:

## 8.19 Books by genre, part 1

Complete your application to filter the book list by genre. Your solution might look something like this:

In this exercise the filtering can be done using just React.

## 8.20 Books by genre, part 2

Implement a view which shows all the books based on the logged in user's favourite genre.

## 8.21 books by genre with GraphQL

In the previous exercise 8.20, the filtering could have been done using just React. To complete this exercise, you should filter the books in the recommendations page using a GraphQL query to the server. The query created in exercise 8.5 could be useful here.

This and the next exercises are quite challenging like it should be this late in the course. You might want to complete first the easier ones in next part.

Some tips

Instead of using useQuery it is propably better to do the queries with the useLazyQuery-hook
It is sometimes useful to save the results of a GraphQL query to the state of a component.
Note, that you can do GraphQL queries in a useEffect-hook.
The second parameter of a useEffect - hook can become handy depending on your approach.

## 8.22 Up to date cache and book recommendations

If you fetch the book recommendations with GraphQL, ensure somehow that the books view is kept up to date. So when a new book is added, the books view is updated at least when a genre selection button is pressed.

When new genre selection is not done, the view does not have to be updated.
