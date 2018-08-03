const Controller = require('./controller');
const ValoresModelVL = require('../models/valoresModelVL');
const HelperCalc = require('../helpers/helperCalc');

class RequestController extends Controller {
    constructor(req, res, next){
        super(req, res, next);
    }
    index(){
        let res = this.res;
        // console.log(this.req.query);
        let queryPerformance = ValoresModelVL.find({'isin': this.req.query.isin, 'fecha':{$gte:this.req.query.dateFrom , $lte: this.req.query.dateTo}},['fecha','precio'],{sort:{
          fecha: 1
        }});
        queryPerformance.exec(function(err, results){
            if (err) reject(err);
            let helperCalc = new HelperCalc(results);
            let resultado = {};
            helperCalc.calcPerformance()
                .then(result=>{
                    // console.log("Resultado final-> " + result);
                    helperCalc.calcVolatility(result)
                        .then(resultfin=>{
                            res.json(resultfin)
                        })
                })
        });
    }
}
module.exports = RequestController;