const axios = require('axios');
const {uploadfile} = require('./storge.service.js');

const ImageGenerate = async (prompt) => {
    try {
        // 1️⃣ Fetch image as binary
        const response = await axios.get(`https://image.pollinations.ai/prompt/${prompt}`, {
            responseType: 'arraybuffer'
        })
        // response.data is buffer of image data that dirctly give to ImageStore function

        // 3️⃣ Upload to ImageKit
        const imageDetails = await uploadfile(response.data);
        return imageDetails.url;
    } catch (error) {
        console.error('Error generating image:', error);
    }
}

module.exports = ImageGenerate;
