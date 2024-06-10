const express=require('express')
const { addToCart, fetchCart, removeFromcart, updateCart } = require('../controllers/cart')
const isAuthenticated = require('../middlewares/isAuth')

const router=express.Router()

router.route('/new').post(isAuthenticated,addToCart)
router.route('/all').get(isAuthenticated,fetchCart)
router.route('/:id').delete(isAuthenticated,removeFromcart)
router.route('').put(isAuthenticated,updateCart)

module.exports=router