
const queries=require('../models/Query')
const reviews=require('../models/Review')
const User=require('../models/User')
const Policy=require('../models/Policy')
const healthApplications=require('../models/health-application')
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

    healthApplications.find({})
        .then(zrr=>{
        res.render('health-applications',{arr:zrr})
    })
}
exports.getLifeApplications=(req,res,next)=>{

    lifeApplications.find({})
        .then(zrr=>{
        res.render('life-applications',{arr:zrr})
    })
}
exports.getTransportApplications=(req,res,next)=>{

    transportApplications.find({})
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
            policyNum:zrr.policyNum,
            amount:zrr.amount,
            payType:zrr.payType,
            applier:zrr.applier,
        })
    })
}

exports.getIndividualLifeApplication=(req,res,next)=>{
    console.log('Entered individual life application')

    lifeApplications.findById(req.params.appId).then(zrr=>{
        res.render('individualLifeApplication',{
            firstName: zrr.firstName,
            lastName: zrr.lastName,
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
            policyNum:zrr.policyNum,
            amount:zrr.amount,
            payType:zrr.payType,
            applier:zrr.applier,
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
                if(name.includes(req.body.search)){
                    console.log(name)
                    arrr.push(r[i])
                }
            }
            res.render('health-applications',{arr:arrr})


        })
        .catch(err=>{
            console.log('err')
        })
}
exports.getLifeApplicationsSearch=(req,res,next)=>{
    console.log('entered the func')
    console.log(req.body.search)
    lifeApplications.find({})
        .then(r=>{
            const arrr=[]
            for(let i=0;i<r.length;i++){
                let name=r[i].firstName+' '+r[i].lastName
                if(name.includes(req.body.search)){
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
    // transportApplications.find({})
    //     .then(async r=>{
    // console.log('tarns2')
    // console.log(TRANSPORTAPPLICATIONS)
            const arrr=[]
             for(let i=0;i<TRANSPORTAPPLICATIONS.length;i++){
                let name=TRANSPORTAPPLICATIONS[i].firstName+' '+TRANSPORTAPPLICATIONS[i].lastName
                let Name=TRANSPORTAPPLICATIONS[i].firstName.toLowerCase()+' '+TRANSPORTAPPLICATIONS[i].lastName.toLowerCase()
                let nAME=TRANSPORTAPPLICATIONS[i].firstName.toUpperCase()+' '+TRANSPORTAPPLICATIONS[i].lastName.toUpperCase()
                 console.log('Name '+name)
                if(name.includes(req.body.search) || Name.includes(req.body.search) || nAME.includes(req.body.search)){
                    console.log(name)
                    arrr.push(TRANSPORTAPPLICATIONS[i])
                }
            }
                res.render('transport-applications',{arr:arrr})


        // })
        // .catch(err=>{
        //     console.log('err')
        // })
}

exports.verifyTransport=async (req, res, next) => {
    const gender= req.user.sex==='Male'?'Mr':'Mrs'


    console.log('Entered verifyTransport')
    transportApplications.updateOne({_id: req.params.id}, {verificationStatus: req.body.Status,verificationDate:new Date().toDateString()})
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

        transporter.sendMail({
            to: email,
            from: 'dattasandeep000@gmail.com',
            subject: 'Genesis Insurances Application verified and accepted!',
            html: `<h2>Sorry ${gender} ${name} your motor insurance application with id ${req.body.applier} has been rejected! </h2><p>Please contact our agents for more details!</p>`
        });
        res.redirect('/details')
    }
}