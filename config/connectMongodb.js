const Mongoose = require('mongoose');

module.exports = function connect ()
{
    Mongoose.connect('mongodb://localhost:27017/RetoFinametrix',  {useNewUrlParser: true },(error)=>{
        // console.log("Entra");
    // console.error(error);
})
}
