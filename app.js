const express = require('express');
const app = express();
const helmet = require('helmet');
const mongodb = require('mongoose')
app.use(helmet())



//store user state, claims from a JWT, request/correlation IDs, and any other request-scoped data
const cookieParser = require('cookie-parser');
app.use(express.raw());
app.use(express.text());
app.use(express.json({
    type: ['json', '+json'],
    limit: '1mb',
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());




// mongodbURI
// const mongodbURI = 'mongodb+srv://username:dNucvVKnzJ2pw9Zy@cluster0.ztnpdps.mongodb.net/?retryWrites=true&w=majority'
const mongoConnectionString = 'mongodb+srv://pravindevis:1otGpfhomRVVh4LV@cluster0.8fwxg.mongodb.net/?retryWrites=true&w=majority'; 
mongodb.connect(mongoConnectionString,{
    serverSelectionTimeoutMS: 5000
}).then(data =>{
    console.log("DB connected succesfully")
}).catch(err =>{
    console.log(err)
    console.log("DB connection failed." , err.message)
})







app.use(require('./router/routes'))




process.on('uncaughtException',function(err){
    console.log( err);
  });
  
  //Starting the Server
  app.listen(3000, () => {
    console.log(`App started on port 3000`)
  }).timeout = 600000;
  module.exports = app;