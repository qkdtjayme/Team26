require("dotenv").config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

app.use(express.json())
app.use(cors())

const mongoUrl = 

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
})
.then(() => {
    console.log("Connected to Database");
})
.catch((e) => console.log(e));

require("./userDetails");

const User = mongoose.model("UserInfo");

app.post("/register", async (req, res) => {
    const { username, password, weight, height } = req.body;
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters ** 2);
    try {
        await User.create({
            username,
            password,
            weight,
            height,
            bmi,
        });
        res.send({ status: "ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});

app.post("/login-user", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(5000, () => {
    console.log("Server Started");
});