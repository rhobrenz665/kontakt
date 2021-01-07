const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

const usersControllers = require("../controllers/users-controllers");

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  "/",
  [
    check("name", "Please add name").not().isEmpty(),
    check("email", "Please inclode a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters,"
    ).isLength({ mind: 6 }),
  ],
  usersControllers.signup
);

module.exports = router;
