const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lifePolicy = new Schema(

    {
        //cards display
        name:String,
        type: String,
        coverAmount:Number,
        term:String,
        duration:Number,
        Premium:Number,
        //buy policy
        details: {type:String,},
        TC:{type:String,},
        GE:{type:String},
        benefits:{type:String},

    }
)


module.exports = new mongoose.model('lifePolicyDetails',lifePolicy)