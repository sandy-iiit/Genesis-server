const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema= new Schema({
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
    aadhar:{
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
    isActive: {
        type: Boolean,
        default: false  
      }

})


module.exports=mongoose.model('Employee',employeeSchema)
