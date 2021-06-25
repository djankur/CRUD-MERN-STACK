const mongoose = require('mongoose')




const url = 'mongodb://localhost:27017/regform'

mongoose.connect(url, { useNewUrlParser: true,useUnifiedTopology: true ,useFindAndModify:true,useCreateIndex:true},  (err)=>
{
    if(!err)
    {
        console.log("mongodb Connected . . . ")
    }

    else{
        console.log(" Error !")
    }
});









