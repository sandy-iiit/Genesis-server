
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lifeSchema=new Schema({
    firstName:String,
    lastName:String,
    sex:String,
    aadhar:String,
    pan:String,
    nomineeAadhar:String,
    nomineeAddressProof:String,
    dobProof:String,
    healthCertificate:String,
    healthCondition:String,
    beneficiary:String,
    beneficiaryAge:String,
    beneficiaryRelation:String,
    policyId:String,
    policyName:String,
    policyType:String,
    policyTerm:String,
    amount:String,
    payType:String,
    applier:String,
    duration:Number,
    appliedDate:String,
    verificationDate:String,
    verificationStatus:String,

})

module.exports=mongoose.model('LifeApplication',lifeSchema)