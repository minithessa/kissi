const express = require("express")
const router = new express.Router() 
const viewController = require("../controllers/viewController")
const validate = require('../utilities/view-validation')
const utilities = require("../utilities")

router.get("/update/:viewId", utilities.checkLogin,  utilities.handleErrors(viewController.buildviewUpdate));
router.get("/delete/:viewId", utilities.checkLogin,  utilities.handleErrors(viewController.buildviewDelete));

router.post(
    "/add/",
    utilities.checkLogin,
    validate.addviewRules(),
    validate.checkAddviewData,
    utilities.handleErrors(viewController.addview)
)

router.post(
    "/update",
    utilities.checkLogin,
    validate.updateviewRules(),
    validate.checkUpdateviewData,
    utilities.handleErrors(viewController.updateview)
)
router.post(
    "/delete",
    utilities.checkLogin, 
    validate.deleteviewRules(),
    validate.checkDeleteviewData,
    utilities.handleErrors(viewController.deleteview)
)

module.exports =  router
