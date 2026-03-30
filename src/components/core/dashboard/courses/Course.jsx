import { useSelector } from "react-redux";



export default function Course(){

    const {course} = useSelector( (state) => state.course)

    return(
        <div>
            {/* headdings */}
            <div className=" flex flex-col gap-2">
                <p>
                   COURSES  
                </p>
                <p>
                   DURATIONS  
                </p>
                <p>
                   PRICE  
                </p>
                <p>
                   ACTIONS  
                </p>
            </div>
            {/* course  */}
            <div>
                {
                    course.map((course, index) => (
                        <div key={index}
                        className=" flex flex-col gap-x-3 "
                        >
                            <img
                            src={course?.thumbnail}
                            alt={course?.courseName}
                            className=" w-[220px] h-[200px] object-cover"
                            />
                            {/* text content */}
                            <div className=" flex flex-row gap-1 items-start justify-start">
                                <h2>{course?.courseName}</h2>
                                <p>{course?.courseDescription}</p>
                                <p>Created At : {course?.createdAt}</p>
                                <div>
                                    <p>
                                        {course?.status}
                                    </p>
                                </div>
                            </div>
                            {/* durations */}
                            <div>
                                <p></p>
                            </div>
                            {/* price */}
                            <div></div>
                            {/* actions */}
                            <div></div>
                        </div>
                    ))
                }
            </div>
        
        
        </div>
    );
}