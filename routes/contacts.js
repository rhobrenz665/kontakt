const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

const auth = require("../middleware/auth");

const contactsControllers = require("../controllers/contacts-controllers");

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get("/", auth, contactsControllers.getContacts);

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post(
  "/",
  [auth, check("name", "Name is required").not().isEmpty()],
  contactsControllers.addContact
);

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  Private
router.put("/:id", auth, contactsControllers.updateContact);

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete("/:id", auth, contactsControllers.deleteContact);

module.exports = router;
