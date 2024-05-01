
const User = require("../models/User");
const Agent = require("../models/employee");
const bcrypt = require('bcryptjs');

const healthApplications=require('../models/health-application')
const lifeApplications=require('../models/life-application')
const transportApplications=require('../models/transport-application')
const Query = require("../models/Query");
const Policy = require("../models/Policy");
const Admin=require('../models/Admin')
const transportPolicy=require('../models/transportpolicy-details')
const lifePolicy=require('../models/lifepolicy-details')
const healthPolicy=require('../models/healthpolicy-details')
const changePassword=require('../models/passwordChange')
const Review=require('../models/Review')
const twilio = require("twilio");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {MongoClient} = require("mongodb");
const employee = require('../models/employee');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const SuperAdmin = require('../models/SuperAdmin')
//
// const transporter = nodemailer.createTransport(
//     sendgridTransport({
//         auth: {
//             api_key:process.env.API_KEY,
//         }
//     })
// );


const transporter = nodemailer.createTransport(
    {
        service: "Gmail",

        auth: {
            user: 'dattasandeep000@gmail.com',
            pass: process.env.PASSKEY
        },
    }
);
let n=0
exports.getChecked=async (req, res) => {
    // if(req.session.user){
    //   res.status(200).json(req.session.user)
    // }
    // else{
    //     res.status(200).json({msg:"Session Expired!!"})
    // }
    console.log("Check Token")

    console.log(req.body.jwtToken)
    n=n+1
    console.log(n)
    const jwtToken = req.body.jwtToken;
    console.log("checking the jwt token")
    console.log(jwtToken)
    if (jwtToken) {
        // JWT token is present, you can verify it or use it as needed
        try {
            const decoded = jwt.verify(jwtToken, 'secretKey');
            console.log(decoded.userId)
            const user = await User.findById(decoded.userId);
            const admin = await Admin.findById(decoded.userId);
            const agent = await Agent.findById(decoded.userId);
            const superAdmin = await SuperAdmin.findById(decoded.userId); // Add this line for SuperAdmin

            console.log('Decoded JWT:', decoded);

            if (user !== null) {
                let u = { ...user._doc, type: "User" };
                console.log(u);
                res.status(200).json(u);
            } else if (admin !== null) {
                let u = { ...admin._doc, type: "Admin" };
                console.log(u);
                res.status(200).json(u);
            } else if (agent !== null) {
                let u = { ...agent._doc, type: "Agent" };
                console.log(u);
                res.status(200).json(u);
            } else if (superAdmin !== null) { // Add this block for SuperAdmin
                let u = { ...superAdmin._doc, type: "SuperAdmin" };
                console.log(u);
                res.status(200).json(u);
            } else {
                res.status(200).json({ success: false, message: 'Unauthorized' });
            }
        } catch (error) {
            console.error('Error verifying JWT:', error);
            res.status(200).json({ success: false, message: 'Unauthorized' });
        }
    } else {
        // JWT token not present in the cookie
        res.status(200).json({ success: false, message: 'Unauthorized' });
    }
}



exports.getHealthPolicyPage=(req,res)=>{
    res.render('policypage')
}
exports.getVehiclePolicies=async (req, res, next) => {

    console.log("Entered transport policy")
    const arrr=await transportPolicy.find()
    res.status(200).json(arrr)
}
exports.getLifePolicy= async (req,res,next)=>{
    console.log("Entered life policy")
    const arrr=await lifePolicy.find()
    res.status(200).json(arrr)
}
exports.gethealthPolicy= async (req,res,next)=>{
    console.log('entered health policy');
    const arrr=await healthPolicy.find()
    console.log(arrr)
    res.status(200).json(arrr)
}

exports.getBuyPolicy2=(req,res,next)=>{
    res.render('buy-policy2')
}

exports.getLogin =(req,res,next)=>{
    res.render('login',{text:''})
    // res.render('login2')
}
exports.getSignup =(req,res,next)=>{
    res.render('signup',{text:''})
}

exports.getHome=(req,res,next)=>{
    res.render('home')
}
arr=[{name:'insurance name',term:'x yrs',percentage:90+'%',cost:'f'},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:'f'},
    {name:'insurance name',term:'x yrs',percentage:90+'%',cost:'f'},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:'f'},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:''},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:''},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:''},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:''},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:''},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:''},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:''},{name:'insurance name',term:'x yrs',percentage:9000+'%',cost:''}]
