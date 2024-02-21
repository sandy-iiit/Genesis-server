
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
require('dotenv').config()
const userRoutes=require('./routes/Routes')
const User = require('./models/User')
const Admin = require('./models/Admin')
const Employee = require('./models/employee');
const cookieParser = require('cookie-parser');
const cors = require('cors');
app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:3000','http://10.0.14.118:3000'],
    credentials: true,
}));

const csrfProtection = csrf({
    cookie: true,
    secure: true, // For HTTPS
    httpOnly: true, // Prevent client-side JavaScript access
    expiresIn: 30 * 60 * 1000 // Expire in 30 minutes
});


app.use(csrfProtection);

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI2,
    collection: 'sessions',
    expires: 2*60,

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

app.use(flash());
app.get('/getCSRFToken', (req, res) => {
    console.log("Get csrf function")
    const tk=req.csrfToken()
    console.log(tk)
    res.json({ CSRFToken: tk });
});
app.use(userRoutes)

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
    else if(req.session.type==='Agent'){

        Employee.findById(req.session.user._id)
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


app.get('*',(req,res)=>{
    res.render('404')
})

mongoose.connect(process.env.MONGODB_URI1)
    .then(result => {
        app.listen(4000);
        console.log('Server running in the port 4000')
    })
    .catch(err => {
        console.log(err);
        
    });
