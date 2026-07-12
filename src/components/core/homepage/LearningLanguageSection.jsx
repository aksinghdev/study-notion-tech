import HilightText from "../../common/HighlightText";
import progressphoto from "../../../assets/Images/Know_your_progress.svg"
import comparephoto from "../../../assets/Images/Compare_with_others.svg"
import lessonphoto from "../../../assets/Images/Plan_your_lessons.svg"
import CTAButton from "./Button";

export default function LearningLanguageSection(){
    return(
        <div className=" flex flex-col gap-8 lg:gap-10 items-center w-full mt-16 lg:mt-32 bg-pure-greys-5 text-richblack-700">
            <div className=" flex flex-col gap-5 items-center text-center px-4">
                <h1 className=" text-center text-2xl sm:text-3xl font-inter font-bold w-full sm:w-[70%]">
                    Your swiss knife for
                    <HilightText text='learning any language'/>
                </h1>
                <p className=" text-richblack-700 font-inter font-medium text-sm sm:text-base w-full sm:w-[70%]">
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </p>

            </div>
            <div className=" flex justify-center items-center flex-col lg:flex-row gap-4 lg:gap-0 px-4">
                <img
                    src={progressphoto}
                    alt="Know Your Progress"
                    className=" object-contain w-[75%] sm:w-auto lg:-mr-32"
                />
                <img
                    src={comparephoto}
                    alt="Compare with Others"
                    className=" object-contain w-[75%] sm:w-auto"
                />
                <img
                    src={lessonphoto}
                    alt="Plan Your Lesson"
                    className=" object-contain w-[75%] sm:w-auto lg:-ml-36"
                />
            </div>
            <div className=" mt-1 text-center mb-16 lg:mb-28">
                <CTAButton children="Learn More" active={true} linkto='/login' />
            </div>
            
        </div>
    );
}