exports.getHealthPolicies=(req,res,next)=>{

    res.render('healthpolicies',{array:arr})
}
exports.getBuyPolicy=(req,res,next)=>{
    console.log(req.params.id)
    transportPolicy.findById(req.params.id).then((policy)=>{
        res.json(policy)
    })

}
exports.getPolicyPage=async (req, res, next) => {
    console.log("Entered getHealthPolicy")
    console.log(req.params.id)
    const p = await healthPolicy.findById(req.params.id)
    res.json(p)
}

exports.getDetails = (req, res, next) => {
    if (!req.user) {
        res.render('404');
    } else {
        if (req.session.type === 'User') {
            res.render('details', {
                name: req.user.name, email: req.user.email,
                age: req.user.age, sex: req.user.sex, address: req.user.address, phone: req.user.phone
            });
        } else if (req.session.type === 'Admin') {
            res.render('admin-details', {
                name: req.user.name, email: req.user.email,
                age: req.user.age, sex: req.user.sex, address: req.user.address, phone: req.user.phone
            });
        } else if (req.session.type === 'Agent') {
            res.render('admin-details', {
                name: req.user.name, email: req.user.email,
                age: req.user.age, sex: req.user.sex, address: req.user.address, phone: req.user.phone
            });
        } else if (req.session.type === 'SuperAdmin') { // Add this block for SuperAdmin
            res.render('superadmin-details', {
                name: req.user.name, email: req.user.email,
                age: req.user.age, sex: req.user.sex, address: req.user.address, phone: req.user.phone
            });
        }
    }
};


exports.getMyDetails=(req,res,next)=>{
    res.render('my-details')
}

exports.getPasswordChange=(req,res,next)=>{
    res.render('change-password',{err:''})
}
const array2=[{name:'Term Insurance',Duration:2+'yrs',Installment:300,type:'motor'},{type:'life',name:'Term Insurance',Duration:5+'yrs',Installment:500},
    {type:'health',name:'Term Insurance',Duration:2+'yrs',Installment:300},{name:'Term Insurance',Duration:2+'yrs',Installment:300}
,{name:'Term Insurance',Duration:2+'yrs',Installment:300},{name:'Term Insurance',Duration:2+'yrs',Installment:30000},
    {name:'Term Insurance',Duration:2+'yrs',Installment:30000},{name:'Term Insurance',Duration:2+'yrs',Installment:30000},{name:'Term Insurance',Duration:2+'yrs',Installment:30000},
    {name:'Term Insurance',Duration:2+'yrs',Installment:780000}]


exports.getMyPolicies=(req,res)=>{
    res.render('my-policies',{arr:array2,str:'Explore Plan'})
}
exports.getCurrentPolicies=(req,res)=>{
    User.findById(req.user.id).then(r=>{
        console.log(r)
        res.render('my-policies',{arr:r.currentPolicies,str:'Pay Installments'})

    })
}
exports.getPayment=(req,res)=>{
    res.render('payment')
}
const arr3=[{Q:"Cant I Pay my installments collectively for my plan id of Motor32AP?",A:'Yes"Sed ut aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodiluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi conseq consequatur? Quis au perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"'},
    {Q:"Cant I Pay my installments collectively for my plan id of Motor32AP?",A:'Yes'},{Q:"Cant I Pay my installments collectively for my plan id of Motor32AP?",A:'Yes'},
    {Q:"Cant I Pay my installments collectively for my plan id of Motor32AP?",A:'Yes'},
    {Q:"Cant I Pay my installments collectively for my plan id of Motor32AP?",A:'Yes'}]
exports.getMyQueries=async (req, res) => {
    const userId=req.body.userId
    console.log(req.body.userId)
    const arrr = await Query.find( {askedBy: userId})
    console.log(arrr.length)
    // res.render('my-queries', {arr: arrr})
    res.status(200).json(arrr)
}

exports.getWriteQuery=(req,res)=>{
    res.render('write-query')
}

exports.getTransportForm=async (req, res) => {
    await transportPolicy.findById(req.body.id).then((r) => {
        // res.render('transport-form', {r: r,applier:req.user._id})

    })
}
exports.getLifeForm=async (req, res) => {
    await lifePolicy.findById(req.params.id).then((r) => {
        res.render('life-form',{r:r,applier:req.user._id})
    }).catch(err=>{
        console.log('Error')
    })
}
exports.getHealthForm=(req,res)=>{
    console.log('Entered health form')
    const id=req.params.id
    console.log(id)
    healthPolicy.findById(id).then((r)=>{
        res.render('health-form',{r:r,applier:req.user._id})

    }).catch(err=>{
        console.log('Error')
    })
}
exports.getAdminQueries=(req,res)=>{
    res.render('admin-queries',{arr:arr3})
}

