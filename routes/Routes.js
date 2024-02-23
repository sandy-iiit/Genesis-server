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
router.get('/details',userController.getDetails)
router.get('/my-details',userController.getMyDetails)
router.get('/change-password',userController.getPasswordChange)
router.get('/my-policies',userController.getMyPolicies)
router.post('/my-queries',userController.getMyQueries)
router.get('/current-policies',userController.getCurrentPolicies)
// router.get('/policyHistory',userController.getPolicyHistory)
router.get('/payment',userController.getPayment)
router.get('/write-query',userController.getWriteQuery)
router.get('/transport-form/:id',userController.getTransportForm)
router.get('/life-form/:id',userController.getLifeForm)
router.get('/health-form/:id',userController.getHealthForm)
router.get('/admin-queries',userController.getAdminQueries)
router.get('/services',userController.getServices)
router.get('/aboutus',userController.getAboutUs)
router.get('/policies',userController.getPolicies)
router.get('/transportpolicies',userController.getVehiclePolicies)
router.get('/buy-policy/:id',userController.getBuyPolicy)
router.get('/buy-policy2',userController.getBuyPolicy2)
router.get('/buypolicy3/:id',userController.getBuyPolicylife)
router.get('/lifepolicies',userController.getLifePolicy)
router.get('/policypage',userController.getHealthPolicyPage)
router.get('/contactus',userController.getContactUs)
router.post('/signup',userController.postSignup)
router.post('/login',userController.postLogin)
router.post('/logout',userController.postLogout)
router.get('/settings',userController.getSettings)
router.get('/check',userController.getChecked)
router.post('/deleteacc',userController.deleteAcc)
router.post('/write-query',userController.postWriteQuery)
router.post('/findanagent',userController.postFindAgent)
router.post('/updateDetails',userController.updateDetails)
router.post('/drop-review',userController.dropReview)

router.post('/health-form', upload.fields([
    { name: 'aadhar', maxCount: 1 },
    { name: 'pan', maxCount: 1 },
    {name:'dobProof',maxCount:1},
    {name:'healthCertificate',maxCount:1},
    { name: 'nomineeAadhar', maxCount: 1 },
    { name: 'nomineeAddressProof', maxCount: 1 },
]),filesController.healthUploader)

router.post('/life-form', upload.fields([
    { name: 'aadhar', maxCount: 1 },
    { name: 'pan', maxCount: 1 },
    {name:'dobProof',maxCount:1},
    {name:'healthCertificate',maxCount:1},
    { name: 'nomineeAadhar', maxCount: 1 },
    { name: 'nomineeAddressProof', maxCount: 1 },
]),filesController.lifeUploader)

router.post('/transport-form', upload.fields([
    { name: 'aadhar', maxCount: 1 },
    { name: 'c_book', maxCount: 1 },
    { name: 'nomineeAadhar', maxCount: 1 },
    { name: 'nomineeAddressProof', maxCount: 1 },
]),filesController.transportUploader)

router.post('/change-password',userController.changePassword)
router.post('/verifyOTP',userController.verifyOTP)
router.get('/verifyOTP/:token',userController.getOTPVerifier)
router.get('/healthpolicies',userController.gethealthPolicy)
router.get('/policypage/:id',userController.getPolicyPage)
router.post('/myApplications',userController.getMyApps)
router.post('/search-my-applications',userController.searchMyApps)
// router.post('/pay',userController.postPay)
router.get('/data',adminController.getData)
// Admin

router.get('/answer-queries',adminController.getAnswerQueries)
router.post('/deleteQuery',adminController.deleteQuery)
router.post('/deleteReview',adminController.deleteReview)
router.post('/answered-queries',adminController.getAlreadyAnsweredQueries)
router.get('/health-applications',adminController.getHealthApplications)
router.get('/health-applications/:appId',adminController.getIndividualHealthApplication)
router.post('/search-health-applications',adminController.getHealthApplicationsSearch)
router.get('/reviews',adminController.getReviews)
router.post('/queries/:queryId',adminController.postAnswer)

router.post('/files',filesController.getFile2)
 
router.get('/designform',adminController.designform)
router.get('/tractpolicy',adminController.trackpolicy)
router.post('/policies_design',userController.postaddpolicy)
router.post('/employeesignupposting',userController.postemployeesignup)

router.get('/sendemail',adminController.getemailform)
router.post('/send_email',userController.postsendemail)
router.get('/companystats',adminController.getcompanystats)

// router.get('/employeesignup',adminController.employeesignuppage)
router.get('/life-applications',adminController.getLifeApplications)
router.get('/transport-applications',adminController.getTransportApplications)
router.post('/health-individual-application',adminController.getIndividualHealthApplication)
router.post('/life-individual-application',adminController.getIndividualLifeApplication)
router.post('/transport-individual-application',adminController.getIndividualTransportApplication)
router.post('/search-health-applications',adminController.getHealthApplicationsSearch)
router.post('/search-life-applications',adminController.getLifeApplicationsSearch)
router.post('/search-transport-applications',adminController.getTransportApplicationsSearch)
router.post('/search-agent-applications',adminController.getAgentApplicationsSearch)
router.get('/reviews',adminController.getReviews)
router.post('/queries/:queryId',adminController.postAnswer)
router.get('/files/:fileId',filesController.getFile)
router.post('/verifyTransport',adminController.verifyTransport)
router.post('/verifyLife',adminController.verifyLife)
router.post('/verifyHealth',adminController.verifyHealth)
router.post('/verifyAgent/:id',adminController.verifyAgent)
router.get('/agentboard',adminController.getAgentBoard)
router.get('/agent-applications',adminController.getAgentApplications)
router.get('/agent-application/:id',adminController.getIndividualAgentApplication)
router.get('/usersList',adminController.getUserList)
router.get('/policiesList',adminController.getAllPolicies)
router.get('/users/:id',adminController.getIndividualUser)
router.get('/policy/:id',adminController.getPolicyDetails)
router.post('/search-users',adminController.searchUsers)
router.post('/search-policies',adminController.searchPolicies)
router.post('/generatequote',userController.quotegenerator)
router.post('/getmypolicies',userController.GetMyPolicies)
router.post('/policy_details',adminController.postpolicydetails)
router.get('/allusers',adminController.getusers)
module.exports = router
