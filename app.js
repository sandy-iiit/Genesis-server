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
app.get('*',(req,res)=>{
    res.render('404')
})

const seq=require('./data/base')

seq.sync().then((result)=>{
    console.log('db is ready');

        app.listen(3000,()=>{
            console.log('Server is running in the port 3000!')
        })
}
)

