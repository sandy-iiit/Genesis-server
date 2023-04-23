const User = require("../models/User");
const user22 = require("../models/user2");
const bcrypt = require('bcryptjs');
const employee = require('../models/employee');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const Query = require("../models/Query");
const Admin=require('../models/Admin');
const transportPolicy=require('../models/transportpolicy-details');
const lifepPolicy=require('../models/lifepolicy-details');
const changePassword=require('../models/passwordChange');
const Review=require('../models/Review');
const Sequelize=require('sequelize')
const twilio = require("twilio");
const user = require("../models/user2");
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
            pass: 'akkkheqzgiwbscmz'
        },
    }
);

exports.getHealthPolicyPage=(req,res)=>{
    res.render('policypage')
}
exports.getVehiclePolicies=async (req, res, next) => {
    await transportPolicy.find().then((arrr)=>{
        res.render('transportpolicies', {array: arrr})
    })
}

exports.getBuyPolicy2=(req,res,next)=>{
    res.render('buy-policy2')
}
exports.getLifePolicy=(req,res,next)=>{
    lifepPolicy.find({}).then(arrr=>{

        res.render('lifepolicy',{array:arrr})

    })
}

exports.getLogin =(req,res,next)=>{
    res.render('login',{text:''})
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
        res.render('buypolicy',{arr:policy})
    })

}

exports.getDetails=(req,res,next)=>{
    // console.log(req.session.type+' Details : '+req.user._id)
    if(req.session.type==='User'){
        res.render('details',
            {name:req.user.name,email:req.user.email,
                age:req.user.age,sex:req.user.sex,address:req.user.address,phone:req.user.phone})
    }
    else if(req.session.type==='Admin'){
        res.render('admin-details',
            {name:req.user.name,email:req.user.email,
                age:req.user.age,sex:req.user.sex,address:req.user.address,phone:req.user.phone})
    }
    else if(req.session.type==='Agent'){
        
        res.render('agentboard',{
            
            name:req.user.name
        })
    }

}

exports.getMyDetails=(req,res,next)=>{
    res.render('my-details')
}

exports.getPasswordChange=(req,res,next)=>{
    res.render('change-password')
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
    console.log(req.user._id)
    const arrr = await Query.find( {askedBy: req.user._id})
    console.log(arrr[0])
    res.render('my-queries', {arr: arrr})
}

exports.getWriteQuery=(req,res)=>{
    res.render('write-query')
}

exports.getTransportForm=async (req, res) => {
    await transportPolicy.findById(req.params.id).then((r) => {
        res.render('transport-form', {r: r,applier:req.user._id})

    })
}
exports.getLifeForm=(req,res)=>{
    res.render('life-form')
}
exports.getHealthForm=(req,res)=>{
    res.render('health-form')
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
    lifepPolicy.findById(req.params.id).then((policy)=>{
        res.render('buypolicylife',{array:policy})
    })
}





const alpha=['A','B','C','D','E','F','G','H']

exports.postSignup=(req,res)=> {
    console.log('Entered Post signup')
    const name = req.body.name
    const age = req.body.age
    const sex = req.body.sex
    const address = req.body.address
    const email = req.body.email
    const phone = req.body.phone
    const password = req.body.password
    const id = Math.floor(Math.random() * 100000)
    console.log([name, email, age, sex, address, phone, password, id])
    bcrypt.hash(password, 12).then(async hashedPassword => {
        const user = await User.findOne({email: email})
        console.log('User')
        console.log(user)
        if (!user) {
            const passwordRegex = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$";
            const phoneRegex = '^[6-9]\\d{9}$'
            console.log(password)
            const isValid = password.match(passwordRegex);
            const isValid2 = phone.match(phoneRegex)
            console.log('isvalid' + isValid)
            console.log('isvalid2' + isValid2)
            if (isValid && isValid2) {

                console.log('User creation started!')
                const user2 = new User({
                    id: id,
                    name: name,
                    age: age,
                    sex: sex,
                    email: email,
                    address: address,
                    phone: phone,
                    password: hashedPassword,

                });

                return user2.save()


            } else {
                if (!isValid) {
                    res.render('signup', {
                        login: '',
                        text: 'Password must contain at least one uppercase letter, one lower case character, and one number, and be at least 8 characters long.'
                    })
                } else if (!isValid2) {
                    res.render('signup', {
                        login: '',
                        text: 'Enter valid phone number'
                    })
                }
            }
        }

    }).then(result => {


        res.redirect('/login')

        return transporter.sendMail({
            to: email,
            from: 'dattasandeep000@gmail.com',
            subject: 'Genesis Insurances Signup succeeded!',
            html: '<h1>You successfully signed up!</h1>'
        });

    })
}

