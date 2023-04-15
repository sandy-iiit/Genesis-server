
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lifeSchema=new Schema({
    firstName:String,
    lastName:String,
    aadhar:String,
    pan:String,
    dobProof:String,
    healthCertificate:String,
    healthCondition:String,
    beneficiary:String,
    beneficiaryAge:String,
    beneficiaryRelation:String,
    policyId:String,
    policyNum:String,
    amount:String,
    payType:String,
    applier:String,


})

module.exports=mongoose.model('LifeApplication',lifeSchema)