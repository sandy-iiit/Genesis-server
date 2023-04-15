
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
exports.uploader= async function(req, res, next) {

    const healthApplication = new HealthApplication({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        aadhar: req.files['aadhar'][0].id,
        pan:req.files['pan'][0].id,
        dobProof:req.files['dobProof'][0].id,
        healthCertificate:req.files['healthCertificate'][0].id,
        healthCondition:req.body.healthCondition,
        nominee:req.body.nominee,
        nomineeAge:req.body.nomineeAge,
        nomineeRelation:req.body.nomineeRelation,
        policyId:req.body.policyId,
        policyNum:req.body.policyNum,
        amount:req.body.amount,
        payType:req.body.payType,
        applier:req.user._id,


    });
    await healthApplication.save();

    console.log('File uploaded successfully');
    res.redirect('/')
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
