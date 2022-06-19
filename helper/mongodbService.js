
const product = require('../models/productList');
const users = require('../models/users');
const orders = require('../models/orders');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    findAndUpdate: async (data) =>{
        return new Promise((resolve, reject) =>{
            try{
            
            data.forEach((el, i) =>{
                var query = {"productName": el.productName},
                update = el
                options = { upsert: true, new: true, setDefaultsOnInsert: true };
                
            // Find the document
            product.findOneAndUpdate(query, update, options, function(error, result) {
                if (error) return;
                console.log(result)
                if(i == data.length-1){
                    resolve(true)
                }
                // do something with the document
            });
            })
        }catch(e){
            reject(false)
        }  
           
        })
      
    },
    createNewUser:async (reqobj)=>{
        return new Promise(async (resolve, reject) =>{
           let user = new users(reqobj)
           const save =await user.save();
           if(save){
            console.log("save", save)
            resolve(true)
           }else{
            reject(false)
           }
           
        }).catch(e =>{
           return null
        })
    },
    findUserByUserName : async(username)=>{
        return new Promise(async(resolve, reject) =>{
            var query = {"userName": username}
            let data =  await users.findOne(query);
            console.log("findone ", data)
            resolve(data)
        }).catch(e =>{
            return null
        })
    },

    // create order
    createOrder : async(obj) =>{
        return new Promise(async (resolve, reject) =>{
            let order = new orders(obj)
            const save =await order.save();
            if(save){
             console.log("save", save)
             resolve(true)
            }else{
             reject(false)
            }
            
         }).catch(e =>{
            return null
         })
    },
    fetchOrderDetails: async (id) =>{
        var query = {"_id": id}
        let data =  await orders.findOne(query);
        if(data){
            return data
        }else{
            return false
        }
    },
    updateOrders: async (updatequery, id) =>{
        var query = {"_id": id};
        var update = updatequery
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
        
    // Find the document
    orders.findOneAndUpdate(query, update, options, function(error, result) {
        if (error){
            console.log("updatederr", error);
            return false
        };
        console.log("result", result)
        return result
        // do something with the document
    });
    },
    findProducts : async(productName) =>{
        return new Promise(async(resolve, reject) =>{
            var query = {"productName": productName}
            let data =  await product.findOne(query);
            resolve(data)
        }).catch(e =>{
            return null
        })
    }
}