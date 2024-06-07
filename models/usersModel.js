//importing mongoose library

const mongoose=require("mongoose");

//MongoDB collection associated with the User model.

//define fields of the Schema 
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
    },
    is_admin:{
        type:Number,
        required:true
    },
    is_varified:{
        type:Number,
        default:0
    },

})
//"User" represented collection name of mongodb

module.exports=mongoose.model('User',userSchema)