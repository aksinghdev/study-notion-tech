import react from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HilightText from "../components/common/HighlightText";
import CTAButton from "../components/core/homepage/Button";
import CodeBlock from "../components/core/homepage/CodeBlock";
import banner from "../assets/Images/banner.mp4";
import TimelineSection from "../components/core/homepage/TimelineSection";
import LearningLanguageSection from "../components/core/homepage/LearningLanguageSection";
import BecomeAnInstructor from "../components/core/homepage/BecomeAnInstructor"
import ExploreMore from "../components/core/homepage/ExploreMore"
import Footer from "../components/common/Footer";


const Home = () => {
  return (
    <div className=" w-full mt-7">
      {/* Section 1 */}
      <div className=" mx-auto flex flex-col justify-between items-center w-11/12 text-white max-w-maxContent ">
        <div className=" flex flex-col items-center gap-4 mx-auto">
          <Link to={"/signup"}>
            <div
              className=" bg-richblack-800 rounded-full px-5 py-2 hover:bg-richblack-900
                     shadow-inner border-b border-richblack-500 font-semibold transition-all duration-200 hover:scale-95 w-fit"
            >
              <div className=" flex flex-row gap-3 rounded-full items-center justify-center text-richblack-200">
                <p className="">Become an Instructor</p>
                <FaArrowRight />
              </div>
            </div>
          </Link>
          <div className=" font-semibold text-center text-3xl text-richblack-25 mt-5">
            Empower Your Future with
            <HilightText text={"Coding Skills"} />
          </div>
          <div className=" text-richblack-100 w-[65%] text-center mt-4">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </div>
          {/* button for call to an action */}
          <div className=" flex flex-row gap-8 mt-4">
            <CTAButton active={true} linkto={"/signup"}>
              Learn More
            </CTAButton>

            <CTAButton active={false} linkto={"/login"}>
              Book a Demo
            </CTAButton>
          </div>
        </div>
        {/* video section */}
        <div className=" flex flex-col items-center relative gap-6 w-full mt-16">
            {/* <div className=" w-full h-full bg-richblue-300 opacity-80 z-1 blur-3xl absolute top-2 right-4"></div> */}

          <div className=" w-[71%]  shadow-[15px_15px_rgba(255,255,255,0.90)]">
            <video
                muted
                loop 
                autoPlay 
                width="full "
                className=" block shadow-[15px_15px_rgba(245, 203, 66)]"
            >
              <source src={banner} type="video/mp4" />
            </video>
          </div>
        </div>
        {/* code block section */}
        <div className=" w-full mx-auto flex justify-center mt-14">
          {/* section 01 */}
            <CodeBlock
                position={"lg:flex-row"}
                heading={
                  <>
                    Unlock Your <HilightText text="coding potential" /> with our online courses.
                  </>
                }

                subheading= {"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                ctabtn1={
                    {
                        btnText:"Try it Yourself",
                        linkto:"/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText:"Learn More",
                        linkto:"/login",
                        active: false,
                    }
                }
                codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n<body>\nh1><ahref="/">Header</a>`}
                codecolor={"text-yellow-25"}
                bggradient={'bg-brown-400'}
            />
        </div>
        <div className=" w-full mx-auto flex justify-center mt-14">
          {/* section 02 */}
            <CodeBlock
                position={"lg:flex-row-reverse"}
                heading={
                  <>
                    Start <HilightText text="coding in seconds" />
                  </>
                }

                subheading= {"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                ctabtn1={
                    {
                        btnText:"Continue Lesson",
                        linkto:"/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText:"Learn More",
                        linkto:"/login",
                        active: false,
                    }
                }
                codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n<body>\nh1><ahref="/">Header</a>`}
                codecolor={"text-yellow-25"}
                bggradient={'bg-blue-400'}
            />
        </div>
      </div>
      {/* unlock your career */}
      <div className=" w-11/12 max-w-maxContent items-center flex justify-center mx-auto">
        <ExploreMore/>
      </div>
      {/* Section 2 white bg */}
      <div className=" bg-pure-greys-5 text-richblack-700 ">
        {/* square white photo bg with button */}
        <div className=" homepage-bg h-[12rem]">
          <div className=" w-11/12 flex flex-row justify-center gap-8 mx-auto">
                <div className=" flex flex-row gap-6 mt-[5rem]">
                
                    <CTAButton active={true} linkto="/signup">
                        <div className=" flex flex-row gap-3 items-center justify-center">
                            Explore Full Catalog
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                    <CTAButton active={false} linkto='/login'>
                        Learn More
                    </CTAButton>
                
                </div>
          </div>

        </div>
        {/* white bg  */}
        <div className=" flex w-11/12 max-w-maxContent items-center flex-col justify-center gap-10 mx-auto mt-20">
          <div className=" flex flex-row justify-center gap-40 mx-auto">
            <div className=" w-[50%] text-left">
              <h1 className=" font-inter font-semibold text-4xl">
                Get the skills you need for 
                <HilightText text={'a job that is in demand.'}/>
              </h1>
            </div>
            <div className=" flex flex-col gap-12 w-[50%]">
              <p className=" text-left text-richblack-600 font-inter font-medium text-lg ">
                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </p>
              <CTAButton active={true} children={'Learn More'} linkto='/login'/>
            </div>

          </div>
          {/* for image with developer atteribute */}
          <TimelineSection/>
          <LearningLanguageSection/>
        </div>

      </div>

      {/* Section 3 rich black 900 bg color */}
      <div className=" bg-richblack-900 text-richblack-5">
        <div className="w-11/12 flex mx-auto">
          <BecomeAnInstructor/>
        </div>

      </div>
      <div>
      {/* Section 4 (footer) */}
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
