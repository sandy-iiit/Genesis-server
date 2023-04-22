
const queries=require('../models/Query')
const reviews=require('../models/Review')
const healthApplications=require('../models/health-application')
exports.getAnswerQueries=(req,res,next)=>{

    queries.find({status:'Not Answered'}).then(arr=>{
        // console.log(arr)

        res.render('answer-queries',{arr:arr})
    })


}

exports.getAlreadyAnsweredQueries=(req,res,next)=>{
    queries.find({status:'Answered',answeredBy:req.user._id}).then(arr=>{
        // console.log(arr)

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
    queries.findByIdAndUpdate(params,{answer:answer,status:'Answered',answeredBy:req.user._id})
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
exports.getIndividualHealthApplication=(req,res,next)=>{

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

exports.getHealthApplicationsSearch=(req,res,next)=>{
    console.log('entered the func')
    console.log(req.body.search)
    healthApplications.find({firstName:req.body.search})
        .then(r=>{
            console.log(r)
                res.render('health-applications',{arr:r})


        })
        .catch(err=>{
            console.log('err')
        })
}
exports.sendagent = (req,res,next)=>{
    res.render('agentboard');
}
exports.designform = (req,res,next)=>{
    res.render('designpolicy');
}

exports.trackpolicy = (req,res,next)=>{
    res.render('tractpolicy');
}