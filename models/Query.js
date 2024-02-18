

const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const querySchema=new Schema({

    askedBy:{
      type:Schema.Types.ObjectId,
       required:true
    },
    question:{
        type:String,
        required: true
    },
    answer:{
        type:String,
        required:true
    },
    status:{
        type:String,
    },
    answeredBy:{
        type:String,
    },
    askDate:{
        type:String,
    },
    answerDate:{
        type:String
    }

})

module.exports=mongoose.model('Query',querySchema)
