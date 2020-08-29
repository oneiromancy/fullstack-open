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
