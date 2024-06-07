const express = require("express");


const admin_route = express();


// const session = require("express-session");

// const config = require('../config/config');
// const path = require("path")
// admin_route.use(express.static('public'))
// admin_route.use( express.static(path.join(__dirname, './style.css')))




const bodyParser = require('body-parser');

admin_route.use(bodyParser.json());

admin_route.use(bodyParser.urlencoded({extended:true}))

// admin_route.set('view engine','ejs')
// admin_route.set('views','./views/admin');

// admin_route.set("views", path.join(__dirname, "../views/admin"));

const auth = require('../middleware/adminAuth')

const adminController = require ("../controllers/adminController")


admin_route.get('/',auth.isLogout,adminController.loadLogin)


admin_route.post('/',adminController.verifyLogin);

admin_route.get('/home',auth.isLogin,adminController.loadDashboard)

admin_route.get('/logout',auth.isLogin,adminController.logout)

admin_route.get('/dashboard',auth.isLogin,adminController.adminDashboard)
admin_route.get('/newUser',auth.isLogin,adminController.newUserLoad)


admin_route.get('/editUser',auth.isLogin,adminController.editUserLoad)

admin_route.post('/addUser',adminController.addUser)
admin_route.post('/editUser',auth.isLogin,adminController.updateUsers)
admin_route.get('/deleteUser',adminController.deleteUser)

admin_route.get('*',(req,res)=>{
    res.redirect('/admin');
})

module.exports = admin_route;