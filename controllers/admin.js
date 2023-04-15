
const queries=require('../models/Query')
const reviews=require('../models/Review')
const healthApplications=require('../models/health-application')
const lifeApplications=require('../models/life-application')
const transportApplications=require('../models/transport-application')
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
            firstName:zrr.firstName,
            lastName:zrr.lastName,
            regNum:zrr.regNum,

            aadhar:zrr.aadhar,
            c_book:zrr.c_book,
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
            policyNum:zrr.policyNum,
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
    transportApplications.find({})
        .then(async r=>{
            const arrr=[]
             for(let i=0;i<r.length;i++){
                let name=r[i].firstName+' '+r[i].lastName
                if(name.includes(req.body.search)){
                    console.log(name)
                    arrr.push(r[i])
                }
            }
                res.render('transport-applications',{arr:arrr})


        })
        .catch(err=>{
            console.log('err')
        })
}