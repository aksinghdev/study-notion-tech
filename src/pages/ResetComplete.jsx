
import { useLocation, Link} from "react-router-dom";
import {GoArrowLeft} from "react-icons/go";

export default function ResetComplete(){

    const location = useLocation();
    const email = location.state?.email;

    console.log("Print email inside reset complete",email);
    

    return(
        <div className=" w-screen h-screen flex flex-col items-center justify-center gap-6 text-richblack-5 overflow-y-hidden">
            <div className=" w-[30%] p-6 flex flex-col gap-3">
                <div className=" flex flex-col gap-4 items-start justify-center">
                    <h1 className=" font-semibold text-3xl font-inter">Reset Complete!</h1>
                    <p className=" text-richblack-100 font-normal text-lg ">
                        All done! We have sent an email to m***********@gmail.com to confirm
                    </p>
                </div>
                <div className=" text-center">
                    <Link to={"/login"}>
                        <p
                            className=" w-full  mt-4 rounded-xl bg-yellow-50 py-2 px-3 font-semibold text-richblack-900 
                            hover:scale-95 hover:bg-yellow-25"
                                style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                    >
                            Return to Login
                        </p>
                    </Link>
                    <Link to={"/login"}>
                        <div className=" mt-3 flex flex-row gap-3 items-center text-richblack-25">
                            <GoArrowLeft/>
                            <p className=" text-richblack-">Back to login</p>
                        </div>
                    </Link>


                </div>
            </div>
        </div>
    );
}