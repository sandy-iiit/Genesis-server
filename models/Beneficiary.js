
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const beneficiarySchema=new Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    sex:{
        type:String,
        required:true
    },
    relation:{
        type:String,
        required:true
    },
})
const model = mongoose.model('Beneficiary',beneficiarySchema)
module.exports = {
    model, beneficiarySchema
}