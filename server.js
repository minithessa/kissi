/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
    ******************************************/
/* ***********************
 * Require Statements
 *************************/
const baseController = require("./controllers/baseController")
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
 

/* ***********************
 *  View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

 
/* ***********************
 * Routes
 *************************/
app.use(require("./routes/static"))
app.get("/", baseController.buildHome)

// Inventory routes
 app.use("/inv", require("./routes/inventoryRoute"))

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




























































const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static= require("./routes/static")
const baseController= require("./controllers/baseController")
const inventoryRoute= require("./routes/inventoryRoute")
const utilities= require("./utilities"/)
const pool = require('./database/')

 

/* ***********************
 *  View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")  

 
/* ***********************
 * Routes
 *************************/
app.use(require("./routes/static"))
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
