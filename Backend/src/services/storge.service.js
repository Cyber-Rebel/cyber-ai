const ImageKit = require('imagekit')


var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, 
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

function uploadfile(file){

return new Promise((resolve, reject) =>{ 
     imagekit.upload({
      
                file: file,// actual data of image that store in image 
                fileName:`${Date.now()}_${Math.random().toString(36).substring(2, 8)}.jpg`,
                folder:"ai-mage" 
                
                
            
     },(error, result)=>{
        if(error){
            console.log(error);
            reject(error.message);
        }else{
            resolve(result)
        }


     })

})
}
module.exports=uploadfile;
