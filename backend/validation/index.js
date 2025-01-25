const { check, validationResult } = require('express-validator');

const userCheck = [
  // **Validation for Individuals**

  // Full Name Validation (for Individual)
  check('fullName', "Full name is required")
    .if((value, { req }) => req.body.role === 'Individual') // Only validate for Individual role
    .notEmpty()
    .isLength({ min: 3 }).withMessage("Full name must be at least 3 characters"),

  // Email Validation
  check('email', "Email is required")
    .notEmpty()
    .isEmail().withMessage("Email format is incorrect"),

  // Password Validation
  check('password', "Password is required")
    .notEmpty()
    .matches('[a-z]').withMessage("Password must consist of at least 1 lowercase letter")
    .matches('[A-Z]').withMessage("Password must consist of at least 1 uppercase letter")
    .matches('[0-9]').withMessage("Password must consist of at least 1 number")
    .matches('[+@!#$%]').withMessage("Password must consist of at least 1 special character")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .isLength({ max: 20 }).withMessage("Password must not exceed 20 characters")
    .not().isIn(['P@ssW0rd']).withMessage("Cannot use this password"),

  // Address Validation (for Individual)
  check('address', "Address is required")
    .if((value, { req }) => req.body.role === 'Individual')
    .notEmpty()
    .isLength({ min: 5 }).withMessage("Address must be at least 5 characters"),

  // Phone Number Validation (for Individual)
  check('phone', "Phone number is required")
    .if((value, { req }) => req.body.role === 'Individual')
    .notEmpty()
    .matches(/^\d{10}$/).withMessage("Phone number must be 10 digits"),

  // **Validation for Organizations**

  // Organization Name Validation (for Organization)
  check('orgName', "Organization name is required")
    .if((value, { req }) => req.body.role === 'Organization')
    .notEmpty()
    .isLength({ min: 3 }).withMessage("Organization name must be at least 3 characters"),

  // License Number Validation (for Organization)
  check('licenseNumber', "License number is required")
    .if((value, { req }) => req.body.role === 'Organization')
    .notEmpty().withMessage("License number is required for Organization")
    .matches(/^[A-Za-z0-9-]{5,20}$/).withMessage("License number must be 5-20 alphanumeric characters and may include dashes"),

  // **Role Validation**
  check('role', "Role is required")
    .notEmpty()
    .isIn(['Individual', 'Organization', 'Admin']).withMessage("Role must be Individual, Organization, or Admin")
];

const validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Format errors into an object where the key is the field name and the value is the error message
    const formattedErrors = errors.array().reduce((acc, error) => {
      acc[error.path] = error.msg; // Use the field name as the key
      return acc;
    }, {});

    return res.status(400).json({ errors: formattedErrors });
  }
  next();
};

module.exports = { userCheck, validation };