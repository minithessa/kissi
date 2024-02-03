 
/* ***********************
 * Require Statements
 *************************/
 
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


 

/* ***********************
 *  View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts) 
app.use(require('connect-flash'))
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

 
/* ***********************
 * Routes
 *************************/
app.use(static)
app.get("/", utilities.handleErrors(baseController.buildHome))
app.use("/inv", utilities.handleErrors(inventoryRoute))
 
 


 // Index route
app.get("/",function(req, res){
  res.render("index",{title:"Home"})
})

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
