const express = require("express");
const router = express.Router();
const productController = require('../controller/productController')
const userController = require('../controller/userController')
const multerService = require('../helper/multerService')
const auth = require('../authentication/auth');
const orderController = require("../controller/orderController");
const errorValidation = require("../middleware/validations")
router.get('/healthcheck', (req,res)=>{
    console.log("Server is running.")
    res.send("Server is running")
})

//user routes
router.post('/login',errorValidation.registerLoginValidations, userController.login);
router.post('/register', errorValidation.registerLoginValidations, userController.register);


//products routes
// router.post('/addItem',  productController.addItem);
router.post('/uploadProducts',[auth.authenticateToken , multerService.uploadFile, errorValidation.uploadProducts,] , productController.uploadProducts)

// orders
router.post('/createOrder', [auth.authenticateToken, errorValidation.createOrder], orderController.createOrder)
router.put('/updateOrder', [auth.authenticateToken, errorValidation.updateOrder], orderController.updateOrder)
router.post('/cancelOrder', [auth.authenticateToken, errorValidation.updateOrder], orderController.updateOrder)
router.get('/getOrder',[auth.authenticateToken], orderController.getOrder)
router.get('/getOrdercount', [auth.authenticateToken, errorValidation.getOrderByDate], orderController.getOrdercount)
router.get('/getPurchasedCount', [auth.authenticateToken], orderController.getPurchasedCount)
// 


module.exports = router
