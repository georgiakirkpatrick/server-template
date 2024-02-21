
## Dependencies
### Node

### Express
Express is a minimalist web framework for Node.js. Web frameworks are tools and software make building applications for the web easier. In this case, Express abstracts away many of the difficulties of working directly with Node.

## Middleware
Middleware is a function that an Express server runs between receiving a request and responding to that request.

Middleware function structure
The structure of a middleware function is:
const middleware = (req, res, next) => { 
  <!-- function body -->
}

Middleware parameters
* The req parameter stands for request. Information and methods related to the incoming request will be stored in this object.
* The res parameter stands for response. This object has information and methods related to sending back a response from the server.
* The next parameter, when called, will tell Express that this middleware function is complete. It will then go on to the next piece of middleware.

The middleware send() method
Middleware can use the send() method that comes on the res object. Calling send() in this way will send back the string to the client.

const sayHello = (req, res, next) => {
  res.send("Hello")

  next()
}

The Express use() method
Attached to your Express application (app) is a method called use(). This method will allow you to attach middleware to the pipeline.

app.use(sayHello)

## Express error handler
Express has a special and slightly odd way of creating an error handler. It is exactly the same as other middleware, except for one feature: it has an extra parameter.

app.use((err, req, res, next) => {
  console.error(err)
  res.send(err)
})

If you try to access this function normally, you may have a hard time. The error-handler middleware only gets called in one of two cases:

1. When there is a problem in the application itself (for example, if you made a mistake in your code).
2. When you specifically trigger it using the next() function in a previous middleware function.




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



<!-- ABOUT THE PROJECT
  This is an important component of your project that many new developers often overlook.

  Your description is an extremely important aspect of your project. A well-crafted description allows you to show off your work to other developers as well as potential employers.

  The quality of a README description often differentiates a good project from a bad project. A good one takes advantage of the opportunity to explain and showcase:

  - What your application does,
  - Why you used the technologies you used,
  - Some of the challenges you faced and features you hope to implement in the future.

  Make sure these questions are answered in the README.  The About section may be the right place to touch on these.
  - What was your motivation?
  - Why did you build this project?
  - What problem does it solve?
  - What did you learn?
  - What makes your project stand out?
  If your project has a lot of features, consider adding a "Features" section and listing them there.
-->

## About the project

[![Product Name Screen Shot][product-screenshot]]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built with

* [![JavaScript][javascript-shield]][javascript-url]
* Node
* [![Express][Expressjs.com]][Express-url]
* Nodemon
* Morgan
* Cors
* Dotenv
* [![PostgreSQL][PostgreSQL-shield]][PostgreSQL-url]
* [![Mocha][Mocha-shield]][Mocha-url]
* [![Chai][Chai-shield]][Chai-url]

Why did I choose these packages?
Express - is the API server
Cors - allows us to make requests from the front end
Morgan - is a logger so we can see incomign requests
Dotenv - allows us to hide our API key from GitHub

Why did I choose these development packages?
Nodemon - is a development server that will automatically refresh the server as we code.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- FEATURES
If your project has a lot of features, consider including this section and list the features here.

-->
## Features

### Feature One

### Feature Two

### Feature Three



<!-- GETTING STARTED 
If you are working on a project that a user needs to install or run locally in a machine, you should include the steps required to install your project and also the required dependencies if any.

Provide a step-by-step description of how to get the development environment set and running.
-->
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



<!-- USAGE EXAMPLES 
Provide instructions and examples so users/contributors can use the project. This will make it easy for them in case they encounter a problem – they will always have a place to reference what is expected.

You can also make use of visual aids by including materials like screenshots to show examples of the running project and also the structure and design principles used in your project.

Also if your project will require authentication like passwords or usernames, this is a good section to include the credentials.
-->

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



<!-- CONTRIBUTING -->
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



<!-- LICENSE 
For most README files, this is usually considered the last part. It lets other developers know what they can and cannot do with your project.

We have different types of licenses depending on the kind of project you are working on. Depending on the one you will choose it will determine the contributions your project gets.

The most common one is the GPL License which allows other to make modification to your code and use it for commercial purposes. If you need help choosing a license,  check out this link: https://choosealicense.com/
-->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

The best way to get in touch with me is to use the contact form on my website: [georgiakirkpatrick.com](https://georgiakirkpatrick.com/#contact)
You can also connect with me on LinkedIn: [Georgia's LinkedIn][linkedin-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS 
If you worked on the project as a team or an organization, list your collaborators/team members. You should also include links to their GitHub profiles and social media too.

Also, if you followed tutorials or referenced a certain material that might help the user to build that particular project, include links to those here as well.

This is just a way to show your appreciation and also to help others get a first hand copy of the project.
-->
## Acknowledgments

* Thanks to Coding Garden for the video tutorial [Build a YouTube API proxy server with Node.js/Express and a filterable list with vanilla JavaScript](https://www.youtube.com/watch?v=Q4RiI7bvpso)
* [How to Write a Good README File for Your GitHub Project](https://www.freecodecamp.org/news/how-to-write-a-good-readme-file/)

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
[html-shield]: https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=fff
[html-url]: https://html.spec.whatwg.org
[css-shield]: https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3
[css-url]: https://www.w3.org/TR/CSS/#css
[javascript-shield]: https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000
[javascript-url]: https://262.ecma-international.org
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[react-router-shield]: https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=fff
[react-router-url]: https://reactrouter.com
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[youtube-shield]: https://img.shields.io/badge/YouTube-ff0000?style=for-the-badge&logo=YouTube
[youtube-api-url]: https://developers.google.com/youtube/v3/docs/search/list
[Expressjs.com]: https://img.shields.io/badge/EXPRESS-000000?style=for-the-badge&logo=express
[Express-url]: https://expressjs.com
[PostgreSQL-shield]: https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org
[font-awesome-shield]: https://img.shields.io/badge/Font%20Awesome-528DD7?style=for-the-badge&logo=font%20awesome&logoColor=fff
[font-awesome-url]: https://fontawesome.com
[Mocha-shield]: https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=mocha&logoColor=white
[Mocha-url]: https://mochajs.org
[Chai-shield]: https://img.shields.io/badge/Chai-A30701?style=for-the-badge&logo=chai
[Chai-url]: https://www.chaijs.com
[jest-shield]: https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest
[jest-url]: https://jestjs.io