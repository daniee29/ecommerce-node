const Products = require('../models/productList')
const CSVToJSON =require('csvtojson')
const mongodbService = require('../helper/mongodbService')


module.exports = {
    // test API
    addItem : (req, res, next) =>{
        const products = new Products({
            productName :"iphone",
            productDescription:"New Leatex features",
            price: 54200
        });
        products.save().then(result =>{
            res.status(201).send({status: true,message: "Item added successfully."})
        }).catch(err =>{
            res.status(400).send({status: false,message: "DB Insert Failure"})
        })
    },
    uploadProducts :async (req, res, next) =>{
        if(req.user.role != 'admin') {
            return res.status(401).send({"status":false,"message": "You are not Authorized to perfom this action."})
        }
        let filePath = './uploads/' + req.file.filename;
        CSVToJSON().fromFile(filePath)
    .then(async data => {
        const update =await  mongodbService.findAndUpdate(data)
        if(update){
        return    res.status(201).send({status:true, message: 'Update successfully.'})
        }
        res.status(400).send({status:false, message: 'Insert/Update Failed.'})
    }).catch(err => {
        // log error if any
        res.status(400).send({status:false, message: 'Insert/Update Failed.'})
    });

        
    }
}