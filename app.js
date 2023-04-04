const express=require('express')
const bodyParser=require('body-parser')
const path = require("path");
const sqlite3=require('sqlite3')
const bcrypt=require('bcrypt')
const app=express()
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
require('dotenv').config()
const userRoutes=require('./routes/userRoutes')

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(userRoutes)
app.get('/',(req,res)=>{
    res.render('home')
})

// const db_name=path.join(__dirname,'data','database.db')
// const db=new sqlite3.Database(db_name,err =>{
//     if(err){
//         console.log(err)
//     }
//     console.log('Database created')
// })


const tablecreate=`CREATE TABLE IF NOT EXISTS prac(
id integer primary key autoincrement,
name varchar(60) not null,
email varchar(60) not null);`

const insertdata=` insert into prac(name,email) values('manohar2','manohar2@gmail.com')`
//
// db.run(insertdata,err=>{
//     if(err){
//         console.log(err)
//     }
//     else
//     console.log('data created')
// })
//
// app.get('/data',(req,res)=>{
//     const command=`select name from prac where name='Sandy' order by id`
//
//     db.all(command,(err,data)=>{
//         if(err){
//             console.log(err)
//         }
//         else{
//             res.send(data)
//         }
//     })
// })
const seq=require('./data/base')

seq.sync().then((result)=>{
    console.log('db is ready');

        app.listen(3000,()=>{
            console.log('Server is running in the port 3000!')
        })
}
)

