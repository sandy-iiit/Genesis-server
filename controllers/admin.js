
const queries=require('../models/Query')
const reviews=require('../models/Review')
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