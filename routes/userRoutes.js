const express=require('express')

const router = express.Router()
const userController=require('/Users/dattasandeepchoragudi/html/WebstormProjects/Genesis/controllers/user.js')

router.get('/login',userController.getLogin)
router.get('/healthpolicies',userController.getHealthPolicies)
router.get('/transportpolicies',userController.getVehiclePolicies)
module.exports = router