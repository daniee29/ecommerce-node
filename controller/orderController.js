
const mongodb = require('../helper/mongodbService');


module.exports = {
    createOrder : async(req, res ) =>{
        console.log(req.body)
        let products =await mongodb.findProducts(req.body.productName);
        console.log(products)
        let orderObj = {
            productId: products._id,
            userId: req.user.id,
            total: products.price * req.body.quantity,
            quantity : req.body.quantity
        }
        console.log(orderObj)
        const orderCreate = mongodb.createOrder(orderObj)
        if(orderCreate){
            res.status(201).send({status: true,message: "Order created successfully."})
        }else{
            res.status(400).send({status: false,message: "Order not created successfully."})
        }
    },
    updateOrder: async (req, res) =>{
        
        const id = req.body.orderId;
        let orderDetails =await mongodb.fetchOrderDetails(id);
        // console.log(orderDetails)
        // return res.send(orderDetails)
        if(!orderDetails){
            res.status(404).send({status: false, message: 'OrderId not found'})
        }
        updatequery = {
            "status": req.body.status,
            "statusUpdateTime": Date.now()
        }

        const OrderUpdate =await mongodb.updateOrders(updatequery, id);
        if(!OrderUpdate){
         return   res.status(400).send({status: false, message: 'Order status update failed.'})
        }
        res.status(200).send({status: true, message: 'Order status update successfully.'})

    }
}