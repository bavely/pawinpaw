// Include the Main React Dependencies
import React from "react";
import ReactDOM from "react-dom";

// Grabs the Routes
import routes from "./config/routes";
// import Registration from "./components/Registration.js"

// Renders the contents according to the route page
// Displays the contents in the div app of index.html
// Note how ReactDOM takes in two parameters (the contents and the location)
ReactDOM.render(routes, document.getElementById("app"));