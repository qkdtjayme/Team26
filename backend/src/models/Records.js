const mongoose = require("mongoose");

const recordSchema = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: new Date(Date.now()).toLocaleString(),
  },
  exercise: {
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
};

// Export the model
const Record = mongoose.model("analytic", recordSchema);
module.exports = Record;
