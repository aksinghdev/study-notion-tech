const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryName : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    courses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course",
        required : true,
    },]  
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;