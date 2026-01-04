
import { BiChat } from "react-icons/bi";
import { IoMdChatboxes } from "react-icons/io";
import { BiWorld } from "react-icons/bi";
import { IoIosCall } from "react-icons/io";
import ContactForm from "../components/core/contact Us/ContactForm";
import Footer from "../components/common/Footer";

export default function ContactUs(){
    return(
        <div>
            <div className=" w-11/12 mx-auto flex flex-col lg:flex-row  justify-center mt-20 gap-16">
                {/* card with icon */}
                <div className=" flex flex-col gap-5 items-start justify-center w-[30%] bg-richblack-800 p-8 h-fit rounded-xl">
                    <div className=" flex flex-row gap-3 text-center text-richblack-100">
                        {/* icon */}
                        <div className=" text-center py-2 items-center place-items-center  text-lg">
                            <IoMdChatboxes/>
                        </div>
                        <div className=" flex flex-col gap-2 items-start justify-center text-start">
                            <h1 className="text-lg font-inter font-semibold text-richblack-5">Chat on Us</h1>
                            <div className=" flex flex-col gap-0 text-richblack-200">
                                <p>Our friendly team is here to help.</p>
                                <p>@mail address</p>
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-row gap-3 text-center text-richblack-100">
                        {/* icon */}
                        <div className=" text-center py-2 items-center place-items-center  text-lg">
                            <BiWorld/>
                        </div>
                        <div className=" flex flex-col gap-2 items-start justify-center text-start">
                            <h1 className="text-lg font-inter font-semibold text-richblack-5">Chat on Us</h1>
                            <div className=" flex flex-col gap-0 text-richblack-200">
                                <p>Our friendly team is here to help.</p>
                                <p>@mail address</p>
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-row gap-3 text-center text-richblack-100">
                        {/* icon */}
                        <div className=" text-center py-2 items-center place-items-center  text-lg">
                            <IoIosCall/>
                        </div>
                        <div className=" flex flex-col gap-2 items-start justify-center text-start">
                            <h1 className="text-lg font-inter font-semibold text-richblack-5">Chat on Us</h1>
                            <div className=" flex flex-col gap-0 text-richblack-200">
                                <p>Our friendly team is here to help.</p>
                                <p>@mail address</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* form section */}
                <div className=" w-[50%] flex flex-col gap-8 border-[1px] border-richblack-800 rounded-xl p-14">
                    <div className=" flex flex-col gap-4 text-richblack-5 justify-center">
                        <h1 className=" text-4xl font-semibold ">
                            Got a Idea? We’ve got the skills. Let’s team up
                        </h1>
                        <p className="  font-inter font-medium text-richblack-300">
                            Tall us more about yourself and what you’re got in mind.
                        </p>
                    </div>
                    <ContactForm/>
                </div>
            </div>
            <div className=" flex w-11/12 mx-auto items-center justify-center text-center text-richblack-5 text-xl font-bold m-10">
                Review from others Learners
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
}