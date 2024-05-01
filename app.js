

//app.js 

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
const adminRoutes=require('./routes/adminRoutes')
const User = require('./models/User')
const Admin = require('./models/Admin')
const Employee = require('./models/employee');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan=require("morgan")
const fs = require('fs');


const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Your API Documentation',
        description: 'API documentation for your Express application',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:4000', // Update the URL accordingly
        },
      ],
      components: {
        securitySchemes: {
          csrfAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'X-CSRF-Token',
          },
          JWTToken: {
            type: 'apiKey',
            in: 'cookie',
            name: 'jwtToken',
          },
        },
      },
    },
    apis: ['./routes/*.js', './app.js'], // Path to the files containing Swagger annotations
    requestInterceptor: (req) => {
      // Get the CSRF token from your backend (e.g., from a cookie or a meta tag)
      const csrfToken = req.csrfToken();
      // Set the CSRF token in the request headers
      req.headers['X-CSRF-Token'] = csrfToken;

      // Get the JWT token from your backend (e.g., from a cookie)
      const jwtToken = req.cookies.jwtToken;
      console.log("swagger part");
      console.log(jwtToken);
      // Set the JWT token in the request cookies
      req.cookies.jwtToken = jwtToken;

      return req;
    },
  };


const swaggerSpecs = swaggerJsdoc(swaggerOptions);




// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));


app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:3000','http://10.0.14.118:3000','http://34.213.59.11:3000','https://genesis-react-1.vercel.app','https://genesis-react.onrender.com'],
    // origin: "*",

    credentials: true,
}));

const csrfProtection = csrf({
    cookie: true,
    secure: true, // For HTTPS
    httpOnly: true, // Prevent client-side JavaScript access
    expiresIn: 30 * 60 * 1000 // Expire in 30 minutes
});


// app.use(csrfProtection);

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


/**
 * @swagger
 * /getCSRFToken:
 *   get:
 *     summary: Get CSRF Token
 *     description: Get a CSRF token for use in form submissions.
 *     responses:
 *       '200':
 *         description: A CSRF token is returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 CSRFToken:
 *                   type: string
 *                   description: The CSRF token generated for the session.
 *     security:
 *       - csrfAuth: []
 */

app.get('/getCSRFToken', (req, res) => {
    // console.log("Get csrf function")
    const tk="token"
    // console.log(tk)
    res.json({ CSRFToken: tk });
});

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

app.use(flash());


app.use(userRoutes)
app.use(adminRoutes)

app.get("/", (_, res) => res.send("Hello"))

app.use((req, res, next) => {
  if (!req.session.user) {
      return next();
  }
  if (req.session.type === 'User') {
      User.findById(req.session.user._id)
          .then(user => {
              req.user = user;
              next();
          })
          .catch(err => console.log(err));
  } else if (req.session.type === 'Admin') {
      Admin.findById(req.session.user._id)
          .then(user => {
              req.user = user;
              next();
          })
          .catch(err => console.log(err));
  } else if (req.session.type === 'Agent') {
      Employee.findById(req.session.user._id)
          .then(user => {
              req.user = user;
              next();
          })
          .catch(err => console.log(err));
  } else if (req.session.type === 'SuperAdmin') { // Add this block for SuperAdmin
      SuperAdmin.findById(req.session.user._id)
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


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.get("/test",(req,res)=>{
    res.json({msg:"Hello!!"})
})

mongoose.connect(process.env.MONGODB_URI1)
    .then(result => {
        app.listen(process.env.PORT || 4000);
        console.log('Server running in the port 4000')
    })
    .catch(err => {
        console.log(err);
        
    });

module.exports=app
