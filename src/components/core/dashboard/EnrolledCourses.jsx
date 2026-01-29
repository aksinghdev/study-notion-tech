import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getEnrolledCourses } from "../../../services/operations/ProfileAPI";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";

export default function EnrolledCourses(){
    const navigate = useNavigate();
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const {token} = useSelector( (state) => state.auth);

    const findEnrolledCourses = async () =>{
        try{
            const output = getEnrolledCourses(token);
            setEnrolledCourses(output);
            console.log("Print output inside the Enrolled courses",output);
        }
        catch(error){
            console.log("Enrolled courses jsx find function catch error",error);
            console.log(error.message);
        }
    }

    useEffect(
        () =>{
            findEnrolledCourses();
        },[]
    )



    return(
        <div className="mt-20 text-center text-white mx-auto w-full">
            <div>
                Enrolled Courses
            </div>
            {/* course card section */}
            <div>
                {
                    !enrolledCourses ? (
                        <div></div>
                    ): !enrolledCourses.length ? (
                        <div>
                            You are not enrolled in any course yet 
                        </div>
                    ):(
                        <div>
                            {/* Headding */}
                            <div>
                                <p>Course name</p>
                                <p>Duration</p>
                                <p>Progress</p>
                                <p>...</p>
                            </div>
                            {/* course card */}
                            {
                                enrolledCourses.map((course, i, arr) =>(
                                    <div
                                        key={i}
                                    >
                                        <div
                                            onClick={ ()=>{
                                                navigate(`/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`)
                                            }}
                                        >
                                            {/* course image */}
                                            <img
                                                src={course.thumbNail}
                                                alt="course thumbnail"
                                                className=" h-14 w-14 object-cover rounded-lg"
                                            />
                                            {/* name & description */}
                                            <div
                                            className=" flex flex-row gap-2 items-start justify-between"
                                            >
                                                <p>{course?.name}</p>
                                                <p>{course?.description}</p>
                                            </div>
                                            {/* course duration */}
                                            <div>
                                                {course?.duration}
                                            </div>
                                            {/* course progress */}
                                            <div className=" flex flex-row items-start gap-2 justify-between">
                                                <p>Progress:{course?.progressPercentage ||0}%</p>
                                                <ProgressBar
                                                    completed={course.progressPercentage || 0}
                                                    height="8px"
                                                    isLabelVisible = {false}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    )
                    
                }
            </div>

        </div>
    );
}