const mongoose = require('mongoose');
const Policy = require("./Policy");

const Schema = mongoose.Schema;

const adminSchema= new Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    sex:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:false
    },
    deleted:Boolean,
})


module.exports=mongoose.model('Admin',adminSchema)
