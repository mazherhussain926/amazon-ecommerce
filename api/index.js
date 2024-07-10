const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");
require("dotenv").config();
const URL = process.env.MONGO_URL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error to connected mongGB database", err);
  });
app.listen(port, () => {
  console.log("server is running on port 8000");
});

//importing models
const User = require("./models/user");
const Order = require("./models/order");

// function to send verification token
const sendVerificationEmailToNewUser = async (email, verificationToken) => {
  //create nodemailer transport
  const transporter = nodemailer.createTransport({
    //configure the email service
    service: "gmail",
    auth: {
      user: "mazherhussain926@gmail.com",
      passcode: "awkc nshc lypm fjjs",
    },
  });

  //compose the email message
  const mailOption = {
    from: "amazon.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email :  http://localhost:8000/verify/${verificationToken}`,
  };
  //send the email
  try {
    await transporter.sendMail(mailOption);
  } catch (err) {
    console.log("Error sending verification email", err);
  }
};
//endpoint to register user in the applications
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }
    //create a new user
    const newUser = new User({ name, email, password });

    // generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //save the new user to database
    await newUser.save();

    // send verification email to a particular user
    sendVerificationEmailToNewUser(newUser.email, newUser.verificationToken);
  } catch (err) {
    console.log("error registering user", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

// endpoint  to verify the email

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    // Find the user with the given verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    //mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ message: "Email verification is failed" });
  }
});