exports.postemployeesignup = (req,res,next)=>{
  const name = req.body.name;
 const  email =  req.body.email;
 const   age = req.body.age;
 const   sex = req.body.sex;
 const   aadhar =req.body.aadhar;
  const  address = req.body.address;
  const  phone =  req.body.phone;
  const  password = req.body.password;
  const  dob=req.body.dob
console.log(name,email,age,sex,aadhar,address,phone,password,dob);
 
bcrypt.hash(password,12).then(async hashedpassword=>{
    const employ = await employee.findOne({email:email})
    console.log('employ')
    console.log(employ)
    if (!employ) {
        const passwordRegex = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$";
        const phoneRegex = '^[6-9]\\d{9}$'
        console.log(password)
        const isValid = password.match(passwordRegex);
        const isValid2 = phone.match(phoneRegex)
        console.log('isvalid' + isValid)
        console.log('isvalid2' + isValid2)
        if (isValid && isValid2) {

            console.log('Employee creation started!')
           
            const Employee = new employee({name:name,
                email:email,
                age:age,
               sex:sex,
            aadhar:aadhar,
            address:address,phone:phone,password:hashedpassword,dob:dob})
            console.log(Employee)
             return Employee.save()


        } else {
            if (!isValid) {
                res.render('signup', {
                    login: '',
                    text: 'Password must contain at least one uppercase letter, one lower case character, and one number, and be at least 8 characters long.'
                })
            } else if (!isValid2) {
                res.render('signup', {
                    login: '',
                    text: 'Enter valid phone number'
                })
            }
        }
    }
}).then(result=>{
    res.redirect('/login')
    console.log(result)
    return transporter.sendMail({
        to: email,
        from: 'dattasandeep000@gmail.com',
        subject: 'Thanks for enrolling',
        html: '<h1>meet you in office</h1>'
    });

})
}
    exports.postLogin = async (req, res) => {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const type = req.body.type
        console.log(type)
        if (type === 'User') {
            const user=await User.findOne({email: email})

                    if (user) {
                        bcrypt.compare(password, user.password, (err, matched) => {
                            console.log(password)
                            console.log(user.password)
                            if (!matched) {
                                res.render('login', {text: 'Invalid Password!', login: false})
                                console.log('Not matched')
                                // res.send('Incorrect password')
                            } else if (matched) {
                                req.session.isLoggedIn = true;
                                req.session.user = user;
                                req.session.type=type;
                                return req.session.save(err => {
                                    console.log(err);
                                    res.redirect('/');
                                    console.log('You have logged in')
                                    setTimeout(()=>{
                                        console.log('Entered Timeout')
                                        req.session.destroy()},900*1000)
                                });

                                // console.log(req.cookies['user'].name)
                            }
                        })
                    } else {
                        res.render('login', {text: 'Enter valid email and username!'})

                    }



        }else if(type==='Admin'){
            const admin=await Admin.findOne({email: email})

            if (admin) {
                bcrypt.compare(password, admin.password, (err, matched) => {
                    console.log(password)
                    console.log(admin.password)
                    if (!matched) {
                        res.render('login', {text: 'Invalid Password!', login: false})
                        console.log('Not matched')
                        // res.send('Incorrect password')
                    } else if (matched) {
                        req.session.isLoggedIn = true;
                        req.session.user = admin;
                        console.log('admin session set')
                        
                        req.session.type=type;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                            console.log('You have logged in')
                            
                            setTimeout(()=>{
                                console.log('Entered Timeout')
                                req.session.destroy()},900*1000)
                        });

                        // console.log(req.cookies['user'].name)
                    }
                })
            } else {
                res.render('login', {text: 'Enter valid email and username!'})

            }
        }

        else if(type === 'Agent'){
            const employ = await employee.findOne({email:email})
            if(employ){
             bcrypt.compare(password, employ.password, (err, matched) => {
                    console.log(password)
                    console.log(employ.password)
                    if (!matched) {
                        res.render('login', {text: 'Invalid Password!', login: false})
                        console.log('Not matched')
                        // res.send('Incorrect password')
                    } else if (matched) {
                        if(employ.isActive == true){
                        req.session.isLoggedIn = true;
                        req.session.user = employ;
                        console.log(req.session.user)
                        console.log('employee session set')
                        console.log()
                        req.session.type=type;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                            console.log('You have logged in employee')
                            setTimeout(()=>{
                                console.log('Entered Timeout')
                                req.session.destroy()},900*1000)
                        });
                      
                        // console.log(req.cookies['user'].name)
                    }
                    else{
                        res.render('login', {text: 'wait for approval', login: false})
                        console.log('No aPRROVAL')
                    }
                }
                })
            }
        }

    }

    exports.postLogout = async (req, res) => {
        await req.session.destroy()
        console.log(req.session)
        res.redirect('/')
        // res.redirect('/')
        // res.render('home',{login:req.cookies['cookieName']})
    }

    exports.postWriteQuery = (req, res) => {

        const query = req.body.question
        const answer = 'Yet to be Answered'


       const Q=new Query({
            question: query,
            answer: answer,
            askedBy: req.user._id,
            status:'Not Answered',
           askDate:new Date().toDateString(),
        });
           Q.save().then(r => {
            console.log('query added successfully!')
            res.redirect('/details')
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
            html: '<h1>Dear customer,</h1><h2>Agent Name: G Manohar</h2><h2>Agent mail: mano@gmail.com</h2>'
        }).then(r => {
                console.log('Mail sent!!');
                res.redirect('/')
            }
        ).catch(err => {
            console.log(err)
        })

    }
    exports.getSettings = (req, res) => {
        res.render('settings')
    }

    exports.updateDetails = (req, res) => {
        const name = req.body.name
        const address = req.body.address
        const email = req.body.email
        const phone = req.body.phone

        console.log('Name ' + name)
        if(req.session.type==='User'){

            User.findByIdAndUpdate(req.user._id,{name: name, address: address, email: email, phone: phone})
                .then(r => {
                    res.redirect('/details')
                    console.log('User updated')
                    // console.log(r)
                })
        }
        else{

            Admin.findByIdAndUpdate(req.user._id,{name: name, address: address, email: email, phone: phone})
                .then(r => {
                    res.redirect('/details')
                    console.log('Admin updated')
                    // console.log(r)
                })
        }
    }

    exports.deleteAcc = (req, res) => {


        User.findByIdAndDelete(req.user._id).then(r => {

            res.redirect('/')
            console.log('User deleted')
        })
        console.log('Deleted the damn user!')
    }

    exports.dropReview=(req,res,next)=>{

        const name=req.body.name;
        const email=req.body.email;
        const review=req.body.review;

        const r=new Review({
            name:name,
            email:email,
            review:review
        })

        r.save()
            .then(t=>{
                console.log('Review sent')
                res.redirect('/services')
                return transporter.sendMail({
                    to: email,
                    from: 'dattasandeep000@gmail.com',
                    subject: 'Genesis Insurances Review!',
                    html: '<h1>ThankYou for your valuable review.We always try our best to keep up with your expectations!</h1>'
                });
            })

    }
    exports.quotegenerator= (req, res) => {
      
        const name = req.body.quotnam;
        const email = req.body.quotemail;
        const insuranceType = req.body.quotinsurance;
        const zip = req.body.quotzip;
        const age = parseInt(req.body.quotage);
        const dob = new Date(req.body.quotdob);
        const coverageLimit = parseInt(req.body.quotcoverage);
      
       
        let quote = 0;
        switch (insuranceType) {
          case 'life':
         
            if (age < 18) {
              quote = 50;
            } else if (age >= 18 && age < 35) {
              quote = 100;
            } else if (age >= 35 && age < 50) {
              quote = 200;
            } else {
              quote = 500;
            }
            break;
          case 'transportation': 
            if (zip.startsWith('10') || zip.startsWith('11')) {
              quote = 100;
            } else if (zip.startsWith('12') || zip.startsWith('13')) {
              quote = 200;
            } else {
              quote = 500;
            }
            break;
          case 'health':
         
            if (age < 18) {
              quote = 50 + coverageLimit / 1000;
            } else if (age >= 18 && age < 35) {
              quote = 100 + coverageLimit / 1000;
            } else if (age >= 35 && age < 50) {
              quote = 200 + coverageLimit / 1000;
            } else {
              quote = 500 + coverageLimit / 1000;
            }
            break;
          default:
          
            res.status(400).send('Invalid insurance type');
            return;
        }
        const message = {
            from: 'manumanohar62405@gmail.com',
            to: email,
            subject: 'Your Insurance Quote',
            text: `Dear ${name}, your insurance quote is ${quote}.`
          };
          transporter.sendMail(message).then(result=>{
            console.log(result);
            res.redirect("/services");
          }).catch(error=>{
            console.log(error);
          })
          
          
   
      };


