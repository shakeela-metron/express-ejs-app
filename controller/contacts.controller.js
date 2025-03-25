import Contact from "../models/contacts.models.js";

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.render("home", { title: "All Contacts", contacts });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.render("show-contact", {
      title: "Contact Details",
      contact,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const addContactPage = (req, res) => {
  res.render("add-contact");
};

export const addContact = async (req, res) => {
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
};

export const updateContactPage = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.render("update-contact", { title: "Update Contact", contact });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateContact = async (req, res) => {
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
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (contact.__v === 0) {
      res.redirect("/");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
