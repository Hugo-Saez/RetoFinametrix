class HelperDate{
    checkDate(date){
        return /^[0-9]{8}$/.test(date);
    }
}
module.exports = HelperDate;