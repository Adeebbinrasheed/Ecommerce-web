const express=require('express')
const { register, verifyUser, loginUser, profileUser } = require('../controllers/user')
const isAuthenticated = require('../middlewares/isAuth')

const router=express.Router()

router.route('/register').post(register)
router.route('/verify').post(verifyUser)
router.route('/login').post(loginUser)
router.route('/profile').get(isAuthenticated,profileUser)



module.exports=router