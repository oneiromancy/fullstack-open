# Bloglist Project

### 5.1: bloglist frontend, step1

Implement login functionality to the frontend. The token returned with a successful login is saved to the application's state user.

If a user is not logged-in, only the login form is visible.

If user is logged-in, the name of the user and a list of blogs is shown.

User details of the logged-in user do not have to be saved to the local storage yet.

NB You can implement the conditional rendering of the login form like this for example:

```
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form>
          //...
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}
```

### 5.2: bloglist frontend, step2

Make the login 'permanent' by using the local storage. Also implement a way to log out.

Ensure the browser does not remember the details of the user after logging out.

### 5.3: bloglist frontend, step3

Expand your application to allow a logged-in user to add new blogs:

### 5.4\*: bloglist frontend, step4

Implement notifications which inform the user about successful and unsuccessful operations at the top of the page. For example, when a new blog is added, the following notification can be shown:

The notifications must be visible for a few seconds. It is not compulsory to add colors.
