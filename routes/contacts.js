import express from "express";
import {
  getContacts,
  getContact,
  addContact,
  addContactPage,
  deleteContact,
  updateContact,
  updateContactPage,
} from "../controller/contacts.controller.js";

const router = express.Router();

// Get All Contacts
router.get("/", getContacts);

// Show Contact
router.get("/show-contact/:id", getContact);

// Add Contact Form
router.get("/add-contact", addContactPage);

// Add Contact Post
router.post("/add-contact", addContact);

// Update Contact GET
router.get("/update-contact/:id", updateContactPage);

// Update Contact
router.post("/update-contact/:id", updateContact);

// Delete Contact
router.get("/delete-contact/:id", deleteContact);

export default router;
