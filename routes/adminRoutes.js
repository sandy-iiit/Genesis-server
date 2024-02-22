const express=require('express')

const router = express.Router()

const adminController=require('../controllers/admin.js')
const userController=require('../controllers/user.js')
const filesController = require("../controllers/files");



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

router.get('/employeesignup',adminController.employeesignuppage)
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
