const mongoose = require('mongoose')

const db = ()=>{
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log('Data base connectd succesfully')
    }).catch((err)=>{
        console.error('Fail to connectd Database'+err)
        return process.exit(1);
    })


}
module.exports=db;