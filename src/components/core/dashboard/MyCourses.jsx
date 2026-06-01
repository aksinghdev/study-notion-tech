import { useSelector } from "react-redux";
import Course from "./courses/Course";


export default function MyCourses(){

    const {course} = useSelector( (state) => state.course)
    console.log("print course inside my course",course);

    return(
        <div className="mt-20 text-center text-white mx-auto w-full">
            <h1>
                My Course
            </h1>
            {/* course card content */}
            {
                !course ? (
                    <div>
                        You have no any course add yet
                    </div>
                ) : (
                    <Course/>
                )
            }
            

        </div>
    );
}