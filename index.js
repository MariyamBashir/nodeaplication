console.log("Maryam");

const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = 3000;

// 🔹 MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB error:", err);
  });

// 🔹 Schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  semester: Number
});

// 🔹 Model
const Person = mongoose.model("Person", personSchema);

// 🔹 GET all contacts
app.get("/persons", async (req, res) => {
  const persons = await Person.find();
  res.json(persons);
});

// 🔹 POST add contact
app.post("/persons", async (req, res) => {
  const newPerson = new Person({
    name: req.body.name,
    age: req.body.age,
    semester: req.body.semester
  });

  await newPerson.save();

  res.status(201).json({
    message: "Person added successfully",
    person: newPerson
  });
});

// 🔹 Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

