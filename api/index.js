//all dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("dotenv").config();
const URL = process.env.MONGO_URL;
const port = process.env.PORT;

//connection to database
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
      pass: "rbyl ssqz qhev fisv",
    },
  });
  //compose the email message
  const mailOption = {
    from: "amazon.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email :  http://10.0.2.2:8000/verify/${verificationToken}`,
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

//secret key function
const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

//generating secret key
const secretKey = generateSecretKey();


//endpoint to login the user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //checking email exsits or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    // checking password is right or wrong
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    //generate token
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});



//endpoints to add address in database
app.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;
    //find the user by user id
    const user = await User.findById(userId);
    if(!user){
    return res.status(404).json({ message: "User is not found" });
    }
    // add the new address to user adddress array
    user.addresses.push(address);
    //saving the user in backend
    await user.save();
    res.status(200).json({ message: "Address is saved successfully" });
  } catch (err) {
    console.log("error during adding address ", err);
    res.status(500).json({ message: "Address failed" });
  }
});




//end point to get particular user addresses from database so that they can be render on screen
app.get("/addresses/:userId",async(req,res)=>{
  try {
   const userId =req.params.userId
   const user =await User.findById(userId)
   if(!user){
    return res.status(404).json({ message: "User is not found" });
    }
    const addresses = user.addresses
    res.status(200).json({addresses})
  } catch (err) {
   
    res.status(500).json({ message: "Error retrieving addresses" });
  }
}) 

// Endpoint to remove an address
app.delete('/users/:userId/addresses/:addressId', async (req, res) => {
  const { userId, addressId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    // Remove the address
    user.addresses = user.addresses.filter(address => address._id.toString() !== addressId);
    await user.save();
    res.send('Address removed successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});


