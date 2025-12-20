const axios = require('axios');
const {uploadfile} = require('./storge.service.js');

const ImageGenerate = async (prompt) => {
    console.log('Generating image for prompt:', prompt);
    try {
        // 1️⃣ Fetch image as binary
        const response = await axios.get(`https://image.pollinations.ai/prompt/${prompt}`, {
            responseType: 'arraybuffer'
        })
        // response.data is buffer of image data that dirctly give to ImageStore function

        // 3️⃣ Upload to ImageKit
        const imageDetails = await uploadfile(response.data);
        console.log('Image uploaded to ImageKit:', imageDetails);

        console.log('Image uploaded to ImageKit:', imageDetails.url);
        console.log('Image generated successfully');
        return imageDetails.url;
    } catch (error) {
        console.error('Error generating image:', error);
    }
}

module.exports = ImageGenerate;
