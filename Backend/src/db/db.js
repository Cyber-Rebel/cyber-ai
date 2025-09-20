const mongoose = require('mongoose')

const db = ()=>{
    mongoose.connect(process.env.Mongodb_url).then(()=>{
        console.log('Data base connectd succesfully')
    }).catch((err)=>{
        console.error('Fail to connectd Database'+err)
    })


}
module.exports=db;