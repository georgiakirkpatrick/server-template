<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<br />
<div align="center">
  <a href="https://github.com/georgiakirkpatrick/server-template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>


  <h3 align="center">Server Template</h3>


  <p align="center">
    This is a simple Node.js-Express server template created by Georgia Kirkpatrick.
    <br />
    <a href="https://github.com/georgiakirkpatrick/server-template/wiki"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://georgiakirkpatrick.github.io/server-template">View Demo</a>
    ·
    <a href="https://github.com/georgiakirkpatrick/server-template/issues">Report Bug</a>
    ·
    <a href="https://github.com/georgiakirkpatrick/server-template/issues">Request Feature</a>
  </p>
</div>



<details>
  <summary>Table of contents</summary>
  <ol>
    <li><a href="#about-the-project">About the project</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#getting-started">Getting started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



## About the project

[![Product Name Screen Shot][product-screenshot]]

This is a server template.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built with

* [![JavaScript][javascript-shield]][javascript-url]
* [![Node][node-shield]][node-url]
* [![Express][Expressjs.com]][Express-url]
* [![Cors][cors-shield]][cors-url]
* [![Morgan][morgan-shield]][morgan-url]
* [![Dotenv][dotenv-shield]][dotenv-url]
* [![PostgreSQL][PostgreSQL-shield]][PostgreSQL-url]
* [![Nodemon][nodemon-shield]][nodemon-url]
* [![Jest][jest-shield]][jest-url]
* [![Supertest][supertest-shield]][supertest-url]

#### Javascript
<!-- Why did I use this?
Explain how it is used in the Server Template. -->

