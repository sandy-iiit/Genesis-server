
const queries=require('../models/Query')
const reviews=require('../models/Review')
 
const healthApplications=require('../models/health-application')
 
const User=require('../models/User')
const Policy=require('../models/Policy')
 
const lifeApplications=require('../models/life-application')
const transportApplications=require('../models/transport-application')
const nodemailer = require("nodemailer");

var TRANSPORTAPPLICATIONS=[]
var HEALTHAPPLICATIONS=[]
var LIFEAPPLICATIONS=[]

const transporter = nodemailer.createTransport(
    {
        service: "Gmail",

        auth: {
            user: 'dattasandeep000@gmail.com',
            pass: 'akkkheqzgiwbscmz'
        },
    }
);




 
exports.getAnswerQueries=(req,res,next)=>{

    queries.find({status:'Not Answered'}).then(arr=>{
        // console.log(arr)

        res.render('answer-queries',{arr:arr})
    })


}

exports.getAlreadyAnsweredQueries=(req,res,next)=>{
    queries.find({status:'Answered',answeredBy:req.user._id}).then(arr=>{
        console.log(arr)

        res.render('answer-queries',{arr:arr})
    })
}

exports.getReviews=async (req, res, next) => {

    reviews.find({}).then(arrr=>{
        res.render('reviews',{arr:arrr})
    })

}

exports.postAnswer=(req,res,next)=>{

    const params=req.params.queryId;
    const answer=req.body.answer + '---Answered by agent: '+req.user.name
    queries.findByIdAndUpdate(params,{answer:answer,status:'Answered',answeredBy:req.user._id,answerDate:new Date().toDateString()})
        .then(query=>{
            console.log('Query was answered')
            res.redirect('/details')
        })
        .catch(err=>{
            console.log(err)
        })


}

exports.getHealthApplications=(req,res,next)=>{

    healthApplications.find({verificationStatus:''})
        .then(zrr=>{
        res.render('health-applications',{arr:zrr})
    })
}
exports.getLifeApplications=(req,res,next)=>{

    lifeApplications.find({verificationStatus:''})
        .then(zrr=>{
        res.render('life-applications',{arr:zrr})
    })
}
exports.getTransportApplications=(req,res,next)=>{

    transportApplications.find({verificationStatus:''})
        .then(zrr=>{
            TRANSPORTAPPLICATIONS=zrr;
            console.log('Trans')
            console.log(TRANSPORTAPPLICATIONS)
        res.render('transport-applications',{arr:zrr})
    })
}
exports.getIndividualHealthApplication=(req,res,next)=>{
    console.log('Entered individual health application')
    healthApplications.findById(req.params.appId).then(zrr=>{

        res.render('individualHealthApplication',{
            firstName: zrr.firstName,
            lastName: zrr.lastName,
            aadhar: zrr.aadhar,
            sex:zrr.sex,
            pan:zrr.pan,
            dobProof:zrr.dobProof,
            nomineeAadhar:zrr.nomineeAadhar,
            nomineeAddressProof:zrr.nomineeAddressProof,
            healthCertificate:zrr.healthCertificate,
            healthCondition:zrr.healthCondition,
            nominee:zrr.nominee,
            nomineeAge:zrr.nomineeAge,
            nomineeRelation:zrr.nomineeRelation,
            policyId:zrr.policyId,
            policyName:zrr.policyName,
            policyType:zrr.policyType,
            appId:req.params.appId,

            amount:zrr.amount,
            applier:zrr.applier,
            term:zrr.policyTerm,
            duration:zrr.duration,
            Status:zrr.verificationStatus,

        })
    })
}

exports.getIndividualLifeApplication=(req,res,next)=>{
    console.log('Entered individual life application')

    lifeApplications.findById(req.params.appId).then(zrr=>{
        res.render('individualLifeApplication',{
            appId:req.params.appId,
            firstName: zrr.firstName,
            lastName: zrr.lastName,
            sex:zrr.sex,
            aadhar: zrr.aadhar,
            pan:zrr.pan,
            nomineeAadhar:zrr.nomineeAadhar,
            nomineeAddressProof:zrr.nomineeAddressProof,
            dobProof:zrr.dobProof,
            healthCertificate:zrr.healthCertificate,
            healthCondition:zrr.healthCondition,
            nominee:zrr.beneficiary,
            nomineeAge:zrr.beneficiaryAge,
            nomineeRelation:zrr.beneficiaryRelation,
            policyId:zrr.policyId,
            policyName:zrr.policyName,
            policyType:zrr.policyType,

            coverAmount:zrr.amount,
            applier:zrr.applier,
            term:zrr.policyTerm,
            duration:zrr.duration,
            Status:zrr.verificationStatus,

        })
    })
}
exports.getIndividualTransportApplication=(req,res,next)=>{
    console.log('Entered individual transport application')

    transportApplications.findById(req.params.appId).then(zrr=>{

        res.render('individualTransportApplication',{
            appId:req.params.appId,
            firstName:zrr.firstName,
            lastName:zrr.lastName,
            regNum:zrr.regNum,
            sex:zrr.sex,
            aadhar:zrr.aadhar,
            c_book:zrr.c_book,
            nomineeAadhar:zrr.nomineeAadhar,
            nomineeAddressProof:zrr.nomineeAddressProof,
            vehicleCompany:zrr.vehicleCompany,
            model:zrr.model,
            yearOfMfg:zrr.yearOfMfg,
            vehicleType:zrr.vehicleType,
            engine:zrr.engine,
            chassis:zrr.chassis,

            nominee:zrr.nominee,
            nomineeAge:zrr.nomineeAge,
            nomineeRelation:zrr.nomineeRelation,
            policyId:zrr.policyId,
            policyName:zrr.policyName,
            policyType:zrr.policyType,
            policyTerm:zrr.policyTerm,
            amount:zrr.amount,
            payType:zrr.payType,
            applier:zrr.applier,
            Status:zrr.verificationStatus,

        })
    })
}

