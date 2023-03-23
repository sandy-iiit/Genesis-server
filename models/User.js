// import {Model, Sequelize} from "sequelize";
const seq=require('../data/base')
const Sequelize=require('sequelize')

// class User extends Model{}

const User= seq.define('user1.2',{
    id:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    age:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    sex:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    address:{
        type:Sequelize.STRING,
        allowNull:false
    },
    phone:{
        type:Sequelize.STRING,
        allowNull:false

    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }


})


module.exports=User
