import HilightText from "../../common/HighlightText";
import becomeaninstructorimg from "../../../assets/Images/Instructor.png"
import CTAButton from "./Button"
import { FaArrowRight } from "react-icons/fa";

export default function BecomeAnInstructor(){
    return(
        <div className=" w-11/12 flex items-center justify-center mx-auto">
            <div className=" flex flex-row gap-16 justify-center items-center">
                <div className=" p-16 w-[50%]">
                    <img src={becomeaninstructorimg}
                        className=" shadow-[-15px_-15px_rgba(255,255,255,0.90)]"
                    />
                </div>
                <div className=" flex flex-col gap-5 w-[45%]">
                    <h1 className=" text-3xl font-bold font-inter w-[80%] ">
                        Become<br/>
                        <HilightText text="an Instructor"/>
                    </h1>
                    <p className=" text-richblack-300 font-medium font-inter text-base w-[80%]">
                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </p>
                    <div className=" mt-8">
                        <CTAButton active={true} linkto="/signup">
                        <div className=" flex flex-row gap-2 justify-center items-center">
                            <p>Start Teaching Today</p>
                            <FaArrowRight/>
                        </div>
                        </CTAButton>
                    </div>
                        
                </div>

            </div>

        </div>
    );
}