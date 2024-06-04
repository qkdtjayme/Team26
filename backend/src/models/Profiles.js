const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    bmi: {
      type: Number,
    },
  },
  { timestamps: true }
);

profileSchema.pre("save", function (next) {
  let profile = this;

  // Calculate bmi
  const calculateBMI = (height, weight) => {
    return weight / (height * height);
  };

  profile.bmi = calculateBMI(profile.height, profile.weight);
  next();
});

// Export profile model
const Profile = mongoose.model("profile", profileSchema);
module.exports = Profile;
