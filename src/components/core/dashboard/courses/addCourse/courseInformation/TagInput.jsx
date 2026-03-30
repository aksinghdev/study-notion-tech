import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {MdClose} from "react-icons/md"

export default function TagInput ({lable, name, placeholder, setValue, getValues, register, errors,}){

    const {course, editCourse} = useSelector( (state) => state.course);

    const [chips, setChips] = useState([]);

    // to handle first render
    useEffect( () => {
        if(editCourse){
            setChips(course?.tag);
        }
        register(name, {required : true, validate : (value) => value.length > 0 })
    },[])

    // to handle the change chips state
    useEffect( ()=>{
        setValue(name, chips)
    },[chips]);
    // function to handele key down when chips are added
    const handleKeyDown = (event) =>{
        if(event.key === "Enter" || event.key === ","){
            event.preventDefault()
            const chipValue = event.target.value.trim()
            // check for existing this value in chips
            if(chipValue && !chips.includes(chipValue)){
                // add new value to the array and clear the input
                const newChips = [...chips, chipValue]
                setChips(newChips)
                event.target.value =""
            }
        }
    }

    // delete chip function
    const handleDeleteChip = (chipIndex) =>{
        // filter the chips array and remove the value with given index value
        const newChips = chips.filter((_, index) => index !== chipIndex)
        setChips(newChips);
    }

    return(
        <div className=" flex flex-col space-y-2">
            <lable className="text-sm text-richblack-5" htmlFor = {name}>
                {lable} <sup className="text-pink-200">*</sup>
            </lable>
            <div className=" flex flex-wrap w-full gap-y-2">
                {chips.map((chip, index) =>(
                    <div   key={index}
                    className="m-1 flex items-center text-center rounded-full bg-yellow-600 px-2 py-1 text-sm text-richblack-5"
                    >
                        {chip}
                        <button
                        type="button"
                        className="ml-2 focus:outline-none"
                        onClick={()=> handleDeleteChip(index)}
                        >
                            <MdClose className="text-sm" />
                        </button>
                    </div>
                ))}
                {/* render the input for adding the new chips */}
                <input
                 id={name}
                 name={name}
                 placeholder={placeholder}
                 type="text"
                 onKeyDown={handleKeyDown}
                 className=" py-1 px-2 text-richblack-200 text-start bg-richblack-700 rounded-lg border-richblack-600 border-b-[1px] w-full"
                 style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                 }}
                />
            </div>
            {errors[name] && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
                {lable} is required
            </span>
      )}
        </div>
    );
}