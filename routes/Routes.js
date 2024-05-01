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


/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User signup
 *     description: Create a new user account.
 *     security:
 *       - csrfAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               sex:
 *                 type: string
 *               address:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User signed up successfully
 *       '500':
 *         description: Internal server error
 *
 * securitySchemes:
 *   csrfAuth:
 *     type: apiKey
 *     in: header
 *     name: X-CSRF-Token
 *   JWTAuth:
 *     type: apiKey
 *     in: cookie
 *     name: jwtToken
 */

router.post('/signup',userController.postSignup)

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticate user login credentials.
 *     security:
 *       - csrfAuth: []
 *       - CSRFToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *               password:
 *                 type: string
 *                 description: The user's password
 *               type:
 *                 type: string
 *                 description: The user's type (User/Admin/Agent)
 *     responses:
 *       '200':
 *         description: Successful login
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *
 * securitySchemes:
 *   csrfAuth:
 *     type: apiKey
 *     in: header
 *     name: x-csrf-token
 *   CSRFToken:
 *     type: apiKey
 *     in: header
 *     name: x-csrf-token
 */


router.post('/login',userController.postLogin)

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: User logout
 *     description: Logout the currently authenticated user.
 *     security:
 *       - csrfAuth: []
 *       - jwtAuth: []
 *     responses:
 *       '200':
 *         description: Successfully logged out
 *       '500':
 *         description: Internal server error
 *
 * securitySchemes:
 *   csrfAuth:
 *     type: apiKey
 *     in: header
 *     name: X-CSRF-Token
 *   jwtAuth:
 *     type: apiKey
 *     in: cookie
 *     name: jwtToken
 */


router.post('/logout',userController.postLogout)
router.get('/settings',userController.getSettings)



router.post('/check',userController.getChecked)
router.post('/deleteacc',userController.deleteAcc)


/**
 * @swagger
 * /write-query:
 *   post:
 *     summary: Write query
 *     description: Write a new query.
 *     security:
 *       - csrfAuth: []
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: The query to be written
 *               userId:
 *                 type: string
 *                 description: The ID of the user who wrote the query
 *     responses:
 *       '200':
 *         description: Query added successfully
 *       '500':
 *         description: Internal server error
 *
 * securitySchemes:
 *   csrfAuth:
 *     type: apiKey
 *     in: header
 *     name: X-CSRF-Token
 *   JWTAuth:
 *     type: apiKey
 *     in: cookie
 *     name: jwtToken
 */

router.post('/write-query',userController.postWriteQuery)

/**
 * @swagger
 * /findanagent:
 *   post:
 *     summary: Find an agent
 *     description: Send an email to find an agent.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The recipient's email address
 *               name:
 *                 type: string
 *                 description: The recipient's name
 *     responses:
 *       '200':
 *         description: Email sent successfully
 *       '500':
 *         description: Internal server error
 *     security:
 *       - csrfAuth: []
 *       - JWTAuth: []
 */


router.post('/findanagent',userController.postFindAgent)


/**
 * @swagger
 * /updateDetails:
 *   post:
 *     summary: Update user details
 *     description: Update user details such as name, address, email, phone, and age.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the user to update
 *               name:
 *                 type: string
 *                 description: The user's new name
 *               address:
 *                 type: string
 *                 description: The user's new address
 *               email:
 *                 type: string
 *                 description: The user's new email address
 *               phone:
 *                 type: string
 *                 description: The user's new phone number
 *               age:
 *                 type: integer
 *                 description: The user's new age
 *               type:
 *                 type: string
 *                 description: The type of user (User/Admin/Agent)
 *     responses:
 *       '200':
 *         description: Details updated successfully
 *       '500':
 *         description: Internal server error
 *     security:
 *       - csrfAuth: []
 *       - JWTAuth: []
 */

router.post('/updateDetails',userController.updateDetails)


/**
 * @swagger
 * /drop-review:
 *   post:
 *     summary: Submit a review
 *     description: Submit a review to Genesis Insurances.
 *     security:
 *       - jwtAuth: []
 *       - csrfAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the reviewer.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the reviewer.
 *               review:
 *                 type: string
 *                 description: The review content.
 *     responses:
 *       '200':
 *         description: Review submitted successfully
 *       '500':
 *         description: Internal server error
 * components:
 *   securitySchemes:
 *     jwtAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *     csrfAuth:
 *       type: apiKey
 *       in: header
 *       name: X-CSRF-Token
 */

router.post('/drop-review',userController.dropReview)


/**
 * @swagger
 * /health-form:
 *   post:
 *     summary: Upload health application form
 *     description: Upload health application form along with required documents.
 *     security:
 *       - jwtAuth: []
 *       - csrfAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The first name of the applicant.
 *               lastName:
 *                 type: string
 *                 description: The last name of the applicant.
 *               age:
 *                 type: integer
 *                 description: The age of the applicant.
 *               sex:
 *                 type: string
 *                 enum: [Male, Female, Other]
 *                 description: The sex of the applicant.
 *               healthCondition:
 *                 type: string
 *                 description: The health condition of the applicant.
 *               nominee:
 *                 type: string
 *                 description: The nominee of the applicant.
 *               nomineeAge:
 *                 type: integer
 *                 description: The age of the nominee.
 *               nomineeRelation:
 *                 type: string
 *                 description: The relationship of the nominee with the applicant.
 *               policyId:
 *                 type: string
 *                 description: The policy ID.
 *               policyTerm:
 *                 type: integer
 *                 description: The term of the policy.
 *               policyName:
 *                 type: string
 *                 description: The name of the policy.
 *               policyType:
 *                 type: string
 *                 description: The type of the policy.
 *               amount:
 *                 type: number
 *                 description: The amount of the policy.
 *               applier:
 *                 type: string
 *                 description: The person who applied.
 *               duration:
 *                 type: integer
 *                 description: The duration of the policy.
 *               aadhar:
 *                 type: string
 *                 format: binary
 *                 description: The Aadhar card of the applicant.
 *               pan:
 *                 type: string
 *                 format: binary
 *                 description: The PAN card of the applicant.
 *               dobProof:
 *                 type: string
 *                 format: binary
 *                 description: Proof of date of birth.
 *               healthCertificate:
 *                 type: string
 *                 format: binary
 *                 description: Health certificate.
 *               nomineeAadhar:
 *                 type: string
 *                 format: binary
 *                 description: The Aadhar card of the nominee.
 *               nomineeAddressProof:
 *                 type: string
 *                 format: binary
 *                 description: Address proof of the nominee.
 *     responses:
 *       '200':
 *         description: Health application form uploaded successfully
 *       '500':
 *         description: Internal server error
 * components:
 *   securitySchemes:
 *     jwtAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *     csrfAuth:
 *       type: apiKey
 *       in: header
 *       name: X-CSRF-Token
 */

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
module.exports=router
