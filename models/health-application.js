
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const healthSchema=new Schema({
    firstName:String,
    lastName:String,
    sex:String,
    aadhar:String,
    pan:String,
    dobProof:String,
    nomineeAadhar:String,
    nomineeAddressProof:String,
    healthCertificate:String,
    healthCondition:String,
    nominee:String,
    nomineeAge:String,
    nomineeRelation:String,
    policyId:String,
    policyNum:String,
    amount:String,
    payType:String,
    applier:String,
    duration:String,
    appliedDate:String,
    verificationDate:String,

})

module.exports=mongoose.model('HealthApplication',healthSchema)