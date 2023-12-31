const mongoose = require("mongoose");

const ExcerciseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    sets: {
      type: Number,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Excercise = mongoose.model("Exercise", ExcerciseSchema);
module.exports = Excercise;