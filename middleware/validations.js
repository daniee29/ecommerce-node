
const _ = require('lodash');

module.exports = {
    registerLoginValidations: (req, res, next) =>{
        let error = []
        if(_.isEmpty(req.body.userName)){
            error.push({field : "userName", message: "userName is required."})
        }
        if(_.isEmpty(req.body.password)){
            error.push({field : "Password", message: "password is required."})
        }
        if(error.length){
            return res.status(400).send({"status": false,"message":error })
        }
        next()
    },
    uploadProducts: (req, res, next) =>{
        let error = []
        if(_.isEmpty(req.file)){
            error.push({field : "productsFile", message: "productsFile is required."})
        }
        if(error.length){
            return res.status(400).send({"status": false,"message":error })
        }
        next()
    },
    createOrder:(req, res, next) =>{
        let error = []
        if(_.isEmpty(req.body.productId)){
            error.push({field : "productId", message: "productId is required."})
        }
        if(_.isEmpty(''+req.body.quantity)){
            error.push({field : "quantity", message: "quantity is required."})
        }
        if(req.body && req.body.quantity && isNaN(req.body.quantity)){
            error.push({field : "quantity", message: "quantity should be in number."})
        }
        if(error.length){
            return res.status(400).send({"status": false,"message":error })
        }
        next()
    },
    updateOrder:(req, res, next) =>{
        let error = []
        if(_.isEmpty(req.body.orderId)){
            error.push({field : "orderId", message: "orderId is required."})
        }
        if(_.isEmpty(req.body.status)){
            error.push({field : "status", message: "status is required."})
        }
       
        if(error.length){
            return res.status(400).send({"status": false,"message":error })
        }
        next()
    },
    getOrderByDate:(req, res, next) =>{
        let error = []
        if(_.isEmpty(req.query.date)){
            error.push({field : "date", message: "Date is required."})
        }
              
        if(error.length){
            return res.status(400).send({"status": false,"message":error })
        }
        next()
    },
}