exports.getHealthApplicationsSearch=(req,res,next)=>{
    console.log('entered the func')
    console.log(req.body.search)
    healthApplications.find({})
        .then(r=>{
            const arrr=[]
            for(let i=0;i<r.length;i++){
                let name=r[i].firstName+' '+r[i].lastName
                let Name=r[i].firstName.toLowerCase()+' '+r[i].lastName.toLowerCase()
                let nAME=r[i].firstName.toUpperCase()+' '+r[i].lastName.toUpperCase()
                if(name.includes(req.body.search) || Name.includes(req.body.search) || nAME.includes(req.body.search)){
                    console.log(name)
                    console.log(r[i])
                    arrr.push(r[i])
                }
            }
            res.render('health-applications',{arr:arrr})


        })
        .catch(err=>{
            console.log('err')
        })
}
 
exports.designform = (req,res,next)=>{
    res.render('designpolicy');
}
user=[];
exports.trackpolicy = (req,res,next)=>{
    res.render('tractpolicy',{users:user});
}
exports.employeesignuppage = (req,res,next)=>{
    res.render('employeesignup');
}

exports.getemailform = (req,res,next)=>{
    res.render('emailform');
}

exports.getcompanystats = (req,res,next)=>{
    res.render('companystats');
}

exports.getLifeApplicationsSearch=(req,res,next)=>{
    console.log('entered the func')
    console.log(req.body.search)
    lifeApplications.find({})
        .then(r=>{
            const arrr=[]
            for(let i=0;i<r.length;i++){
                let name=r[i].firstName+' '+r[i].lastName
                let Name=r[i].firstName.toLowerCase()+' '+r[i].lastName.toLowerCase()
                let nAME=r[i].firstName.toUpperCase()+' '+r[i].lastName.toUpperCase()
                if(name.includes(req.body.search) || Name.includes(req.body.search) || nAME.includes(req.body.search)){
                    console.log(name)
                    arrr.push(r[i])
                }
            }
            res.render('life-applications',{arr:arrr})
        })
        .catch(err=>{
            console.log('err')
        })
}
exports.getTransportApplicationsSearch=(req,res,next)=>{
    console.log('entered the func')
    console.log(req.body.search)
     transportApplications.find({})
         .then(async r=>{
     console.log('tarns2')
            const arrr=[]
             for(let i=0;i<r.length;i++){
                let name=r[i].firstName+' '+r[i].lastName
                let Name=r[i].firstName.toLowerCase()+' '+r[i].lastName.toLowerCase()
                let nAME=r[i].firstName.toUpperCase()+' '+r[i].lastName.toUpperCase()
                 console.log('Name '+name)
                if(name.includes(req.body.search) || Name.includes(req.body.search) || nAME.includes(req.body.search)){
                    console.log(name)
                    arrr.push(r[i])
                }
            }
                res.render('transport-applications',{arr:arrr})


        // })
        // .catch(err=>{
        //     console.log('err')
        // })
}
         )
}
exports.verifyTransport=async (req, res, next) => {
    const gender= req.user.sex==='Male'?'Mr':'Mrs'


    console.log('Entered verifyTransport')
    transportApplications.updateOne({_id: req.body.appId}, {verificationStatus: req.body.Status,verificationDate:new Date().toDateString()})
    const policy = new Policy.model({

        type: req.body.policyType,
        name: req.body.name,
        applier: req.body.applier,
        amount: req.body.amount,
        policyId: req.body.policyId,
        appId: req.body.appId,
        term: req.body.policyTerm,
        beneficiaryDetails: {
            name: req.body.nominee,
            age: req.body.nomineeAge,
            relation: req.body.nomineeRelation,

        },
        status: 'Ongoing'


    })
    const applier = await User.findById(req.body.applier)

    const email = applier.email
    const name = applier.name
    if (req.body.verificationStatus === 'verified')
    {
    policy.save();


    User.updateOne({_id: req.body.applier}, {$push: {currentPolicies: policy}}).then((r) => {

        console.log('Policy added to user!!! hooray')
        transporter.sendMail({
            to: email,
            from: 'dattasandeep000@gmail.com',
            subject: 'Genesis Insurances Application verified and accepted!',
            html: `<h1>Congratulations ${gender} ${name} your motor insurance application with id ${req.body.applier} has been verified and accepted! </h1>`
        });
        res.redirect('/details')

    })
}
    else{
        await transportApplications.findByIdAndDelete(req.params.id).then(() => {
            transporter.sendMail({
                to: email,
                from: 'dattasandeep000@gmail.com',
                subject: 'Genesis Insurances Application verified and accepted!',
                html: `<h2>Sorry ${gender} ${name} your motor insurance application with id ${req.body.applier} has been rejected! </h2><p>Please contact our agents for more details!</p>`
            });
            res.redirect('/details')
        })

    }
}





