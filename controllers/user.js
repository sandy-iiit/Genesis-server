const User = require("../models/User");
const bcrypt = require('bcryptjs');

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const Query = require("../models/Query");


const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key:'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',
        }
    })
);

exports.getHealthPolicyPage=(req,res)=>{
    res.render('policypage',{login:req.cookies['cookieName']})
}

exports.getBuyPolicy=(req,res,next)=>{
    res.render('buypolicy',{login:req.cookies['cookieName']})
}
exports.getLifePolicy=(req,res,next)=>{
    res.render('lifepolicy',{arr:arr,login:req.cookies['cookieName']})
}
exports.getVehiclePolicies=(req,res,next)=>{
    res.render('transportpolicies',{array:arr,login:req.cookies['cookieName']})
}
exports.getLogin =(req,res,next)=>{
    res.render('login',{text:'',login:req.cookies['cookieName']})
}
exports.getSignup =(req,res,next)=>{
    res.render('signup',{login:'',text:''})
}

exports.getHome=(req,res,next)=>{
    res.render('home',{login:req.cookies['cookieName']})
}
arr=[{name:'insurance name',term:'x yrs',percentage:90+'%',cost:'f'},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:'f'},
    {name:'insurance name',term:'x yrs',percentage:90+'%',cost:'f'},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:'f'},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:''},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:''},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:''},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:''},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:''},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:''},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:''},{name:'insurance name',term:'x yrs',percentage:9000+'%',cost:''}]
exports.getHealthPolicies=(req,res,next)=>{

    res.render('healthpolicies',{array:arr,login:req.cookies['cookieName']})
}
exports.getVehiclePolicies=(req,res,next)=>{
    res.render('transportpolicies',{array:arr,login:req.cookies['cookieName']})
}

exports.getDetails=(req,res,next)=>{
    res.render('details',
        {login:req.cookies['cookieName'],name:req.cookies['user'].name,email:req.cookies['user'].email,
        age:req.cookies['user'].age,sex:req.cookies['user'].sex,address:req.cookies['user'].address,phone:req.cookies['user'].phone})
}

exports.getMyDetails=(req,res,next)=>{
    console.log(req.cookies['cookieName'])
    res.render('my-details',{login:req.cookies['cookieName']})
}

exports.getPasswordChange=(req,res,next)=>{
    res.render('change-password',{login:req.cookies['cookieName']})
}
const array2=[{name:'Term Insurance',Duration:2+'yrs',Installment:300,type:'motor'},{type:'life',name:'Term Insurance',Duration:5+'yrs',Installment:500},
    {type:'health',name:'Term Insurance',Duration:2+'yrs',Installment:300},{name:'Term Insurance',Duration:2+'yrs',Installment:300}
,{name:'Term Insurance',Duration:2+'yrs',Installment:300},{name:'Term Insurance',Duration:2+'yrs',Installment:30000},
    {name:'Term Insurance',Duration:2+'yrs',Installment:30000},{name:'Term Insurance',Duration:2+'yrs',Installment:30000},{name:'Term Insurance',Duration:2+'yrs',Installment:30000},
    {name:'Term Insurance',Duration:2+'yrs',Installment:780000}]
exports.getMyPolicies=(req,res)=>{
    res.render('my-policies',{arr:array2,str:'Explore Plan',login:req.cookies['cookieName']})
}
exports.getCurrentPolicies=(req,res)=>{
    res.render('my-policies',{arr:array2,str:'Pay Installments',login:req.cookies['cookieName']})
}
exports.getPayment=(req,res)=>{
    res.render('payment',{login:req.cookies['cookieName']})
}
const arr3=[{Q:"Cant I Pay my installments collectively for my plan id of Motor32AP?",A:'Yes"Sed ut aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodiluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi conseq consequatur? Quis au perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"'},
    {Q:"Cant I Pay my installments collectively for my plan id of Motor32AP?",A:'Yes'},{Q:"Cant I Pay my installments collectively for my plan id of Motor32AP?",A:'Yes'},
    {Q:"Cant I Pay my installments collectively for my plan id of Motor32AP?",A:'Yes'},
    {Q:"Cant I Pay my installments collectively for my plan id of Motor32AP?",A:'Yes'}]
exports.getMyQueries=async (req, res) => {
    console.log(req.cookies['user'].id)
    const arrr = await Query.findAll({where: {askedBy: req.cookies['user'].id}})

    res.render('my-queries', {arr: arrr, login: req.cookies['cookieName']})
}

exports.getWriteQuery=(req,res)=>{
    res.render('write-query',{login:req.cookies['cookieName']})
}

