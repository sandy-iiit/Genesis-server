
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const policySchema=new Schema({
    type:{
        type:String,
    },
    policyId:{
      type:String,
    },
    name:{
        type:String,
    },
    amount:{
        type:Number,
    },
    term:{
        type:String,
    },
    beneficiaryDetails:{
        name:{
            type:String,
        },
        age:{
            type:String,
        },
        relation:{
            type:String,
        }
    },
    applier:String,

    status:{
        // this is whether the policy is ongoing or completed
        type:String,
    },
    duration:Number

})

const model=mongoose.model('Policy',policySchema)

module.exports={model,policySchema}


