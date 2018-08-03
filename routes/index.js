var express = require('express');
var router = express.Router();
const Valor = require('../models/valoresModelVA');
const ReqController = require('../controllers/requestController');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/api/performance/',(req, res ,next)=>{
    let reqController = new ReqController(req,res,next);
    reqController.index();
})
module.exports = router;
