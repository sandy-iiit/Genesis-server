
const {Sequelize}=require('sequelize')

const sequelize = new Sequelize('database','sandy','13072003',{
    dialect:'sqlite',
    host:'localhost',
    storage:'./data/database.db'
})

module.exports=sequelize

