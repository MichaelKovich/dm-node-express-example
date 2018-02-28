// yarn init -y
// yarn add express
// yarn add body-parser cors
// touch .gitignore // node_modules // 'Don't add node_modules to GitHub.'

// REQUIRE DEPENDENCIES (NODE MODULES)
// Node does not support the import syntax.
const express = require('express'); // Require Express
const bodyParser = require('body-parser'); // Require Body-Parser
// const {json} = require('body-parser'); // Destructuring
const cors = require('cors'); // Require Cors
// Absolute Imports ^

const carsControl = require(`${__dirname}/controllers/carsControl`);
// ${__dirname} is the current directory and it ensures we get the right path on any machine.

// DECLARE PORT
const port = 3001; // 3000 and 3001 are considered testing ports.
// 3002 through 3999 are all options.

// APP DECLARATION (FUNCTIONALITY FOR SERVER)
const app = express();
// Functionality is Express, interpretation is Node.

// MIDDLEWARE
app.use(cors());
// Cross-Origin Resource Sharing // A really basic security protocol.
app.use(bodyParser.json()); // Could use json() instead if we destructured above.
// .json is how we'll strip data off of put and post requests.
// ^ No need for next() on these, they already have them built-in. Next is only needed on custom middleware.
app.use((req, res, next) => {
  console.log('HIT ON EACH REQUEST');
  console.log(`REQ.BODY: ${req.body}`);
  next(); // Go to the next function in the chain. In this case, "you're done here, go match an endpoint."
}); // Every request to our server will hit app.use(), regardless of request type.
// Top-Level Middleware // CB gets access to req, res, and next because it's chained onto app.use

// ENDPOINTS
app.get(('/api/cars'), carsControl.getCars); 
// ^ Send a response with a status code equal to 200 // .json will convert the data that follows to a JSON object.
// Endpoints are made up of a method (.get), a path (/api/test), and a handler (what we'll do when a request comes in that matches the endpoint)
// The entire callback function is the handler.
app.post(('/api/cars'), carsControl.addCar);
app.put(('/api/cars/:id'), carsControl.updateCar);
// :id creates req.params which allows the user to pass some parameter with a request
app.delete(('/api/cars/:id'), carsControl.deleteCar);

// Specificity Matters:
// app.put("/api/car/:id") 
// app.put("/api/car")
// If reversed, the second would be matched first.
// Most specific go first.

// LISTENING FOR REQUESTS TO COME IN TO THE SERVER
app.listen((port), (() => {
  console.log(`Listening on PORT: ${port}`);
})); // Utilizing Express's listen method which intakes two arguments: port and a callback function.