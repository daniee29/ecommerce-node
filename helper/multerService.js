const multer = require('multer')


const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	   cb(null, './uploads')
	},
	filename: (req, file, cb) => {
	   cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
	}
});
const upload = multer({storage: storage}).single('productsFile');;

module.exports = {
    uploadFile : async (req, res, next) =>{
       upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        next()
    });
    }
}