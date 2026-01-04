
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LiaUndoAltSolid } from "react-icons/lia";
import { sendOtp, signupCall } from "../services/operations/authAPI";
import {GoArrowLeft} from "react-icons/go"

function VerifyEmail(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, signupData} = useSelector((state) => state.auth);
    const[otp, setOtp] = useState("");

    useEffect( () =>{
        if(!signupData){
            navigate("/signup");
        }
    },[])

    const { accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            contactNumber,
         } = signupData;

         const handleOnSubmit = (e) =>{
            e.preventDefault();
            dispatch(signupCall(firstName, lastName, email, password, confirmPassword,accountType, contactNumber, otp, navigate))
         }

    return(
        <div className=" w-screen h-screen flex flex-col items-center justify-center gap-6 text-richblack-5 overflow-y-hidden">
            {
                loading ? (<div>
                    Loading...
                </div>) :
                (
                    <div className=" w-[30%] p-6 flex flex-col gap-3">
                        <h1 className=" font-semibold text-3xl font-inter">
                            Verify Email
                        </h1>
                        <p className=" text-richblack-100 font-normal text-lg">
                            A verification code has been sent to you. Enter the code below
                        </p>

                        <form onSubmit={handleOnSubmit}
                            className=" flex flex-col gap-4"
                        >
                            <OTPInput
                                value={otp} 
                                numInputs={6}
                                onChange={setOtp}
                                renderSeparator={<span className=" mx-2"></span>}
                                renderInput={(props) => <input{...props} 
                                className=" mt-5 py-3 px-0 text-richblack-200 text-center bg-richblack-800 rounded-lg border-richblack-700 border-b-[1px] w-full max-w-maxContent"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                placeholder="-"
                                />}
                                
                                />

                            <button
                                className=" w-full  mt-2 rounded-lg bg-yellow-50 py-2 px-3 font-semibold text-richblack-900 
                                hover:scale-95 hover:bg-yellow-25"
                                style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                type="submit">
                                    Verify Email
                            </button>
                                
                        </form>
                        <div className="mt-6 flex flex-row gap-5 justify-between items-center"> {/* for back to login & resend button */}
                            <Link to={"/login"}>
                                <div className=" flex flex-row gap-3 items-center text-richblack-25 hover:text-richblack-100 hover:scale-105 transition-all duration-300">
                                    <GoArrowLeft/>
                                    <p className=" text-richblack-">Back to login</p>
                                </div>
                            </Link>

                            <button onClick={() => dispatch( sendOtp(signupData.email, navigate))}
                                className=" flex flex-row gap-2 items-center text-blue-200 hover:text-blue-100 hover:scale-105 transition-all duration-300"
                                >
                                <LiaUndoAltSolid/>
                                Resend it
                            </button>

                        </div>


                    </div>
                )
            }

        </div>
    );

}

export default VerifyEmail;