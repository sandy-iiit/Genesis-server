
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transportPolicy = new Schema(

    {
        //cards display
        name:String,
        type: String,
        amount:Number,
        term:String,
       
        //buy policy
        details: {type:String,},
        TC:{type:String,},
        GE:{type:String},
        benefits:{type:String},
    }
)






module.exports = new mongoose.model('transportPolicyDetails',transportPolicy)
