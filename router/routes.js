const express = require("express");
const router = express.Router();
const productController = require('../controller/productController')
const userController = require('../controller/userController')
const multerService = require('../helper/multerService')
const auth = require('../authentication/auth');
const orderController = require("../controller/orderController");
router.get('/healthcheck', (req,res)=>{
    console.log("Server is running.")
    res.send("Server is running")
})

//user routes
router.post('/login', userController.login);
router.post('/register', userController.register);


//products routes
// router.post('/addItem',  productController.addItem);
router.post('/uploadProducts',[auth.authenticateToken , multerService.uploadFile] , productController.uploadProducts)

// orders
router.post('/createOrder', auth.authenticateToken, orderController.createOrder)
router.put('/updateOrder', auth.authenticateToken, orderController.updateOrder)

module.exports = router
