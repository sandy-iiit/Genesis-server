const express=require('express')

const router = express.Router()
const userController=require('../controllers/user.js')
const adminController=require('../controllers/admin.js')
const filesController=require('../controllers/files.js')

//file related

const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

const conn = mongoose.connection;

let gfs;
conn.once('open', function() {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('files');
});

const storage = new GridFsStorage({
    url: process.env.MONGODB_URI2,
    file: function(req, file) {
        return {
            filename: file.originalname,
            metadata: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            }
        };
    }
});

const upload = multer({ storage: storage });




router.get('/',userController.getHome)
router.get('/login',userController.getLogin)
router.get('/signup',userController.getSignup)
router.get('/healthpolicies',userController.getHealthPolicies)
router.get('/transportpolicies',userController.getVehiclePolicies)
router.get('/details',userController.getDetails)
router.get('/my-details',userController.getMyDetails)
router.get('/change-password',userController.getPasswordChange)
router.get('/my-policies',userController.getMyPolicies)
router.get('/my-queries',userController.getMyQueries)
router.get('/current-policies',userController.getCurrentPolicies)
router.get('/payment',userController.getPayment)
router.get('/write-query',userController.getWriteQuery)
router.get('/transport-form',userController.getTransportForm)
router.get('/life-form',userController.getLifeForm)
router.get('/health-form',userController.getHealthForm)
router.get('/admin-queries',userController.getAdminQueries)
router.get('/services',userController.getServices)
router.get('/aboutus',userController.getAboutUs)
router.get('/policies',userController.getPolicies)
router.get('/transportpolicies',userController.getVehiclePolicies)
router.get('/buy-policy',userController.getBuyPolicy)
router.get('/lifepolicies',userController.getLifePolicy)
router.get('/policypage',userController.getHealthPolicyPage)
router.get('/contactus',userController.getContactUs)
router.post('/signup',userController.postSignup)
router.post('/login',userController.postLogin)
router.get('/logout',userController.postLogout)
router.get('/settings',userController.getSettings)
router.post('/deleteacc',userController.deleteAcc)
router.post('/write-query',userController.postWriteQuery)
router.post('/findanagent',userController.postFindAgent)
router.post('/updatedetails',userController.updateDetails)
router.post('/drop-review',userController.dropReview)
router.post('/health-form', upload.fields([
    { name: 'aadhar', maxCount: 1 },
    { name: 'pan', maxCount: 1 },
    {name:'dobProof',maxCount:1},
    {name:'healthCertificate',maxCount:1}
]),filesController.uploader)
router.post('/quotegenerator',userController.quotegenerator)
// Admin

router.get('/answer-queries',adminController.getAnswerQueries)
router.get('/answered-queries',adminController.getAlreadyAnsweredQueries)
router.get('/health-applications',adminController.getHealthApplications)
router.get('/health-applications/:appId',adminController.getIndividualHealthApplication)
router.post('/search-health-applications',adminController.getHealthApplicationsSearch)
router.get('/reviews',adminController.getReviews)
router.post('/queries/:queryId',adminController.postAnswer)
router.get('/files/:fileId',filesController.getFile)
router.get('/agentboard',adminController.sendagent)
router.get('/designform',adminController.designform)
router.get('/tractpolicy',adminController.trackpolicy)
router.post('/policies_design',userController.postaddpolicy)
router.post('/policy_details',userController.postpolicydetails)
router.get('/employeesignup',adminController.employeesignuppage)
module.exports = router