exports.postaddpolicy = (req,res,next)=>{
    const name = req.body.name;
    const type = req.body.type.trim();
    const amount = req.body.amount;
    const term = req.body.duration;
    const details = req.body.details;
    const TC = req.body.tc;
    const GE = req.body.ge;
    const benefits = req.body.benefits;
    console.log(type)
    if (type == "life".trim()) {
       const Life =  new lifepPolicy(
        {
            name:name,
            type:type,
            coverAmount:amount,
            duration:term,
            term:req.body.term,
            premium:req.body.premium,
            details:details,
            TC:TC,
            GE:GE,
            benefits:benefits
    
            
        }
       );
       console.log(Life)
       Life.save().then(result=>{
        console.log("added new life policy");
        console.log(result);
        res.redirect("/designform");
    }).catch(err=>{
 console.log(err)
    })
    }
    else if(type=="car".trim()){
       const trans_policy = new transport_policy(
        {
            name:name,
            type:type,
            amount:amount,
            term:term,
            details:details,
            TC:TC,
            GE:GE,
            benefits:benefits

    });
    console.log(trans_policy);
    trans_policy.save().then(result=>{
        console.log("added new transport policy");
        console.log(result);
        res.redirect("/designform");
    }).catch(err=>{
 console.log(err)
    })
    }
   else if(type=="health") {

   }
   
}

