const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()  
const static= require("./routes/static")
const baseController= require("./controllers/baseController")
const inventoryRoute= require("./routes/inventoryRoute")
const utilities= require("./utilities/")
const session = require("express-session")
const pool = require('./database/')
const bodyParser = require("body-parser")

const accountRoute = require("./routes/accountRoute")




/* ***********************
 *  View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts) 
app.use(require('connect-flash')())
app.set("layout", "./layouts/layout")  


/* ***********************
 * Middleware
 * ************************/
app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//  Process Registration 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


/* ***********************
 * Routes
 *************************/
app.use(static)
app.get("/", utilities.handleErrors(baseController.buildHome))
// Inventory routes
app.use("/inv", inventoryRoute)
app.get("/error", utilities.handleErrors(baseController.buildError))
app.use("/account", require("./routes/accountRoute"))





app.use("/account",utilities.handleErrors(accountRoute))
app.use("/inv",utilities.handleErrors(inventoryRoute))
app.use("/error",utilities.handleErrors(errorRoute))


// Index route
app.get("/",function(req, res){
  res.render("index",{title:"Home"})
})

app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page." });
});

app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav();
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  if (err.status == 404) {
    message = err.message;
  }
  if (err.status == 500) {
    message = err.message;
  } else {
    message = "There was a crash. Maybe try different route?";
  }
  res.render("errors/error", {
    title: err.status || "Server Error",
    message,
    nav,
  });
});

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
