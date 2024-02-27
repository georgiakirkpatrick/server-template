// The app.js file is where you will configure your Express application.

// Require the Express package and assign it to a variable.
const express = require("express")

// The Express package exports a function. 
// When you invoke that function, you get a new Express application and assign it to a variable.
const app = express()

// The express.json() function is a built-in middleware that adds a body property to the request (req.body). 
// The req.body request will contain the parsed data—or it will return an empty object ({}) if there was no body to parse, the Content-Type wasn't matched, or an error occurred.
// This middleware must come before any handlers that will make use of the JSON in the body of the request.
app.use(express.json())

// The morgan package is a small logging package that will print useful information to your terminal window on each request.
// Require the morgan package and assign it to a variable.
const morgan = require("morgan")

// A middleware function is a function that an Express server runs between receiving a request and responding to that request.
// Declare a middleware function.
const fetchContent = (req, res, next) => {
  const name = req.query.name
  const content = name ? `The name is ${name}` : "Please enter a name as a query parameter in the URL, like this: 'localhost:4999/route?name=Example"
  res.send(content)

  next()
}

// Attached to your Express application (app) is a method called use(). This method will allow you to attach middleware to the pipeline.
app.use(morgan("dev"))

// The following code will call the handler "fetchContent" if the request URL route is "route" and the HTTP method of the incoming request is GET.
app.get("/route", fetchContent)

// You will notice that the only difference in the below middleware is that the first parameter is err. The names of the parameters do not matter; instead, Express is looking for whether or not there are four parameters.
// If you try to access this function normally, you may have a hard time. The error-handler middleware only gets called in one of two cases:
// When there is a problem in the application itself (for example, if you made a mistake in your code).
// When you specifically trigger it using the next() function in a previous middleware function.
// No matter where you put this error handler, it will not be triggered unless one of the above conditions arises. Express does this so that you have a tool dedicated to handling issues that may arise.
// Always include an Express error handler function below the middleware that will catch any not-found routes.
app.use((req, res, next) => {
  res.send(`The route ${req.path} does not exist!`);
})

// Export the Express application to be used in the server.js file.
module.exports = app