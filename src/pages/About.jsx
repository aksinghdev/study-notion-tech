import about1 from "../assets/Images/aboutus1.webp"
import about2 from "../assets/Images/aboutus2.webp"
import about3 from "../assets/Images/aboutus3.webp"
import FoundingStory from "../assets/Images/FoundingStory.png"

import LearningGrid from "../components/core/about us/LearningGrid"
import HighlightText from "../components/common/HighlightText"
import Quote from "../components/core/about us/Quote"
import HilightText from "../components/common/HighlightText"
import Stats from "../components/core/about us/Stats"
import ContactFormSection from '../components/core/about us/ContactFormSection'
import Footer from '../components/common/Footer'

const About = () =>{


return(
    <div className="relative">
        {/* photo section */}
        <section className=" w-11/12 flex items-center justify-center mx-auto absolute top-[350px]">
            <div className="flex flex-row gap-5 w-[%] mx-auto">
                <img src={about1} alt="img1" loading="lazy"
                />
                <img src={about2} alt="img2" loading="lazy"
                />
                <img src={about3} alt="img3" loading="lady"
                />
            </div>
        </section>
        {/* Header section */}
        <section className="bg-richblack-800 text-richblack-5 w-screen flex mx-auto items-center pb-32">
            <header className=" flex flex-col items-center justify-center gap-8 w-11/12 mx-auto ">
                <div className=" w-[76%] flex flex-col gap-10 items-center justify-center mt-16 pb-36">
                    <p className=" text-richblack-200">About Us</p>
                    <h1 className=" text-3xl font-bold font-inter text-center w-[70%]">
                        Driving Innovation in Online Education for a
                        <span>
                            <HighlightText text={"Brighter Future"}/>
                        </span>
                    </h1>
                    <p className=" text-richblack-300 text-center font-inter w-[70%] px-1 -mt-5">
                        Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>
                    <div className= " w-[20%] h-[40%] opacity-70 blur-xl ring-transparent bg-brown-500 ">
                        
                    </div>
                </div>
            </header>
        </section>
        {/* sectiion 02 Quote */}
        <section className=" border-b-richblack-800 border-[1px]">
            <div className=" flex flex-col items-center justify-center gap-8 w-11/12 mx-auto mt-36">
                <Quote/>
            </div>
        </section>
        {/* section-03 our story and vision section */}
        <section>
            <div className=" w-11/12 flex flex-col justify-center items-center mx-auto max-w-maxContent gap-10">
                <div className=" flex flex-col lg:flex-row gap-24 items-center justify-center text-richblack-300 text-base">
                    <div className=" flex  flex-col gap-5 items-start justify-center p-12 w-[45%]">
                        <div className=" text-3xl font-semibold">
                            <HighlightText text={"Our Founding Story"} color={" text-transparent bg-foundgradient bg-clip-text"} />
                        </div>
                        <p className=" mt-2">
                            Our e-learning platform was born out of a shared vision and passion for transforming education.
                             It all began with a group of educators, technologists, and lifelong learners who recognized the
                              need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                        </p>
                        <p>
                            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems.
                             We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries.
                              We envisioned a platform that could bridge these gaps and empower
                             individuals from all walks of life to unlock their full potential.
                        </p>
                    </div>
                    <div className=" relative ">
                        
                            <img src={FoundingStory}
                                className=" h-fit z-20"
        
                                alt="Founding story image"
                                loading="lazy"
                            />
                        
                        <div className=" w-[372px] h-[257px] rounded-full z-0 opacity-30 blur-3xl absolute top-1 left-10 bg-pink-700">

                        </div>
                    </div>
                </div>

                <div className=" flex flex-row gap-28 items-center justif mx-auto text-richblack-300 text-base w-[82%]">
                    <div className=" flex flex-col gap-5 items-start justify-center   ">
                        <h1 className=" font-semibold text-3xl">
                            <HilightText text={"Our Vision"} color={" text-transparent bg-browngradient bg-clip-text"} />
                        </h1>
                        <p>
                            With this vision in mind, we set out on a journey to create an e-learning platform that would
                             revolutionize the way people learn.
                             Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform 
                             that combines cutting-edge
                              technology with engaging content,fostering a dynamic and interactive learning experience.
                        </p>
                    </div>
                    <div className=" flex flex-col gap-5 items-start justify-center  ml">
                        <h1 className=" text-3xl font-semibold">
                            <HilightText text={"Our Mission"}  />
                        </h1>
                        <p>
                            our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, 
                            where individuals can connect, collaborate, and learn from one another. 
                            We believe that knowledge thrives in an environment of sharing and dialogue, 
                            and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                        </p>
                    </div>
                </div>

            </div>
        </section>
        {/* section-04 ststuds Section */}
        <section>
            <Stats/>
        </section>
        {/* Section-05 Learning Grid  */}
        <section className=" w-11/12 mx-auto px-12 py-5">
            <LearningGrid/>
            <ContactFormSection/>
        </section>
        {/* section-06 Review slider  */}
        <section>
            <div className=" flex w-11/12 mx-auto items-center justify-center text-center text-richblack-5 text-xl font-bold m-10">
                Review from others Learners
            </div>
        </section>

        {/* section-07 footer */}
        <section>
            <Footer/>
        </section>
    </div>
);

}

export default About;