const express=require('express')
const isAuthenticated = require('../middlewares/isAuth')
const { addAddress, fetchAllAddress, deleteAddress, singleAddress } = require('../controllers/address')

const router=express.Router()

router.route('/new').post(isAuthenticated,addAddress)
router.route('/all').get(isAuthenticated,fetchAllAddress)
router.route('/single/:id').get(isAuthenticated,singleAddress)
router.route('/single/:id').delete(isAuthenticated,deleteAddress)

module.exports=router