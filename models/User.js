const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Policy=require('./Policy')

const userSchema= new Schema({

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
    currentPolicies:[
        {
            policy:Policy.policySchema
        }
    ],
    policyHistory:[
        {
            policy:Policy.policySchema

        }
    ],
})



module.exports=mongoose.model('User',userSchema)
