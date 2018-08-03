const Controller = require('./controller');
const CsvService = require('../services/fastcsvService');

class UploadController extends Controller{
    constructor(req,res,next){
        super(req,res,next);
    }
    upload(){
        let csvService = new CsvService(this.req, this.res, this.next);
        csvService.read()
            .then(data=>{
                // console.log("Resultado recibido -> " + JSON.stringify(data));
                this.view(data);
            })
    }
    view(data)
    {
        this.res.render('resultado',{
            "title":"Resultado",
            registrosProcesados: data.regProcesados,
            registrosErroneos: data.regErroneos,
            registroFallo: data.regFallo
        })
    }
}
module.exports = UploadController;