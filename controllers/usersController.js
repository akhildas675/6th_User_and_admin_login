
const User = require('../models/usersModel');
const bcrypt = require('bcrypt');

// Function to hash password
const securePassword = async (password) => {
    try {
       const passwordHash = await bcrypt.hash(password, 10);
       return passwordHash;
    } catch (error) {
        console.log(error.message);
    }
}

// Controller method to render the registration form
const loadRegister = async (req, res) => {
    try {
        res.render('register');
    } catch (error) {
        console.log(error.message); 
    }
}

// registeration handling
const insertUser = async (req, res) => {
    try {


        //When user already have an account
        const exist = await User.findOne({email:req.body.email})
        // console.log("find");

        if(exist){
            res.render('register',{message:"you already have an account, Please "});

        }else{

            const hashedPassword = await securePassword(req.body.password);
            const {name ,mobile,email}=req.body
            // Create a new user instance with hashed password
            const user = new User({
                name: name,
                email: email,
                mobile: mobile,
                password: hashedPassword,
    
                is_admin: 0,
            });
            
            //save data base
            const userData = await user.save();
                  //  registration success or failure
        if (userData) {
            res.render('register', { message: "Your register has been successful please  " });
        } else {
            res.render("register", { message: "Your registration has failed" });
        }

        }

    
  
    } catch (error) {
        console.log(error.message);
    }
}

// Controller method to render the login form
const loginLoad = async (req, res) => {
    try {
        // console.log(req.session.user,"req.session working");
        if(req.session.user)
        {
            // console.log("hello i am redirecting");
            res.redirect('/home')
        }
        else{
        // console.log("hello");
        res.render('userLogin');
        }
    } catch (error) {
        console.log(error.message);
}
}

const verifyLogin = async (req, res) => {
        
    try {
       
        const email = req.body.email;
        const password = req.body.password;
      
        const userData = await User.findOne({ email: email})
      

        if (userData) {
            const passwordMatch = await bcrypt.compare(password, userData.password);
            
            if (passwordMatch) {
                if (userData.is_verified === 0) { // Corrected property name to is_verified
                    res.render('login', { message: "Please verify your email." });
                } else {
                    console.log(userData);
                    req.session.user = userData._id;
                    console.log("User logged in successfully.",req.session.user);
                    res.redirect('/home');
                    // console.log("match");
                }
            } else {
                res.render('login', { message: "Email and password are incorrect" });
            }
        } else {
            
            res.render('login', { message: "Email and password are incorrect" });
        }
        

    } catch (error) {
        console.log(error.message);
    }
}


const loadHome = async (req,res)=>{
    try{

       if (req.session.user) {
        const userData = await User.findOne({ _id:req.session.user})
        // console.log("hellos");
        res.render('home',{user:userData})
       }else{
        // console.log("in else condition")
        res.redirect("/")
       }
    } catch (error){
        console.log(error.message);
    }
}

const userLogout = async(req,res)=>{
    try{

        req.session.destroy()
        res.redirect('/login');

    } catch (error){
        console.log(error.message);
    }
}


module.exports =
{
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout,
};
