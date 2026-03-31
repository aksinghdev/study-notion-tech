import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { useEffect, useState } from "react";
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from "../../../../../../services/operations/courseDetailsAPI";
import TagInput from "./TagInput"
import RequirementsFields from "./RequirementsFields";
import { setStep, setCourse } from "../../../../../../slices/courseSlice";
import BtnIcon from "../../../../../common/BtnIcon"
import toast from "react-hot-toast";

export default function CourseInformationForm(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {course, editCourse} = useSelector( (state) => state.course);
    const {token} = useSelector( (state) => state.auth);
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

    // required field updation UI
    useEffect(() => {},[])
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
        // when form is in edit mode
        if(editCourse){
            if(isFormUpdated){
                const currentValues = getValues();
                const formData = new FormData();
                formData.append("courseId",course._id)
                if (currentValues.courseTitle !== course.courseName) {
                formData.append("courseName", data.courseTitle)
                }
                if (currentValues.courseShortDesc !== course.courseDescription) {
                formData.append("courseDescription", data.courseShortDesc)
                }
                if (currentValues.coursePrice !== course.price) {
                formData.append("price", data.coursePrice)
                }
                if (currentValues.courseTags.toString() !== course.tag.toString()) {
                formData.append("tag", JSON.stringify(data.courseTags))
                }
                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                formData.append("whatYouWillLearn", data.courseBenefits)
                }
                if (currentValues.courseCategory._id !== course.category._id) {
                formData.append("category", data.courseCategory)
                }
                if (
                currentValues.courseRequirements.toString() !==
                course.instructions.toString()
                ) {
                formData.append(
                    "instructions",
                    JSON.stringify(data.courseRequirements)
                )
                // if(currentValues.courseImage !== course.thumbnail){
                //     formData.append("thumbnail",data.courseImage)
                // }

                setLoading(true)
                const result = await editCourseDetails(formData, token)
                setLoading(false)
                if(result){
                    dispatch(setStep(2))
                    dispatch(setCourse(result))
                }

            }else{
                toast.error("No changes made to the form")
            }
            return
            }
        }
        // when form is in normal mode (fresh course creation)
            const formData = new FormData()
            formData.append("courseName", data.courseTitle)
            formData.append("courseDescription", data.courseShortDesc)
            formData.append("price", data.coursePrice)
            formData.append("tag", JSON.stringify(data.courseTags))
            formData.append("whatYouWillLearn", data.courseBenefits)
            formData.append("category", data.courseCategory)
            // formData.append("status", COURSE_STATUS.DRAFT)
            formData.append("instructions", JSON.stringify(data.courseRequirements))
            formData.append("thumbnail", data.courseImage)
            setLoading(true)
            const result = await addCourseDetails(formData, token)
            console.log(result);
            if (result) {
            dispatch(setStep(2))
            dispatch(setCourse(result))
            }
            setLoading(false)
    }

    

    return(
        <form
        className=" space-y-8 border-[1px] border-richblack-700 rounded-md bg-richblack-800 p-6"
        onSubmit={handleSubmit(onSubmit)}
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
                    placeholder= {`Course Price`}
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
                    Benifits of The Course <sup className=" h-fit bg-pink-200">*</sup>
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
            {/* buttons for next and save */}
            <div className="flex justify-end gap-x-2">
                {editCourse && (
                    <button
                        disabled={loading}
                        onClick={()=>dispatch(setStep(2))}
                        className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                    >
                        Continue Without Saving
                    </button>
                )}
                <BtnIcon
                    text={!editCourse ? "Next" : "Save Changes"}
                    disabled={loading}
                >

                </BtnIcon>
            </div>
        </form>
    );
}