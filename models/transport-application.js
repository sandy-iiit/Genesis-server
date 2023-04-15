
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transportSchema=new Schema({
    firstName:String,
    lastName:String,
    regNum:String,

    aadhar:String,
    c_book:String,
    vehicleCompany:String,
    model:String,
    yearOfMfg:String,
    vehicleType:String,
    engine:String,
    chassis:String,

    nominee:String,
    nomineeAge:String,
    nomineeRelation:String,
    policyId:String,
    policyNum:String,
    amount:String,
    payType:String,
    applier:String,


})

module.exports=mongoose.model('TransportApplication',transportSchema)