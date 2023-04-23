
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const app=express()
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
require('dotenv').config()
const userRoutes=require('./routes/userRoutes')
const User = require('./models/User')
const Admin = require('./models/Admin')
const cookieParser = require('cookie-parser');
app.use(cookieParser());


const store = new MongoDBStore({
    uri: process.env.MONGODB_URI2,
    collection: 'sessions',
    // expires: 10*60,

});
// const csrfProtection = csrf();
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

// app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    if(req.session.type==='User'){

        User.findById(req.session.user._id)
            .then(user => {
                req.user = user;
                next();
            })
            .catch(err => console.log(err));
    }else if(req.session.type==='Admin'){

        Admin.findById(req.session.user._id)
            .then(user => {
                req.user = user;
                next();
            })
            .catch(err => console.log(err));
    }
});
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    // res.locals.csrfToken = req.csrfToken();
    next();
});
app.use(userRoutes)

app.get('*',(req,res)=>{
    res.render('404')
})
mongoose.connect(process.env.MONGODB_URI1)
    .then(result => {
        app.listen(3000);
        console.log('Server running in the port 3000')
    })
    .catch(err => {
        console.log(err);
    });