
const auth = require('../authentication/auth');
const mongodb = require('../helper/mongodbService')


module.exports = {
    login : async (req, res) =>{
        try{
       const hashpassword =await auth.hashPassword(req.body.password);
       // fetch user by username
       const userDetail = await mongodb.findUserByUserName(req.body.userName);
       if(userDetail){
         const oldpassword = userDetail.password;
          // compare password
         if(oldpassword == hashpassword){
            
            let payload = {
                id: userDetail._id,
                userName: userDetail.userName,
                role:userDetail.role
            } 
            console.log("paylod", payload)
            let token = await auth.generateAccessToken(payload)
            res.status(200).send({"status":true,"message": "Login successfull.", "token": token})
         }else{
            res.status(400).send({"status":false,"message": "Username/password incorrect."})

         }
       }else{
        res.status(400).send({"status":false,"message": "User not exists."})
       }
      

       

       
    }catch(e){
        console.log(e)
        res.status(400).send({"status":false,"message": "Login failed. Please try again!."})

    }
    },
    register : async (req, res) =>{
        try{
            const hashpassword =await auth.hashPassword(req.body.password);
            // check username already exists
            const userDetail = await mongodb.findUserByUserName(req.body.userName);
            if(!userDetail){
                const obj = {userName: req.body.userName, password: hashpassword, role: 'admin'}
                let createUser = await mongodb.createNewUser(obj)
                if(createUser){
                    res.status(201).send({"status":true, "message": "Registration successfull. Please login with username and password."})
                }else{
                    res.status(400).send({"status":false, "message": "Registration failed. Please try again!."})
                }
            }else{
                res.status(400).send({"status":false, "message": "Username already exists. Please change username."})
            }
        }catch(e){
            res.status(400).send({"status":false, "message": "Registration failed. Please try again!."})
        }
    }
}