
const Category = require("../models/Category");

function getRandomInt(max){
    return Math.floor(Math.random() * max)
}

exports.createCategory = async (req, res ) =>{
    try{
        // fetch the data
        const {name, description} = req.body;
        // data validation 
        if(!name || !description){
            return res.status(400).json({
                success : false,
                message : 'Please Enter all Fields carefully'
            });
        }
        // ctrate entry in database
        const categoryData = await Category.create({
            name : name,
            description : description,
        });
        console.log("created category is:----->",categoryData);
        // return responce
        return res.status(200).json({
            success : true,
            message : 'category created successfully',
            categoryData
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : 'Category not created, please try again'
        });
    }
}

// Find all tags
exports.showAllCategories = async (req, res ) =>{
    try{
        // const allCategories = await Category.find({}, {name : true, courses : true, description : true});
        const allCategories = await Category.find();
        return res.status(200).json({
            success : true,
            message : 'All Categories are returned',
            data : allCategories
        });
    }
    catch(e){
        console.log(e);
        return res.status(400).json({
            success : false,
            message : 'Category not found'
        });
    }
};

// categories page details for all types of categories

exports.categoryPageDetails = async (req, res) =>{
    try{
        // get categories id from request
        const{categoryId} = req.body;

        // Get courses for the specified category
        const selectedCategoryData = await Category.findById(categoryId).populate({
            path: "courses",
            match : {status : "Published"},
            populate : "ratingsAndReviews", 
        }).exec();
        console.log("Selected Categories Details:---",selectedCategoryData);
    // Validation
        // Handle the case when the category is not found
        if(!selectedCategoryData){
            return res.status(502).json({
                success: false,
                message : "category not foud plese try again" 
            });
        }

        // Handle the case when there are no courses
        if(selectedCategoryData.courses.length === 0){
            console.log("No Courses found for the same category");
            return res.status(502).json({
                success: false,
                message : "category courses not found or 0 courses for this category"
            });
        }
    // get courses for others categories
        const differentCatagory = await Category.find({ _id : {$ne: categoryId}})
        let otherCategoriesData = await Category.findOne(differentCatagory[getRandomInt(differentCatagory.length)]._id)
        .populate({
            path : "courses",
            match : {status : "Published"},
            populate : "ratingsAndReviews"
        }).exec();
        
        // console.log("Print other catagory data :  ", otherCategoriesData);
    // get-top selling courses across all categories
        const allCatagories = await Category.find().populate({
            path : "courses",
            match : {status : "Published"}
        }).exec();
        const allCourses = allCatagories.flatMap((category) => category.courses)
        console.log("Print all courses : ",allCourses);
        const topSellingCourses = allCourses.sort((A , B) => B.studentEnrolled.length - A.studentEnrolled.length).slice(0, 10);
        
        // get related courses
        // return responce
        return res.status(201).json({
            success: true,
            message : "Selected & Others categories courses fetched",
            data:{
                selectedCategoryData,
                otherCategoriesData,
                topSellingCourses,
            },
        });
            
    }
    catch(error){
        console.log("errror when geting category page details--", error);
        return res.status(400).json({
            success: false,
            message : error.message
        });
    }

};