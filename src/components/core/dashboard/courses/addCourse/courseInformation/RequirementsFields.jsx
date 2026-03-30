import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export default function RequirementsFields ({register, lable, name, setValue, getValues, errors}){
    const [requirements, setRequirements] = useState("");
    const [requirementsList, setRequirementsList] = useState([]);
    const {course, editCourse} = useSelector( (state) => state.course);

    const handleAddRequirements = () =>{
        if(requirements){
            setRequirementsList([...requirementsList, requirements]);
            setRequirements("");
        }
    }

    const handleRemoveRequirement = (index) =>{
        const updateRequirements = [...requirementsList]
        updateRequirements.splice(index,1)
        setRequirementsList(updateRequirements);
    }

    const handleKeyDown = (event) =>{
        if(event.key === "Enter"){
            event.preventDefault()
            // requirements = event.target.value;
            handleAddRequirements();
        }
    }

    useEffect(()=>{
        if(editCourse){
            setRequirementsList(course?.instructions)
        }
        register(name,{required : true, validate : (value) => value.length > 0})
    },[])

    useEffect( ()=>{
        setValue(name, requirementsList)
    },[requirementsList])

    return(
        <div className=" flex flex-col space-y-2">
            <lable className=" text-sm  text-richblack-5" htmlFor={name}>
                {lable} <sup className=" text-pink-200">*</sup>
            </lable>
            <div  className=" flex flex-col items-start gap-y-2">
                <input
                 id={name}
                 name={name}
                 value={requirements}
                 onKeyDown={handleKeyDown}
                 onChange={(e) => setRequirements(e.target.value)}
                 type="text"
                 className=" py-1 px-2 text-richblack-200 text-start bg-richblack-700 rounded-lg border-richblack-600 border-b-[1px] w-full"
                 style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                 }}
                />
                <button
                    type="button"
                    onClick={handleAddRequirements}
                    className="font-semibold text-yellow-50"
                >
                    Add
                </button>
            </div>
            {requirementsList.length > 0 && (
                <ul>
                    {requirementsList.map( (requirement, index)=>(
                        <li key={index} className="flex flex-row ">
                        <span>{requirement}</span>
                        <button
                        type="button"
                        onClick={()=>handleRemoveRequirement(index)}
                        className="ml-2 text-xs text-pure-greys-300 "
                        >
                            Clear
                        </button>
                        </li>
                    ))}
                </ul>
            )}
            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {lable} is required
                </span>
            )}
        </div>
    );
}