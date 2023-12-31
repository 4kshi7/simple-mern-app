const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const ExcerciseModel = require("./model/dbSchema");
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

app.post("/insert", async (req, res) => {
  const title = req.body.title;
  const sets = req.body.sets;
  const reps = req.body.reps;

  const data = new ExcerciseModel({
    title: title,
    sets: sets,
    reps: reps,
  });

  try {
    await data.save();
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

app.get("/read", async (req, res) => {
  try {
    const result = await ExcerciseModel.find().exec();
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await ExcerciseModel.findByIdAndDelete(id).exec();

    if (!result) {
      return res.status(404).send("Document not found");
    }

    res.status(200).send("Deleted successfully");
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