#### Node.js
<!-- Why did I use this?-->
**Use the process.env global variable to set the PORT variable equal to 5000 in server.js.**  The process.env global variable is created by Node.js.  It returns an object containing the user environment.  Click [here](https://nodejs.org/docs/latest/api/process.html#processenv) for more about process.env.
```
const { PORT = 5000 } = process.env
```

#### Express
Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
In Server Template, Express represents the API server.

Here is how we set up Express in app.js:
1. **Require Express and asign it to the variable "express" in app.js.** 
  ```  
  const express = require("express")
  ```  
2. **Create an Express application in app.js.** The express() function is a top-level function exported by the express module.  We assign the application to the variable "app".  Click [here](https://expressjs.com/en/5x/api.html#express) for more on the "express()" method.
  ```  
  const app = express()  
  ```  
3. **Use the "app.use()" and "express.json()" methods  in app.js to tell the app to parse incoming requests with JSON.**  
Click [here](https://expressjs.com/en/5x/api.html#app.use) for more on the "app.use()" method.  Click [here](https://expressjs.com/en/5x/api.html#express.json) for more on the "express.json()" method.  Click [here](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON) for more about JSON.
```  
app.use(express.json)
```
4. **Create an Express error handler in app.js.**  The error-handler middleware only gets called in one of two cases: when there is a problem in the application itself (for example, there is a mistake in application's code) **or** when the next() function specifically triggers the error handler from a previous middleware function.
```  
app.use((err, req, res, next) => {
  console.error(err)
  res.send(err)
})
```
5. **Listen for connections on the specified host and port with app.listen() in server.js.**  This function will run when the server starts.  Click [here](https://expressjs.com/en/5x/api.html#app.listen) for more about the app.listen() method.
```
app.listen(PORT, listener)
```
6. **Route HTTP GET requests to the specified path with app.get().**  Click [here](https://expressjs.com/en/5x/api.html#app.get.method) for more about the app.get() method.
```
app.get("/route", fetchContent)
```

#### Cors
Allows us to make requests from the frontend.
<!-- Explain how it is used in the Server Template. -->

#### Morgan
A logger that allows us to see incoming requests.
<!-- Explain how it is used in the Server Template. -->

#### Dotenv
Allows us to hide our API key from GitHub
<!-- Explain how it is used in the Server Template. -->

#### Nodemon
A development server that will automatically refresh the server as we code.
<!-- Explain how it is used in the Server Template. -->

#### Jest
<!-- Why did I use this?
Explain how it is used in the Server Template. -->

#### Supertest
<!-- Why did I use this?
Explain how it is used in the Server Template. -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Features

### Middleware
Middleware is a function that an Express server runs between receiving a request and responding to that request.

Middleware function structure
The structure of a middleware function is:
```
const middleware = (req, res, next) => { 
  <!-- function body -->
}
```

#### Middleware parameters
* The req parameter stands for request. Information and methods related to the incoming request will be stored in this object.
* The res parameter stands for response. This object has information and methods related to sending back a response from the server.
* The next parameter, when called, will tell Express that this middleware function is complete. It will then go on to the next piece of middleware.

#### The middleware send() method
Middleware can use the send() method that comes on the res object. Calling send() in this way will send back the string to the client.

const sayHello = (req, res, next) => {
  res.send("Hello")

  next()
}

### Express methods
* **use** - app.use() - this method will allow you to attach middleware to the pipeline.
  
ROUTES - Routes are middleware except they will only respond when the request URL matches the route.
* **delete** - app.delete()
* **get** - app.get()
  ```
  app.get("/route", (req, res) => {
    res.send("OK");
  })
  ```
* **post** - app.post()
* **put** - app.put()

### Data and Database folders
To create a server with a basic text-storage API (also known as a pastebin API) that allows users to store code snippets and plain text to share with others, build in the "src/data/" directory and delete the "src/db/"directory.

To create a server with a database, ... and delete the "src/data/" directory.

### Feature Three
Error handler in app.js
// You will notice that the only difference in the below middleware is that the first parameter is err. The names of the parameters do not matter; instead, Express is looking for whether or not there are four parameters.
// If you try to access this function normally, you may have a hard time. The error-handler middleware only gets called in one of two cases:
// When there is a problem in the application itself (for example, if you made a mistake in your code).
// When you specifically trigger it using the next() function in a previous middleware function.
// No matter where you put this error handler, it will not be triggered unless one of the above conditions arises. Express does this so that you have a tool dedicated to handling issues that may arise.
// Always include an Express error handler function below the middleware that will catch any not-found routes.
app.use((req, res, next) => {
  res.send(`The route ${req.path} does not exist!`);
})

### Testing with Jest and SuperTest
Jest refresher

Keep in mind that Jest includes the following functions to help you write tests:

describe(), which groups together a set of related tests
test() (or it()), which describes an individual test case and is typically nested inside of the describe() function
The expect object, which provides access to matchers (like toBe() and toEqual()) that allow you to check whether some part of your code has produced an expected outcome

beforeEach
afterEach
before
afterstart



## Getting started

Follow these steps to get a local copy of Server Template up and running.

### Prerequisites

You will need to have [Node](https://nodejs.org/en) and [Git](https://git-scm.com) installed.

Update [Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com/about) to their latest versions if you have not already.  For information about current versions of Node.js and npm, see the [Node Release Schedule](https://nodejs.org/en/about/previous-releases).  For information about the latest release of Git, check [Git Downloads](https://git-scm.com/downloads).
* To see if you already have Node.js, npm, and Git installed and check your installed versions, run the following commands:
  ```
  node -v && npm -v && git -v
  ```

* Install or update Node.js if needed at [Node.js Downloads](https://nodejs.org/en/download/).  The Node.js installer automatically installs or updates npm as well.

* If your version of Node.js is current but npm needs to be updated, install the most recent stable version of npm by running the following command:
  ```
  npm install npm@latest -g
  ```

* Install or update Git if needed at [Git Downloads](https://git-scm.com/downloads).

### Installation

1. In the command line, navigate to the directory where you would like to copy Server Template.
2. Clone the server-template repository.
```
git clone https://github.com/georgiakirkpatrick/server-template.git
```
3. Navigate to the server-template directory and initialize Node.  This step will create a package.json in  your project directory.
```
cd server-template && npm init -y
```
The "-y" flag in the above code accepts all the default options ```npm init``` would otherwise prompt you to choose.
4. Install Server Template's npm packages.
```
npm install
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

### The src folder
The src folder holds the source code for your server. Code directly related to running the server will go here.

### The app.js file
The app.js file is where you will configure your Express application.

### The server.js file
The server.js file is where you will run your Express application.

### The package.json file
screenshot of the package.json file here
A list of scripts in the package.json file:
* ```"start": "node src/server.js"```

### Starting and stopping the server
To start the server: in the command line, navigate to your local copy of the Server Template directory.  Run ```npm start```.
To stop the server: in the window of the command line where your server is running, type "

_For more examples, please refer to the [Documentation](https://github.com/georgiakirkpatrick/server-template/wiki)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Contributing

Server Template is an open souce project.  Any contributions you make to this project are **greatly appreciated**.

If you have a suggestion about how to make Server Template better, please open an issue with the tag "enhancement". You can also fork the repo and create a pull request by following the steps below.

Don't forget to give this project a star!  Thank you!

### Fork the repository

Some of the instructions below use GitHub command line interface (CLI).  You may learn more about GitHub CLI and install at "[GitHub CLI quickstart](https://docs.github.com/en/github-cli/github-cli/quickstart)".

1. Fork the project and configure Git to sync your fork with the upstream repository.  When prompted, type "y" and "return" (or "enter") to clone the server-template files to your computer.
```
gh repo fork https://github.com/georgiakirkpatrick/server-template --remote=true
```
2. Navigate into the server-template directory.  
```
cd server-template
```
3. Create a new branch to build your proposed feature and switch to your new branch.  Replace "new_feature" with the name of your feature.
```
git checkout -b feature/new_feature
```
4. Build your new feature.
5. Commit your changes.  Replace "commit_message" with an informative description of your changes.
 ```
 git commit -m 'commit_message'
 ```
6. Push to your branch.  Again, replace "new_feature" with the name of your feature.
```
git push origin feature/new_feature
```
7. Open a pull request.  Consider using pull request flags described in "[Creating a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request#creating-the-pull-request)".
```
gh pr create
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Contact

The best way to get in touch with me is to use the contact form on my website: [georgiakirkpatrick.com](https://georgiakirkpatrick.com/#contact)
You can also connect with me on LinkedIn: [Georgia's LinkedIn][linkedin-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Acknowledgments

* Thanks to Coding Garden for the video tutorial [Build a YouTube API proxy server with Node.js/Express and a filterable list with vanilla JavaScript](https://www.youtube.com/watch?v=Q4RiI7bvpso)
* Robust Server Structure 2.3 RESTful APIs
* API Design Guide https://apiguide.readthedocs.io/en/latest/build_and_publish/use_RESTful_urls.html#:~:text=Under%20REST%20principles%2C%20a%20URL%20identifies%20a%20resource.&text=URLs%20should%20include%20nouns%2C%20not,consistency%20(no%20singular%20nouns).
* JSON:API https://jsonapi.org

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/georgiakirkpatrick/server-template.svg?style=for-the-badge
[contributors-url]: https://github.com/georgiakirkpatrick/server-template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/georgiakirkpatrick/server-template.svg?style=for-the-badge
[forks-url]: https://github.com/georgiakirkpatrick/server-template/network/members
[stars-shield]: https://img.shields.io/github/stars/georgiakirkpatrick/server-template.svg?style=for-the-badge
[stars-url]: https://github.com/georgiakirkpatrick/server-template/stargazers
[issues-shield]: https://img.shields.io/github/issues/georgiakirkpatrick/server-template.svg?style=for-the-badge
[issues-url]: https://github.com/georgiakirkpatrick/server-template/issues
[license-shield]: https://img.shields.io/github/license/georgiakirkpatrick/server-template.svg?style=for-the-badge
[license-url]: https://github.com/georgiakirkpatrick/server-template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/georgia-kirkpatrick
[product-screenshot]: images/screenshot.png

<!-- BUILT WITH BADGES AND LINKS -->
[javascript-shield]: https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000
[javascript-url]: https://262.ecma-international.org
[node-shield]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=fff
[node-url]: https://nodejs.org/en/about/resources/
[Expressjs.com]: https://img.shields.io/badge/EXPRESS-000000?style=for-the-badge&logo=express
[Express-url]: https://expressjs.com
[cors-shield]: https://img.shields.io/badge/cors-181717?style=for-the-badge&logo=github
[cors-url]: https://github.com/expressjs/cors#readme
[morgan-shield]: https://img.shields.io/badge/morgan-181717?style=for-the-badge&logo=github
[morgan-url]: https://github.com/expressjs/morgan#readme
[dotenv-shield]: https://img.shields.io/badge/dotenv-181717?style=for-the-badge&logo=github
[dotenv-url]: https://github.com/motdotla/dotenv#readme
[PostgreSQL-shield]: https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org
[nodemon-shield]: https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=fff
[nodemon-url]: https://nodemon.io
[supertest-shield]: https://img.shields.io/badge/supertest-181717?style=for-the-badge&logo=github
[supertest-url]: https://github.com/ladjs/supertest#readme
[jest-shield]: https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest
[jest-url]: https://jestjs.io