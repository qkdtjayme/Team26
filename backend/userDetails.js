const mongoose = require('mongoose')

const UserDetailsSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        height: Number,
        weight: Number,
        BMI: Number,
    },
    {
        collection: "UserInfo",
    }
);

mongoose.model("UserInfo", UserDetailsSchema);