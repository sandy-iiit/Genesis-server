
const {Sequelize}=require('sequelize')

const sequelize = new Sequelize('test2','root','sandeep369',{dialect:'mysql',host:'localhost'
})

module.exports=sequelize

