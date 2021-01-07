const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { check } = require("express-validator");

const authControllers = require("../controllers/auth-controllers");

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get("/", auth, authControllers.getUser);

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Private
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  authControllers.login
);

module.exports = router;
