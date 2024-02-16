const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}


validate.addviewRules = () => {
    return [
        // Inventory Item ID
        body("inv_id")
            .isInt({ min: 1 })
            .withMessage("Invalid inventory Id."),
        body("account_id")
            .isInt({ min: 1 })
            .withMessage("Invalid account Id."),
        body("view_comment")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide a comment."),
      ];
}
validate.checkAddviewData = async (req, res, next) => {
    const { inv_id, account_id, view_comment } = req.params;
    let errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      // Handle validation errors
      return res.status(400).json({ errors: errors.array() });
    }
    next();
}

validate.updateviewRules = () => {
    return [
        // Inventory Item ID
        body("view_id")
            .isInt({ min: 1 })
            .withMessage("Invalid view Id."),
        body("view_comment")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide a comment."),
      ];
}
validate.checkUpdateviewData = async (req, res, next) => {
    const { view_id, view_comment } = req.params;
    let errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      // Handle validation errors
      return res.status(400).json({ errors: errors.array() });
    }
    next();
}

validate.deleteviewRules = () => {
    return [
      // Inventory Item ID
      body("view_id")
        .isInt({ min: 1 })
        .withMessage("Invalid view Id."),
    ];
  };
  
  validate.checkDeleteviewData = async (req, res, next) => {
    const { view_id } = req.params;
    let errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      // Handle validation errors
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };

module.exports = validate
