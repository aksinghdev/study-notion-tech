import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { useEffect, useState } from "react";
import { fetchCourseCategories } from "../../../../../../services/operations/courseDetailsAPI";
import TagInput from "./TagInput"
import RequirementsFields from "./RequirementsFields";

export default function CourseInformationForm(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {course, editCourse} = useSelector( (state) => state.course);
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState : {errors},
    } = useForm();

    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    const getCategories = async () =>{
        setLoading(true);
        const categories = await fetchCourseCategories();
        if (categories.length > 0){
            setCourseCategories(categories);
        }
        setLoading(false)
    }


    useEffect( () =>{
        // when course edit karna hai
        if(editCourse){
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
        }
        getCategories();
    },[]);

    // check for form update

    const isFormUpdated = () => {
        const currentValues = getValues()
        // console.log("changes after editing form values:", currentValues)
        if(
        currentValues.courseTitle !== course.courseName ||
        currentValues.courseShortDesc !== course.courseDescription ||
        currentValues.coursePrice !== course.price ||
        currentValues.courseTags.toString() !== course.tag.toString() ||
        currentValues.courseBenefits !== course.whatYouWillLearn ||
        currentValues.courseCategory._id !== course.category._id ||
        currentValues.courseRequirements.toString() !== course.instructions.toString()
        //   currentValues.courseImage !== course.thumbnail
        ){
        return true
        }else
    return false
} 

    // submit handler logic function

    const onSubmit = async (data) =>{

    }

    return(
        <form
        className=" space-y-8 border-[1px] border-richblack-700 rounded-md bg-richblack-800 p-6"
        onSubmit={handleSubmit}
        >
            {/* course title */}
            <div className=" flex flex-col space-y-2">
                <label className=" text-sm text-richblack-5" htmlFor="courseTitle">
                    Course Title <sup className="text-pink-200">*</sup>
                </label>
                <input
                    type="text"
                    id="courseTitle"
                    name="courseTitle"
                    placeholder="Enter Course Title"
                    {...register("courseTitle", {required : true})}
                    className=" py-1 px-2 text-richblack-200 text-start bg-richblack-700 rounded-lg border-richblack-600 border-b-[1px] w-full"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                />
                {errors.courseTitle && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course title is required
                    </span>
                )}
            </div>
            {/* course description */}
            <div className=" flex flex-col space-y-2">
                <label className=" text-sm text-richblack-5" htmlFor="courseTitle">
                    Course short description <sup className="text-pink-200">*</sup>
                </label>
                <textarea
                    type="textarea"
                    id="courseShortDesc"
                    name="courseShortDesc"
                    placeholder="Enter Course short description"
                    {...register("courseShortDesc", {
                        required : true,
                        minLength :{
                            value:20,
                            message: "minimum 20 character required"
                        },
                        maxLength:{
                            value : 600,
                            message : "maximum 1000 character accepted"
                        }
                    }
                    )}
                    className=" py-1 px-2 text-richblack-200 text-start bg-richblack-700 rounded-lg border-richblack-600 border-b-[1px] w-full"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        height : "100px"
                    }}
                />
                {errors.courseShortDesc && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course descreption is required
                    </span>
                )}
            </div>
            {/* course price */}
            <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-5" htmlFor="coursePrice">
                Course Price <sup className="text-pink-200">*</sup>
                </label>
                <div className="relative">
                <input
                    id="coursePrice"
                    name="coursePrice"
                    placeholder="       Course Price"
                    {...register("coursePrice", {
                    required: true,
                    valueAsNumber: true,
                    pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    },
                    })}
                    className=" py-1 px-2 text-richblack-200 text-start bg-richblack-700 rounded-lg border-richblack-600 border-b-[1px] w-full"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                />
                <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
                </div>
                {errors.coursePrice && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Course Price is required
                </span>
                )}
            </div>
            {/* course categories */}
            <div className="flex flex-col space-y-2">
                <label className=" text-sm text-richblack-5 " htmlFor="courseCategory">
                    Course Category <sup className=" text-pink-200">*</sup>
                </label>
                <select
                    className=" py-1 px-2 text-richblack-200 text-start bg-richblack-700 rounded-lg border-richblack-600 border-b-[1px] w-full"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    {...register("courseCategory", {required : true})}
                    id="courseCategory"
                    name="courseCategory"
                    defaultValue=""
                >
                    <option value="" desabled >choose a category</option>
                    {!loading && 
                        courseCategories?.map( (category, index) =>(
                            <option key={index} value={category?._id}>
                                {category?.name}
                            </option>
                        ))
                    }
                </select>
                {errors.courseCategory && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course Category is required
                    </span>
                )}
            </div>
            {/* course tag */}
                <TagInput
                    lable ="Tags"
                    name = "courseTags"
                    placeholder = "Type tag and enter a comma or press Enter Key"
                    register ={register}
                    setValue = {setValue}
                    getValues = {getValues}
                    errors = {errors}
                />
            {/* course thumbnail */}

            {/* benifits of the course */}
            <div className=" flex flex-col space-y-2">
                <label className=" text-sm text-richblack-5" htmlFor="courseBenifits">
                    Benifits of The Course <sup className=" bg-pink-200">*</sup>
                </label>
                <textarea
                    type="textarea"
                    id="courseBenifits"
                    name="courseBenifits"
                    placeholder="Enter Course Benifits"
                    {...register("courseBenifits", {
                        required : true,
                        minLength :{
                            value:20,
                            message: "minimum 20 character required"
                        },
                        maxLength:{
                            value : 600,
                            message : "maximum 1000 character accepted"
                        }
                    }
                    )}
                    className=" py-1 px-2 text-richblack-200 text-start bg-richblack-700 rounded-lg border-richblack-600 border-b-[1px] w-full"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        height : "100px"
                    }}
                />
                {errors.courseBenifits && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course Benifits is required
                    </span>
                )}

            </div>
            {/* requirements & instructions */}
            <RequirementsFields
                lable = "Requirements/Intructions"
                name = "courseRequirements"
                setValue ={setValue}
                getValues={getValues}
                errors={errors}
                register={register}
            />
        </form>
    );
}