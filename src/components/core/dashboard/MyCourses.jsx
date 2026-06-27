import { useSelector } from "react-redux";
import Course from "./courses/Course";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";


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
    },[])
    console.log("print result inside my courses : ");
    
    return(
        <div className="mt-20 text-center text-white mx-auto w-full">           
            my courses
        </div>
    );
}