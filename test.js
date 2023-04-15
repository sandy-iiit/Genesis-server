
const {Sequelize}=require('sequelize')

const sequelize=new Sequelize('test2','root','sandeep369',{dialect:'mysql',host:'localhost'})


const user=sequelize.define('user',{

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

const creater=()=>{
    user.create({
        id:Math.floor(Math.random()*1000),
        name:'Sandeep',
        email:'dattasanddep000@gmial.com',
    }).then(r=>{
        console.log('user added')
    }).catch(err=>{
        console.log('error occured')
        console.log(err)
    })
}

creater()






