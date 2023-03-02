const express=require('express')

const router = express.Router()
const userController=require('/Users/dattasandeepchoragudi/html/WebstormProjects/Genesis/controllers/user.js')

router.get('/login',userController.getLogin)
router.get('/policies',userController.getPolicies)
module.exports = router