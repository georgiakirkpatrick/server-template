// The server.js file is where you will run your Express application.
// The following code, when run, will allow your server to "listen" on the specified port.

// With destructuring and default arguments, set the variable PORT to be equal to whatever value is found inside of process.env or default to 5000.
const { PORT = 5000 } = process.env

// You require the Express application that you exported.
const app = require("./app")

// This function will run when the server successfully starts.
const listener = () => console.log(`Listening on Port ${PORT}!`)

// This function will run when the server successfully starts.
app.listen(PORT, listener)