exports.getTransportForm=(req,res)=>{
    res.render('transport-form',{login:req.cookies['cookieName']})
}
exports.getLifeForm=(req,res)=>{
    res.render('life-form',{login:req.cookies['cookieName']})
}
exports.getHealthForm=(req,res)=>{
    res.render('health-form',{login:req.cookies['cookieName']})
}
exports.getAdminQueries=(req,res)=>{
    res.render('admin-queries',{arr:arr3,login:req.cookies['cookieName']})
}

exports.getServices=(req,res)=>{
    res.render('services',{login:req.cookies['cookieName']})
}
exports.getAboutUs=(req,res)=>{
    res.render('aboutus',{login:req.cookies['cookieName']})
}
exports.getPolicies=(req,res)=>{
    res.render('policies',{login:req.cookies['cookieName']})
}
exports.getContactUs=(req,res)=>{
    res.render('contactus',{login:req.cookies['cookieName']})
}








const alpha=['A','B','C','D','E','F','G','H']

exports.postSignup=(req,res)=>{
    console.log('Entered Post signup')
    const name=req.body.name
    const age =req.body.age
    const sex = req.body.sex
    const address=req.body.address
    const email=req.body.email
    const phone=req.body.phone
    const password=req.body.password
    const id= Math.floor(Math.random()*100000)
    console.log([name,email,age,sex,address,phone,password,id])
    bcrypt.hash(password,12).
    then(async hashedPassword => {
            const user = await User.findOne({where: {email: email}})
            console.log('User')
            console.log(user)
            if (!user) {
                const passwordRegex = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$";
                console.log(password)
                const isValid = password.match(passwordRegex);
                console.log('isvalid' + isValid)
                if (isValid) {

                    console.log('User creation started!')
                    User.create({
                        id: id,
                        name: name,
                        age: age,
                        sex: sex,
                        email: email,
                        address: address,
                        phone: phone,
                        password: hashedPassword,

                    }).then(r => {
                        console.log('User added')
                        res.redirect('/login')
                        return transporter.sendMail({
                            to: email,
                            from: 'dattasandeep000@gmail.com',
                            subject: 'Genesis Insurances Signup succeeded!',
                            html: '<h1>You successfully signed up!</h1>'
                        });
                    })
                        .catch(err => {
                            console.log(err)
                            console.log('Not created')
                        });
                } else {
                    res.render('signup', {
                        login: '',
                        text: 'Password must contain at least one uppercase letter, one lower case character, and one number, and be at least 8 characters long.'
                    })

                }
            } else {
                res.render('signup', {login: '', text: 'You already have an account!'})
            }
        }

        )

}

exports.postLogin=async (req,res)=>{
    const name=req.body.name
    const email=req.body.email
    const password=req.body.password
    const type=req.body.type
    console.log(type)
if(type==='User') {
    await User.findOne({where: {email: email, name: name}})
        .then(r => {
            if (r) {
                bcrypt.compare(password, r.password, (err, matched) => {
                    console.log(password)
                    console.log(r.password)
                    if (!matched) {
                        res.render('login', {text: 'Invalid Password!', login: false})
                        console.log('Not matched')
                        // res.send('Incorrect password')
                    } else if (matched) {

                        res.cookie('cookieName', true, {maxAge: 900000});
                        res.cookie('type', 'user', {maxAge: 900000});
                        res.cookie('user',r,{maxAge: 900000})
                        res.redirect('/')
                        console.log('You have logged in')
                        // console.log(req.cookies['user'].name)
                    }
                })
            } else {
                res.render('login', {text: 'Enter valid email!',login:req.cookies['cookieName']})

            }


        })
}



}

exports.postLogout=(req,res)=>{
    res.clearCookie('cookieName')
    res.clearCookie('user')
    res.clearCookie('type')
    console.log(req.cookies['cookieName'])
    console.log(req.cookies['user'])
    console.log(req.cookies['type'])
    res.redirect('/')
    // res.render('home',{login:req.cookies['cookieName']})
}

exports.postWriteQuery=(req,res)=>{

    const query=req.body.question
    const answer='Yet to be Answered'
    const id=Math.floor(Math.random()*10000)

    Query.create({
        id: id,
        question: query,
        answer: answer,
        askedBy:req.cookies['user'].id,
    }).then(r  =>{
        console.log('query added successfully!')
        res.redirect('/')
    })
}

exports.postFindAgent=(req,res)=>{
    const email=req.body.email
    const name=req.body.name
    console.log(email)
    transporter.sendMail({
        to: email,
        from: 'dattasandeep000@gmail.com',
        subject: 'Genesis Insurances Agent found!',
        html: '<h1>Dear customer,</h1><h2>Agent Name: G Manohar</h2><h2>Agent mail: mano@gmail.com</h2>'
    }).then(r =>{
        console.log('Mail sent!!');
    res.redirect('/')}
    )

}