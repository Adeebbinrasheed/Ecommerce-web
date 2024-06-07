const express=require("express")
const { createProduct, fetchProducts, fetchSingleProduct, updateStock, deleteProduct } = require("../controllers/product")
const isAuthenticated = require("../middlewares/isAuth")
const upload = require("../middlewares/multer")
const router=express.Router()

router.route('/newproduct').post(isAuthenticated,upload,createProduct)
router.route('/allproduct').get(fetchProducts)
router.route('/singleproduct/:id').get(fetchSingleProduct)
router.route('/singleproduct/:id').put(isAuthenticated,updateStock)
router.route('/singleproduct/:id').delete(isAuthenticated,deleteProduct)

module.exports=router