exports.postpolicydetails =(req,res,next)=>{
    const email = req.body.email;
    User.find({email:email}).then(result=>{
        console.log(result);
        res.render('tractpolicy',{users:result})
    }).catch(err=>{
        console.log(err)
    })

}


exports.postsendemail=(req,res,next)=>{
    const type = req.body.recipient
    const subject = req.body.subject
    const message1 = req.body.message
    if(type=='particular_user'){
        const usermail = req.body.useremail
        const message = {
            from: req.user.email,
            to: usermail,
            subject:  subject,
            text: message1
          };
          transporter.sendMail(message).then(result=>{
            console.log(result);
            res.redirect("/details");
          }).catch(error=>{
            console.log(error);
          })
    }
    else if(type=='admin'){
        Admin.find({}).then(mails=>{
            send_emails = mails.map(mail => mail.email);
            return send_emails
        }).then(emails=>{
                console.log(emails);
                const message = {
                    from: req.user.email,
                    to: emails,
                    subject:  subject,
                    text: message1
                  };
                  transporter.sendMail(message).then(result=>{
                    console.log(result);
                    res.redirect("/details");
                  }).catch(error=>{
                    console.log(error);
                  })
            })
        .catch(err=>{
            console.log(err)
        })
    }
    else if(type=='users'){
        User.find({}).then(mails=>{
            send_emails = mails.map(mail => mail.email);
            return send_emails
        }).then(emails=>{
                console.log(emails);
                const message = {
                    from: req.user.email,
                    to: emails,
                    subject:  subject,
                    text: message1
                  };
                  transporter.sendMail(message).then(result=>{
                    console.log(result);
                    res.redirect("/details");
                  }).catch(error=>{
                    console.log(error);
                  })
            })
        .catch(err=>{
            console.log(err)
        })
    }
}
    exports.changePassword=async (req, res, next) => {

        const phone = '+91' + req.body.phone
        const email = req.body.email
        const OTP = Math.floor(Math.random() * 1000000)

        passchange = new changePassword({
            userID: req.user,
            email: email,
            OTP: OTP,
            phone: phone,
            createdAt: new Date()
        })

        await passchange.save()

       await transporter.sendMail({
            to: email,
            from: 'dattasandeep000@gmail.com',
            subject: 'Genesis Insurances OTP for password change!',
            html: `Dear user your otp to change your password is ${OTP}`
        });


        const account_sid = process.env.TWILIO_ACCOUNT_SID
        const auth_token = process.env.TWILIO_AUTH_TOKEN
        const client = twilio(account_sid, auth_token);

        client.messages.create({
            body: 'Dear user your OTP to for changing password is '+OTP,
            from: '+16813346876',
            to: phone
        })
            .then(message => {console.log(message.sid);res.render('otpverifier',{email})})
            .catch(error => console.error(error));
}


exports.verifyOTP=(req,res,next)=>{

}