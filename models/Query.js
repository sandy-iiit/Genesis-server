

const seq=require('../data/base')
const Sequelize=require('sequelize')
const {QueryError} = require("sequelize");


const Query=seq.define('query1.2',{

    id:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    askedBy:{
      type:Sequelize.STRING,
        allowNull:true
    },
    question:{
        type:Sequelize.STRING,
        allowNull: false
    },
    answer:{
        type:Sequelize.STRING,
        allowNull:true
    }

})

module.exports=Query