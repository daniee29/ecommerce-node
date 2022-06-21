
const mongodb = require('../helper/mongodbService');
const moment = require('moment')

async function filterSearch(order, filterVal){
  return new Promise((resolve, reject) =>{
      let filterval =  order.filter((el, i) =>{
        console.log("elllllll", el)
            if(el.productDetails.productName.includes(filterVal)){
                return el
            }
        })
        resolve(filterval)
  })
}
async function filterSearchByDate(order, filterVal){
    return new Promise((resolve, reject) =>{
        let filterval =  order.filter(el=>{
              if(moment(el.createdAt).format("MM/dd/yy") == moment(filterVal).format("MM/dd/yy")){
                  return el
              }
          });
            resolve(filterval)

         
    }).catch(er=>{
        reject([])
    })
  }
  async function filterSearchStatus(order, status){
    return new Promise((resolve, reject) =>{
        let filterval =  order.filter(el=>{
              if(el.status === "delivered"){
                  return el
              }
          });
            resolve(filterval)

         
    }).catch(er=>{
        reject([])
    })
  }
module.exports = {
    createOrder : async(req, res ) =>{
        console.log(req.body)
        let products =await mongodb.findProducts(req.body.productId);
        if(!products){
            return   res.status(404).send({status: false,message: "Product not found."})
        }
        let orderObj = {
            productDetails: products,
            userId: req.user.id,
            total: products.price * req.body.quantity,
            quantity : req.body.quantity,
            status: "Ready for dispatched",
            statusUpdateTime: Date.now()
        }
        const orderCreate = mongodb.createOrder(orderObj)
        if(orderCreate){
            res.status(201).send({status: true,message: "Order created successfully."})
        }else{
            res.status(400).send({status: false,message: "Order not created successfully."})
        }
    },
    updateOrder: async (req, res) =>{
        try{
         
        const id = req.body.orderId;
        let orderDetails =await mongodb.fetchOrderDetails(id);
        // console.log(orderDetails)
        // return res.send(orderDetails)
        if(!orderDetails){
            res.status(404).send({status: false, message: 'OrderId not found'})
        }
            
        updatequery = {
            "status": req.originalUrl === '/cancelOrder' ? 'Canceled': req.body.status,
            "statusUpdateTime": Date.now()
        }

        const OrderUpdate =await mongodb.updateOrders(updatequery, id);
        console.log(OrderUpdate)
        if(OrderUpdate){
          return  res.status(200).send({status: true, message: 'Order status update successfully.'})
         
        }
        return   res.status(400).send({status: false, message: 'Order status update failed.'})
   
    }catch(e){
        console.log(e)
    }
    },
    getOrder: async (req, res) =>{
       const customerId =  req.user.id;
       const search = req.query.search ? req.query.search : "";
       const sort = req.query.sort ? req.query.sort : 1
       let orderDetails =await mongodb.fetchOrderDetailsByCustomer(customerId, search, sort);
       console.log(orderDetails)
        if(search !== ""){
             orderDetails = await filterSearch(orderDetails, search)
        }
       res.status(200).send(orderDetails)
    },
    getOrdercount:async (req, res) =>{
        const customerId =  req.user.id;
        const search = req.query.date ? moment(req.query.date).toISOString() : moment().toISOString();
        let orderDetails =await mongodb.fetchOrderDetailsByCustomer(customerId, search, 1);
         if(search !== ""){
              orderDetails = await filterSearchByDate(orderDetails, search)
         }
        res.status(200).send({Ordercount: orderDetails.length})
     },
     getPurchasedCount: async (req, res) =>{
        const customerId =  req.user.id;
        let orderDetails =await mongodb.fetchOrderDetailsByCustomer(customerId, "", 1);
        orderDetails = await filterSearchStatus(orderDetails, req.query.status? req.query.status: 'delivered')
        res.status(200).send({status: true,purchasedStatus: req.query.status? req.query.status: 'delivered',  purchasedItemCount: orderDetails.length})
     },
    
}