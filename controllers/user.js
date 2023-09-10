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
    lifePolicy.find({}).then(arrr=>{

        res.render('lifepolicy',{array:arrr})

    })
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
        res.render('buypolicy',{arr:policy})
    })

}
exports.getPolicyPage=(req,res,next)=>{
    console.log(req.params.id)
    healthPolicy.findById(req.params.id).then((policy)=>{
        res.render('policypage',{array:policy})
    })}
exports.gethealthPolicy=async (req,res,next)=>{
    console.log('entered health policy');
    await healthPolicy.find({}).then((arrr)=>{
        console.log(arrr);
        res.render('healthpolicies',{array:arrr})
    })
}

exports.getDetails=(req,res,next)=>{
    // console.log(req.session.type+' Details : '+req.user._id)
if(!req.user){
        res.render('404')
    }
    else {
        if (req.session.type === 'User') {
            res.render('details',
                {
                    name: req.user.name, email: req.user.email,
                    age: req.user.age, sex: req.user.sex, address: req.user.address, phone: req.user.phone
                })
        } else if (req.session.type === 'Admin') {
            res.render('admin-details',
                {
                    name: req.user.name, email: req.user.email,
                    age: req.user.age, sex: req.user.sex, address: req.user.address, phone: req.user.phone
                })
        } else if (req.session.type === 'Agent') {

            res.render('admin-details', {
                    name: req.user.name, email: req.user.email,
                    age: req.user.age, sex: req.user.sex, address: req.user.address, phone: req.user.phone
                }
            )
        }
    }


}

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
        const client = await MongoClient.connect('mongodb+srv://dattasandeep000:13072003@sandy.p06ijgx.mongodb.net/G1?retryWrites=true&w=majority', { useNewUrlParser: true });
        const db = await client.db();
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
                                req.session.destroy()},15000*1000)
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
            html: `<h1>Dear ${name} ,</h1><h2>Agent Name: G Manohar</h2><h2>Agent mail: mano@gmail.com</h2>`
        }).then(r => {
                console.log('Mail sent!!');
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
        else if(req.session.type==='Admin'){

            Admin.findByIdAndUpdate(req.user._id,{name: name, address: address, email: email, phone: phone})
                .then(r => {
                    res.redirect('/details')
                    console.log('Admin updated')
                    // console.log(r)
                })
        }
        else{
            Agent.findByIdAndUpdate(req.user._id,{name: name, address: address, email: email, phone: phone})
                .then(r => {
                    res.redirect('/details')
                    console.log('Agent updated')
                    // console.log(r)
                })
        }
    }

    exports.deleteAcc = async (req, res) => {

        const email=req.user.email+"deletedaccount"
      if(req.session.type==='User') {


          await User.updateOne({_id: req.user._id}, {email: email, deleted: true}).then(r => {

              res.redirect('/')
              console.log('User deleted')
          })
          console.log('Deleted the user!')
      }
      else if(req.session.type==='Agent'){
          await Agent.updateOne({_id:req.user._id},{email: email, isActive: false}).then(r => {

              res.redirect('/')
              console.log('Agent deleted')
          })
          console.log('Deleted the user!')
      }
      else if(req.session.type==='Admin'){
          await Admin.updateOne({_id:req.user._id},{email:email,deleted:true}).then(r => {

              res.redirect('/')
              console.log('Admin deleted')
          })
          console.log('Deleted the user!')
      }

    }

    exports.dropReview=(req,res,next)=>{

        console.log("entered dropreview")
        const name=req.body.name;
        const email=req.body.email;
        const review=req.body.review;
 console.log(name,email,review)
        const r=new Review({
            name:name,
            email:email,
            review:review
        })

        r.save()
            .then(t=>{
                console.log('Review sent')
                // res.redirect('/services')
                return transporter.sendMail({
                    to: email,
                    from: 'dattasandeep000@gmail.com',
                    subject: 'Genesis Insurances Review!',
                    html: `Dear ${name}, Thankyou for your valuable review.We always try our best to keep up with your expectations!`
                });
            })

    }
    exports.quotegenerator= (req, res) => {
        console.log('Entered quote')
        const name = req.body.name;
        const email = req.body.email;
        const insuranceType = req.body.insuranceType;
        const zip = req.body.zip;
        const age = parseInt(req.body.age);
        const dob = new Date(req.body.dob);
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
            text: `Dear ${name}, your insurance quote is ${quote}.`
          };
          transporter.sendMail(message).then(result=>{
            console.log(result);
            // res.redirect("/services");
          }).catch(error=>{
            console.log(error);
          })
          
          
   
      };


