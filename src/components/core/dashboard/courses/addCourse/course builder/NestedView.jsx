import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdModeEdit } from "react-icons/md";
import { RxDropdownMenu } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { deleteSection, deleteSubSection } from "../../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../../slices/courseSlice";
import ConfirmationModal from "../../../../../common/ConfirmationModal";
import SubSectionModal from "./SubSectionModal";


export default function NestedView ({handleEditSectionChange}){

    const dispatch = useDispatch();
    const [addSubsection, setAddSubsection] = useState(null);
    const [viewSubsection, setViewSubsection] = useState(null);
    const [editSubsection, setEditSubsection] = useState(null);

    const [onConfirmationModal, setOnConfirmationModal] = useState(false);

    const {course} = useSelector( (state) => state.course);
    const { token} = useSelector( (state) => state.auth);

    // delete section
    const handleDeleteSection = async (sectionId)=>{
        const result = await deleteSection({
            sectionId,
            courseId : course._id,
            token
        });
        console.log("Print after delete section result---",result);
        if(result){
            dispatch(setCourse(result))
        }
        setOnConfirmationModal(null);
    }
    
    // delete subsection
    const handleDeleteSubsection = async (subSectionId, sectionId)=> {
        
        const result = await deleteSubSection({
            subSectionId,
            sectionId,
            token
        })
        console.log("Print after delete Sub section result---",result);
        if(result){
            // update course
            const updatedCourseContent = course.courseContent.map( (section)=>
                section._id === sectionId ? result : section
            ) 
            const updatedCourse = {...course, courseContent : updatedCourseContent}
            dispatch(setCourse(updatedCourse));
            console.log("section delete ")
        }
        setOnConfirmationModal(null)
    }


    console.log("Print course inside nested vieew", course);
    console.log("Print course content inside nested vieew", course?.courseContent);
    console.log("Print course content section inside nested vieew", course?.courseContent);

    useEffect( ()=>{
        console.log("Update UI inside Course builder ")
    },[course])

    return(
        <>
            
                <div className="rounded-lg bg-richblack-700 p-4 sm:p-6 sm:px-8">
                    {course?.courseContent.map( (section) => (
                        <details key={section._id} open>
                            <summary className="flex cursor-pointer items-center justify-between gap-x-2 border-b-2 border-b-richblack-600 py-2">
                                <div className="flex items-center gap-x-2 sm:gap-x-3 min-w-0">
                                    <RxDropdownMenu  className="text-2xl text-richblack-50 flex-shrink-0"/>
                                    <p className="font-semibold text-richblack-50 truncate">
                                        {section.sectionName}
                                    </p>
                                </div>
                                {/* button for edit and delete */}
                                <div className="flex items-center gap-x-2 sm:gap-x-3 flex-shrink-0">
                                    <button
                                        onClick={() => {handleEditSectionChange(section._id, section.sectionName)}}
                                    >
                                        <MdModeEdit className="text-xl text-richblack-300"/>
                                    </button>
                                    <button
                                        onClick={()=>{setOnConfirmationModal({
                                        text1: "Delete this section",
                                        text2: "All the lectures in this section will be deleted",
                                        btn1text : "Delete",
                                        btn2text : "Cancle",
                                        btn1Handler : ()=>{handleDeleteSection(section._id)},
                                        btn2Handler : ()=>{setOnConfirmationModal(null)},
                                    })}}
                                    
                                    >
                                        <MdDelete  className="text-xl text-richblack-300"/>
                                    </button>
                                    <span className="font-medium text-richblack-300">|</span>
                                    <MdKeyboardArrowDown className={`text-xl text-richblack-300`} />

                                </div>

                            </summary>

                            <div className="px-3 sm:px-6 pb-4">
                                {section?.subsection?.map((data)=>(
                                    <div key={data?._id}
                                    onClick={()=>setViewSubsection(data)}
                                    className="flex cursor-pointer items-center justify-between gap-x-2 sm:gap-x-3 border-b-2 border-b-richblack-600 py-2"
                                    >
                                        {/* dropdown and title */}
                                        <div className="flex items-center gap-x-2 sm:gap-x-3 py-2 min-w-0">
                                            <RxDropdownMenu className="text-2xl text-richblack-50 flex-shrink-0"/>
                                            <p className="font-semibold text-richblack-50 truncate">{data.title}</p>
                                        </div>
                                        {/* for edit and delete buttons */}
                                        <div className="flex items-center gap-x-2 sm:gap-x-3 flex-shrink-0"
                                            onClick={(e)=> e.stopPropagation()}
                                        >
                                            <button
                                            onClick={()=> setEditSubsection({...data, sectionId: section._id})}
                                            >
                                                <MdModeEdit className="text-xl text-richblack-300"/>
                                            </button>
                                            <button
                                            onClick={()=> setOnConfirmationModal({
                                                text1: "Are You Sure to Delete This Subsection",
                                                text2: "The selected lecture will be deleted",
                                                btn1text: 'Delete',
                                                btn2text: 'Cancel',
                                                btn1Handler : ()=> handleDeleteSubsection(data._id, section._id ),
                                                btn2Handler : ()=> setOnConfirmationModal(null)
                                            })}
                                            >
                                                <MdDelete className="text-xl text-richblack-300"/>
                                            </button>
                                            
                                        </div>

                                    </div>
                                ))}
                                {/* add subsection button */}
                                <div>
                                    <button 
                                    onClick={()=> setAddSubsection(section._id)}
                                    className="mt-3 flex items-center gap-x-1 text-yellow-50"
                                    >
                                        <IoMdAdd  className="text-lg"/>
                                        <span>Add Lecture</span>
                                    </button>
                                </div>
                            </div>
                        </details>
                    ))}

                </div>
            
            {/* conditional rendering of modals */}
            {addSubsection ? (
                    <SubSectionModal
                    modalData = {addSubsection}
                    setModalData = {setAddSubsection}
                    add = {true}
                    />
                ) : viewSubsection ? (
                    <SubSectionModal
                    modalData = {viewSubsection}
                    setModalData = {setViewSubsection}
                    view = {true}
                    />
                ) : editSubsection ? (
                    <SubSectionModal
                    modalData = {editSubsection}
                    setModalData = {setEditSubsection}
                    edit = {true}
                    />
                ) : (<></>)
            }
            {/* rendering confirmation modal */}
            {onConfirmationModal ? (
                <ConfirmationModal
                modaldata = {onConfirmationModal}
                />
            ) : (<></>)}
        </>
    );
}