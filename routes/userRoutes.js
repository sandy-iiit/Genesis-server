const express=require('express')

const router = express.Router()
const userController=require('../controllers/user.js')

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
router.post('/write-query',userController.postWriteQuery)
router.post('/findanagent',userController.postFindAgent)

module.exports = router