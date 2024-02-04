// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities/");
const regValidate = require("../utilities/inventory-validation");

 
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId),
);

 
router.get(
  "/detail/:inventoryId",
  utilities.handleErrors(invController.buildByModelId),
);

router.get("/", invController.buildManagement);

router.get("/add-classification", invController.BuildAddClassification);

/* ***********************
 *   Add the new Classification
   *************************/
router.post(
  "/add-classification",
  regValidate.classificationRules(),
  regValidate.checkClassificationData,
  utilities.handleErrors(invController.AddNewClassification),
);

/* ***********************
 * Add-Inventory View
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










 
