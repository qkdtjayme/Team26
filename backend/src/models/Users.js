const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Defining the User schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Generates the User Id for the new user
userSchema.pre("save", function (next) {
  let user = this;

  // Generate a salt
  const SALT_WORK_FACTOR = 10;
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // Hash the password using the new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // Override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

/**
 * User model built-in method for comparing passwords
 * @param {*} candidatePassword
 * @param {*} callback
 */
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

// Ensure virtual fields are serialized
userSchema.set("toJSON", {
  virtuals: true,
});

const User = mongoose.model("user", userSchema);
module.exports = User;
