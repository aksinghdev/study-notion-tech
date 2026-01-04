const cloudinary = require("cloudinary").v2;


exports.fileUploadCloudinary = async (file, folder, height, quality) =>{
    const options = {folder};
    if(height){
        options.height = height;
    }
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";
    // options.use_filename = true;
    // options.unique_filename = false;
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}