exports.postaddpolicy = (req,res,next)=>{
    const name = req.body.name;
    const type = req.body.type.trim();
    const amount = req.body.amount;
    const term = req.body.term;
    const duration=req.body.duration
    const details = req.body.details;
    const TC = req.body.tc;
    const GE = req.body.ge;
    const benefits = req.body.benefits;
    console.log(type)
    if (type == "life".trim()) {
        console.log(req.body.premium)
       const Life =  new lifePolicy(
        {
            name:name,
            type:type,
            coverAmount:amount,
            duration:duration,
            term:req.body.term,
            Premium:req.body.premium,
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
        console.log('Entered car')
       const trans_policy = new transportPolicy(
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
        res.redirect("/details");
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
        const email = req.body.email
        const pass=req.body.password
        const Type=req.body.Type
        const OTP = Math.floor(Math.random() * 1000000)
        const payload = { some: 'data' };
        const secret = crypto.randomBytes(32).toString('hex');
        const options = {
            algorithm: 'HS256',

            expiresIn: '1h',
        };

        const token = jwt.sign(payload, secret, options).slice(0,20);
        console.log(token)
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


           const account_sid = process.env.TWILIO_ACCOUNT_SID
           const auth_token = process.env.TWILIO_AUTH_TOKEN
           const client = twilio(account_sid, auth_token);

           client.messages.create({
               body: 'Dear user your OTP to for changing password is ' + OTP,
               from: '+16813346876',
               to: '+91'+user.phone
           })
               .then(message => {
                   console.log('OTP2 '+OTP)
                   console.log(message.sid);
                   console.log('token1 '+token)
                   console.log('/verifyOTP/email/'+email+'/token/'+token)
                   res.redirect('/verifyOTP/'+token)
               })
               .catch(error => console.error(error));
       }else{
           res.render('change-password',{err:'Sorry your email or phone number are not linked to our Genesis!Please enter valid details.'})
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
            if (r.OTP == otp) {
                const ussr=await User.findOne({email:r.email})
                const admn=await Admin.findOne({email:r.email})
                if(ussr){
                    User.updateOne({email: r.email}, {password: r.newPassword}).then(y => {
                        console.log('Updated Password')
                        res.redirect('/login')
                    })
                }
                else if(admn){
                    const admin=await Admin.findOne({email:r.email})
                    if(admin){
                        Admin.updateOne({email:r.email},{password:r.newPassword}).then(y => {
                            console.log('Updated Password')
                            res.redirect('/login')
                        })
                    }
                }
                else{
                    const admin=await Agent.findOne({email:r.email})
                    if(admin){
                        Agent.updateOne({email:r.email},{password:r.newPassword}).then(y => {
                            console.log('Updated Password')
                            res.redirect('/login')
                        })
                    }
                }



            } else {
                res.render('otpverifier', {err: 'Incorrect OTP.',token:''})
            }


        }
}

exports.getMyApps=async (req, res, next) => {

    let arrr=[]
    const arr1 = await transportApplications.find({applier:req.user._id})
    const arr2 = await lifeApplications.find({applier:req.user._id})
    const arr3 = await healthApplications.find({applier:req.user._id})
     arrr=arrr.concat(arr1,arr2,arr3)
    // console.log(arrr[1].policyType)
    res.render('my-applications',{arr:arrr})
}

exports.searchMyApps=async (req, res, next) => {

    const search = req.body.search
    const searchType = req.body.searchType
    let arrr = []

    if(searchType==='Life'){
        const arr2 = await lifeApplications.find({applier: req.user._id})
        res.render('my-applications', {arr: arr2})

    }else if(searchType==='Motor'){
        const arr1 = await transportApplications.find({applier: req.user._id})
        res.render('my-applications', {arr: arr1})

    }else if(searchType==='Health'){
        const arr3 = await healthApplications.find({applier: req.user._id})
        res.render('my-applications', {arr: arr3})

    }else if(searchType==='Id') {

        const arr1 = await transportApplications.find({_id: search})
        const arr2 = await lifeApplications.find({_id: search})
        const arr3 = await healthApplications.find({_id: search})
        arrr = arrr.concat(arr1, arr2, arr3)


        res.render('my-applications', {arr: arrr})
    }
    
}
