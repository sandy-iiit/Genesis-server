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
module.exports = router