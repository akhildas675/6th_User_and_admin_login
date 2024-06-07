const User = require("../models/usersModel")

const bcrypt = require("bcrypt");


const securePassword = async (password) => {
    try {
       const passwordHash = await bcrypt.hash(password, 10);
       return passwordHash;
    } catch (error) {
        console.log(error.message);
    }
}
const loadLogin = async (req,res)=>{
    try{
        // console.log("hello admin here");
        res.render('admin/login');

    } catch (error){
        console.log(error.message);
    }
}

const verifyLogin = async(req,res)=>{
    try{

        const email = req.body.email;
        const password = req.body.password;
        // const mobile = req.body.mobile
        // console.log("admin verification");
        const UserData = await User.findOne({email:email})
        if(UserData){
            const passwordMatch = await bcrypt.compare(password,UserData.password)
            console.log("password match");

            if(passwordMatch){
                // console.log("checking admiin or not");


                if(UserData.is_admin === 0){
                    res.render('admin-login',{message:"Email and password is incorrect"})
                }
                else{
                    req.session.admin= UserData._id;
                    // console.log("admin verified");
                    res.redirect("/admin/home");
                   
                }

            }
            else{
                res.render('admin/login',{message:"Email and password is incorrect"})
                console.log("out");

            }

        }
        else{
            res.render('admin/login',{message:"Email and password is incorrect"})
            console.log("not user");
        }

    } catch (error){
        console.log(error.message);
    }
}



const loadDashboard = async (req,res)=>{
    try{
        const userData = await User.findById({ _id:req.session.admin});
        res.render('admin/home',{admin:userData})

    }catch (error){
        console.log(error.message);
    }
}


const logout = async (req,res)=>{
    try{
        req.session.destroy();
        res.redirect('/admin')

    } catch (error){
        console.log(error.message);
    }
}

//admin dashboard 

const adminDashboard =  async (req,res)=>{
    try{

        const usersData = await User.find({is_admin:0})

        res.render('admin/dashboard',{users:usersData});

    } catch (error){
        console.log(error.message);

    }
}
// add new user
const newUserLoad = async (req,res)=>{
    try{
        // console.log("new user ");
        res.render('admin/newUser')

    } catch (error){
        console.log(error.message);
    }
}



// admin add user
const addUser = async (req, res) => {
    try {
        

        // check user in database
        const existingUser = await User.findOne({ email:req.body.email});
        console.log();
        if (existingUser) {
            return res.render('admin/newUser', { message: 'User with this email already exists.' });
        }else{
    
        const { name, email, mobile, password } = req.body;
        const hashedPassword = await securePassword(password);

        // admin creating new user
        const newUser = new User({
            name,
            email,
            mobile,
            password: hashedPassword,
            is_admin: 0
        });

        // data storing new user
        const userData = await newUser.save();

        // if add user in database 
        if (userData) {
            return res.render('admin/newUser', { message: 'User added successfully.' });
        } else {
            throw new Error('Failed to add user.');
        }
    }
    } catch (error) {
        console.log(error.message);
        res.render('admin/newUser', { message: 'An error occurred. Failed to add user.' });
    }
}


// const editUserLoad = async (req,res)=>{
//     try{

//         const id= req.query.id;

//         const userData = await User.findById({_id:id})
//         if(userData){

//             res.render('admin/editUser',{user:userData})

//         }else{
//             res.redirect('/admin/dashboard')

//         }

//         res.render('admin/editUser')

//     } catch (error){
//         console.log(error.message);
//         res.render('admin/editUser')
//     }
// }

const editUserLoad = async (req, res) => {
    try {
        const id = req.query.id;
        const userData = await User.findById({ _id: id });
        
        if (userData) {
            res.render('admin/editUser', { user: userData });
        } else {
            res.redirect('/admin/dashboard');
        }
    } catch (error) {
        console.log(error.message);
        res.render('admin/editUser');
    }
};


const updateUsers = async (req,res)=>{
    try{
        // console.log(req.body,"updating details");

        const userData = await User.findByIdAndUpdate({_id:req.body.id},{$set:{name:req.body.name,email:req.body.email,mobile:req.body.mobile}})
        // console.log(userData);
        res.redirect('/admin/dashboard')

    } catch (error){
        console.log(error.message);
    }
}

const deleteUser = async (req,res)=>{
    try{

        const id = req.query.id;
       await User.deleteOne({_id:id},{message:"Userdeleted Succesfully"});
       res.redirect('/admin/dashboard')

    } catch (error){
        console.log(error.message);
    }
}

module.exports ={
    loadLogin,
    verifyLogin,
    loadDashboard,
    logout,
    adminDashboard,
    newUserLoad,
    addUser,
    editUserLoad,
    updateUsers,
    deleteUser,

}