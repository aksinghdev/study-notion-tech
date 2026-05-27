import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdModeEdit } from "react-icons/md";
import { RxDropdownMenu } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { deleteSection, deleteSubSection } from "../../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../../slices/courseSlice";



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
            // dispatch(setCourse(result));
            console.log("section delete ")
        }
        setOnConfirmationModal(null)
    }


    console.log("Print course content inside nested vieew", course?.courseContent);

    return(
        <div className=" mt-5">
            <div className="rounded-lg bg-richblack-700 p-6 px-8">
                {course?.courseContent.map( (section) => (
                    <details key={section._id} open>
                        <summary className='flex items-center justify-between gap-x-3 border-b-2'>
                            <div className='flex items-center gap-x-3'>
                                <RxDropdownMenu/>
                                <p>
                                    {section.sectionName}
                                </p>
                            </div>
                            {/* button for edit and delete */}
                            <div className=" flex flex-row gap-x-3">
                                <button
                                    onClick={() => {handleEditSectionChange(section._id, section.sectionName)}}
                                >
                                    <MdModeEdit/>
                                </button>
                                <button
                                    onClick={()=>{setOnConfirmationModal({
                                    text1: "Delete this section",
                                    text2: "All the lectures in this section will be deleted",
                                    btn1Text : "Delete",
                                    btn2Text : "Cancle",
                                    btn1Handler : ()=>{handleDeleteSection(section._id)},
                                    btn2Handler : ()=>{setOnConfirmationModal(null)},
                                })}}
                                
                                >
                                    <MdDelete/>
                                </button>
                                <span>|</span>
                                <MdKeyboardArrowDown className={`text-xl text-richblack-300`} />

                            </div>

                        </summary>
                        <div>
                            {section?.subsection?.map((data)=>(
                                <div key={data?._id}
                                onClick={()=>setViewSubsection(data)}
                                >
                                    {/* dropdown and title */}
                                    <div>
                                        <RxDropdownMenu/>
                                        <p>{data.title}</p>
                                    </div>
                                    {/* for edit and delete buttons */}
                                    <div className='flex items-center gap-x-3'>
                                        <button
                                        onClick={()=> setEditSubsection({...data, sectionId: section._id})}
                                        >
                                            <MdModeEdit/>
                                        </button>
                                        <button
                                        onClick={()=> setOnConfirmationModal({
                                            text1: "Are You Sure to Delete This Subsection",
                                            text2: "The selected lecture will be deleted",
                                            btn1Text: 'Delete',
                                            btn2Text: 'Cancel',
                                            btn1Handler : ()=> handleDeleteSubsection(data._id, section._id ),
                                            btn2Handler : ()=> setOnConfirmationModal(null)
                                        })}
                                        >
                                            <MdDelete/>
                                        </button>
                                        
                                    </div>

                                </div>
                            ))}
                            {/* add subsection button */}
                            <div>
                                <button 
                                onClick={()=> setAddSubsection(section._id)}
                                className='mt-4 flex items-center gap-x-2 text-yellow-50'
                                >
                                    <IoMdAdd/>
                                    <span>Add Lecture</span>
                                </button>
                            </div>
                        </div>
                    </details>
                ))}

            </div>
        </div>
    );
}