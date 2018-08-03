let fs = require('fs');
let csv = require('fast-csv');

const TypeService = require('./typeService');
const HelperDate = require('../helpers/helperDate');
class FastcsvService{
    constructor(req, res, next){
        this.req = req;
        this.res=res;
        this.next = next;
        this.stream = fs.createReadStream(__dirname+'/../uploads/'+req.file.originalname);
    }
    read(){
        return new Promise((resolve,reject)=>{
            let typeService = new TypeService();
            let helperDate = new HelperDate();
            var csvStream = csv({delimiter: ';' })
                .on("data", function(data){
                    if(data[0]==="VA"){
                        typeService.addVA(data);
                    }else if(data[0]==="VL"){
                        typeService.addVL(data);
                    }
                })
                .on("end", function(){
                    resolve({regProcesados:typeService.getVL().length, regErroneos: typeService.getVLError().length, regFallo: typeService.getVLError()});
                    //console.log(typeService.getVA());
                    //console.log(typeService.getVL());
                    // res.json({"Registros procesados: " : typeService.getVL().length, "Errores: " : typeService.getVLError().length});
                    // console.log("Se han procesado " + typeService.getVL().length + typeService.getVLError().length + " registros");
                    //console.log("Se han encontrado " + typeService.getVLError().length + " registros erróneos");
                    //console.log(typeService.getVLError());
                });
            this.stream.pipe(csvStream);
        })
    }
}
module.exports = FastcsvService;