const Sequelize = require("sequelize");
const seq=require('../data/base')

const user=seq.define('user',{

    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
    }


})

module.exports=user