import mongoose from "mongoose";
import Contact from "../models/contacts.models.js";

export const getContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 4 } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    const result = await Contact.paginate({}, options);
    res.render("home", {
      title: "All Contacts",
      contacts: result.docs,
      totalDocs: result.totalDocs,
      limit: result.limit,
      totalPages: result.totalPages,
      currentPage: result.page,
      counter: result.pagingCounter,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
    });
  } catch (error) {
    res.render("500", { message: error });
  }
};

export const getContact = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.render("404", { message: "Invalid ID" });
    }
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.render("404", { message: "Contact not found." });
    }
    res.render("show-contact", {
      title: "Contact Details",
      contact,
    });
  } catch (error) {
    res.render("500", { message: error });
  }
};

export const addContactPage = (req, res, next) => {
  res.render("add-contact");
};

export const addContact = async (req, res, next) => {
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
    res.render("500", { message: error });
  }
};

export const updateContactPage = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.render("404", { message: "Invalid ID" });
    }
    const contact = await Contact.findById(req.params.id);
    res.render("update-contact", { title: "Update Contact", contact });
  } catch (error) {
    res.render("500", { message: error });
  }
};

export const updateContact = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.render("404", { message: "Invalid ID" });
    }
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
    res.render("500", { message: error });
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.render("404", { message: "Invalid ID" });
    }
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (contact.__v === 0) {
      res.redirect("/");
    }
  } catch (error) {
    res.render("500", { message: error });
  }
};
