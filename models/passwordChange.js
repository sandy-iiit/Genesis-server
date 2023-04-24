
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const passwordChange=new Schema({

    userID:String,
    email:{type:String,
    required:true},
    OTP:Number,
    phone:String,
    createdAt:{
        type:Date,
        expires:180
    },
    newPassword:String,
    token:String

})



module.exports=mongoose.model('changePasswords',passwordChange)