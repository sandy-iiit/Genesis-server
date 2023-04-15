
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Beneficiary=require('./Beneficiary')
const policySchema=new Schema({
    type:{
        type:String,
        required:true
    },

    name:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    beneficiary:Beneficiary.beneficiarySchema,

    status:{
        type:String,
        required:true
    },


})

const model=mongoose.model('Policy',policySchema)

module.exports={model,policySchema}


