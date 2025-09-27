const ImageKit = require("imagekit")
require('dotenv').config()


const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT // This is the default and can be omitted
});


async function uploadFile(file,filename) {
    const result = await client.upload({
        file: file,
        fileName: filename
    })    
    return result;
}

module.exports = { uploadFile }