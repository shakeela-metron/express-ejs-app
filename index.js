import express from "express";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 5000;
const hostname = "127.0.0.1";
const mongoURI = process.env.MONGO_URI;

// Middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// MongoDB Connections
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error while connecting to MongoDB", err);
  });

const contactSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: Number,
  address: {
    street: String,
    city: String,
    zipCode: Number,
  },
});

const Contact = mongoose.model("contacts", contactSchema);

//Routes
app.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.render("home", { title: "All Contacts", items: contacts });
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/show-contact/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contact.find({ _id: id });
    res.render("show-contact", {
      title: "Contact Details",
      item: contact[0],
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/add-contact", (req, res) => {
  res.render("add-contact");
});
app.post("/add-contact", async (req, res) => {
  try {
    const { first_name, last_name, email, phone, street, zipCode, city } =
      req.body;
    const insertResult = await Contact.insertOne({
      first_name,
      last_name,
      email,
      phone,
      address: { street, zipCode, city },
    });
    if (insertResult._id) {
      const contacts = await Contact.find();
      res.render("home", { title: "All Contacts", items: contacts });
    } else {
      res.status(500).send(insertResult);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/update-contact/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contact.find({ _id: id });
    res.render("update-contact", { title: "Update Contact", item: contact[0] });
  } catch (error) {
    res.status(500).send(error);
  }
});
app.post("/update-contact/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { first_name, last_name, email, phone, street, zipCode, city } =
      req.body;
    const updateResult = await Contact.updateOne(
      { _id: id },
      {
        first_name,
        last_name,
        email,
        phone,
        address: { street, zipCode, city },
      }
    );
    if (updateResult.acknowledged) {
      res.redirect("/");
    } else {
      res.status(500).send(updateResult);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/delete-contact/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contact.deleteOne({ _id: id });

    if (contact.acknowledged) {
      res.redirect("/");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running on port http:://${hostname}:${port}`);
});