exports.getServices=(req,res)=>{
    res.render('services')
}
exports.getAboutUs=(req,res)=>{
    res.render('aboutus')
}
exports.getPolicies=(req,res)=>{
    res.render('policies')
}
exports.getContactUs=(req,res)=>{
    res.render('contactus')
}


exports.getBuyPolicylife = (req,res,next)=>{
    console.log(req.params.id)
    lifePolicy.findById(req.params.id).then((policy)=>{
        res.json(policy)
    })
}





const alpha=['A','B','C','D','E','F','G','H']

exports.postSignup = (req, res) => {
    console.log('Entered Post signup');
    const name = req.body.name;
    const age = req.body.age;
    const sex = req.body.sex;
    const address = req.body.address;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const id = Math.floor(Math.random() * 100000);
    console.log([name, email, age, sex, address, phone, password, id]);
    bcrypt.hash(password, 12).then(async (hashedPassword) => {
        const user = await User.findOne({ email: email });
        console.log('User');
        console.log(user);
        if (user === null) {
            const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

            console.log(password);
            const isValid = passwordRegex.test(password);
            console.log('isvalid' + isValid);
            if (isValid) {
                console.log('User creation started!');
                const user2 = new User({
                    id: id,
                    name: name,
                    age: age,
                    sex: sex,
                    email: email,
                    address: address,
                    phone: phone,
                    password: hashedPassword,
                    type:"User"

                });

                return user2.save().then((result) => {
                    // res.redirect('/login');
                    const u={
                        userId:result._id
                    }
                    const token = jwt.sign(u,"secretKey", { expiresIn: '1h' });
                    // res.cookie('jwtToken', token, { httpOnly: true, expiresIn: new Date(Date.now() + 60 * 60 * 1000) });
                    res.status(200).json(result)
                    return transporter.sendMail({
                        to: email,
                        from: 'dattasandeep000@gmail.com',
                        subject: 'Genesis Insurances Signup succeeded!',
                        html: '<h1>You successfully signed up!</h1>',
                    });

                });
            } else {
                if (!isValid) {
                   res.status(200).json({msg:"Incorrect Password format!"})
                }
            }
        } else {
            res.status(200).json({msg:"User already exists!"})
            // await res.render('signup', { text: 'User already exists!', login: '' });
        }
    })
        .catch((error) => {
            // Handle errors here
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
};

exports.postemployeesignup = (req, res, next) => {
    console.log("Entered Employee signup")
    const name = req.body.name;
    const email = req.body.email;
    const age = req.body.age;
    const sex = req.body.sex;
    const aadhar = req.body.aadhar;
    const address = req.body.address;
    const phone = req.body.phone;
    const password = req.body.password;
    const dob = req.body.dob;

    bcrypt.hash(password, 12)
        .then(async hashedpassword => {
            const employ = await employee.findOne({ email: email });
            if (employ === null) {
                const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
                const phoneRegex = /^[6-9]\d{9}$/;
                const isValid = passwordRegex.test(password);
                const isValid2 = phoneRegex.test(phone);
                console.log(isValid,isValid2,"chceking validity");
                if (isValid && isValid2) {
                    const Employee = new employee({
                        name: name,
                        email: email,
                        age: age,
                        sex: sex,
                        aadhar: aadhar,
                        address: address,
                        phone: phone,
                        password: hashedpassword,
                        dob: dob
                    });
                    await Employee.save();
                    console.log(Employee)
                    console.log('====================================');
                    console.log("employee created in some way");
                    console.log('====================================');
                    // Sending confirmation email
                    await transporter.sendMail({
                        to: email,
                        from: 'dattasandeep000@gmail.com',
                        subject: 'Thanks for enrolling',
                        html: `
                            <!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Employee Enrollment Confirmation</title>
                                <style>
                                    body {
                                        font-family: Arial, sans-serif;
                                        margin: 0;
                                        padding: 0;
                                        background-color: #f4f4f4;
                                        color: #333;
                                    }
                    
                                    .container {
                                        max-width: 600px;
                                        margin: 0 auto;
                                        padding: 20px;
                                        background-color: #fff;
                                        border-radius: 8px;
                                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                    }
                    
                                    h1 {
                                        color: #007bff;
                                    }
                    
                                    p {
                                        margin-bottom: 20px;
                                    }
                    
                                    .approval-message {
                                        font-weight: bold;
                                        color: #dc3545;
                                    }
                    
                                    .meet-in-office {
                                        font-size: 24px;
                                        margin-top: 30px;
                                        padding: 20px;
                                        background-color: #007bff;
                                        color: #fff;
                                        border-radius: 8px;
                                        text-align: center;
                                    }
                    
                                    .signature {
                                        margin-top: 30px;
                                        font-style: italic;
                                        color: #777;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="container">
                                    <h1>Welcome to Our Company!</h1>
                                    <p>Dear Employee,</p>
                                    <p>Thank you for enrolling with us. Your information has been received successfully.</p>
                                    <p class="approval-message">Please wait for approval from the manager.</p>
                                    <div class="meet-in-office">
                                        <p>Meet you in office</p>
                                    </div>
                                    <p>If you have any questions or need further assistance, feel free to contact us.</p>
                                    <div class="signature">
                                        Best regards,<br>
                                        Your Genesis Team
                                    </div>
                                </div>
                            </body>
                            </html>
                        `
                    });


                    res.status(200).json({ message: 'Employee signed up successfully' });
                } else {
                    if (!isValid) {
                        res.status(400).json({ error: 'Password must contain at least one uppercase letter, one lower case character, and one number, and be at least 8 characters long.' });
                    } else if (!isValid2) {
                        res.status(400).json({ error: 'Enter valid phone number' });
                    }
                }
            }
        })
        .catch(error => {
            console.error('Error signing up employee:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
};
    exports.postLogin = async (req, res) => {
        console.log("Login route")
        console.log(req)
        // const client = await MongoClient.connect('mongodb+srv://dattasandeep000:13072003@sandy.p06ijgx.mongodb.net/G1?retryWrites=true&w=majority', { useNewUrlParser: true });
        // const db = await client.db();
        const email = req.body.email
        console.log(email)
        const password = req.body.password
        const type = req.body.type
        console.log(type)
        if (type === 'User') {
            const user=await User.findOne({email: email})
            // console.log(user)
                    if (user) {
                        bcrypt.compare(password, user.password, (err, matched) => {
                            console.log(password)
                            console.log(user.password)
                            if (!matched) {
                                res.json({msg: 'Incorrect credentials!'})
                                console.log('Not matched')
                                // res.send('Incorrect password')
                            } else if (matched) {

                                const u={
                                    userId:user._id,
                                }
                                let a={...user,type:"User"}

                                const token = jwt.sign(u, "secretKey", { expiresIn: '1h' });
                                // res.cookie('jwtToken', token, {
                                //     httpOnly: true,
                                //     expiresIn: new Date(Date.now() + 60 * 60 * 1000),
                                //     domain: 'http://52.27.64.157:4000' // Replace 'yourdomain.com' with your actual domain
                                // });                                // console.log(req.cookies.jwtToken)

                                res.status(200).json({token:token,a:a._doc})

                                // req.session.isLoggedIn = true;
                                // req.session.user = user;
                                // req.session.type=type;
                                //
                                //  req.session.save(err => {
                                //     console.log(err);
                                //      res.status(200).json(req.session.user)
                                //     console.log('You have logged in')
                                //     setTimeout(()=>{
                                //         console.log('Entered Timeout')
                                //         // res.clearCookie("id")
                                //         req.session.destroy()},200*1000)
                                // });



                                // console.log(req.cookies['user'].name)
                            }
                        })
                    } else {
                        // res.render('login', {text: 'Enter valid email and username!'})
                        res.json({msg:"No such user!"})

                    }



        }else if(type==='Admin'){
            console.log("Entered admin")
            const admin=await Admin.findOne({email: email})
            console.log(admin)
            if (admin) {
                bcrypt.compare(password, admin.password, (err, matched) => {
                    console.log(password)
                    console.log(admin.password)
                    if (!matched) {
                        // res.render('login', {text: 'Invalid Password!', login: false})
                        res.status(200).json({msg:"Incorrect credentials!"})
                        console.log('Not matched')
                        // res.send('Incorrect password')
                    } else if (matched) {
                        // req.session.isLoggedIn = true;
                        // req.session.user = admin;
                        // console.log('admin session set')
                        //
                        // req.session.type=type;
                        // return req.session.save(err => {
                        //     console.log(err);
                        //     res.status(200).json(req.session.user);
                        //     console.log('You have logged in')
                        //
                        //     setTimeout(()=>{
                        //         console.log('Entered Timeout')
                        //         req.session.destroy()},900*1000)
                        //     // res.status(200).json(admin)
                        //
                        // });
                        const u={
                            userId:admin._id,
                        }
                        let a={...admin,type:"User"}
                        const token = jwt.sign(u, "secretKey", { expiresIn: '1h' });
                        // res.cookie('jwtToken', token, {
                        //     httpOnly: true,
                        //     expiresIn: new Date(Date.now() + 60 * 60 * 1000),
                        //     domain: 'http://52.27.64.157:4000' // Replace 'yourdomain.com' with your actual domain
                        // });
                        res.status(200).json({token:token,a:a._doc})
                    }
                })
            }  else {
                // res.render('login', {text: 'Enter valid email and username!'})
                res.json({msg:"No such Admin!"})
            }
        }

        else if(type === 'Agent'){
            const employ = await employee.findOne({email:email})
            if(employ){
             bcrypt.compare(password, employ.password, (err, matched) => {
                    console.log(password)
                    console.log(employ.password)
                    if (!matched) {
                        res.json({msg: 'Incorrect credentials!'})
                        console.log('Not matched')
                        // res.send('Incorrect password')
                    } else if (matched) {
                        if(employ.isActive == true){
                        // req.session.isLoggedIn = true;
                        // req.session.user = employ;
                        // console.log(req.session.user)
                        // console.log('employee session set')
                        // console.log()
                        // req.session.type=type;
                        // return req.session.save(err => {
                        //     console.log(err);
                        //     // res.redirect('/');
                        //     res.status(200).json(req.session.user)
                        //     console.log('You have logged in employee')
                        //     setTimeout(()=>{
                        //         console.log('Entered Timeout')
                        //         req.session.destroy()},3000*1000)
                        // });
                            const u={
                                userId:employ._id,
                            }
                            let a={...employ,type:"User"}
                            const token = jwt.sign(u, "secretKey", { expiresIn: '1h' });
                            // res.cookie('jwtToken', token, {
                            //     httpOnly: true,
                            //     expiresIn: new Date(Date.now() + 60 * 60 * 1000),
                            //     domain: 'http://52.27.64.157:4000' // Replace 'yourdomain.com' with your actual domain
                            // });
                            res.status(200).json({token:token,a:a._doc})
                      
                        // console.log(req.cookies['user'].name)
                    }
                    else{
                        // res.render('login', {text: 'wait for approval', login: false})
                        console.log('No aPRROVAL')
                            res.json({msg:"No such Agent!"})

                        }
                }
                })
            }
        }

        else if (type === 'SuperAdmin') {
            // Check if the provided credentials belong to a Super Admin
            const superAdmin = await SuperAdmin.findOne({ email });
    
            if (!superAdmin) {
                return res.status(401).json({ msg: 'No such Super Admin!' });
            }
    
            bcrypt.compare(password, superAdmin.password, (err, matched) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return res.status(500).json({ msg: 'Internal Server Error' });
                }
    
                if (!matched) {
                    return res.status(401).json({ msg: 'Incorrect credentials!' });
                }
    
                // Credentials are correct, generate JWT token for Super Admin
                const u={
                    userId:superAdmin._id,
                }
                let a={...superAdmin,type:"SuperAdmin"}
                const token = jwt.sign(u, "secretKey", { expiresIn: '1h' });

                // Return Super Admin data along with the token if needed
                res.status(200).json({token:token,a:a._doc})
            });
        }
        else {
            console.log("no user stupid")
            res.status(400);
        }


    }

    exports.postLogout = async (req, res) => {
        // await req.session.destroy()
        // console.log(req.session)
        // Delete the 'jwtToken' cookie
        res.clearCookie('jwtToken');
        res.status(200).json({msg:"Cookie deleted!"})

    }

    exports.postWriteQuery = (req, res) => {

        const query = req.body.question
        const answer = 'Yet to be Answered'
        const userId=req.body.userId

       const Q=new Query({
            question: query,
            answer: answer,
            askedBy: userId,
            status:'Not Answered',
           askDate:new Date().toDateString(),
        });
           Q.save().then(r => {
            console.log('query added successfully!')
            res.status(200).json({msg:"Query Added!"})
        }).catch((err)=>{
            console.log(err)
        })
    }

    exports.postFindAgent = (req, res) => {
        const email = req.body.email
        const name = req.body.name
        console.log(email)
        transporter.sendMail({
            to: email,
            from: 'dattasandeep000@gmail.com',
            subject: 'Genesis Insurances Agent found!',
            html: `<h1>Dear ${name} ,</h1><h2>Agent Name: G Manohar</h2><h2>Agent mail: mano@gmail.com</h2>`
        }).then(r => {
                console.log('Mail sent!!');
                res.status(200);
            }
        ).catch(err => {
            console.log(err)
        })

    }

    exports.getSettings = (req, res) => {
        res.render('settings')
    }
    exports.updateDetails = (req, res) => {
        const name = req.body.name;
        const address = req.body.address;
        const email = req.body.email;
        const phone = req.body.phone;
        const age = req.body.age;
        console.log(req.body.id);
        console.log('Name ' + name);
    
        if (req.body.type === 'User') {
            User.findByIdAndUpdate(req.body.id, { name, address, email, phone, age })
                .then(() => {
                    console.log('User updated');
                    res.status(200).json({ message: 'User details updated successfully' });
                })
                .catch(err => {
                    console.error('Error updating user:', err);
                    res.status(500).json({ message: 'Internal server error' });
                });
        } else if (req.body.type === 'Admin') {
            Admin.findByIdAndUpdate(req.body.id, { name, address, email, phone, age })
                .then(() => {
                    console.log('Admin updated');
                    res.status(200).json({ message: 'Admin details updated successfully' });
                })
                .catch(err => {
                    console.error('Error updating admin:', err);
                    res.status(500).json({ message: 'Internal server error' });
                });
        } else if (req.body.type === 'SuperAdmin') {
            SuperAdmin.findByIdAndUpdate(req.body.id, { name, address, email, phone, age })
                .then(() => {
                    console.log('SuperAdmin updated');
                    res.status(200).json({ message: 'SuperAdmin details updated successfully' });
                })
                .catch(err => {
                    console.error('Error updating SuperAdmin:', err);
                    res.status(500).json({ message: 'Internal server error' });
                });
        } else {
            Agent.findByIdAndUpdate(req.body.id, { name, address, email, phone })
                .then(() => {
                    console.log('Agent updated');
                    res.status(200).json({ message: 'Agent details updated successfully' });
                })
                .catch(err => {
                    console.error('Error updating agent:', err);
                    res.status(500).json({ message: 'Internal server error' });
                });
        }
    };
    

    exports.deleteAcc = async (req, res) => {
        const email = req.user.email + "deletedaccount";
        console.log("email: " + email);
    
        let response;
        if (req.session.type === 'User') {
            await User.updateOne({ _id: req.user._id }, { email: email, deleted: true }).then(r => {
                response = { message: 'User deleted' };
                console.log('User deleted');
            }).catch(err => {
                response = { error: err.message };
                console.error('Error deleting user:', err);
            });
        } else if (req.session.type === 'Agent') {
            await Agent.updateOne({ _id: req.user._id }, { email: email, isActive: false }).then(r => {
                response = { message: 'Agent deleted' };
                console.log('Agent deleted');
            }).catch(err => {
                response = { error: err.message };
                console.error('Error deleting agent:', err);
            });
        } else if (req.session.type === 'Admin') {
            await Admin.updateOne({ _id: req.user._id }, { email: email, deleted: true }).then(r => {
                response = { message: 'Admin deleted' };
                console.log('Admin deleted');
            }).catch(err => {
                response = { error: err.message };
                console.error('Error deleting admin:', err);
            });
        }
    
        res.json(response);
    }
    

    exports.dropReview = (req, res, next) => {
        console.log("entered dropreview");
        const name = req.body.name;
        const email = req.body.email;
        const review = req.body.review;
        console.log(name, email, review);
        const r = new Review({
            name: name,
            email: email,
            review: review
        });
    
        r.save()
            .then(t=>{
                console.log('Review sent')
                // res.redirect('/services')
                 transporter.sendMail({
                    to: email,
                    from: 'dattasandeep000@gmail.com',
                    subject: 'Genesis Insurances Review!',
                    html: `Dear ${name}, Thank you for your valuable review. We always try our best to keep up with your expectations!`
                });

                res.status(200).json({msg:"Review sent!"})
            })
            .catch(err => {
                console.error('Error submitting review:', err);
                res.status(500).json({ message: 'Internal server error' });
            });
    };
    
exports.quotegenerator= (req, res) => {
    console.log('Entered quote')
    const name = req.body.name;
    const email = req.body.email;
    const insuranceType = req.body.insuranceType;
    const zip = req.body.zip;
    const age = parseInt(req.body.age);

    const coverageLimit = parseInt(req.body.coverageLimit);

    let quote = 0;
    switch (insuranceType) {
        case 'life':

            if (age < 18) {
                quote = 10000;
            } else if (age >= 18 && age < 35) {
                quote = 30000;
            } else if (age >= 35 && age < 50) {
                quote = 50000;
            } else {
                quote = 40000;
            }
            break;
        case 'transportation':
            if (zip.startsWith('10') || zip.startsWith('11')) {
                quote = 10000;
            } else if (zip.startsWith('12') || zip.startsWith('13')) {
                quote = 20000;
            } else {
                quote = 15000;
            }
            break;
        case 'health':

            if (age < 18) {
                quote = 5000 + coverageLimit / 1000;
            } else if (age >= 18 && age < 35) {
                quote = 10000 + coverageLimit / 1000;
            } else if (age >= 35 && age < 50) {
                quote = 20000 + coverageLimit / 1000;
            } else {
                quote = 50000 + coverageLimit / 1000;
            }
            break;
        default:

            res.status(400).send('Invalid insurance type');
            return;
    }
    const message = {
        from: 'dattasandeep000@gmail.com',
        to: email,
        subject: 'Your Insurance Quote',
        html: `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f5f5f5;
                                padding: 20px;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #fff;
                                border-radius: 10px;
                                padding: 20px;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            }
                            h1 {
                                color: #007bff;
                                text-align: center;
                            }
                            p {
                                margin-bottom: 20px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Your Insurance Quote</h1>
                            <p>Dear ${name},</p>
                            <p>Your insurance quote is ${quote}.</p>
                        </div>
                    </body>
                </html>
            `
    };

    transporter.sendMail(message).then(result=>{
        console.log(result);
        // res.redirect("/services");
    }).catch(error=>{
        console.log(error);
    })



};

exports.postaddpolicy = async (req, res, next) => {
    try {
        // Determine the policy type
        const policyType = req.body.policytype;
        console.log("entered policy");
        let Policy;
        let typeofpolicy;

        let obj;
        // Based on the policy type, select the appropriate model
        switch (policyType) {
            case 'life':
                Policy = lifePolicy;
                typeofpolicy = "LIFE"
                obj =  {...req.body,type:typeofpolicy,coverAmount:req.body.amount,Premium:req.body.Premiums};
                break;
            case 'health':
                Policy = healthPolicy;
                typeofpolicy = "HEALTH"
                break;
            case 'transport':
                Policy = transportPolicy;
                typeofpolicy = "TRANSPORT"
                obj = {...req.body,type:typeofpolicy};
                break;
            default:
                return res.status(400).json({ message: 'Invalid policy type' });
        }

        // Create a new policy instance
        const newPolicy = new Policy(obj);
        console.log(obj);
        // Save the policy to the database
        await newPolicy.save();

        res.status(200).json({ message: 'Policy created successfully', policy: newPolicy });
    } catch (error) {
        console.error('Error creating policy:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.postsendemail=(req,res,next)=>{
    console.log("Entered send mail")
    const type = req.body.type
    console.log(type)
    const subject = req.body.subject
    const message1 = req.body.message
    if(type==='particular_user'){
        const usermail = req.body.email
        const message = {
            from: req.body.sender,
            to: usermail,
            subject:  subject,
            text: message1
          };
        console.log(message)
          transporter.sendMail(message).then(result=>{
            console.log(result);
            // res.redirect("/details");
          }).catch(error=>{
            console.log(error);
          })
    }
    else if(type==='admin'){
        Admin.find({}).then(mails=>{
            send_emails = mails.map(mail => mail.email);
            return send_emails
        }).then(emails=>{
                console.log(emails);
                const message = {
                    // from: req.user.email,
                    to: emails,
                    subject:  subject,
                    text: message1
                  };
                  transporter.sendMail(message).then(result=>{
                    console.log(result);
                    // res.redirect("/details");
                  }).catch(error=>{
                    console.log(error);
                  })
            })
        .catch(err=>{
            console.log(err)
        })
    }
    else if(type==='users'){
        User.find({}).then(mails=>{
            send_emails = mails.map(mail => mail.email);
            return send_emails
        }).then(emails=>{
                console.log(emails);
                const message = {
                    // from: req.user.email,
                    to: emails,
                    subject:  subject,
                    text: message1
                  };
                  transporter.sendMail(message).then(result=>{
                    console.log(result);
                    // res.redirect("/details");
                  }).catch(error=>{
                    console.log(error);
                  })
            })
        .catch(err=>{
            console.log(err)
        })
    }
    res.json({message:"Mail sent"})
}
    exports.changePassword=async (req, res, next) => {
        console.log("Entered Change Password")
        const email = req.body.email
        console.log(email)
        const pass=req.body.password
        const Type=req.body.type
        console.log(Type)
        let OTP = Math.floor(Math.random() * 1000000)
        const payload = { some: 'data' };
        const secret = crypto.randomBytes(32).toString('hex');
        const options = {
            algorithm: 'HS256',

            expiresIn: '1h',
        };

        let token = jwt.sign(payload, secret, options).slice(20,41);
        console.log(token)
        const r = await changePassword.findOne({email: email})
        if(r){
            await changePassword.findOneAndDelete({email:email})
        }
        let user
        const usr= await User.findOne({email:email})
        const admin=await Admin.findOne({email:email})
        const agent=await Agent.findOne({email:email})
        if(Type==='User'){
            user=usr
        }else if(Type==='Admin'){
            user=admin
        }
        else if(Type==='Agent'){
            user=agent
        }
        console.log('pasword user'+user)
       if(user) {
           console.log(user)
           bcrypt.hash(pass,11).then(async hashed => {
               passchange = new changePassword({
                   userID: req.user,
                   email: email,
                   OTP: OTP,
                   phone: '+91' + user.phone,
                   createdAt: new Date(),
                   newPassword:hashed,
                   token:token
               })
               await passchange.save().then(()=>{
                   console.log('OTP1 '+OTP)
               })

           })



           await transporter.sendMail({
               to: email,
               from: 'dattasandeep000@gmail.com',
               subject: 'Genesis Insurances OTP for password change!',
               html: `Dear user your otp to change your password is ${OTP}`
           });

           res.json({token:token})

       }else{
           res.json({msg:'Sorry your email or phone number are not linked to our Genesis!Please enter valid details.'})
       }
}

exports.getOTPVerifier=(req,res,next)=>{
    console.log('Entered getOTPVerify')
    res.render('otpverifier',{err:'',token:req.params.token})
}

exports.verifyOTP=async (req, res, next) => {
    console.log('Entered verifyOTP')
    const otp = req.body.OTP
    console.log(otp)
    const ctoken = req.body.token
    console.log('token '+ctoken)
   const r = await changePassword.findOne({token: ctoken})
        console.log(r)
        if(r) {
            console.log(r.OTP==otp)
            if (r.OTP == otp) {
                const ussr=await User.findOne({email:r.email})
                const admn=await Admin.findOne({email:r.email})
                if(ussr){
                    User.updateOne({email: r.email}, {password: r.newPassword}).then(y => {
                        console.log('Updated Password')
                        res.json({msg:"Password updated successfully!"})
                    })
                }
                else if(admn){
                    const admin=await Admin.findOne({email:r.email})
                    if(admin){
                        Admin.updateOne({email:r.email},{password:r.newPassword}).then(y => {
                            console.log('Updated Password')
                            res.json({msg:"Password updated successfully!"})
                        })
                    }
                }
                else{
                    const admin=await Agent.findOne({email:r.email})
                    if(admin){
                        Agent.updateOne({email:r.email},{password:r.newPassword}).then(y => {
                            console.log('Updated Password')
                            res.json({msg:"Password updated successfully!"})

                        })
                    }
                }



            } else {
                res.json({msg: 'Incorrect OTP.'})
            }


        }
}

exports.getMyApps=async (req, res, next) => {
    console.log("Entered my apps")
    let arr=[]
    console.log(req.body)
    const arr1 = await transportApplications.find({applier:req.body.id})
    const arr2 = await lifeApplications.find({applier:req.body.id})
    const arr3 = await healthApplications.find({applier:req.body.id})
    arr=arr.concat(arr1,arr2,arr3)
    // console.log(arrr[1].policyType)
    // res.render('my-applications',{arr:arrr})
    res.status(200).json(arr)
    console.log("Sent apps!")
}

exports.searchMyApps=async (req, res, next) => {

    const search = req.body.search
    const searchType = req.body.searchType
    let arrr = []

    if(searchType==='Life'){
        const arr2 = await lifeApplications.find({applier: req.body.id})
        res.json(arr2)

    }else if(searchType==='Motor'){
        const arr1 = await transportApplications.find({applier: req.body.id})
        res.json(arr1)

    }else if(searchType==='Health'){
        const arr3 = await healthApplications.find({applier: req.body.id})
        res.json(arr3)

    }else if(searchType==='Id') {

        const arr1 = await transportApplications.find({_id: search})
        const arr2 = await lifeApplications.find({_id: search})
        const arr3 = await healthApplications.find({_id: search})
        arrr = arrr.concat(arr1, arr2, arr3)


        res.json(arrr)
    }
    
}
exports.GetMyPolicies = async (req,res) => {
    console.log("Entered Function")
    const email = req.body.email;
    console.log("i am get policies",email)
    try {

        const user = await User.findOne({email: email });
        console.log("USER:::::::::::::::::::::::")
        console.log(user)

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        const currentPolicies = user.currentPolicies.map(policy => ({
            policyId:policy.policyId,
            beneficiaryDetails: policy.beneficiaryDetails,
            type: policy.type,
            name: policy.name,
            amount: policy.amount,
            term: policy.term,
            status: policy.status
        }));

        res.status(200).json({ currentPolicies });
    } catch (error) {
        console.error('Error fetching user and policies:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
