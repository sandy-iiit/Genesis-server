
const queries=require('../models/Query')
const reviews=require('../models/Review')
 
const healthApplications=require('../models/health-application')
 
const User=require('../models/User')
const Agent=require('../models/employee')
const Policy=require('../models/Policy')
const _=require("lodash")
const lifeApplications=require('../models/life-application')
const transportApplications=require('../models/transport-application')
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
var TRANSPORTAPPLICATIONS=[]
var HEALTHAPPLICATIONS=[]
var LIFEAPPLICATIONS=[]
const redis = require('redis');
const client = require('../utils/redis');
const Admin = require('../models/Admin');

const transporter = nodemailer.createTransport(
    {
        service: "Gmail",

        auth: {
            user: 'dattasandeep000@gmail.com',
            pass: process.env.PASSKEY
        },
    }
); 




// Assuming you have your Redis client exported in redisClient.js

exports.getAllAdmins = async (req, res) => {
    try {
        const cacheKey = 'all-admins';
        let admins = await client.get(cacheKey);

        if (!admins) {
            admins = await Admin.find({}, '-password');

            // Check if admins exist
            if (!admins || admins.length === 0) {
                return res.status(404).json({ message: 'No admins found' });
            }

            client.set(cacheKey, JSON.stringify(admins));
            console.log('Admins data set into Redis cache');
        } else {
            console.log('Admins data retrieved from Redis cache');
            admins = JSON.parse(admins);
        }

        res.status(200).json(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};




exports.deleteAdminByEmail = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    console.log("inside deleting admin");
    try {
        // Find the admin by email
        const admin = await Admin.findOne({ email });

        // Check if admin exists
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Delete the admin by id
        await Admin.findByIdAndDelete(admin._id);
        console.log("admin deleted successfully");
        client.del('all-admins');
        console.log("chanegs in all-admins updating the cache..")
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        console.error('Error deleting admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// get all users :

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteUserByEmail = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    console.log("inside deleting user");
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await User.findByIdAndDelete(user._id);
        console.log("user deleted successfully");
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



// get all agents :


exports.getAllAgents = async (req, res) => {
    try {
        const agents = await Agent.find({}, '-password');
        if (!agents || agents.length === 0) {
            return res.status(404).json({ message: 'No agents found' });
        }
        res.status(200).json(agents);
    } catch (error) {
        console.error('Error fetching agents:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteAgentByEmail = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    console.log("inside deleting agent");
    try {
        const agent = await Agent.findOne({ email });
        if (!agent) {
            return res.status(404).json({ message: 'Agent not found' });
        }
        await Agent.findByIdAndDelete(agent._id);
        console.log("agent deleted successfully");
        res.status(200).json({ message: 'Agent deleted successfully' });
    } catch (error) {
        console.error('Error deleting agent:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getData = async (req, res) => {
    try {
        const cacheKey = 'policy-data';
        let data = await client.get(cacheKey);

        if (!data) {
            const totalUsers = await Policy.model.countDocuments({});
            const transportUsers = await Policy.model.countDocuments({ type: 'TRANSPORT' });
            const lifeUsers = await Policy.model.countDocuments({ type: 'LIFE' });
            const healthUsers = await Policy.model.countDocuments({ type: 'HEALTH' });

            data = {
                total_users: totalUsers,
                transport_policy_users: transportUsers,
                life_policy_users: lifeUsers,
                health_policy_users: healthUsers,
            };

            client.set(cacheKey, JSON.stringify(data));
            console.log('Policy data set into Redis cache');
        } else {
            console.log('Policy data retrieved from Redis cache');
            data = JSON.parse(data);
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Error retrieving policy data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



exports.getAnswerQueries=(req,res,next)=>{

    queries.find({status:'Not Answered'}).then(arr=>{
        // console.log(arr)

        res.json(arr)
    })


}

exports.getAlreadyAnsweredQueries=(req,res,next)=>{
    console.log(req.body)
    queries.find({status:'Answered',answeredBy:req.body.id}).then(arr=>{
        console.log("Answered queries")
        console.log(arr)

        res.status(200).json(arr)
    })
}

exports.getReviews=async (req, res, next) => {

    const revs = await reviews.find({})
    res.status(200).json(revs);



}

exports.postAnswer=(req,res,next)=>{

    const params=req.body.queryId;
    const answer=req.body.answer + '---Answered by agent: '+req.body.name
    queries.findByIdAndUpdate(params,{answer:answer,status:'Answered',answeredBy:req.body.userId,answerDate:new Date().toDateString()})
        .then(query=>{
            console.log('Query was answered')
            res.status(200).json({msg:"Query Answered!"})
            // res.redirect('/details')
        })
        .catch(err=>{
            console.log(err)
        })


}

// exports.getHealthApplications=(req,res,next)=>{
//     console.log("entered health admin")

//     healthApplications.find({
//         verificationStatus: { $in: ["", "Not Verified Yet"] }
//     })        .then(zrr=>{
//         res.status(200).json(zrr)
//     })
// }

exports.getHealthApplications = async (req, res, next) => {
    console.log("entered health admin")
    healthApplications.find({
        verificationStatus: { $in: ["", "Not Verified Yet"] }
    })        .then(zrr=>{
        res.status(200).json(zrr)
    })
};

exports.getLifeApplications=(req,res,next)=>{
    console.log("entered life admin")
    lifeApplications.find({
        verificationStatus: { $in: ["", "Not Verified Yet"] }
    })        .then(zrr=>{
            res.status(200).json(zrr)
    })
}
exports.getTransportApplications=(req,res,next)=>{
    console.log("entered transport admin")

    transportApplications.find({
        verificationStatus: { $in: ["", "Not Verified Yet"] }
    })        .then(zrr=>{
            TRANSPORTAPPLICATIONS=zrr;
            console.log('Trans')
            res.status(200).json(zrr)
    })
}
exports.getIndividualHealthApplication=(req,res,next)=>{
    console.log('Entered individual health application')
    healthApplications.findById(req.body.appId).then(zrr=>{
        console.log(zrr.sex)
        res.json({
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
            userType:req.session.type,

        })
    })
}

exports.getIndividualLifeApplication=(req,res,next)=>{
    console.log('Entered individual life application')

    lifeApplications.findById(req.body.appId).then(zrr=>{
        res.json({
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
            userType:req.session.type,


        })
    })
}
exports.getIndividualTransportApplication=(req,res,next)=>{
    console.log('Entered individual transport application')
    console.log(req.body.id)
    transportApplications.findById(req.body.appId).then(zrr=>{

        console.log(zrr.sex)
        res.json({
            appId:req.body.appId,
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
            userType:req.session.type,


        })
    })
}

exports.getHealthApplicationsSearch=async (req, res, next) => {
    console.log('entered the func')
    console.log(req.body.search)
    if(req.body.searchType==='Name') {
        if (req.body.search !== 'verified') {
            healthApplications.find({})
                .then(async r => {
                        console.log('tarns2')
                        const arrr = []
                        for (let i = 0; i < r.length; i++) {
                            let name = r[i].firstName + ' ' + r[i].lastName
                            let Name = r[i].firstName.toLowerCase() + ' ' + r[i].lastName.toLowerCase()
                            let nAME = r[i].firstName.toUpperCase() + ' ' + r[i].lastName.toUpperCase()
                            console.log('Name ' + name)
                            if (name.includes(req.body.search) || Name.includes(req.body.search) || nAME.includes(req.body.search)) {
                                console.log(name)
                                arrr.push(r[i])
                            }
                        }
                    res.json(arrr)


                        // })
                        // .catch(err=>{
                        //     console.log('err')
                        // })
                    }
                )
        } else {
            healthApplications.find({verificationStatus: { $in: ['verified', 'Verified'] }}).then(arrr => {
                res.json(arrr)

            })
        }
    }else if(req.body.searchType==='Id'){
        const arr = []
        const application = await healthApplications.findById(req.body.search)
        console.log(application)
        arr.push(application)
        res.json(arr)
    }
    }

    exports.designform = (req, res, next) => {
        res.render('designpolicy');
    }
    user = [];
    exports.trackpolicy = (req, res, next) => {
        res.render('tractpolicy', {users: user});
    }
    exports.employeesignuppage = (req, res, next) => {
        res.render('employeesignup');
    }

    exports.getemailform = (req, res, next) => {
        res.render('emailform');
    }

    exports.getcompanystats = (req, res, next) => {
        res.render('companystats');
    }

    exports.getLifeApplicationsSearch = async (req, res, next) => {
        console.log('entered the func')
        console.log(req.body.search)
        if(req.body.searchType==='Name') {
            if (_.lowerCase(req.body.search) !== 'verified' ) {
                lifeApplications.find({})
                    .then(async r => {
                            console.log('tarns2')
                            const arrr = []
                            for (let i = 0; i < r.length; i++) {
                                let name = r[i].firstName + ' ' + r[i].lastName
                                let Name = r[i].firstName.toLowerCase() + ' ' + r[i].lastName.toLowerCase()
                                let nAME = r[i].firstName.toUpperCase() + ' ' + r[i].lastName.toUpperCase()
                                console.log('Name ' + name)
                                if (name.includes(req.body.search) || Name.includes(req.body.search) || nAME.includes(req.body.search)) {
                                    console.log(name)
                                    arrr.push(r[i])
                                }
                            }
                            res.json(arrr)

                        }
                    )
            } else {
                lifeApplications.find({verificationStatus: { $in: ['verified', 'Verified'] }}).then(arrr => {
                    res.json(arrr)

                })
            }
        }else if(req.body.searchType==='Id'){
            const arr = []
            const application = await lifeApplications.findById(req.body.search)
            console.log(application)
            arr.push(application)
            res.json(arr)
        }
    }
    exports.getAgentApplicationsSearch = async (req, res, next) => {
        console.log('entered the func')
        console.log(req.body.search)
if(req.body.searchType==='Name') {
    if (req.body.search !== 'verified') {
        console.log('entered if')
        const r = await Agent.find({})
        if (r) {
            const arrr = []
            for (let i = 0; i < r.length; i++) {
                let name = r[i].name
                let Name = r[i].name.toLowerCase()
                let nAME = r[i].name.toUpperCase()
                if (name.includes(req.body.search) || Name.includes(req.body.search) || nAME.includes(req.body.search)) {
                    console.log(name)
                    arrr.push(r[i])
                }
            }
            res.json(arrr)
        }
    } else {
        console.log('entered else')
        const agents1 = await Agent.find({isActive: true})
        res.json(agents1)


    }
}else if(req.body.searchType==='Id'){
    const arr = []
    const application = await Agent.findById(req.body.search)
    arr.push(application)
    res.json(arr)
}
    }
    exports.getTransportApplicationsSearch = async (req, res, next) => {
            console.log('entered the func')
            console.log(req.body.search)
            if(req.body.searchType==='Name') {
                if (req.body.search !== 'verified') {
                    transportApplications.find({})
                        .then(async r => {
                                console.log('tarns2')
                                const arrr = []
                                for (let i = 0; i < r.length; i++) {
                                    let name = r[i].firstName + ' ' + r[i].lastName
                                    let Name = r[i].firstName.toLowerCase() + ' ' + r[i].lastName.toLowerCase()
                                    let nAME = r[i].firstName.toUpperCase() + ' ' + r[i].lastName.toUpperCase()
                                    console.log('Name ' + name)
                                    if (name.includes(req.body.search) || Name.includes(req.body.search) || nAME.includes(req.body.search)) {
                                        console.log(name)
                                        arrr.push(r[i])
                                    }
                                }
                            res.json(arrr)


                                // })
                                // .catch(err=>{
                                //     console.log('err')
                                // })
                            }
                        )
                } else {
                    transportApplications.find({verificationStatus: { $in: ['verified', 'Verified'] }}).then(arrr => {
                        res.json(arrr)

                    })
                }
            }else if(req.body.searchType==='Id'){
                const arr = []
                const application = await transportApplications.findById(req.body.search)

                arr.push(application)
                res.json(arr)
            }
            // } else {


            // }
        }

        exports.verifyTransport=async (req, res, next) => {
        const gender= req.body.sex==='Male'?'Mr':'Mrs'


         console.log('Entered verifyTransport')
            console.log(req.body)
    const policy = new Policy.model({

               type: req.body.policyType,
        name: req.body.name,
        applier: req.body.applier,
        amount: req.body.amount,
        policyId: req.body.policyId,
        appId: req.body.appId,
        term: req.body.policyTerm,
        beneficiaryDetails: {
            name: req.body.bname,
            age: req.body.bage,
            relation: req.body.brelation,

        },
        status: 'Ongoing'


    })
    const applier = await User.findById(req.body.applier)

    const email = applier.email
    const name = applier.name
    if (_.lowerCase(req.body.verificationStatus) === 'verified')
    {
        await policy.save();
        await transportApplications.updateOne({_id: req.body.appId}, {verificationStatus: req.body.verificationStatus,verificationDate:new Date().toDateString()})

       await User.updateOne({_id: req.body.applier}, {$push: {currentPolicies: policy}}).then((r) => {

            console.log('Policy added to user!!! hooray')
            transporter.sendMail({
                to: email,
                from: 'dattasandeep000@gmail.com',
                subject: 'Genesis Insurances Application verified and accepted!',
                html: `<h1>Congratulations ${gender} ${name} your motor insurance application with id ${req.body.applier} has been verified and accepted! </h1>`
            });
            // res.redirect('/details')
           res.json({msg:"Updated verification status!"})

        })
    }
    else{
        await transportApplications.findByIdAndDelete(req.body.appId).then(() => {
            transporter.sendMail({
                to: email,
                from: 'dattasandeep000@gmail.com',
                subject: 'Genesis Insurances Application rejected!',
                html: `<h2>Sorry ${gender} ${name} your motor insurance application with id ${req.body.applier} has been rejected! </h2><p>Please contact our agents for more details!</p>`
            });
            res.json({msg:"Updated verification status!"})
        })

    }
}





exports.verifyLife=async (req, res, next) => {
    const gender = req.body.sex === 'Male' ? 'Mr' : 'Mrs'


    console.log('Entered verifyLife')
    console.log('ver sta '+req.body.verificationStatus)

    const policy = new Policy.model({

        type: req.body.type,
        name: req.body.name,
        applier: req.body.applier,
        amount: req.body.amount,
        policyId: req.body.policyId,
        appId: req.body.appId,
        term: req.body.policyTerm,
        beneficiaryDetails: {
            name: req.body.bname,
            age: req.body.bage,
            relation: req.body.brelation,

        },
        status: 'Ongoing',
        duration: req.body.duration


    })
    const applier = await User.findById(req.body.applier)

    const email = applier.email
    const name = applier.name
    console.log(req.body.verificationStatus)
    if (_.lowerCase(req.body.verificationStatus) === 'verified') {
        await policy.save();
        await lifeApplications.updateOne({_id: req.body.appId}, {
            verificationStatus: req.body.verificationStatus,
            verificationDate: new Date().toDateString()
        })

       await User.updateOne({_id: req.body.applier}, {$push: {currentPolicies: policy}}).then((r) => {

            console.log('Policy added to user!!! hooray')
            transporter.sendMail({
                to: email,
                from: 'dattasandeep000@gmail.com',
                subject: 'Genesis Insurances Application verified and accepted!',
                html: `<h1>Congratulations ${gender} ${name} your life insurance application with id ${req.body.appId} has been verified and accepted! </h1>`
            });
           res.json({msg:"Updated verification status!"})

        })
    } else {
        await lifeApplications.findByIdAndDelete(req.body.appId).then(() => {
            transporter.sendMail({
                to: email,
                from: 'dattasandeep000@gmail.com',
                subject: 'Genesis Insurances Application verified and accepted!',
                html: `<h2>Sorry ${gender} ${name} your life insurance application with id ${req.body.applier} has been rejected! </h2><p>Please contact our agents for more details!</p>`
            });
            res.json({msg:"Updated verification status!"})

        })
    }
}

exports.verifyHealth = async (req, res, next) => {
    try {
        const gender = req.body.sex === 'Male' ? 'Mr' : 'Mrs';

        const policy = new Policy.model({
            type: req.body.policyType,
            name: req.body.name,
            applier: req.body.applier,
            amount: req.body.amount,
            policyId: req.body.policyId,
            appId: req.body.appId,
            term: req.body.policyTerm,
            beneficiaryDetails: {
                name: req.body.bname,
                age: req.body.bage,
                relation: req.body.brelation,
            },
            status: 'Ongoing',
            duration: req.body.duration
        });

        const applier = await User.findById(req.body.applier);
        const email = applier.email;
        const name = applier.name;

        if (_.lowerCase(req.body.verificationStatus) === 'verified') {
            policy.save();
            await healthApplications.updateOne({_id: req.body.appId}, {
                verificationStatus: req.body.verificationStatus,
                verificationDate: new Date().toDateString()
            });
            await User.updateOne({_id: req.body.applier}, {$push: {currentPolicies: policy}});

            console.log('Policy added to user!!! hooray');

            transporter.sendMail({
                to: email,
                from: 'dattasandeep000@gmail.com',
                subject: 'Genesis Insurances Application verified and accepted!',
                html: `<h1>Congratulations ${gender} ${name} your health insurance application with id ${req.body.appId} has been verified and accepted! </h1>`
            });
        } else {
            await healthApplications.findByIdAndDelete(req.body.appId);

            transporter.sendMail({
                to: email,
                from: 'dattasandeep000@gmail.com',
                subject: 'Genesis Insurances Application rejected!',
                html: `<h2>Sorry ${gender} ${name} your health insurance application with id ${req.body.applier} has been rejected! </h2><p>Please contact our agents for more details!</p>`
            });
        }

        // Update cache after verification
        client.del('health-applications'); // Invalidate cache for health applications
        console.log('Health applications cache invalidated');

        res.json({ msg: "Updated verification status!" });
    } catch (error) {
        console.error('Error verifying health:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




        exports.getAgentBoard = (req, res, next) => {
            console.log(req.session.type)
            res.render('agentboard', {userType: req.session.type, name: req.user.name})
        }


        exports.getAgentApplications = async (req, res, next) => {
            const arrr = await Agent.find({isActive: false})
            res.status(200).json(arrr)
        }

        exports.getIndividualAgentApplication = async (req, res, next) => {
            const id = req.params.id
            const agent = await Agent.findById(id)
            console.log(agent)
            res.render('individual-agent-application', {r: agent})
        }

        exports.verifyAgent = async (req, res, next) => {
            try {
                const { email } = req.body;
                 console.log("verifying the user with email  "+email)
                const updatedAgent = await Agent.findOneAndUpdate({ email }, { isActive: true }, { new: true });
         
                if (!updatedAgent) {
                    return res.status(404).json({ message: 'Agent not found' });
                }
         
                const gender = updatedAgent.sex === 'Male' ? 'Mr' : 'Mrs';
                transporter.sendMail({
                    to: updatedAgent.email,
                    from: 'dattasandeep000@gmail.com',
                    subject: 'Genesis Insurances Application for Agent verified and accepted!',
                    html: `<h2>Dear ${gender} ${updatedAgent.name},</h2><p>Your application for becoming our agent with ID ${updatedAgent._id} has been accepted! Please contact our agents for more details.</p>`
                });
              console.log("agent verified")
                res.status(200).json({ message: 'Agent verified and accepted', agent: updatedAgent });

            } catch (error) {
                console.error('Error verifying agent:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        };
        

exports.getUserList=async (req, res, next) => {
    const users = await User.find({})
    res.render('usersList',{arr:users})
}

exports.searchUsers=async (req, res, next) => {
    const Type = req.body.searchType
    const search = req.body.search
    if (req.body.searchType === 'Name') {
            User.find({})
                .then(async r => {
                        const arrr = []
                        for (let i = 0; i < r.length; i++) {
                            let name = r[i].name;
                            let Name = r[i].name.toLowerCase();
                            let nAME = r[i].name.toUpperCase();
                            console.log('Name ' + name)
                            if (name.includes(req.body.search) || Name.includes(req.body.search) || nAME.includes(req.body.search)) {
                                console.log(name)
                                arrr.push(r[i])
                            }
                        }
                        res.render('usersList', {arr: arrr})


                    }
                )

    } else if (req.body.searchType === 'Id') {
        const arr = []
        const application = await User.findById(req.body.search)

        arr.push(application)
        res.render('usersList', {arr: arr})
    }

}

exports.getIndividualUser=async (req, res, next) => {
    const id = req.params.id
    const user = await User.findById(id)
    res.render('individual-user-profile',{r:user})

}


exports.getPolicyDetails=async (req, res, next) => {

    const id = req.params.id;
    const policy = await Policy.model.findById(id)
    res.render('viewPolicy',{r:policy})

}

exports.getAllPolicies=async (req, res, next) => {
    const arrr = await Policy.model.find({})
    // console.log(arrr)
    res.render('policiesList', {arr: arrr})
}

exports.searchPolicies=async (req, res, next) => {
    console.log('Entered search policies')
    const id = req.body.searchType
    const searchWord = req.body.search;


    if (id === 'Id') {
        const pols = await Policy.model.findById(searchWord)
        res.render('policiesList', {arr: pols})
    }
    else if(id==='Type'){

        const pols=await Policy.model.find({})
        const arrr=[]
        const type=searchWord
        const Type=searchWord.toUpperCase()
        const tYPE=searchWord.toLowerCase()
        console.log(type+Type+tYPE)
        for(let i=0;i<pols.length;i++){
            console.log(pols[i].type.includes(Type))
            if(pols[i].type.includes(type)||pols[i].type.includes(Type)||pols[i].type.includes(tYPE)){
                console.log(pols[i])
                arrr.push(pols[i])
            }
        }
        console.log(arrr)
        res.render('policiesList', {arr: arrr})

    }




}


exports.deleteQuery=async (req, res, next) => {

    const id = req.body.id

    await queries.findByIdAndDelete(id)
    res.status(200).json({msg:"Deleted Query successfully"})
}




exports.deleteReview=async (req, res, next) => {

        const {id,email} = req.body
    // const id = req.body.id
    // const email = req.body.email

    await reviews.findByIdAndDelete(id)
  await  transporter.sendMail({
        to: email,
        from: 'dattasandeep000@gmail.com',
        subject: 'Genesis Insurances Review Deleted!',
        html: `<h2>Dear customer your review with ID ${id} has been removed for breaching the community guidelines!! </p>`
    });
    // res.redirect('/reviews')
    res.status(200).json({msg:"Deleted Review successfully"})

}

exports.postpolicydetails = async (req, res, next) => {
    try {
        const email = req.body.email;
        const users = await User.find({ email: email });

        if (users.length > 0) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getusers = async (req, res) => {
    try {
        const allUsers = await User.find();
        const formattedUsers = allUsers.map(user => ({
            name: user.name,
            email: user.email,
            age: user.age,
            sex: user.sex,
            address: user.address,
            phone: user.phone
        }));
        res.status(200).json(formattedUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error. Failed to fetch users.' });
    }
};

