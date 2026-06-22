
import { useDispatch, useSelector } from "react-redux";
import { resetCourseState, setCourse, setStep } from "../../../../../../slices/courseSlice";
import { useForm } from "react-hook-form";
import BtnIcon from "../../../../../common/BtnIcon";
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { createSection, updateSection } from "../../../../../../services/operations/courseDetailsAPI";
import toast from "react-hot-toast";
import NestedView from "./NestedView";
import { MdOutlineNavigateNext } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
// import NestedView from "./NestedView";


export default function CourseBuilderForm (){

    const {token} = useSelector( (state) => state.auth);
    const {course} = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const {register, handleSubmit, setValue, formState:{errors}} = useForm();
    const [editSection, setEditSection] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect( ()=>{
        console.log("UPDATED the section UI with course:---",course)
    },[course])

    console.log("Print course from redux--",course);

    const cancelEdit = () =>{
        setEditSection(null);
        setValue("sectionName","")
    }

    const submitForm = async (data)=>{
        setLoading(true)
        let result;
        // if form under edit mode
        if(editSection){
            result = await updateSection (
                {
                newSecName : data.sectionName,
                sectionId : editSection,
                courseID: course._id,
                },token

            )
        }else{ 
            // create a new section
            result = await createSection(
                {
                    sectionName : data.sectionName,
                    courseID : course._id,
                },token
            )
        }

        if(result){
            // update redux store and form
            dispatch(setCourse(result))
            setEditSection(null)
            setValue("sectionName", "")
        }
        setLoading(false)
    }

    const goBack = ()=>{
        dispatch(setStep(1));
        setEditSection(true);
    }

    const goToNext = ()=>{
        console.log("print course content length : ", course?.courseContent?.length);
        if(course?.courseContent?.length === 0){
            toast.error("Please add atleast one section")
            return;
        }
        if(course?.courseContent?.some((section) => section.subsection.length === 0)){
            toast.error("Please add at lest one lecture in each sub section")
            return;
        }
        dispatch(setStep(3))
        
    }

    const handleEditSectionChange = (sectionId, sectionName) =>{
        if(editSection === sectionId){
            cancelEdit()
            return;
        }

        setEditSection(sectionId)
        setValue("sectionName", sectionName)
    }

    return(
        <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p className="text-2xl font-semibold text-richblack-5">
                Courae Builder
            </p>
            <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
                {/* for lable and input for new section */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-5" htmlFor="sectionName">
                        Section Name <sup className="text-pink-200">*</sup>
                    </label>
                    <input
                    id="sectionName"
                    name="sectionName"
                    className=" py-1 px-2 text-richblack-200 text-start bg-richblack-500 rounded-lg border-richblack-400 border-b-[1px] w-full"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    placeholder="Enter Section Name"
                    {...register("sectionName",{required:true})}
                    />
                    {errors.sectionName && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Section Name is required</span>
                    )}
                </div>
                {/* for buttons */}
                <div className=" flex items-end gap-x-4">
                    <BtnIcon
                        type="submit"
                        disabled={loading}
                        outline={true}
                        text={editSection ? "Edit Section Name" : "Create Section"}
                        children={<><IoMdAddCircleOutline/></>}
                    />
                    {editSection && (<button
                    type="button"
                    onClick={cancelEdit}
                    className="text-sm underline text-richblack-400"
                    >
                        Cancel edit
                    </button>)}
                </div>
            </form>


            {/* nested view section */}
            {course?.courseContent?.length > 0 && (
                <NestedView handleEditSectionChange={handleEditSectionChange}/>
            )}

            <div className='flex justify-end gap-x-3 mt-10'>
                <button
                onClick={goBack}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                >
                   <IoIosArrowBack/>
                    <p>Back</p>
                </button>
                <BtnIcon text="Next" onclick={goToNext}>
                    <MdOutlineNavigateNext />
                </BtnIcon>

            </div>
      

        </div>
    );
}