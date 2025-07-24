// BACKEND > config > cloudinary.js
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dnmyq1nke",
  api_key: "495721184823222",
  api_secret: "D0oW1nA_80e2Bt-4zrFNlwVNZhM",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads", // optional folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

module.exports = {
  cloudinary,
  storage,
};
