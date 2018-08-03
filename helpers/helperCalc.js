class HelperCalc
{
    constructor(objetos)
    {
        this.Objetos = objetos;
    }
    calcPerformance()
    {
        return new Promise((resolve, reject)=>{
            let firstValue = this.Objetos[0].precio;
            let lastMark = this.Objetos.length-1;
            let lastValue = this.Objetos[lastMark].precio;
            let dateFromFinish = this.Objetos[0].fecha;
            let dateFrom = 0;
            let dateToFinish = this.Objetos[lastMark].fecha;
            let dateTo = 0;
            let numValuesDF = 1;
            let numValuesDT = 1;
            let i = 0;
            // console.log('first value -> ' + firstValue);
            for (i = 1; i<=lastMark; i++){
                dateFrom = this.Objetos[i].fecha;
                if (dateFromFinish == dateFrom){
                    firstValue = firstValue + this.Objetos[i].precio;
                    numValuesDF = numValuesDF + 1;
                    // console.log('first value -> ' + firstValue);
                    // console.log('numValuesDF -> ' + numValuesDF);
                };
            }
            firstValue = firstValue / numValuesDF;
            let j = 0;
            // console.log('last value -> ' + lastValue);
            for (j = lastMark -1; j>=0; j--){
                dateTo = this.Objetos[j].fecha;
                if (dateToFinish == dateTo){
                    lastValue = lastValue + this.Objetos[j].precio;
                    numValuesDT = numValuesDT + 1;
                    // console.log('last value -> ' + lastValue);
                    // console.log('numValuesDT -> ' + numValuesDT);
                };
            }
            lastValue = lastValue / numValuesDT;
            // console.log('first value final -> ' + firstValue);
            // console.log('last value final -> ' + lastValue);
            // console.log("Numero -> " + this.Objetos.length);
            // console.log(this.Objetos[0].fecha);
            // console.log(this.Objetos[lastMark].fecha);
            // console.log(firstValue+'->'+lastValue);
            let result = (lastValue - firstValue) / firstValue;
            // console.log(result);
            resolve(result);
        })
    }
    calcVolatility(firstResult)
    {
        return new Promise((resolve,reject)=>{
            let halfPrice = 0;
            let lastMark = this.Objetos.length-1;
            let numDays = this.Objetos.length;
            let i = 0;
            for (i = 0; i<=lastMark; i++){
                halfPrice = halfPrice + this.Objetos[i].precio;
            }
            halfPrice = halfPrice / numDays;
            // console.log(halfPrice);

            let varianceArray = [];
            let variance = 0;
            for (i = 0; i<=lastMark; i++){
                varianceArray[i] = (Math.pow(this.Objetos[i].precio - halfPrice, 2));
                variance =  variance + varianceArray[i];
               // console.log('varianza Array ' + [i] + ': ' + varianceArray[i]);
                //console.log('varianza ' + [i] + ': ' + variance);
            }
            let totalVariance = variance / (numDays-1);
            //console.log('varianza total ' + [i] + ': ' + totalVariance);
            let result = Math.sqrt(totalVariance);
            //console.log('varianza total final: ' + result);
            resolve({"performance":firstResult, "volatility":result});
        })
    }
}
module.exports = HelperCalc;