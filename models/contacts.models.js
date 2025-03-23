import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  phone: { type: Number },
  address: {
    street: { type: String },
    city: { type: String },
    zipCode: { type: Number },
  },
});

const Contact = mongoose.model("contacts", contactSchema);

export default Contact;
