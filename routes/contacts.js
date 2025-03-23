import express from "express";
import Contact from "../models/contacts.models.js";

const router = express.Router();

// Get All Contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.render("home", { title: "All Contacts", contacts });
  } catch (error) {
    res.status(500).send(error);
  }
});
// Show Contact
router.get("/show-contact/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.render("show-contact", {
      title: "Contact Details",
      contact,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
// Add Contact Form
router.get("/add-contact", (req, res) => {
  res.render("add-contact");
});
// Add Contact Post
router.post("/add-contact", async (req, res) => {
  try {
    const { first_name, last_name, email, phone, street, zipCode, city } =
      req.body;
    const insertResult = await Contact.create({
      first_name,
      last_name,
      email,
      phone,
      address: { street, zipCode, city },
    });
    if (insertResult._id) {
      res.redirect("/");
    } else {
      res.status(500).send(insertResult);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
// Update Contact GET
router.get("/update-contact/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.render("update-contact", { title: "Update Contact", contact });
  } catch (error) {
    res.status(500).send(error);
  }
});
// Update Contact
router.post("/update-contact/:id", async (req, res) => {
  try {
    const { first_name, last_name, email, phone, street, zipCode, city } =
      req.body;
    const updateResult = await Contact.findByIdAndUpdate(req.params.id, {
      first_name,
      last_name,
      email,
      phone,
      address: { street, zipCode, city },
    });
    if (updateResult.__v === 0) {
      res.redirect("/");
    } else {
      res.status(500).send(updateResult);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
// Delete Contact
router.get("/delete-contact/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (contact.__v === 0) {
      res.redirect("/");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
