const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  req.flash("notice", "This is a flash message.")
  res.render("index", {title: "Home", nav})
}

// Error link in footer
baseController.buildError = async function(req, res){
  res.render("./views/errors/error", {title: "Error", nav})
}

module.exports = baseController
