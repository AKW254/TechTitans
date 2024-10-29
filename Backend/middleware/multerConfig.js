const multer = require('multer');
const path = require('path');

//Set up storage engine
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads');
    },
    filename: function(req,file,cb){
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});
//init upload
const upload = multer({
    storage: storage
});
//Export the Middleware 
module.exports = upload