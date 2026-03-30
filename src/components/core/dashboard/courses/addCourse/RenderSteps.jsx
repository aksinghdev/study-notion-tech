import { useSelector } from "react-redux";
import {FaCheck} from "react-icons/fa"
import CourseInformationForm from "./courseInformation/CourseInformationForm"

export default function RenderSteps(){

    const steps = [
        {
            id : 1,
            title : "Course Information"
        },
        {
            id : 2,
            title : "Course Builder"
        },
        {
            id : 3,
            title : "Publish"
        }
    ]

    const {step} = useSelector((state) => state.course);

    return(
        <>
            <div className=" relative mb-2 flex w-full justify-center">
                {steps.map((item)=>(
                    <>
                        <div key={item.id}
                            className={` grid w-[34px] border-[1px] rounded-full aspect-square place-items-center ${
                                step === item.id ? " bg-yellow-900 text-yellow-50 border-yellow-50":
                                " border-richblack-700 bg-richblack-800 text-richblack-300"
                            }`}
                        >
                            {step > item.id ? (<FaCheck/>) : (item.id)}

                        </div>
                        {/* for dashed lining */}
                {item.id !== steps.length &&
                    <div
                        className={` w-[33%] h-[calc(34px/2)] border-dashed border-b-2 relative ${
                            step < item.id ? " border-richblack-300":" border-yellow-50"
                        } `}
                    ></div> }
                    </>
                ))}
                
            </div>
            {/* for item title and content */}
            <div className="relative ml-2 mb-16 flex w-full select-none justify-between">
                {
                    steps.map( (item) => (
                        <>
                            <div
                            className={`flex min-w-[130px] flex-col items-center gap-y-2`}
                            key={item.id}
                            >
                                <p className={`text-sm ${
                                    step >= item.id ? "text-richblack-5" : " text-richblack-500"
                                }`}>
                                    {item.title}
                                </p>
                            </div>
                        </>
                    ))
                }
            </div>
            {/* Render the specific component based on the current steps */}
            {step === 1 && <CourseInformationForm/>}
            {/* {step === 2 && <CourseBuilderForm/>} */}
        </>
    );
}