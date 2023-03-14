const express=require('express')

const router = express.Router()
const userController=require('/Users/dattasandeepchoragudi/html/WebstormProjects/Genesis/controllers/user.js')

router.get('/',userController.getHome)

router.get('/login',userController.getLogin)
router.get('/signup',userController.getSignup)
router.get('/healthpolicies',userController.getHealthPolicies)
router.get('/transportpolicies',userController.getVehiclePolicies)
router.get('/details',userController.getDetails)

module.exports = router