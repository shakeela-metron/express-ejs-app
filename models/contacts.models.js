// Database collection schema
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const contactSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  phone: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    zipCode: { type: Number },
  },
});

contactSchema.plugin(mongoosePaginate);

const Contact = mongoose.model("contacts", contactSchema);

export default Contact;
