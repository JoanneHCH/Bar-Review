const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'BarReview', // Folder name on Cloudinary where images will be uploaded
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});

module.exports = {
  cloudinary,
  storage
};