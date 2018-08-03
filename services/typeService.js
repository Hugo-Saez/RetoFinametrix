const VaModel = require('../models/valoresModelVA');
const VlModel = require('../models/valoresModelVL');
const HelperDate = require('../helpers/helperDate');
const HelperPrice = require('../helpers/helperPrice');
class TypeService
{
    constructor()
    {
        this.vaArray=[];
        this.vlArray=[];
        this.vlError=[];
    }
    addVA(value)
    {
        let va={
            "isin": value[1],
            "nombre":value[2],
            "divisa":value[3],
            "familia":value[4]
        };
        let valorObject = new VaModel(va);
        valorObject.save(err=>{
            if(err)console.error(err);
            // console.log("Almacenado");
        })
        this.vaArray.push(va);
    }
    addVL(value)
    {
        let date = value[2];
        let price = value[3].replace(",",".");
        let helperDate = new HelperDate();
        let helperPrice = new HelperPrice();
        if(helperDate.checkDate(date) && (helperPrice.checkPrice(price))){
            let vl={
                "isin": value[1],
                "fecha": value[2],
                "precio":price
            };
            let valorObject = new VlModel(vl);
            valorObject.save(err=>{
                if(err)console.error(err);
                //console.log("Almacenado");
            })
            this.vlArray.push(vl);
        }
        else{
            let vl={
                "isin": value[1],
                "fecha": value[2],
                "precio": price
            };
           this.vlError.push(vl);
        }
    }
    getVA()
    {
        return this.vaArray;
    }
    getVL()
    {
        return this.vlArray;
    }
    getVLError()
    {
        return this.vlError;
    }
}
module.exports = TypeService;