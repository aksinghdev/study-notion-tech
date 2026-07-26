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

// https://res.cloudinary.com/drssmbf2p/image/upload/v1783438796/singhraj/ozujnvdfl9jhnwu9nydd.jpg


exports.fileDeleteFromCloudinary = async (fileUrl, resource_type ="auto") => {
    try{
        if(!fileUrl) return null;
        // get or extract publicId from url that is required for delete file
        const ulrParts = fileUrl.split("/");
        const uploadIndex = ulrParts.indexOf("upload")
        const publicidWithExtension = ulrParts.slice(uploadIndex + 2).join("/")
        // final public id
        const publicId = publicidWithExtension.substring(0,publicidWithExtension.lastIndexOf("."))

        // delete file 
        return await cloudinary.uploader.destroy(publicId,{resource_type : resource_type});

    }catch(error){
        console.log("Cloudinary file delete error... ",error)
        throw error;
    }
}