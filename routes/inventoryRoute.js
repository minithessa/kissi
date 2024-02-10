// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const regValidate = require("../utilities/inventory-validation")
const utilities = require("../utilities/")


// Route to build inventory by classification view
router.get("/type/:classificationId",utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByModelId));
router.get("/", utilities.handleErrors(invController.buildManagement));
router.get("/addVehicle", utilities.handleErrors(invController.buildAddVehicle));
router.get("/add-classification", utilities.handleErrors(invController.BuildAddClassification));
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))
router.get("/edit/:invId", utilities.handleErrors(invController.buildEditInventory))
router.get("/delete/:invId", utilities.handleErrors(invController.buildDeleteInventory))

/* ***********************
 *  Add the new Classification
  *************************/
router.post(
  "/add-classification",
  regValidate.addclassificationRules(),
  regValidate.checkClassificationData,
 utilities.handleErrors(invController.addClassification),
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
  regValidate.addInventoryRules(),
  regValidate.checkInventoryData,
  utilities.handleErrors(invController.AddNewInventory),
);


router.post(
    "/update", 
    invValidate.addIventoryRules(),
    invValidate.checkUpdateInventoryData,
    utilities.handleErrors(invController.updateInventory)
)

router.post(
    "/delete",
    utilities.handleErrors(invController.deleteInventory)
)

module.exports = router;







 
