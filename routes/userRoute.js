const express = require("express");
// Import the path module to handle file paths
const path = require("path"); 

const user_route = express();
// const session = require("express-session");

// const config = require ("../config/config.js")

// user_route.use(session({secret:config.sessionSecret}));

const auth = require('../middleware/auth.js')

// user_route.set("view engine", "ejs");

// // Set the correct views directory path
user_route.set("views", path.join(__dirname, "../views/users"));

const bodyParser = require("body-parser");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

const userController = require('../controllers/usersController');
// user_route.use(express.static('public'))
//  user_route.use( express.static(path.join(__dirname, '.style.css')))

user_route.get('/register',auth.isLogOut,userController.loadRegister);
user_route.post('/register',auth.isLogOut,userController.insertUser)

user_route.get('/login',auth.isLogOut, userController.loginLoad);
 //user_route.get('/login', auth.isLogOut,userController.loginLoad);
user_route.post('/login',auth.isLogOut,userController.verifyLogin);
user_route.get('/home',auth.isLogin,userController.loadHome)
user_route.get('/logout',auth.isLogin,userController.userLogout)



module.exports = user_route;


