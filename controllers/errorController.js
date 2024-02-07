//const invModel = require("../models/error-model")
//const utilities = require("../utilities/")

const errorCont = {}

/* ***************************
 *  Break  
 * ************************** */
errorCont.borkenIt = async function (req, res, next) {
  const value = await utilities.makeItBorkened;
}

module.exports = errorCont
