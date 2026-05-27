
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
        if(course?.courseContent?.length === 0){
            toast.error("Please add atleast one section")
            return;
        }
        if(course?.courseContent?.some((section) => section.subSection.length === 0)){
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
        <div className=" text-xl text-richblack-5">
            <p>
                Courae Builder
            </p>
            <form onSubmit={handleSubmit(submitForm)}>
                {/* for lable and input for new section */}
                <div>
                    <label>Section Name <sup>*</sup></label>
                    <input
                    id="sectionName"
                    name="sectionName"
                    className=" text-richblack-800"
                    placeholder="Enter Section Name"
                    {...register("sectionName",{required:true})}
                    />
                    {errors.sectionName && (
                        <span>Section Name is required</span>
                    )}
                </div>
                {/* for buttons */}
                <div className=" flex items-center gap-x-3">
                    <BtnIcon
                        type="submit"
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
                className='rounded-md cursor-pointer flex items-center '>
                    Back
                </button>
                <button text="Next" onclick={goToNext}>
                    <MdOutlineNavigateNext />
                </button>

            </div>
      

        </div>
    );
}