// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities/");
const regValidate = require("../utilities/inventory-validation");

// Route to build inventory by classification view
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId),
);





app.get('/user/all', function(req, res){
 
});





// Route to build inventory view
router.get(
  "/detail/:inventoryId",
  utilities.handleErrors(invController.buildByModelId),
);

// Route to build management view
router.get("/", invController.buildManagement);

// Route to build add-classification view
router.get("/add-classification", invController.BuildAddClassification);

/* ***********************
 *  Add the new Classification
  *************************/
router.post(
  "/add-classification",
  regValidate.classificationRules(),
  regValidate.checkClassificationData,
  utilities.handleErrors(invController.AddNewClassification),
);

/* ***********************
 *  Add-Inventory View
   *************************/
router.get("/add-inventory", invController.BuildAddInventory);

/* ***********************
 * Add the new Inventory
  *************************/
router.post(
  "/add-inventory",
  regValidate.inventoryRules(),
  regValidate.checkInventoryData,
  utilities.handleErrors(invController.AddNewInventory),
);

module.exports = router;







 
