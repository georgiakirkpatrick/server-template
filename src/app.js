// The app.js file is where you will configure your Express application.

// Require the Express package and assign it to a variable.
const express = require("express")

// Require the morgan package and assign it to a variable.
const morgan = require("morgan")

// The Express package exports a function. 
// When you invoke that function, you get a new Express application and assign it to a variable.
const app = express()



const sayHello = (req, res, next) => {
  console.log("hi")
  res.send("Hello")

  next()
}

app.use(morgan("dev"))
app.use(sayHello)
// Export the Express application to be used in the server.js file.
module.exports = app