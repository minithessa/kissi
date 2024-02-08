// Needed Resources
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const regValidate = require("../utilities/account-validation");
const utilities = require("../utilities")


// Route to build inventory by classification view

router.get("/login", utilities.handleErrors(accountController.buildLogin))
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.accountManagement))
router.get("/register", utilities.handleErrors(accountController.buildRegister))


/* *************************************
 * Process Registration
   ************************************ */
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount),
);









// Process the login attempt
  router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accountController.accountLogin)
  )



module.exports = router
