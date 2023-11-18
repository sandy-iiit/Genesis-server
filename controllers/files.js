
const { MongoClient, GridFSBucket, ObjectId } = require('mongodb');
const uri = process.env.MONGODB_URI2;
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');


const conn = mongoose.connection;

let cfs;
conn.once('open', function() {
    cfs = Grid(conn.db, mongoose.mongo);
    cfs.collection('files');
});


const HealthApplication=require('../models/health-application')
const LifeApplication=require('../models/life-application')
const TransportApplication=require('../models/transport-application')

exports.healthUploader= async function(req, res, next) {

    const healthApplication = new HealthApplication({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        sex:req.body.sex,
        aadhar: req.files['aadhar'][0].id,
        pan:req.files['pan'][0].id,
        nomineeAadhar:req.files['nomineeAadhar'][0].id,
        nomineeAddressProof:req.files['nomineeAddressProof'][0].id,
        dobProof:req.files['dobProof'][0].id,
        healthCertificate:req.files['healthCertificate'][0].id,
        healthCondition:req.body.healthCondition,
        nominee:req.body.nominee,
        nomineeAge:req.body.nomineeAge,
        nomineeRelation:req.body.nomineeRelation,
        policyId:req.body.policyId,
        policyTerm:req.body.policyTerm,
        policyName:req.body.policyName,
        policyType:req.body.policyType,
        amount:req.body.amount,
        applier:req.body.applier,
        duration:req.body.duration,
        appliedDate:new Date().toDateString(),
        verificationStatus:'',
        verificationDate:'',


    });
    await healthApplication.save();

    console.log('File uploaded successfully');
    res.redirect('/')
}
exports.lifeUploader= async function(req, res, next) {

    const lifeApplication = new LifeApplication({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        sex:req.body.sex,

        aadhar: req.files['aadhar'][0].id,
        pan:req.files['pan'][0].id,
        nomineeAadhar:req.files['nomineeAadhar'][0].id,
        nomineeAddressProof:req.files['nomineeAddressProof'][0].id,
        dobProof:req.files['dobProof'][0].id,
        healthCertificate:req.files['healthCertificate'][0].id,
        healthCondition:req.body.healthCondition,
        beneficiary:req.body.nominee,
        beneficiaryAge:req.body.nomineeAge,
        beneficiaryRelation:req.body.nomineeRelation,
        policyId:req.body.policyId,
        policyName:req.body.policyName,
        policyTerm:req.body.policyTerm,
        policyType:req.body.policyType,

        amount:req.body.amount,
        applier:req.user._id,
        duration:req.body.duration,
        appliedDate:new Date().toDateString(),
        verificationStatus:'',
        verificationDate:'',

    });
    await lifeApplication.save();

    console.log('File uploaded successfully');
    res.redirect('/')
}

exports.transportUploader= async function(req, res, next) {
    console.log("Entered transport uploader")
    console.log(req.body)
    const transportApplication = new TransportApplication({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        regNum:req.body.regNum,
        sex:req.body.sex,
        aadhar: req.files['aadhar'][0].id,
        c_book:req.files['c_book'][0].id,
        nomineeAadhar:req.files['nomineeAadhar'][0].id,
        nomineeAddressProof:req.files['nomineeAddressProof'][0].id,
        vehicleCompany:req.body.company,
        model:req.body.model,
        yearOfMfg:req.body.yearOfMfg,
        vehicleType:req.body.vehicleType,
        engine:req.body.engine,
        chassis:req.body.chassis,
        nominee:req.body.nominee,
        nomineeAge:req.body.nomineeAge,
        nomineeRelation:req.body.nomineeRelation,
        policyId:req.body.policyId,
        policyName:req.body.policyName,
        policyType:req.body.policyType,
        policyTerm:req.body.policyTerm,
        amount:req.body.amount,
        payType:req.body.payType,
        applier:req.body.applier,
        appliedDate:new Date().toDateString(),
        verificationStatus:'',
        verificationDate:'',
    });
    await transportApplication.save().then((r)=>{
        console.log(r._id)
    });

    console.log('File uploaded successfully');
    res.status(200).json({msg:"File has been uploaded successfully!!"})
    // res.redirect('/')
}

exports.getFile= async function(req, res) {
    console.log('entered getFile')
    const fileId = new mongoose.Types.ObjectId(req.params.fileId);
    try {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true });
        const db = await client.db();

        const bucket = new GridFSBucket(db);

        const downloadStream = bucket.openDownloadStream(fileId);

        res.set('Content-Type', 'application/pdf');
        res.set('Content-Disposition', 'inline; filename="file.pdf"');


        downloadStream.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }




}
