class HelperPrice{
    checkPrice(price){
        price.replace(",",".");
        if (isNaN(price)) {
            return false;
        }
        return price;
    }
}
module.exports = HelperPrice;