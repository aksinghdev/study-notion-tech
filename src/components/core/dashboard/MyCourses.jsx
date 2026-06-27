import { useSelector } from "react-redux";
import Course from "./courses/Course";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import BtnIcon from "../../common/BtnIcon";
import { VscAdd } from "react-icons/vsc"
import CoursesTable from "./courses/instructor courses/CoursesTable";

export default function MyCourses(){
    const token = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState(null);

    useEffect( ()=>{
        const fetchCourses = async ()=>{
            const result = await fetchInstructorCourses(token)
            console.log("print result inside my courses : ",result);
            if(result){
                setCourses(result);
            }
        }
        fetchCourses();
    },[])
    // console.log("print result inside my courses : ");
    
    return(
        <div>
            <div className="mb-14 flex items-center justify-between">
                <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
                <BtnIcon
                text="Add Course"
                onclick={() => navigate("/dashboard/add-course")}
                >
                <VscAdd />
                </BtnIcon>
                
            </div>
            {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
    );
}