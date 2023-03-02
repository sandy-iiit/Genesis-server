const express=require('express')

const bodyParser=require('body-parser')
const path = require("path");

const app=express()

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
require('dotenv').config()
const userRoutes=require('./routes/userRoutes')

app.use(userRoutes)
app.get('/',(req,res)=>{
    res.render('home')
})
app.listen(3000,()=>{
    console.log('Server is running in the port 3000!')
})