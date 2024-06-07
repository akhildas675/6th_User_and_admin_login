const mongoose = require("mongoose");
const express = require("express");
const session = require('express-session');
const app = express();
const path = require("path");
// Require routes
const userRoute = require("./routes/userRoute");
const adminRoute = require('./routes/adminRoute');
const nocache = require('nocache')
// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/project6");


app.use(express.static('public'));

app.use(nocache())
// Session middleware
app.use(session({
    secret: "mysitesessionsecrect",
    resave: false,
    saveUninitialized: false
}));

// Set view engine and views directory
console.log(__dirname);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"./views"));

// Static files



// Routes
app.use('/admin', adminRoute); // Admin route 
app.use("/", userRoute); // User route
 
app.listen(4000, () => {
    console.log(`Server is running on http://localhost:4000/login`);
});
    