exports.verifyLife=async (req, res, next) => {
    const gender = req.user.sex === 'Male' ? 'Mr' : 'Mrs'


    console.log('Entered verifyLife')
    console.log('ver sta '+req.body.verificationStatus)
    lifeApplications.updateOne({_id: req.body.appId}, {
        verificationStatus: req.body.verificationStatus,
        verificationDate: new Date().toDateString()
    })
    const policy = new Policy.model({

        type: req.body.policyType,
        name: req.body.name,
        applier: req.body.applier,
        amount: req.body.amount,
        policyId: req.body.policyId,
        appId: req.body.appId,
        term: req.body.policyTerm,
        beneficiaryDetails: {
            name: req.body.nominee,
            age: req.body.nomineeAge,
            relation: req.body.nomineeRelation,

        },
        status: 'Ongoing',
        duration: req.body.duration


    })
    const applier = await User.findById(req.body.applier)

    const email = applier.email
    const name = applier.name
    console.log(req.body.verificationStatus)
    if (req.body.verificationStatus === 'verified') {
        policy.save();


        User.updateOne({_id: req.body.applier}, {$push: {currentPolicies: policy}}).then((r) => {

            console.log('Policy added to user!!! hooray')
            transporter.sendMail({
                to: email,
                from: 'dattasandeep000@gmail.com',
                subject: 'Genesis Insurances Application verified and accepted!',
                html: `<h1>Congratulations ${gender} ${name} your life insurance application with id ${req.body.appId} has been verified and accepted! </h1>`
            });
            res.redirect('/details')

        })
    } else {
        await lifeApplications.findByIdAndDelete(req.params.id).then(() => {
            transporter.sendMail({
                to: email,
                from: 'dattasandeep000@gmail.com',
                subject: 'Genesis Insurances Application verified and accepted!',
                html: `<h2>Sorry ${gender} ${name} your life insurance application with id ${req.body.applier} has been rejected! </h2><p>Please contact our agents for more details!</p>`
            });
            res.redirect('/details')

        })
    }
}
    exports.verifyHealth = async (req, res, next) => {
        const gender = req.user.sex === 'Male' ? 'Mr' : 'Mrs'


        console.log('Entered verifyHealth')
        console.log('ver sta '+req.body.verificationStatus)


        const policy = new Policy.model({

            type: req.body.policyType,
            name: req.body.name,
            applier: req.body.applier,
            amount: req.body.amount,
            policyId: req.body.policyId,
            appId: req.body.appId,
            term: req.body.policyTerm,
            beneficiaryDetails: {
                name: req.body.nominee,
                age: req.body.nomineeAge,
                relation: req.body.nomineeRelation,

            },
            status: 'Ongoing',
            duration: req.body.duration


        })
        const applier = await User.findById(req.body.applier)

        const email = applier.email
        const name = applier.name
        console.log(req.body.verificationStatus)
        if (req.body.verificationStatus === 'verified') {
            policy.save();
            await healthApplications.updateOne({_id: req.body.appId}, {
                verificationStatus: req.body.verificationStatus,
                verificationDate: new Date().toDateString()
            }).then(()=>{
                console.log('Updated application')
            })

            User.updateOne({_id: req.body.applier}, {$push: {currentPolicies: policy}}).then((r) => {

                console.log('Policy added to user!!! hooray')
                transporter.sendMail({
                    to: email,
                    from: 'dattasandeep000@gmail.com',
                    subject: 'Genesis Insurances Application verified and accepted!',
                    html: `<h1>Congratulations ${gender} ${name} your health insurance application with id ${req.body.appId} has been verified and accepted! </h1>`
                });
                res.redirect('/details')

            })
        } else {
            await healthApplications.findByIdAndDelete(req.params.id).then(() => {
                transporter.sendMail({
                    to: email,
                    from: 'dattasandeep000@gmail.com',
                    subject: 'Genesis Insurances Application verified and accepted!',
                    html: `<h2>Sorry ${gender} ${name} your health insurance application with id ${req.body.applier} has been rejected! </h2><p>Please contact our agents for more details!</p>`
                });
                res.redirect('/details')
            })

        }
    }
