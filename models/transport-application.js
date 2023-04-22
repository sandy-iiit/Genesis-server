
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transportSchema=new Schema({
    firstName:String,
    lastName:String,
    sex:String,
    regNum:String,

    aadhar:String,
    c_book:String,
    nomineeAadhar:String,
    nomineeAddressProof:String,
    vehicleCompany:String,
    model:String,
    yearOfMfg:Number,
    vehicleType:String,
    engine:String,
    chassis:String,

    nominee:String,
    nomineeAge:String,
    nomineeRelation:String,
    policyId:String,
    policyName:String,
    policyType:String,
    policyTerm:String,
    amount:String,
    payType:String,
    applier:String,
    appliedDate:String,
    verificationDate:String,
    verificationStatus:String,


})

module.exports=mongoose.model('TransportApplication',transportSchema)