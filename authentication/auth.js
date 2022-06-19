const jwt = require('jsonwebtoken');
const conf = require('../conf/conf');
const crypto = require('crypto')
module.exports = {
    authenticateToken :  (req, res, next)=> {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
      
        if (token == null) {
            return res.status(401).send({"status": false,"message": "Authentication failed."});
        }
      
        jwt.verify(token, conf.jsonwebtoken.secret, (err, user) => {
          if (err) {
            return res.status(401).send({"status": false,"message": "Authentication failed."});
          }
          req.user = user;
          next();
        })
      },
      
      generateAccessToken :(obj)=>{
        return jwt.sign(obj, conf.jsonwebtoken.secret, { expiresIn: conf.jsonwebtoken.expireIn });
      },
      verifyPassword: async (oldPassword, PasswordHash) => {
        try {
          let oldPwdHash = crypto.createHmac('sha1', oldPassword).update("").digest('hex');
          return oldPwdHash === PasswordHash;
        } catch (err) {
          return {
            status: false
          }
        }
      },
      hashPassword: async(password) => {
        try {
          return await crypto.createHmac('sha1', password).update("").digest('hex');
        } catch (err) {
          console.log(err)
          return {
            status: false
          }
        }
      },

}