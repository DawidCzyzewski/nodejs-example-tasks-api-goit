// Określamy schematy dla dokumentów w sub-folderze schemas. Jest tu opisane, że np. title musi być stringiem od danej długości itp. z tego korzysta index.js w service

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const task = new Schema(
  {
    title: {
      type: String,
      minlength: 2,
      maxlength: 70,
    },
    text: {
      type: String,
      minlength: 3,
      maxlength: 170,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

// i tu tworzymy Task, który jest modelem, który wykorzystamy z index.js w service
const Task = mongoose.model("task", task);

module.exports = Task;
