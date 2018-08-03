var express = require('express');
var router = express.Router();
const Multer = require('multer');
const CsvService = require('../services/fastcsvService');
const UploadController = require('../controllers/uploadController');

const storage = Multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null,"uploads/");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});
const upload = Multer({storage});

router.get('/',(req,res,next)=>{
    res.render('subir',{
        title:'Subida de archivos'});
})
router.post('/upload',upload.single('file'),(req, res, next)=>{
    // console.log(req.file.originalname);
    let uploadController = new UploadController(req,res,next);
    uploadController.upload();
})
module.exports = router;
